# -*- coding: utf-8 -*-

''' args report extension for chainer '''

import json
import os
import tempfile
import shutil

from chainer.training import extension
from chainer.training import trigger as trigger_module

class ArgsReport(extension.Extension):
    ''' ArgsReport '''
    def __init__(self, args, trigger=(1, 'epoch'), log_name='args'):
        self._log_name = log_name
        self._trigger = trigger_module.get_trigger(trigger)
        self._args = vars(args)

    def __call__(self, trainer):
        if self._log_name is not None:
            log_name = self._log_name
            fd, path = tempfile.mkstemp(prefix=log_name, dir=trainer.out)
            with os.fdopen(fd, 'w') as f:
                json.dump(self._args, f, indent=4)

            new_path = os.path.join(trainer.out, log_name)
            shutil.move(path, new_path)
