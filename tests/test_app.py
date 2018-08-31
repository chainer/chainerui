from mock import MagicMock
from mock import patch
import os
import shutil
import tempfile
import unittest

from chainerui import app
from chainerui import db
from chainerui.models.project import Project
from chainerui import upgrade_db


class TestApp(unittest.TestCase):

    def setUp(self):
        temp_dir = tempfile.mkdtemp(prefix='chainerui_test_app_')
        self._dir = temp_dir
        self._db_path = os.path.join(temp_dir, 'test_app.db')
        self._db_url = 'sqlite:///' + self._db_path

    def tearDown(self):
        db.session.remove()
        if os.path.exists(self._dir):
            shutil.rmtree(self._dir)

    def test_server(self):
        args = app.create_parser().parse_args(
            ['--db', self._db_url, 'server', '-H', 'test.domain',
             '-p', '5001', '-d'])
        assert args.host == 'test.domain'
        assert args.port == 5001
        assert args.debug
        assert args.db == self._db_url

        mock_app = MagicMock()
        mock_app_creator = MagicMock(return_value=mock_app)

        with patch('chainerui.app.create_app', mock_app_creator) as f:
            args.handler(args)
            f.assert_not_called()

            upgrade_db()
            args.handler(args)
            f.assert_called_once()
            mock_app.run.assert_called_with(
                host='test.domain', port=5001, debug=True, threaded=True)

    def test_project_create(self):
        args = app.create_parser().parse_args(
            ['--db', self._db_url, 'project', 'create', '-d', self._dir,
             '-n', 'test'])
        assert args.project_dir == self._dir
        assert args.project_name == 'test'
        assert args.db == self._db_url

        args.handler(args)
        upgrade_db()
        p = db.session.query(Project).filter_by(path_name=self._dir).first()
        assert p is None

        args.handler(args)
        p = db.session.query(Project).filter_by(path_name=self._dir).first()
        assert p is not None
        assert p.path_name == self._dir
        assert p.name == 'test'

        args.handler(args)  # already registered, confirm not occur error
        ps = db.session.query(Project).filter_by(path_name=self._dir).all()
        assert len(ps) == 1

    def test_db(self):
        args = app.create_parser().parse_args(
            ['--db', self._db_url, 'db', 'create'])
        assert args.type == 'create'
        assert args.db == self._db_url
        args.handler(args)

        args = app.create_parser().parse_args(
            ['--db', self._db_url, 'db', 'status'])
        assert args.type == 'status'
        assert args.db == self._db_url
        args.handler(args)

        args = app.create_parser().parse_args(
            ['--db', self._db_url, 'db', 'upgrade'])
        assert args.type == 'upgrade'
        assert args.db == self._db_url
        args.handler(args)

        args = app.create_parser().parse_args(
            ['--db', self._db_url, 'db', 'revision'])
        assert args.type == 'revision'
        assert args.db == self._db_url
        with patch('chainerui.app.db_revision.new_revision') as f:
            args.handler(args)
            assert f.called

        args = app.create_parser().parse_args(
            ['--db', self._db_url, 'db', 'drop'])
        assert args.type == 'drop'
        assert args.db == self._db_url
        args.handler(args)
