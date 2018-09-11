from mock import MagicMock
import unittest

from six import string_types
from sqlalchemy.exc import OperationalError

from chainerui import CHAINERUI_ENV
from chainerui import create_app
from chainerui import db
from tests.helpers import assert_json_api
from tests.helpers import NotInTestEnvironmentException


class TestInit(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        if not CHAINERUI_ENV == 'test':
            raise NotInTestEnvironmentException(
                'set environment variable CHAINERUI_ENV=test '
                'when you run this test'
            )

    def setUp(self):
        # not setup database
        db._initialized = True
        mock_session = MagicMock()
        mock_session.query = MagicMock(
            side_effect=OperationalError(None, None, None))
        db._session = mock_session

        app = create_app()
        app.testing = True
        self.app = app.test_client()

    # GET /
    def test_get_index(self):
        resp = self.app.get('/')
        assert resp.status_code == 200
        assert '<title>ChainerUI</title>' in resp.data.decode()

    # GET /favicon.ico
    def test_get_favicon(self):
        resp = self.app.get('/favicon.ico')
        assert resp.status_code == 200

    # raise an exception when GET /api/v1/projects
    def test_handle_invalid_usage(self):
        resp = self.app.get('/api/v1/projects')
        data = assert_json_api(resp, 400)
        assert len(data) == 1
        assert len(data['error']) == 2
        assert isinstance(data['error']['message'], string_types)
        assert 'DBOperationalError' == data['error']['type']
