''' database.py '''

import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

CHAINER_UI_ENV = os.getenv('CHAINER_UI_ENV', 'prouction')

BASE = declarative_base()

DATABASE_FILE = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'chainer_ui.db')
ENGINE = create_engine(
    'sqlite:///' + DATABASE_FILE,
    convert_unicode=True,
    connect_args={'check_same_thread': False},
    echo=(CHAINER_UI_ENV == 'development')
)

BASE.metadata.bind = ENGINE

def init_db():
    ''' init_db '''
    import models
    return BASE.metadata.create_all(bind=ENGINE)


def create_db_session():
    ''' create_db_session '''
    session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=ENGINE))
    return session()
