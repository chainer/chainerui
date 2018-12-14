import os

import pytest

from tests.conftest import TempDirTestCase


class TestDataBase(TempDirTestCase):

    @pytest.fixture(autouse=True, scope='function')
    def set_test_root(self):
        os.environ['CHAINERUI_ROOT'] = self.dir

        yield

        # db module is global, required initialize after testing
        from chainerui.database import db
        if db._session is not None:
            db.session.remove()
        db.remove_db()

    def test_init_db_duplicated(self):
        from chainerui.database import db

        chainerui_db_dir = os.path.join(self.dir, 'db')
        db.init_db()
        assert os.path.exists(chainerui_db_dir)

        # if the database directory has already created, not occur errors
        db.init_db()
        assert os.path.exists(chainerui_db_dir)

    def test_setup_default_db(self):
        from chainerui.database import db
        db.init_db()
        assert db.setup(url=None)

        assert db._initialized
        assert db.url == 'sqlite:///' + os.path.join(
            self.dir, 'db', 'chainerui.db')
        assert db.engine is not None
        assert db.session is not None
        assert db.alembic_config is not None

    def test_setup_external_db_file(self):
        from chainerui.database import db
        db_dir = os.path.join(self.dir, 'exdb')
        os.makedirs(db_dir)
        db_url = 'sqlite:///' + os.path.join(db_dir, 'sqlite.db')
        assert db.setup(url=db_url)

        assert db._initialized
        assert db.url == db_url
        assert db.engine is not None
        assert db.session is not None
        assert db.alembic_config is not None

    def test_setup_import_error(self):
        try:
            import fdb  # NOQA
            pytest.skip(
                'expected that fdb is not installed on testing environment')
        except (ImportError, TypeError):
            pass

        from chainerui.database import db
        db_url = 'firebird+fdb://user:password@host:3050/path/to/db'
        assert not db.setup(url=db_url)

        assert not db._initialized
        with pytest.raises(ValueError) as e:
            db.url
        assert 'DB URL' in str(e.value)
        with pytest.raises(ValueError) as e:
            db.engine
        assert 'database engine' in str(e.value)
        with pytest.raises(ValueError) as e:
            db.session
        assert 'database session' in str(e.value)
        with pytest.raises(ValueError) as e:
            db.alembic_config
        assert 'migration configuration' in str(e.value)

    def test_setup_not_init_error(self):
        from chainerui.database import db
        assert not db.setup(url=None)

        assert not db._initialized
        with pytest.raises(ValueError) as e:
            db.url
        assert 'DB URL' in str(e.value)
        with pytest.raises(ValueError) as e:
            db.engine
        assert 'database engine' in str(e.value)
        with pytest.raises(ValueError) as e:
            db.session
        assert 'database session' in str(e.value)
        with pytest.raises(ValueError) as e:
            db.alembic_config
        assert 'migration configuration' in str(e.value)

    def test_setup_connection_error(self):
        from chainerui.database import db
        db_dir = os.path.join(self.dir, 'not_exist')
        db_url = 'sqlite:///' + os.path.join(db_dir, 'sqlite.db')
        assert not db.setup(url=db_url)

        assert not db._initialized
        with pytest.raises(ValueError) as e:
            db.url
        assert 'DB URL' in str(e.value)
        with pytest.raises(ValueError) as e:
            db.engine
        assert 'database engine' in str(e.value)
        with pytest.raises(ValueError) as e:
            db.session
        assert 'database session' in str(e.value)
        with pytest.raises(ValueError) as e:
            db.alembic_config
        assert 'migration configuration' in str(e.value)
