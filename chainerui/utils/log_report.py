import json
import os
import shutil
import tempfile

from chainer.training.trainer import _get_time

from chainerui.utils.save_args import save_args


class LogReport(object):

    """Util class to output 'log' file.

    This class supports to output 'log' file. The file spec follows
    :class:`chainer.extensions.LogReport`, however, 'epoch' and 'iteration'
    are not set automatically, and need to set these values.

    Args:
        out_path (str): Output directory name to save conditions.
        conditions (:class:`argparse.Namespace` or dict): Experiment conditions
            to show on a job table. Keys are show as table header and values
            are show at a job row.
        elapsed_time_flag (bool): This class calculates elapsed time
            automatically. The measurement starts when call as new instance.
            If a target train loop has original elapsed time, then set the
            flag as `False` and set the time manually.

    """

    def __init__(self, out_path, conditions=None, elapsed_time_flag=True):
        self._out_path = out_path
        self._log_name = 'log'
        self._log = []
        self._start_at = None

        if conditions is not None:
            # if not exist the path, `save_args` makes it
            save_args(conditions, out_path)
        if elapsed_time_flag:
            self._start_at = _get_time()

    def __call__(self, stats):
        if self._start_at is not None:
            stats['elapsed_time'] = _get_time() - self._start_at
        self._log.append(stats)

        fd, path = tempfile.mkstemp(prefix=self._log_name, dir=self._out_path)
        with os.fdopen(fd, 'w') as f:
            json.dump(self._log, f, indent=4)

        new_path = os.path.join(self._out_path, self._log_name)
        shutil.move(path, new_path)
