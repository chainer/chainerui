import unittest

from alembic.command import upgrade

from chainerui import CHAINERUI_ENV
from chainerui import db
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
        db.init_db()
        db.setup(test_mode=True)

    @classmethod
    def tearDownClass(cls):
        db.session.remove()
        db.remove_db()

    def _upgrade(self):
        config = db.alembic_config
        upgrade(config, '213e2a3392f2')  # = init revision

    def test_check_current_db_revision(self):
        assert not check_current_db_revision()

        self._upgrade()
        assert not check_current_db_revision()

        db.upgrade()
        assert check_current_db_revision()
