from chainerui.logging import get_logger


def test_get_logger_with_pytest_default(caplog):
    import logging
    caplog.set_level(logging.INFO)

    # other test suite has already called chainerui.logger, so need to reset
    # library logger
    import chainerui.logging as logging_util
    logging_util._logger = None
    logger = get_logger()

    logger.error('error')
    logger.info('info')
    logger.debug('debug')

    texts = caplog.text
    assert "{'event': 'error'}" in texts
    assert "{'event': 'info'}" in texts
    assert 'debug' not in texts


def test_get_logger_with_own_handler(capsys):
    # reset pytest logging capture
    import logging
    root_logger = logging.getLogger()
    if root_logger.handlers:
        for handler in root_logger.handlers:
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
