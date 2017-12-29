import json
import os
import shutil
import tempfile

from chainerui.utils.save_args import save_args


class LogReport(object):

    def __init__(self, out_path, conditions=None):
        self._out_path = out_path
        self._log_name = 'log'
        self._log = []

        if conditions is not None:
            # if not exist the path, `save_args` makes it
            save_args(conditions, out_path)

    def __call__(self, stats):
        self._log.append(stats)

        fd, path = tempfile.mkstemp(prefix=self._log_name, dir=self._out_path)
        with os.fdopen(fd, 'w') as f:
            json.dump(self._log, f, indent=4)

        new_path = os.path.join(self._out_path, self._log_name)
        shutil.move(path, new_path)
