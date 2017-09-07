import json
import os
import shutil
import tempfile
from datetime import datetime

from chainer.training.extension import Extension
from chainer.training import trigger as trigger_module


class CommandsExtension(Extension):

    def __init__(self, trigger=Extension.trigger, priority=Extension.priority, file_name='commands'):
        self._trigger = trigger_module.get_trigger(trigger)
        self._priority = priority
        self._file_name = file_name

        self._receivers = {}

    def initialize(self, trainer):
        commands_path = self._commands_path(trainer)
        if os.path.isfile(commands_path):
            os.remove(commands_path)

    def __call__(self, trainer):
        if not self._trigger(trainer):
            return

        commands = self._load_commands(trainer)

        for command in commands:
            if ('executed_at' in command) and (command['executed_at'] is not None):
                # already executed
                continue
            if command['name'] not in self._receivers:
                continue
            receiver = self._receivers[command['name']]
            command_body = command['body']
            command['executed_at'] = datetime.now().isoformat()
            try:
                receiver(trainer, command_body)
            except Exception as e:
                print ('catched execption from receiver:', e.args)

        self._write_commands(trainer, commands)

    def finalize(self):
        pass


    def add_receiver(self, command_name, receiver):
        if command_name is None:
            raise ValueError('command name is not given')
        if not callable(receiver):
            raise ValueError('receiver is not callable')
        self._receivers[command_name] = receiver


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

