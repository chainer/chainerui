import os
import shutil
import tempfile
import unittest

from chainer.training import Trainer
from chainer.training.triggers import IntervalTrigger

from chainerui.extensions.commands_extension import _CommandIntervalTrigger
from chainerui.extensions.commands_extension import CommandsExtension
from chainerui.utils.commands_state import CommandsState
from chainerui.utils.commands_state import JobStatus


class _MockTrainer(Trainer):
    def __init__(self, out_path):
        self.out = out_path
        self.stop_trigger = IntervalTrigger(100, 'epoch')


class TestCommandsExtension(unittest.TestCase):

    def setUp(self):
        test_dir = tempfile.mkdtemp(prefix='chainerui_test_cmdext')
        self._dir = test_dir

    def tearDown(self):
        if os.path.exists(self._dir):
            shutil.rmtree(self._dir)

    def test_call_no_command(self):
        out_path = os.path.join(self._dir, 'results')
        os.makedirs(out_path)
        commands_path = os.path.join(out_path, 'commands')
        open(commands_path, 'w').close()
        assert os.path.isfile(commands_path)

        target = CommandsExtension()
        trainer = _MockTrainer(out_path)
        target.initialize(trainer)
        assert type(trainer.stop_trigger) is _CommandIntervalTrigger
        assert not os.path.isfile(commands_path)
        assert CommandsState.job_status(out_path) == JobStatus.RUNNING

        target.finalize()
        assert CommandsState.job_status(out_path) == JobStatus.STOPPED
