from ignite.contrib.handlers.base_logger import BaseLogger
from ignite.contrib.handlers.base_logger import BaseOutputHandler
from ignite.engine import Events

import chainerui
from chainerui.utils.log_report import _get_time


class OutputHandler(BaseOutputHandler):
    """Handler for ChainerUI logger

    A helper for handler to log engine's output, specialized for ChainerUI.
    This handler sets 'epoch', 'iteration' and 'elapsed_time' automatically,
    these are default x axis to show.

    .. code-block:: python

        from chainerui.contrib.ignite.handler import OutputHandler
        train_handler = OutputHandler(
            'train', output_transform=lambda o: {'param': o})
        val_handler = OutputHandler('val', metric_names='all')

    Args:
        tag (str): use for a prefix of parameter name, will show as
            {tag}/{param}
        metric_names (str or list): keys names of ``list`` to monitor. set
            ``'all'`` to get all metrics monitored by the engine.
        output_transform (func): if set, use this function to convert output
            from ``engine.state.output``
        another_engine (``ignite.engine.Engine``): if set, use for getting
            global step. This option is deprecated from 0.3.
        global_step_transform (func): if set, use this to get global step.
        interval_step (int): interval step for posting metrics to ChainerUI
            server.
    """

    def __init__(
            self, tag, metric_names=None, output_transform=None,
            another_engine=None, global_step_transform=None, interval_step=-1):
        super(OutputHandler, self).__init__(
            tag, metric_names, output_transform, another_engine,
            global_step_transform)
        self.interval = interval_step

    def __call__(self, engine, logger, event_name):
        if not isinstance(logger, ChainerUILogger):
            raise RuntimeError(
                '`chainerui.contrib.ignite.handler.OutputHandler` works only '
                'with ChainerUILogger, but set {}'.format(type(logger)))

        metrics = self._setup_output_metrics(engine)
        if not metrics:
            return
        iteration = self.global_step_transform(
            engine, Events.ITERATION_COMPLETED)
        epoch = self.global_step_transform(engine, Events.EPOCH_COMPLETED)

        # convert metrics name
        rendered_metrics = {}
        for k, v in metrics.items():
            rendered_metrics['{}/{}'.format(self.tag, k)] = v
        rendered_metrics['iteration'] = iteration
        rendered_metrics['epoch'] = epoch
        if 'elapsed_time' not in rendered_metrics:
            rendered_metrics['elapsed_time'] = _get_time() - logger.start_at

        if self.interval <= 1:
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
    """Logger handler for ChainerUI

    A helper logger to post metrics to ChainerUI server. Attached handlers
    are expected using ``chainerui.contrib.ignite.handler.OutputHandler``.
    A tag name of handler must be unique when attach several handlers.

    .. code-block:: python

        from chainerui.contrib.ignite.handler import OutputHandler
        train_handler = OutputHandler(...)
        val_handler = OutputHandler(...)

        from ignite.engine.engine import Engine
        train_engine = Engine(...)
        eval_engine = Engine(...)

        from chainerui.contrib.ignite.handler import ChainerUILogger
        logger = ChainerUILogger()
        logger.attach(
            train_engine, log_handler=train_handler,
            event_name=Events.EPOCH_COMPLETED)
        logger.attach(
            eval_engine, log_handler=val_handler,
            event_name=Event.EPOCH_COMPLETED)
    """

    def __init__(self):
        web_client = chainerui.client.client._client
        if not web_client:
            raise RuntimeError(
                'fail to setup ChainerUI logger, please check '
                '`chainerui.init()` is success to execute.')

        self.attached_tags = set()
        self.client = web_client
        self.cache = {}  # key is tag name, value is list of metrics
        self.start_at = _get_time()

    def attach(self, engine, log_handler, event_name):
        if log_handler.tag in self.attached_tags:
            raise RuntimeError('attached handlers must have unique tag name')
        self.attached_tags.add(log_handler.tag)
        super(ChainerUILogger, self).attach(engine, log_handler, event_name)

    def post_log(self, metrics):
        self.client.post_log(metrics)

    def __enter__(self):
        # overwrite start timestamp when engine is used with 'with' block
        self.start_at = _get_time()
        super(ChainerUILogger, self).__enter__()

    def close(self):
        for k, v in self.cache.items():
            if v:
                self.post_log(v)
