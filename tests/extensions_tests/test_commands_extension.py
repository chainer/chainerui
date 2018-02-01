from mock import MagicMock
import os
import shutil
import tempfile
import unittest

from chainer.optimizer import Hyperparameter
from chainer.training import Trainer
from chainer.training.triggers import IntervalTrigger

from chainerui.extensions.commands_extension import _stop_training
from chainerui.extensions.commands_extension import CommandsExtension
from chainerui.utils.command_item import CommandItem
from chainerui.utils.commands_state import CommandsState
from chainerui.utils.commands_state import JobStatus


class _MockTrainer(Trainer):
    def __init__(self, out_path, stop_trigger=IntervalTrigger(100, 'epoch'),
                 updater=None):
        self.out = out_path
        self.stop_trigger = stop_trigger

        hyperparam = Hyperparameter()
        hyperparam.lr = 0.005
        optimizer = MagicMock()
        optimizer.__class__.__name__ = 'MomentumSGD'
        optimizer.hyperparam = hyperparam

        if updater is None:
            updater = MagicMock()
            updater.epoch = 0
            updater.iteration = 0
            updater.get_optimizer.return_value = optimizer
        self.updater = updater

    @property
    def elapsed_time(self):
        return 0

    def serialize(self, serializer):
        pass


class TestCommandsExtension(unittest.TestCase):

    def setUp(self):
        test_dir = tempfile.mkdtemp(prefix='chainerui_test_cmdext')
        self._dir = test_dir

    def tearDown(self):
        if os.path.exists(self._dir):
            shutil.rmtree(self._dir)

    def test_initialize_command_trigger(self):
        out_path = os.path.join(self._dir, 'results')
        os.makedirs(out_path)
        commands_path = os.path.join(out_path, 'commands')
        open(commands_path, 'w').close()
        assert os.path.isfile(commands_path)

        target = CommandsExtension()
        trigger = MagicMock()
        trainer = _MockTrainer(out_path, trigger)
        target.initialize(trainer)
        assert not trainer.stop_trigger._loop_stop
        _stop_training(trainer, None)
        assert trainer.stop_trigger._loop_stop

    def test_call(self):
        out_path = os.path.join(self._dir, 'results')
        os.makedirs(out_path)
        commands_path = os.path.join(out_path, 'commands')
        open(commands_path, 'w').close()
        assert os.path.isfile(commands_path)

        # initialize
        target = CommandsExtension(trigger=(1, 'iteration'))
        trainer = _MockTrainer(out_path)
        target.initialize(trainer)
        assert not trainer.stop_trigger._loop_stop
        assert not os.path.isfile(commands_path)
        assert CommandsState.job_status(out_path) == JobStatus.RUNNING

        # setup valid command
        commands = CommandItem.load_commands(out_path)
        command = CommandItem(name='take_snapshot')
        command.set_request(CommandItem.REQUEST_OPEN, None, None)
        commands.append(command)
        command2 = CommandItem(name='stop')
        command2.set_request(
            CommandItem.REQUEST_OPEN,
            None,
            {'key': 'epoch', 'value': 10}
        )
        commands.append(command2)
        command3 = CommandItem(name='adjust_hyperparams')
        command3.set_request(
            CommandItem.REQUEST_OPEN,
            {
                'optimizer': 'MomentumSGD',
                'hyperparam': {'lr': 0.01, 'beta': None, 'gamma': 1.0}
            },
            {'key': 'iteration', 'value': 10}
        )
        commands.append(command3)
        CommandItem.dump_commands(commands, out_path)

        # call but skip by interval trigger
        target(trainer)
        commands = CommandItem.load_commands(out_path)
        assert len(commands) == 3
        assert commands[0].response is None
        assert commands[1].response is None
        assert commands[2].response is None

        # call 'take_sanpshot'
        trainer.updater.iteration = 1
        target(trainer)
        commands = CommandItem.load_commands(out_path)
        assert len(commands) == 3
        res = commands[0].response
        assert res['epoch'] == 0
        assert res['iteration'] == 1
        assert res['status'] == CommandItem.RESPONSE_SUCCESS
        assert commands[1].response is None
        assert commands[2].response is None

        # call 'adjust_hyperparams'
        trainer.updater.iteration = 10
        target(trainer)
        commands = CommandItem.load_commands(out_path)
        assert len(commands) == 3
        res = commands[2].response
        assert res['epoch'] == 0
        assert res['iteration'] == 10
        assert res['status'] == CommandItem.RESPONSE_SUCCESS
        assert res['body'] is not None
        assert res['body']['optimizer'] == 'MomentumSGD'
        assert res['body']['hyperparam'] == {'lr': 0.01}
        assert commands[1].response is None

        # call 'stop'
        trainer.updater.iteration = 100
        trainer.updater.epoch = 10
        target(trainer)
        commands = CommandItem.load_commands(out_path)
        assert len(commands) == 3
        res = commands[1].response
        assert res['epoch'] == 10
        assert res['iteration'] == 100
        assert res['status'] == CommandItem.RESPONSE_SUCCESS
        assert res['body'] is None
        assert trainer.stop_trigger._loop_stop

        target.finalize()
        assert CommandsState.job_status(out_path) == JobStatus.STOPPED

    def test_call_invalid_request(self):
        out_path = os.path.join(self._dir, 'results')
        os.makedirs(out_path)
        commands_path = os.path.join(out_path, 'commands')
        open(commands_path, 'w').close()
        assert os.path.isfile(commands_path)

        # initialize with non-hyperparam optimizer
        target = CommandsExtension()
        optimizer = MagicMock()
        optimizer.__class__.__name__ = 'MomentumSGD'
        optimizer.hyperparam = None
        updater = MagicMock()
        updater.epoch = 1
        updater.iteration = 1
        updater.get_optimizer.return_value = optimizer
        trainer = _MockTrainer(out_path, updater=updater)
        target.initialize(trainer)

        # setup invalid command
        commands = CommandItem.load_commands(out_path)
        command = CommandItem(name='adjust_hyperparams')
        command.set_request(
            CommandItem.REQUEST_OPEN,
            {'optimizer': 'Adam', 'hyperparam': {'alpha': 1.0}},
            {'key': 'iteration', 'value': 1}
        )
        commands.append(command)
        command2 = CommandItem(name='adjust_hyperparams')
        command2.set_request(
            CommandItem.REQUEST_OPEN,
            {'optimizer': 'MomentumSGD', 'hyperparam': {'lr': 0.01}},
            {'key': 'iteration', 'value': 1}
        )
        commands.append(command2)
        command3 = CommandItem(name='invalid_command')
        command3.set_request(CommandItem.REQUEST_OPEN, None, None)
        commands.append(command3)
        CommandItem.dump_commands(commands, out_path)

        # call invalid commands
        target(trainer)
        commands = CommandItem.load_commands(out_path)
        assert len(commands) == 3
        res = commands[0].response
        assert res['epoch'] == 1
        assert res['iteration'] == 1
        assert res['status'] == CommandItem.RESPONSE_SUCCESS
        assert res['body'] is None
        res = commands[1].response
        assert res['epoch'] == 1
        assert res['iteration'] == 1
        assert res['status'] == CommandItem.RESPONSE_SUCCESS
        assert res['body'] is None
        res = commands[2].response
        assert res['epoch'] == 1
        assert res['iteration'] == 1
        assert res['status'] == CommandItem.RESPONSE_FAILURE
        assert res['body'] is not None
        assert 'not available' in res['body']['message']
