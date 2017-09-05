''' init.py '''


import os
from flask import Flask, render_template, url_for
from flask_apscheduler import APScheduler
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker


CHAINER_UI_ENV = os.getenv('CHAINER_UI_ENV', 'prouction')
PACKAGE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_FILE_DIR = '/tmp'
DB_FILE_PATH = os.path.join(DB_FILE_DIR, 'chainer-ui.db')
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + DB_FILE_PATH
SQLALCHEMY_MIGRATE_REPO = os.path.join(PACKAGE_DIR, 'migration_repository')
ENGINE = create_engine(
    SQLALCHEMY_DATABASE_URI,
    convert_unicode=True,
    connect_args={'check_same_thread': False},
    echo=(CHAINER_UI_ENV == 'development')
)
DB_BASE = declarative_base()


def create_db():
    ''' create_db '''
    DB_BASE.metadata.create_all(ENGINE)


def create_db_session():
    ''' create_db_session '''
    session = scoped_session(
        sessionmaker(autocommit=False, autoflush=False, bind=ENGINE)
    )
    return session()


def create_app():
    ''' create_app '''

    app = Flask(__name__)
    app.config['DEBUG'] = True

    from chainer_ui.utils import crawl_result_table

    class CrawlJobConfig(object):
        ''' job config '''
        JOBS = [
            {
                'id': 'job1',
                'func': crawl_result_table,
                'trigger': 'interval',
                'seconds': 5
            }
        ]

    app.config.from_object(CrawlJobConfig())

    scheduler = APScheduler()
    scheduler.init_app(app)

    def dated_url_for(endpoint, **values):
        ''' dated_url_for '''
        if endpoint == 'static':
            filename = values.get('filename', None)
            if filename:
                file_path = os.path.join(app.root_path, endpoint, filename)
                values['_'] = int(os.stat(file_path).st_mtime)
        return url_for(endpoint, **values)

    from chainer_ui.views.result import ResultAPI
    app.add_url_rule(
        '/api/v1/results/',
        view_func=ResultAPI.as_view('results')
    )

    @app.context_processor
    def override_url_for():
        ''' override_url_for '''
        return dict(url_for=dated_url_for)

    @app.route('/')
    def index():
        ''' / '''
        return render_template('index.html')

    return app
