import json
import os
import shutil
import tempfile
from datetime import datetime

from chainer.training import extension
from chainer.training import trigger as trigger_module
from chainer.serializers import npz
from chainer.training.extensions._snapshot import _snapshot_object

from chainer_ui.utils import is_jsonable


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
    for key, value in body.items():
        optimizer = trainer.updater.get_optimizer('main')
        setattr(optimizer, key, value)


class CommandsExtension(extension.Extension):

    STATUS_SUCCESS = 'SUCCESS'
    STATUS_FAILUE = 'FAILUE'

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
        commands_path = self._commands_path(trainer)
        if os.path.isfile(commands_path):
            os.remove(commands_path)

    def __call__(self, trainer):
        if not self._trigger(trainer):
            return

        commands = self._load_commands(trainer)

        isUpdated = False
        for command in commands:
            if not shouldExecute(trainer, command):
                continue

            response = self._execute_command(
                trainer, command['name'], command['request'])
            command['response'] = response
            isUpdated = True

        if isUpdated:
            self._write_commands(trainer, commands)

    def finalize(self):
        pass

    def add_receiver(self, command_name, function):
        if command_name is None:
            raise ValueError('command name is not given')
        if not callable(function):
            raise ValueError('receiver is not callable')
        self._receivers[command_name] = function

    def _execute_command(self, trainer, command_name, request):
        response = {
            'body': None
        }

        receiver = self._receivers.get(command_name, None)
        try:
            response_body = receiver(trainer, request.get('body', None))
        except Exception as e:
            print('catched execption from receiver:', e.args)
            response['status'] = self.STATUS_FAILUE
        else:
            response['status'] = self.STATUS_SUCCESS

        if is_jsonable(response_body):
            response['body'] = response_body
        response['epoch'] = trainer.updater.epoch
        response['iteration'] = trainer.updater.iteration
        response['elapsed_time'] = trainer.elapsed_time
        response['executed_at'] = datetime.now().isoformat()

        return response

    def _load_commands(self, trainer):
        commands_path = self._commands_path(trainer)
        commands = []

        if os.path.isfile(commands_path):
            with open(commands_path, 'r') as f:
                try:
                    commands = json.load(f)
                except json.decoder.JSONDecodeError as e:
                    pass

        return commands

    def _write_commands(self, trainer, commands):
        file_name = self._file_name

        fd, path = tempfile.mkstemp(prefix=file_name, dir=trainer.out)
        with os.fdopen(fd, 'w') as f:
            json.dump(commands, f, indent=4)

        new_path = self._commands_path(trainer)
        shutil.move(path, new_path)

    def _commands_path(self, trainer):
        return os.path.join(trainer.out, self._file_name)
