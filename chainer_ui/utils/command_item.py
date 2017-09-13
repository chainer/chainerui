''' command_item.py '''

import json
import os
import shutil
import tempfile
from datetime import datetime

from is_jsonable import is_jsonable


class CommmandItem:

    def __init__(self, name=None, request=None, response=None):
        self.from_dict({
            'name': name,
            'request': request,
            'response': response
        })

    @property
    def name(self):
        return self._name

    @property
    def request(self):
        return self._request

    @property
    def response(self):
        return self._response

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

    @staticmethod
    def load(path):
        pass

    @staticmethod
    def dump(path):
        pass

    def from_dict(self, command_dict):
        self._name = command_dict.get('name', None)
        self._request = command_dict.get('request', None)
        self._response = command_dict.get('response', None)
        return self

    def to_dict(self):
        return {
            'name': self._name,
            'request': self._request,
            'response': self._response
        }
