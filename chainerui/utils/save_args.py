import argparse
import json
import os
import shutil

from chainerui.utils.tempdir import tempdir


def save_args(conditions, out_path):
    """A util function to save experiment condition for job table.

    Args:
        conditions (:class:`argparse.Namespace` or dict): Experiment conditions
            to show on a job table. Keys are show as table header and values
            are show at a job row.
        out_path (str): Output directory name to save conditions.

    """

    if isinstance(conditions, argparse.Namespace):
        args = vars(conditions)
    else:
        args = conditions

    try:
        os.makedirs(out_path)
    except OSError:
        pass

    with tempdir(prefix='args', dir=out_path) as tempd:
        path = os.path.join(tempd, 'args.json')
        with open(path, 'w') as f:
            json.dump(args, f, indent=4)

        new_path = os.path.join(out_path, 'args')
        shutil.move(path, new_path)
