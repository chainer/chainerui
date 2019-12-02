from mock import MagicMock

import pytest

try:
    from ignite.engine import Events

    _ignite_installed = True
except (ImportError, TypeError):
    _ignite_installed = False

import chainerui

if _ignite_installed:
    from chainerui.contrib.ignite.handler import ChainerUILogger
    from chainerui.contrib.ignite.handler import OutputHandler


@pytest.fixture(scope='function')
def client():
    prev_client = chainerui.client.client._client
    mock_client = MagicMock()
    chainerui.client.client._client = mock_client

    yield mock_client

    chainerui.client.client._client = prev_client


@pytest.mark.skipif(not _ignite_installed, reason='Ignite is not installed')
def test_not_init():
    with pytest.raises(RuntimeError) as e:
        ChainerUILogger()
    assert 'fail to setup ChainerUI' in str(e.value)


@pytest.mark.skipif(not _ignite_installed, reason='Ignite is not installed')
def test_not_chainerui_logger():
    handler = OutputHandler('test', metric_names='all')

    engine = MagicMock()

    from ignite.contrib.handlers.base_logger import BaseLogger
    logger = BaseLogger()

    with pytest.raises(RuntimeError) as e:
        handler(engine, logger, Events.STARTED)
    assert 'only with ChainerUILogger' in str(e.value)


@pytest.mark.skipif(not _ignite_installed, reason='Ignite is not installed')
def test_not_unique_handler(client):
    handler1 = OutputHandler('same_name', metric_names='all')
    handler2 = OutputHandler('same_name', metric_names='all')

    engine = MagicMock()

    logger = ChainerUILogger()
    logger.attach(engine, handler1, Events.STARTED)
    with pytest.raises(RuntimeError) as e:
        logger.attach(engine, handler2, Events.STARTED)
    assert 'unique tag name' in str(e.value)


@pytest.mark.skipif(not _ignite_installed, reason='Ignite is not installed')
def test_empty_metrics(client):
    handler = OutputHandler('test', metric_names='all')

    engine = MagicMock()
    engine.state.metrics = {}
    logger = ChainerUILogger()

    with logger:
        handler(engine, logger, Events.EPOCH_COMPLETED)
    client.post_log.assert_not_called()


@pytest.mark.skipif(not _ignite_installed, reason='Ignite is not installed')
def test_post_metrics(client):
    handler = OutputHandler('test', metric_names='all')

    metrics = {'loss': 0.1}
    engine = MagicMock()
    engine.state.metrics = metrics
    logger = ChainerUILogger()

    with logger:
        handler(engine, logger, Events.EPOCH_COMPLETED)
    client.post_log.assert_called_once()


@pytest.mark.skipif(not _ignite_installed, reason='Ignite is not installed')
def test_post_metrics_with_interval(client):

    def stepper(engine, event_name):
        engine.state.step += 1
        return engine.state.step

    handler = OutputHandler(
        'test', metric_names='all', interval_step=2,
        global_step_transform=stepper)

    metrics = {'loss': 0.1}
    engine = MagicMock()
    engine.state.step = 0
    engine.state.metrics = metrics
    logger = ChainerUILogger()

    with logger:
        handler(engine, logger, Events.EPOCH_COMPLETED)
        # metrics is cached and not posted them yet
        client.post_log.assert_not_called()
        assert 'test' in logger.cache
        assert len(logger.cache['test']) == 1

        handler(engine, logger, Events.EPOCH_COMPLETED)
        assert not logger.cache['test']
        client.post_log.assert_called_once()

        handler(engine, logger, Events.EPOCH_COMPLETED)
        assert len(logger.cache['test']) == 1
        client.post_log.assert_called_once()

    # remainder metrics are posted after logger exit
    assert client.post_log.call_count == 2
