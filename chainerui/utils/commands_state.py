from enum import Enum
import json
import os
import shutil

from chainer import training

from chainerui.utils.command_item import CommandItem
from chainerui.utils.tempdir import tempdir


class JobStatus(Enum):
    INITIALIZED = 0
    RUNNING = 1
    STOPPED = 2
    NO_EXTENSION_ERROR = 3

    def __str__(self):
        return self.name.lower()


def _job_status_converter(o):
    if isinstance(o, JobStatus):
        return str(o)
    # pass other types to raise default exception


class CommandsState(object):

    _default_filename = '.chainerui_commands'

    @classmethod
    def run(cls, trainer):
        # NOTE: in future, optimizer information will add to command state,
        #       optimizer is set in trainer
        if isinstance(trainer, training.Trainer):
            out_path = trainer.out
        else:
            out_path = trainer
        state = cls._load(out_path, initialize=True)
        state['job_status'] = JobStatus.RUNNING
        cls._dump(out_path, state)

    @classmethod
    def stop(cls, out_path):
        state = cls._load(out_path, initialize=True)
        if state['job_status'] != JobStatus.STOPPED:
            state['job_status'] = JobStatus.STOPPED
            cls._dump(out_path, state)

    @classmethod
    def job_status(cls, out_path):
        state = cls._load(out_path)
        if state is None:
            if os.path.isfile(CommandItem.commands_path(out_path)):
                # NOTE: this constraint is for back compatibility <= v0.1.1
                #       it is possible that set CommandsExtension but
                #       '.chainerui_commands' is not found. If '.commands'
                #       is found, judge as 'STOPPED'
                cls.stop(out_path)
                return cls.job_status(out_path)
            return JobStatus.NO_EXTENSION_ERROR
        return state['job_status']

    @classmethod
    def _load(cls, out_path, initialize=False):
        file_path = os.path.join(out_path, cls._default_filename)

        if os.path.isfile(file_path):
            with open(file_path, 'r') as f:
                state = json.load(f)
            state['job_status'] = JobStatus[state['job_status'].upper()]
        else:
            if initialize:
                state = {
                    'job_status': JobStatus.INITIALIZED
                }
                try:
                    os.makedirs(out_path)
                except OSError:
                    pass
            else:
                state = None
        return state

    @classmethod
    def _dump(cls, out_path, state):
        with tempdir(prefix=cls._default_filename, dir=out_path) as tempd:
            path = os.path.join(tempd, 'dump.json')
            with open(path, 'w') as f:
                json.dump(state, f, indent=4, default=_job_status_converter)

            shutil.move(path, os.path.join(out_path, cls._default_filename))
