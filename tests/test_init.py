from mock import MagicMock

import pytest
from six import string_types
from sqlalchemy.exc import OperationalError

from chainerui import db
from tests.helpers import assert_json_api


@pytest.fixture(autouse=True, scope='function')
def setup_mock_db():
    # not setup database
    db._initialized = True
    mock_session = MagicMock()
    mock_session.query = MagicMock(
        side_effect=OperationalError(None, None, None))
    db._session = mock_session


# GET /
def test_get_index(app):
    resp = app.get('/')
    assert resp.status_code == 200
    assert '<title>ChainerUI</title>' in resp.data.decode()


# GET /favicon.ico
def test_get_favicon(app):
    resp = app.get('/favicon.ico')
    assert resp.status_code == 200


# raise an exception when GET /api/v1/projects
def test_handle_invalid_usage(app):
    resp = app.get('/api/v1/projects')
    data = assert_json_api(resp, 400)
    assert len(data) == 1
    assert len(data['error']) == 2
    assert isinstance(data['error']['message'], string_types)
    assert 'DBOperationalError' == data['error']['type']
