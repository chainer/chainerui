from chainerui.logging import _get_library_logger
from chainerui.logging import get_logger


def test_get_logger_with_pytest_default(caplog):
    # On flask 0.12.x, when remove flask's handler, local handler is also
    # no effect (not known exactly why?). Need to set caplog handler again.
    _get_library_logger().addHandler(caplog.handler)
    # caplog has already set on start unittest module
    import logging
    assert logging.getLogger().handlers

    # other test suite has already called chainerui.logger, so need to reset
    # library logger
    import chainerui.logging as logging_util
    logging_util._logger = None
    logger = get_logger()

    # When added caplog handler manually, caplog captures logging 2 times,
    # on root logger and on local logger. To prevent from this issue,
    # remove root handler manually after get local logger.
    root_logger = logging.getLogger()
    if root_logger.handlers:
        for handler in root_logger.handlers[:]:
            root_logger.removeHandler(handler)

    logger.error('error')
    logger.info('info')
    logger.debug('debug')

    assert len(caplog.records) == 2
    assert 'event' in caplog.records[0].message
    assert "error" in caplog.records[0].message
    assert 'event' in caplog.records[1].message
    assert 'info' in caplog.records[1].message

    logging_util.set_loglevel(logging.DEBUG)
    logger2 = get_logger()
    logger2.debug('debug')
    assert len(caplog.records) == 3
    assert 'event' in caplog.records[2].message
    assert 'debug' in caplog.records[2].message


def test_get_logger_with_own_handler(capsys):
    # reset pytest logging capture
    import logging
    root_logger = logging.getLogger()
    if root_logger.handlers:
        for handler in root_logger.handlers[:]:
            root_logger.removeHandler(handler)

    # other test suite has already called chainerui.logger, so need to reset
    # library logger
    import chainerui.logging as logging_util
    logging_util._logger = None
    logger = get_logger()

    logger.error('error')
    logger.info('info')
    logger.debug('debug')

    _, err = capsys.readouterr()
    assert 'event' not in err
    assert 'error' in err
    assert 'info' in err
    assert 'debug' not in err

    logging_util.set_loglevel(logging.DEBUG)
    logger.debug('debug')
    _, err2 = capsys.readouterr()
    assert 'debug' in err2
