from alembic.command import revision
from alembic.migration import MigrationContext
from alembic.script import ScriptDirectory

from chainerui import ENGINE
from chainerui import get_db_migration_config


def current_db_revision():
    ctx = MigrationContext.configure(ENGINE.connect())
    return ctx.get_current_revision()


def check_current_db_revision():
    current_rev = current_db_revision()
    if current_rev is None:
        return False

    config = get_db_migration_config()
    script = ScriptDirectory.from_config(config)
    module_rev = script.get_current_head()
    if current_rev != module_rev:
        return False

    return True


def new_revision():
    config = get_db_migration_config()
    revision(config)
