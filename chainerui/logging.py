from __future__ import absolute_import

import logging
import threading

import structlog


_mutex = threading.Lock()
_logger = None


def _get_library_logger():
    return logging.getLogger(__name__)


def set_loglevel(level):
    _get_library_logger().setLevel(level)


def get_logger():
    global _logger

    with _mutex:
        if _logger is not None:
            return _logger
        structlog.configure(
            processors=[
                structlog.stdlib.ProcessorFormatter.wrap_for_formatter,
            ],
            logger_factory=structlog.stdlib.LoggerFactory(),
        )

        own_logger = _get_library_logger()
        if not logging.getLogger().handlers:
            # own hander is set only when python root logger is not setup
            formatter = structlog.stdlib.ProcessorFormatter(
                processor=structlog.dev.ConsoleRenderer(colors=False),
            )
            handler = logging.StreamHandler()
            handler.setFormatter(formatter)
            own_logger.addHandler(handler)

        own_logger.setLevel(logging.INFO)
        _logger = structlog.get_logger(__name__)
    return _logger


logger = get_logger()
