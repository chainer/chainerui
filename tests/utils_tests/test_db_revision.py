from alembic.command import upgrade

from chainerui import db
from chainerui.utils.db_revision import check_current_db_revision


def _upgrade():
    config = db.alembic_config
    upgrade(config, '213e2a3392f2')  # = init revision


def test_check_current_db_revision(func_init_db):
    assert not check_current_db_revision()

    _upgrade()
    assert not check_current_db_revision()

    db.upgrade()
    assert check_current_db_revision()
