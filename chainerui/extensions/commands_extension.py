from chainer.serializers import npz
from chainer.training import extension
from chainer.training.extensions._snapshot import _snapshot_object
from chainer.training import trigger as trigger_module
import six

from chainerui.utils.command_item import CommandItem


def shouldExecute(trainer, command):
    if 'response' in command:
        # already executed
        return False
    request = command.get('request', {})
    if 'schedule' in request:
        schedule = request['schedule']
        if schedule['key'] == 'epoch':
            if trainer.updater.epoch != schedule['value']:
                return False
        elif schedule['key'] == 'iteration':
            if trainer.updater.iteration != schedule['value']:
                return False
        else:
            # invalid schedule key
            return False
    return True


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
            continue
        setattr(hyperparam, key, value)
    return {
        'optimizer': optimizer_name,
        'hyperparam': hyperparam.get_dict()
    }


class CommandsExtension(extension.Extension):

    priority = extension.PRIORITY_READER
    default_receivers = {
        'take_snapshot': take_snapshot,
        'adjust_hyperparams': adjust_hyperparams
    }

    def __init__(self, trigger=(1, 'iteration'), receivers={},
                 file_name='commands'):
        self._trigger = trigger_module.get_trigger(trigger)
        self._file_name = file_name

        self._receivers = self.default_receivers.copy()
        self._receivers.update(receivers)

    def initialize(self, trainer):
        CommandItem.remove_commands_file(trainer.out)

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
        pass

    def add_receiver(self, command_name, function):
        if command_name is None:
            raise ValueError('command name is not given')
        if not callable(function):
            raise ValueError('receiver is not callable')
        self._receivers[command_name] = function

    def _execute_command(self, trainer, command_name, request):
        receiver = self._receivers.get(command_name, None)
        try:
            response_body = receiver(trainer, request.get('body', None))
            response_status = CommandItem.RESPONSE_SUCCESS
        except Exception as e:
            print('catched execption from receiver:', e.args)
            response_body = None
            response_status = CommandItem.RESPONSE_FAILUE

        return response_body, response_status
