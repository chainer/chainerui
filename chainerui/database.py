import errno
import os

from alembic.command import downgrade
from alembic.command import upgrade
from alembic.config import Config
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session
from sqlalchemy.orm import sessionmaker


BASE = declarative_base()
_PACKAGE_DIR = os.path.abspath(os.path.dirname(__file__))


class Database(object):

    def __init__(self):
        self._url = None
        self._initialized = False
        self._engine = None
        self._session = None
        self._external_db = False

        self._alembic_config = None
        self._sqlite_db_file_path = None

    def init_db(self):
        db_dir = self._sqlite_default_db_dir()
        try:
            os.makedirs(db_dir)
        except OSError as e:
            if e.errno == errno.EEXIST and os.path.isdir(db_dir):
                pass
            else:
                raise
        print('DB_FILE_PATH:', db_dir)

    def setup(self, url=None, test_mode=False, echo=False):
        if url is None:
            db_dir = self._sqlite_default_db_dir()
            db_file_name = 'chainerui_test.db' if test_mode else 'chainerui.db'
            db_path = os.path.join(db_dir, db_file_name)
            self._sqlite_db_file_path = db_path
            url = 'sqlite:///' + db_path
        else:
            self._external_db = True

        if not self._check():
            return False

        if url.startswith('sqlite'):
            connect_args = {'check_same_thread': False}
        else:
            connect_args = {}
        self._url = url

        engine = create_engine(
            url,
            convert_unicode=True,
            connect_args=connect_args,
            echo=echo
        )
        self._engine = engine
        self._session = scoped_session(
            sessionmaker(autocommit=False, autoflush=False, bind=engine)
        )
        self._initialized = True

        self._setup_alembic_config(url)

        return True

    def _setup_alembic_config(self, url):
        ini_path = os.path.join(_PACKAGE_DIR, 'alembic.ini')
        config = Config(ini_path)
        config.set_main_option(
            'script_location', os.path.join(_PACKAGE_DIR, 'migration'))
        config.set_main_option('url', url)
        self._alembic_config = config

    def _check(self):
        if not self._external_db:
            if not os.path.isdir(self._sqlite_default_db_dir()):
                print('DB is not initialized, please run \'create\' command '
                      'before')
                return False
        # TODO(disktnk): add ping, to check connetion with external DB
        return True

    def upgrade(self):
        upgrade(self.alembic_config, 'head')

    def downgrade(self):
        downgrade(self.alembic_config, 'base')

    def remove_db(self):
        if not self._external_db and self._sqlite_db_file_path is not None:
            if os.path.exists(self._sqlite_db_file_path):
                os.remove(self._sqlite_db_file_path)
        self.__init__()  # initialize all attribute

    def _sqlite_default_db_dir(self):
        root = os.path.abspath(
            os.path.expanduser(os.getenv('CHAINERUI_ROOT', '~/.chainerui')))
        return os.path.join(root, 'db')

    @property
    def url(self):
        if not self._initialized:
            raise ValueError('not setup DB URL')
        return self._url

    @property
    def engine(self):
        if not self._initialized:
            raise ValueError('not setup database engine')
        return self._engine

    @property
    def session(self):
        if not self._initialized:
            raise ValueError('not setup database session')
        return self._session

    @property
    def alembic_config(self):
        if not self._initialized:
            raise ValueError('not setup migration configuration')
        return self._alembic_config


db = Database()
