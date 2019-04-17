import logging
from threading import Thread
import time

import pytest

from chainerui.client import client
from chainerui.client.helper import urlopen
from chainerui.server import create_app


class DummyServer(Thread):
    def __init__(self, host='localhost', port=5099):
        super(DummyServer, self).__init__()

        self.app = create_app()
        self.host = host
        self.port = port
        self.url = 'http://{:s}:{:d}/'.format(host, port)

        self.app.add_url_rule('/test/shutdown', view_func=self._shutdown)
        self.app.add_url_rule('/test/check', view_func=self._check)

    def _check(self):
        return 'Running'

    def wait_for_running(self):
        wait_count = 0
        wait_limit = 30  # wail until 3 second
        while wait_count <= wait_limit:
            res, msg = urlopen(
                'GET', self.url + 'test/check', content_type='plain/text',
                return_type='text')
            if msg == '':
                break
            time.sleep(0.1)
            wait_count += 1
        return wait_count <= wait_limit

    def _shutdown(self):
        from flask import request
        if 'werkzeug.server.shutdown' not in request.environ:
            return 'Server has already shut down'

        request.environ['werkzeug.server.shutdown']()
        return 'Server is shutting down...'

    def shutdown(self):
        urlopen(
            'GET', self.url + 'test/shutdown', content_type='plain/text',
            return_type='text')
        self.join()

    def run(self):
        self.app.run(host=self.host, port=self.port)


@pytest.fixture(scope='function')
def server(func_db):
    logging.getLogger('werkzeug').disabled = True

    server = DummyServer(port=5099)
    server.start()
    assert server.wait_for_running(), 'cannot start test server'

    yield server

    server.shutdown()


def test_client_init_default(server):
    client.init(server.url)

    assert client._client.project_id == 1
    assert client._client.result_id == 1

    reporter = client.log_reporter()
    reporter({'loss': 0.001})


def test_client_init_no_server(server):
    server.shutdown()
    client.init(server.url)

    assert client._client is None

    reporter = client.log_reporter()
    reporter({'loss': 0.001})  # fail to make client but no error


class TestClient(object):

    @pytest.fixture(scope='function')
    def cli(self, server):
        return client.Client(server.url)

    def test_setup_project(self, cli):
        assert cli.setup_project()

        assert cli.project_id == 1

        cli.project_name = 'Unit Test 2'
        assert cli.setup_project()
        assert cli.project_id == 1  # not register new project

    def test_register_result(self, cli):
        assert not cli.register_result()
        assert cli.setup_project()

        assert cli.register_result()
        assert cli.result_id == 1

        assert cli.register_result()
        assert cli.result_id == 2

        assert cli.register_result(result_name='result 1')
        assert cli.result_id == 3

    def test_register_result_overwrite(self, cli):
        assert cli.setup_project()

        assert cli.register_result(overwrite_result=True)
        assert cli.result_id == 1

        assert cli.register_result(overwrite_result=True)
        assert cli.result_id == 1

        assert cli.register_result(
            result_name='result 1', overwrite_result=True)
        assert cli.result_id == 1

        assert cli.register_result(
            result_name='result 2', overwrite_result=True)
        assert cli.result_id == 1

    def test_post_log(self, cli):
        stats = {'loss': 0.001}
        cli.post_log([stats])
        assert len(cli.cached_logs) == 1

        assert cli.setup_project()
        assert cli.register_result()

        cli.post_log([stats])
        assert len(cli.cached_logs) == 0

    def test_post_args(self, cli):
        assert not cli.post_args({'condition1': 0})

        assert cli.setup_project()
        assert cli.register_result()

        assert cli.post_args({'condition1': 0})
