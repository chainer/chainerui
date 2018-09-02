import errno
import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session
from sqlalchemy.orm import sessionmaker


BASE = declarative_base()


class Database(object):

    def __init__(self):
        self._url = None
        self._initialized = False
        self._engine = None
        self._session = None
        self._external_db = False

    def init_db(self, db_dir=None):
        if db_dir is None:
            db_dir = self._sqlite_default_db_dir()
        self._sqlite_db_dir = db_dir
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
            db_file_name = 'chainerui_test.db' if test_mode else 'chainerui.db'
            db_path = os.path.join(self._sqlite_db_dir, db_file_name)
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

        return True

    def _check(self):
        if not self._external_db:
            if not os.path.isdir(self._sqlite_db_dir):
                print('DB is not initialized, please run \'create\' command '
                      'before')
                return False
        # TODO(disktnk): add ping, to check connetion with external DB
        return True

    def drop(self):
        if not self._external_db:
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


db = Database()
