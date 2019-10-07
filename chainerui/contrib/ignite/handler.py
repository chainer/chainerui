from ignite.contrib.handlers.base_logger import BaseLogger
from ignite.contrib.handlers.base_logger import BaseOutputHandler

import chainerui


class OutputHandler(BaseOutputHandler):
    """Handler for ChainerUI
    """
    def __init__(
            self, tag, metric_names=None, output_transform=None,
            another_engine=None, global_step_transform=None):
        super(OutputHandler, self).__init__(
            tag, metric_names, output_transform, another_engine,
            global_step_transform)

    def __call__(self, engine, logger, event_name):
        if not isinstance(logger, ChainerUILogger):
            # not stop learning loop
            return

        metrics = self._setup_output_metrics(engine)
        global_step = self.global_step_transform(engine, event_name)

        if not isinstance(global_step, int):
            return

        print(global_step)
        print(metrics)
        # logger.client.post_log(metrics)


class ChainerUILogger(BaseLogger):
    def __init__(self):
        if not chainerui.client._client:
            raise RuntimeError(
                'fail to setup ChainerUI logger, please check '
                '`chainerui.init()` is success to execute.')

        self.client = chainerui.client._client

    def post_log(self, metrics):
        self.post_log(metrics)
