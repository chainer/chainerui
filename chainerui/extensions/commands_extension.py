from chainer.serializers import npz
from chainer.training import extension
from chainer.training.extensions._snapshot import _snapshot_object
from chainer.training import trigger as trigger_module
from chainer.training.triggers import IntervalTrigger
import six

from chainerui.utils.command_item import CommandItem
from chainerui.utils.commands_state import CommandsState


def take_snapshot(trainer, body):
    filename = 'snapshot_iter_{.updater.iteration}'
    savefun = npz.save_npz
    _snapshot_object(trainer, trainer, filename.format(trainer), savefun)


def adjust_hyperparams(trainer, body):
    optimizer = trainer.updater.get_optimizer('main')
    optimizer_name = optimizer.__class__.__name__
    if optimizer_name != body.get('optimizer', None):
        # invalid optimizer was specified
        return None

    hyperparam = getattr(optimizer, 'hyperparam', None)
    if hyperparam is None:
        return None

    request_hyperparam = body.get('hyperparam', {})
    hyperparam_dict = hyperparam.get_dict()
    for key, value in six.iteritems(request_hyperparam):
        if (key not in hyperparam_dict) or (value is None):
            continue  # pragma: no cover
        setattr(hyperparam, key, value)
    return {
        'optimizer': optimizer_name,
        'hyperparam': hyperparam.get_dict()
    }

# NOTE: Chainer has a plan to add that trigger can detect training
#       length (PR#4079). After merge it, the below two trigger class
#       can be merge to one trigger class.


class _CommandIntervalTrigger(IntervalTrigger):

    def __init__(self, trigger):
        super(_CommandIntervalTrigger, self).__setattr__(
            '_trigger', trigger)
        super(_CommandIntervalTrigger, self).__setattr__(
            '_loop_stop', False)

    def __call__(self, trainer):
        if self._trigger(trainer):
            return True
        return self._loop_stop

    def stop(self):
        super(_CommandIntervalTrigger, self).__setattr__(
            '_loop_stop', True)

    def __getattr__(self, attr_name):
        return getattr(self._trigger, attr_name)

    def __setattr__(self, attr_name, value):
        setattr(self._trigger, attr_name, value)


class _CommandTrigger(object):

    def __init__(self, trigger):
        super(_CommandTrigger, self).__setattr__(
            '_trigger', trigger)
        super(_CommandTrigger, self).__setattr__(
            '_loop_stop', False)

    def __call__(self, trainer):
        if self._trigger(trainer):
            return True
        return self._loop_stop

    def stop(self):
        super(_CommandTrigger, self).__setattr__(
            '_loop_stop', True)

    def __getattr__(self, attr_name):
        return getattr(self._trigger, attr_name)

    def __setattr__(self, attr_name, value):
        setattr(self._trigger, attr_name, value)


def _stop_training(trainer, body):
    assert isinstance(trainer.stop_trigger, _CommandTrigger) or \
        isinstance(trainer.stop_trigger, _CommandIntervalTrigger)
    trainer.stop_trigger.stop()
    return None


class CommandsExtension(extension.Extension):

    """Trainer extension to enable command operation by output file

    This extension monitors a file for command created on `trainer.out` path,
    and execute each command when append the file.

    """

    priority = extension.PRIORITY_READER
    default_receivers = {
        'take_snapshot': take_snapshot,
        'adjust_hyperparams': adjust_hyperparams,
        'stop': _stop_training,
    }

    def __init__(self, trigger=(1, 'iteration'), receivers={},
                 file_name='commands'):
        self._trigger = trigger_module.get_trigger(trigger)
        self._file_name = file_name

        self._receivers = self.default_receivers.copy()
        self._receivers.update(receivers)

        self._out = ''

    def initialize(self, trainer):
        self._out = trainer.out
        CommandItem.remove_commands_file(trainer.out)
        CommandsState.run(trainer)
        if isinstance(trainer.stop_trigger, IntervalTrigger):
            trainer.stop_trigger = _CommandIntervalTrigger(
                trainer.stop_trigger)
        else:
            trainer.stop_trigger = _CommandTrigger(trainer.stop_trigger)

    def __call__(self, trainer):
        if not self._trigger(trainer):
            return

        commands = CommandItem.load_commands(trainer.out)

        is_updated = False
        for command in commands:
            if not command.should_execute(trainer):
                continue

            body, status = self._execute_command(
                trainer, command.name, command.request)
            command.set_response(trainer, status, body)
            is_updated = True

        if is_updated:
            CommandItem.dump_commands(commands, trainer.out)

    def finalize(self):
        if self._out != '':
            CommandsState.stop(self._out)

    def add_receiver(self, command_name, function):
        if command_name is None:
            raise ValueError('command name is not given')
        if not callable(function):
            raise ValueError('receiver is not callable')
        self._receivers[command_name] = function

    def _execute_command(self, trainer, command_name, request):
        receiver = self._receivers.get(command_name, None)
        if receiver is None:
            message = '%s command is not available or supported' % command_name
            response_body = {'message': message}
            response_status = CommandItem.RESPONSE_FAILURE
        else:
            try:
                response_body = receiver(trainer, request.get('body', None))
                response_status = CommandItem.RESPONSE_SUCCESS
            except Exception as e:
                print('catched execption from receiver:', e.args)
                response_body = None
                response_status = CommandItem.RESPONSE_FAILURE

        return response_body, response_status
