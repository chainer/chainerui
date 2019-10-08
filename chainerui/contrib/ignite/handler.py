from ignite.contrib.handlers.base_logger import BaseLogger
from ignite.contrib.handlers.base_logger import BaseOutputHandler

import chainerui


class OutputHandler(BaseOutputHandler):
    """Handler for ChainerUI
    """
    def __init__(
            self, tag, metric_names=None, output_transform=None,
            another_engine=None, global_step_transform=None,
            interval=-1, validation_mode=False):
        super(OutputHandler, self).__init__(
            tag, metric_names, output_transform, another_engine,
            global_step_transform)
        self.interval = interval
        self.validation_mode = validation_mode

    def __call__(self, engine, logger, event_name):
        if not isinstance(logger, ChainerUILogger):
            raise RuntimeError(
                '`chainerui.contrib.ignite.handler.OutputHandler` works only '
                'with ChainerUILogger')

        metrics = self._setup_output_metrics(engine)
        if not metrics:
            return
        iteration = engine.state.iteration
        epoch = engine.state.epoch

        # convert metrics name
        rendered_metrics = {}
        for k, v in metrics.items():
            rendered_metrics['{}/{}'.format(self.tag, k)] = v
        if not self.validation_mode:
            logger.previous_count['iteration'] = iteration
            logger.previous_count['epoch'] = epoch
            rendered_metrics['iteration'] = iteration
            rendered_metrics['epoch'] = epoch
        else:
            rendered_metrics['iteration'] = logger.previous_count['iteration']
            rendered_metrics['epoch'] = logger.previous_count['epoch']

        if self.interval <= 0:
            logger.post_log([rendered_metrics])
            return

        # enable interval, cache metrics
        logger.cache.setdefault(self.tag, []).append(rendered_metrics)
        # select appropriate even set by handler init
        global_count = self.global_step_transform(engine, event_name)
        if global_count % self.interval == 0:
            logger.post_log(logger.cache[self.tag])
            logger.cache[self.tag].clear()


class ChainerUILogger(BaseLogger):
    def __init__(self):
        web_client = chainerui.client.client._client
        if not web_client:
            raise RuntimeError(
                'fail to setup ChainerUI logger, please check '
                '`chainerui.init()` is success to execute.')

        self.attached_tags = set()
        self.client = web_client
        self.cache = {}  # key is tag name, value is list of metrics
        self.previous_count = {}

    def attach(self, engine, log_handler, event_name):
        if log_handler.tag in self.attached_tags:
            raise RuntimeError('attached handlers must have unique tag name')
        self.attached_tags.add(log_handler.tag)
        super(ChainerUILogger, self).attach(engine, log_handler, event_name)

    def post_log(self, metrics):
        self.client.post_log(metrics)

    def close(self):
        for k, v in self.cache.items():
            if v:
                self.post_log(v)
