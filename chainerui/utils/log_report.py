import json
import os
import shutil

from chainer.training.trainer import _get_time

from chainerui.utils.save_args import save_args
from chainerui.utils.tempdir import tempdir


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

    """

    def __init__(self, out_path, conditions=None):
        self._out_path = out_path
        self._log_name = 'log'
        self._log = []
        self._start_at = _get_time()

        if conditions is not None:
            # if not exist the path, `save_args` makes it
            save_args(conditions, out_path)
        else:
            try:
                os.makedirs(out_path)
            except OSError:
                pass

    def __call__(self, stats):
        """Add training log.

        Args:
            stats (dict): Training log values. The object must be key-value
                style and values type must be `float` or `int`. When the object
                does not have 'elapsed_time' key, the function set the time
                automatically. The measurement starts when create new instance.
        """
        if 'elapsed_time' not in stats:
            stats['elapsed_time'] = _get_time() - self._start_at
        self._log.append(stats)

        with tempdir(prefix=self._log_name, dir=self._out_path) as tempd:
            path = os.path.join(tempd, 'log.json')
            with open(path, 'w') as f:
                json.dump(self._log, f, indent=4)

            new_path = os.path.join(self._out_path, self._log_name)
            shutil.move(path, new_path)
