from datetime import datetime
import json
import os
import shutil

from chainerui.models.command import Command
from chainerui.utils.is_jsonable import is_jsonable
from chainerui.utils.tempdir import tempdir


class CommandItem(object):

    REQUEST_OPEN = 'OPEN'
    RESPONSE_SUCCESS = 'SUCCESS'
    RESPONSE_FAILURE = 'FAILURE'
    DEFAULT_FILE_NAME = 'commands'

    def __init__(self, **kwargs):
        self._name = kwargs.get('name', None)
        self._request = kwargs.get('request', None)
        self._response = kwargs.get('response', None)

    @property
    def name(self):
        return self._name

    @property
    def request(self):
        return self._request

    @property
    def response(self):
        return self._response

    @property
    def request_body(self):
        if self._request is None:
            return None
        return self._request.get('body', None)

    @property
    def response_body(self):
        if self._response is None:
            return None
        return self._response.get('body', None)

    def set_request(self, request_status, request_body, schedule):
        request = {
            'created_at': datetime.now().isoformat(),
            'status': request_status
        }

        if is_jsonable(request_body):
            request['body'] = request_body
        else:
            request['body'] = None

        if self.is_valid_schedule(schedule):
            request['schedule'] = schedule
        else:
            request['schedule'] = None

        self._request = request
        return request

    def set_response(self, trainer, response_status, response_body):
        response = {
            'executed_at': datetime.now().isoformat(),
            'epoch': trainer.updater.epoch,
            'iteration': trainer.updater.iteration,
            'elapsed_time': trainer.elapsed_time,
            'status': response_status
        }

        if not is_jsonable(response_body):
            response['body'] = None
        else:
            response['body'] = response_body

        self._response = response
        return response

    def should_execute(self, trainer):
        if self._response is not None:
            # already executed
            return False

        request = self._request
        if request is None:
            return False

        schedule = request.get('schedule', None)
        if schedule is not None:
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

    @classmethod
    def is_valid_schedule(cls, schedule):
        if schedule is None:
            return True
        if schedule.get('key', None) in ['epoch', 'iteration'] \
                and isinstance(schedule.get('value', None), int):
            return True
        return False

    @classmethod
    def commands_path(cls, result_path, file_name=DEFAULT_FILE_NAME):
        return os.path.join(os.path.abspath(result_path), file_name)

    @classmethod
    def remove_commands_file(cls, result_path, file_name=DEFAULT_FILE_NAME):
        commands_path = cls.commands_path(result_path, file_name)
        if os.path.isfile(commands_path):
            os.remove(commands_path)

    @classmethod
    def load_commands(cls, result_path, file_name=DEFAULT_FILE_NAME):
        commands_path = cls.commands_path(result_path, file_name)
        commands = []

        if os.path.isfile(commands_path):
            with open(commands_path, 'r') as f:
                try:
                    commands = json.load(f)
                except json.decoder.JSONDecodeError:
                    pass

        return list(map(lambda cmd: cls(**cmd), commands))

    @classmethod
    def dump_commands(cls, commands, result_path, file_name=DEFAULT_FILE_NAME):
        commands_path = cls.commands_path(result_path, file_name)

        with tempdir(prefix=file_name, dir=result_path) as tempd:
            path = os.path.join(tempd, 'dump_commands.json')
            with open(path, 'w') as f:
                json.dump(list(map(lambda cmd: cmd.to_dict(), commands)),
                          f, indent=4)

            shutil.move(path, commands_path)

    def to_dict(self):
        return {
            'name': self._name,
            'request': self._request,
            'response': self._response
        }

    def to_model(self):
        return Command(
            name=self._name,
            request=self._request,
            response=self._response
        )
