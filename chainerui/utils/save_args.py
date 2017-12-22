import argparse
import json
import os
import shutil
import tempfile


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
    args_dict = {k: str(v) for k, v in args.items()}

    try:
        os.makedirs(out_path)
    except OSError:
        pass
    fd, path = tempfile.mkstemp(prefix='args', dir=out_path)
    with os.fdopen(fd, 'w') as f:
        json.dump(args_dict, f, indent=4)

    new_path = os.path.join(out_path, 'args')
    shutil.move(path, new_path)
