import logging
from threading import Thread
import time

import pytest

from chainerui.client.client import init as client_init
from chainerui.client.helper import urlopen
from chainerui.server import create_app


class MockServer(Thread):
    def __init__(self, host='localhost', port=5099):
        super().__init__()

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
        wait_limit = 10
        while wait_count <= wait_limit:
            res, msg = urlopen(
                'GET', self.url + 'test/check', content_type='plain/text',
                return_type='text')
            if msg == '':
                break
            time.sleep(0.1)
            wait_count += 1

    def _shutdown(self):
        from flask import request
        if 'werkzeug.server.shutdown' not in request.environ:
            raise 'Server has already shut down'

        request.environ['werkzeug.server.shutdown']()
        return 'Server is shutting down...'

    def shutdown(self):
        urlopen(
            'GET', self.url + 'test/shutdown', content_type='plain/text',
            return_type='text')
        self.join()

    def run(self):
        self.app.run(host=self.host, port=self.port)


class TestClient(object):

    @pytest.fixture(scope='function', autouse=True)
    def server(self, func_db):
        logging.getLogger('werkzeug').disabled = True

        server = MockServer(port=5099)
        server.start()
        server.wait_for_running()

        yield

        server.shutdown()

    def test_setup_project(self):
        client_init(url='http://localhost:5099/')
