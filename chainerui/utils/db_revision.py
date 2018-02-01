import os

from alembic.command import revision
from alembic.config import Config
from alembic.migration import MigrationContext

from chainerui import _version
from chainerui import ENGINE
from chainerui import PACKAGE_DIR


def current_db_revision():
    ctx = MigrationContext.configure(ENGINE.connect())
    return ctx.get_current_revision()


def check_current_db_revision():
    current_rev = current_db_revision()
    if current_rev is None:
        return False

    module_rev = _version._db_revision
    if current_rev != module_rev:
        return False

    return True


def new_revision():
    ini_path = os.path.join(PACKAGE_DIR, 'alembic.ini')
    config = Config(ini_path)
    config.set_main_option(
        "script_location", os.path.join(PACKAGE_DIR, 'migration'))
    revision(config)
