from alembic.command import revision
from alembic.migration import MigrationContext
from alembic.script import ScriptDirectory

from chainerui import db


def current_db_revision():
    ctx = MigrationContext.configure(db.engine.connect())
    return ctx.get_current_revision()


def check_current_db_revision():
    current_rev = current_db_revision()
    if current_rev is None:
        return False

    config = db.alembic_config
    script = ScriptDirectory.from_config(config)
    module_rev = script.get_current_head()
    if current_rev != module_rev:
        return False

    return True


def new_revision():
    config = db.alembic_config
    revision(config)
