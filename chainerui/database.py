import errno
import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session
from sqlalchemy.orm import sessionmaker


BASE = declarative_base()


class Database(object):
    def __init__(self):
        self._initialized = False
        self._engine = None
        self._session = None

    def init(self, url=None):
        if url is not None:
            return

        db_dir = self._sqlite_db_dir()
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
            url = self._sqlite_url(test_mode)
        if url.startswith('sqlite'):
            connect_args = {'check_same_thread': False}
        else:
            connect_args = {}
        self.url = url

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

    def check(self, url=None):
        if url is None:
            if not os.path.isdir(self._sqlite_db_dir()):
                print('DB is not initialized, please run \'create\' command '
                      'before')
                return False
        return True

    def drop(self, url=None, test_mode=False):
        if url is None:
            path = self._sqlite_db_path(test_mode)
            if os.path.exists(path):
                os.remove(path)

    def _sqlite_db_dir(self):
        root = os.path.abspath(
            os.path.expanduser(os.getenv('CHAINERUI_ROOT', '~/.chainerui')))
        return os.path.join(root, 'db')

    def _sqlite_db_path(self, test_mode):
        db_file_name = 'chainerui_test.db' if test_mode else 'chainerui.db'
        return os.path.join(self._sqlite_db_dir(), db_file_name)

    def _sqlite_url(self, test_mode):
        return 'sqlite:///' + self._sqlite_db_path(test_mode)

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


db = Database()
