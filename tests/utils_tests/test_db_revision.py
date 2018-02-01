import os
import unittest

from alembic.command import upgrade

from chainerui import CHAINERUI_ENV
from chainerui import create_db
from chainerui import DB_FILE_PATH
from chainerui import setup_db_revision_config
from chainerui import upgrade_db
from chainerui.utils.db_revision import check_current_db_revision

from tests.helpers import NotInTestEnvironmentException


class DBRevision(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        if not CHAINERUI_ENV == 'test':
            raise NotInTestEnvironmentException(
                'set environment variable CHAINERUI_ENV=test '
                'when you run this test'
            )

    @classmethod
    def tearDownClass(cls):
        if os.path.exists(DB_FILE_PATH):
            os.remove(DB_FILE_PATH)

    def _upgrade(self):
        config = setup_db_revision_config()
        upgrade(config, '213e2a3392f2')  # = init revision

    def test_check_current_db_revision(self):
        assert not check_current_db_revision()

        create_db()
        assert not check_current_db_revision()

        self._upgrade()
        assert not check_current_db_revision()

        upgrade_db()
        assert check_current_db_revision()
