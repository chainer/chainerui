from mock import MagicMock
from mock import patch
import os
import shutil
import tempfile
import unittest

from chainerui import app


def _return_true():
    return True


def _return_false():
    return False


class TestApp(unittest.TestCase):

    def setUp(self):
        self._dir = tempfile.mkdtemp(prefix='chainerui_test_app')

    def tearDown(self):
        if os.path.exists(self._dir):
            shutil.rmtree(self._dir)

    def test_server(self):
        args = app.create_parser().parse_args(
            ['server', '-H', 'test.domain', '-p', '5001', '-d'])
        assert args.host == 'test.domain'
        assert args.port == 5001
        assert args.debug

        mock_app = MagicMock()
        mock_app_creator = MagicMock(return_value=mock_app)

        with patch('chainerui.app.create_app', mock_app_creator) as f:
            with patch('chainerui.utils.db_revision.check_current_db_revision',
                       _return_false):
                args.handler(args)
                f.assert_not_called()

            with patch('chainerui.utils.db_revision.check_current_db_revision',
                       _return_true):
                args.handler(args)
                f.assert_called_once()
                mock_app.run.assert_called_with(
                    host='test.domain', port=5001, debug=True, threaded=True)

    def test_db(self):
        args = app.create_parser().parse_args(['db', 'create'])
        assert args.type == 'create'
        with patch('chainerui.app.create_db') as f:
            args.handler(args)
            assert f.called

        args = app.create_parser().parse_args(['db', 'status'])
        assert args.type == 'status'
        with patch('chainerui.utils.db_revision.current_db_revision') as f:
            args.handler(args)
            assert f.called

        args = app.create_parser().parse_args(['db', 'upgrade'])
        assert args.type == 'upgrade'
        with patch('chainerui.app.upgrade_db') as f:
            args.handler(args)
            assert f.called

        args = app.create_parser().parse_args(['db', 'revision'])
        assert args.type == 'revision'
        with patch('chainerui.utils.db_revision.new_revision') as f:
            args.handler(args)
            assert f.called

        args = app.create_parser().parse_args(['db', 'drop'])
        assert args.type == 'drop'
        db_path = os.path.join(self._dir, 'test.db')
        open(db_path, 'w').close()
        assert os.path.isfile(db_path)
        with patch('chainerui.app.DB_FILE_PATH', db_path):
            args.handler(args)
            assert not os.path.isfile(db_path)

    def test_project_create(self):
        args = app.create_parser().parse_args(
            ['project', 'create', '-d', self._dir, '-n', 'test'])
        assert args.project_dir == self._dir
        assert args.project_name == 'test'

        mock_session = MagicMock()
        with patch('chainerui.utils.db_revision.check_current_db_revision',
                   _return_false):
            args.handler(args)
            mock_session.query.assert_not_called()

        with patch('chainerui.utils.db_revision.check_current_db_revision',
                   _return_true):
            with patch('chainerui.app.DB_SESSION', mock_session):
                # session return mock project, not none test
                args.handler(args)

            mock_filter_by = MagicMock()
            mock_filter_by.first.return_value = None
            mock_query = MagicMock()
            mock_query.filter_by.return_value = mock_filter_by
            mock_session.query.return_value = mock_query
            with patch('chainerui.app.DB_SESSION', mock_session),\
                    patch('chainerui.app.Project') as p:
                args.handler(args)
                p.create.assert_called_with(self._dir, 'test')
