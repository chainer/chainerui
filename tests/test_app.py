from mock import MagicMock
from mock import patch
import os

import pytest

from chainerui import app
from chainerui import db
from chainerui.models.project import Project


@pytest.fixture(autouse=True, scope='function')
def db_url(func_dir):
    db_path = os.path.join(func_dir, 'test_app.db')
    db_url = 'sqlite:///' + db_path
    yield(db_url)

    if db._session is not None:
        db.session.remove()
    db.remove_db()


def test_server_debug(db_url):
    args = app.create_parser().parse_args(
        ['--db', db_url, '--db-echo', 'server', '-H', 'test.domain', '-p',
         '5001', '-d'])
    assert args.host == 'test.domain'
    assert args.port == 5001
    assert args.debug
    assert args.db == db_url
    assert args.db_echo

    mock_app = MagicMock()
    mock_app_creator = MagicMock(return_value=mock_app)
    with patch('werkzeug.serving.run_simple', MagicMock()) as f, \
            patch('chainerui.app.create_app', mock_app_creator):
        args.handler(args)
        f.assert_not_called()

        db.upgrade()
        args.handler(args)
        f.assert_called_once()
        f.assert_called_with(
            'test.domain', 5001, mock_app, use_reloader=True,
            use_debugger=True, threaded=True)


def test_server_production(db_url):
    args = app.create_parser().parse_args(
        ['--db', db_url, 'server', '-H', 'test.domain', '-p', '5001'])
    assert args.host == 'test.domain'
    assert args.port == 5001
    assert not args.debug
    assert args.db == db_url
    assert not args.db_echo

    mock_app = MagicMock()
    mock_app_creator = MagicMock(return_value=mock_app)
    mock_server = MagicMock()
    mock_server_init = MagicMock(return_value=mock_server)
    with patch('gevent.pywsgi.WSGIServer', mock_server_init), \
            patch('chainerui.app.create_app', mock_app_creator):
        args.handler(args)
        mock_server.serve_forever.assert_not_called()

        db.upgrade()
        args.handler(args)
        mock_server.serve_forever.assert_called_once()


def test_project_create(func_dir, db_url):
    args = app.create_parser().parse_args(
        ['--db', db_url, 'project', 'create', '-d', func_dir, '-n', 'test'])
    assert args.project_dir == func_dir
    assert args.project_name == 'test'
    assert args.db == db_url

    args.handler(args)
    db.upgrade()
    p = db.session.query(Project).filter_by(path_name=func_dir).first()
    assert p is None
    # on Windows/Python2, another session is create, need to remove
    # this session externally (*)
    db._session.remove()

    args.handler(args)
    p = db.session.query(Project).filter_by(path_name=func_dir).first()
    assert p is not None
    assert p.path_name == func_dir
    assert p.name == 'test'
    db._session.remove()  # same as (*)

    args.handler(args)  # already registered, confirm not occur error
    ps = db.session.query(Project).filter_by(path_name=func_dir).all()
    assert len(ps) == 1


def test_db_create(db_url):
    args = app.create_parser().parse_args(['--db', db_url, 'db', 'create'])
    assert args.type == 'create'
    assert args.db == db_url
    args.handler(args)
    assert os.path.isdir(db._sqlite_default_db_dir())
    assert not db._initialized


def test_db_status(db_url):
    args = app.create_parser().parse_args(['--db', db_url, 'db', 'status'])
    assert args.type == 'status'
    assert args.db == db_url
    args.handler(args)
    assert db._initialized
    assert db._external_db


def test_db_upgrade_drop(db_url):
    args = app.create_parser().parse_args(['--db', db_url, 'db', 'upgrade'])
    assert args.type == 'upgrade'
    assert args.db == db_url
    args.handler(args)
    assert db._initialized
    assert db._external_db

    args = app.create_parser().parse_args(
        ['--db', db_url, 'db', 'drop'])
    assert args.type == 'drop'
    assert args.db == db_url
    args.handler(args)
    assert not db._initialized
    assert not db._external_db


def test_db_revision(db_url):
    args = app.create_parser().parse_args(['--db', db_url, 'db', 'revision'])
    assert args.type == 'revision'
    assert args.db == db_url
    with patch('chainerui.app.db_revision.new_revision') as f:
        args.handler(args)
        assert f.called
    assert db._initialized
    assert db._external_db
