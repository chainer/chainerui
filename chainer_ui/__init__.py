''' init.py '''


import os


from flask import Flask, render_template, url_for, jsonify, request
from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker


CHAINER_UI_ENV = os.getenv('CHAINER_UI_ENV', 'prouction')
PACKAGE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_FILE_DIR = '/tmp'
DB_FILE_PATH = os.path.join(DB_FILE_DIR, 'chainer-ui.db')
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + DB_FILE_PATH
ENGINE = create_engine(
    SQLALCHEMY_DATABASE_URI,
    convert_unicode=True,
    connect_args={'check_same_thread': False},
    echo=(CHAINER_UI_ENV == 'development')
)
DB_BASE = declarative_base()


def create_db():
    ''' create_db '''
    print('DB_FILE_PATH: ', DB_FILE_PATH)
    DB_BASE.metadata.create_all(ENGINE)


def create_db_session():
    ''' create_db_session '''
    session = scoped_session(
        sessionmaker(autocommit=False, autoflush=False, bind=ENGINE)
    )
    return session()


def create_app(args):
    ''' create_app '''

    app = Flask(__name__)
    app.config['DEBUG'] = False

    from chainer_ui.models.result import Result
    from chainer_ui.tasks import collect_results, crawl_results

    scheduler = BackgroundScheduler()
    scheduler.add_job(
        collect_results, 'interval', seconds=5, args=[[args.target_dir]]
    )
    scheduler.add_job(crawl_results, 'interval', seconds=5)
    scheduler.start()

    def dated_url_for(endpoint, **values):
        ''' dated_url_for '''
        if endpoint == 'static':
            filename = values.get('filename', None)
            if filename:
                file_path = os.path.join(app.root_path, endpoint, filename)
                values['_'] = int(os.stat(file_path).st_mtime)
        return url_for(endpoint, **values)

    @app.before_first_request
    def app_initialize():
        collect_results([args.target_dir])
        crawl_results()

    @app.context_processor
    def override_url_for():
        ''' override_url_for '''
        return dict(url_for=dated_url_for)

    @app.route('/')
    @app.route('/results/<int:result_id>')
    def index(**kwargs):
        ''' render react app '''
        return render_template('index.html')

    from chainer_ui.views.result import ResultAPI
    from chainer_ui.views.result_command import ResultCommandAPI
    result_resource = ResultAPI.as_view('result_resource')
    result_command_resource = ResultCommandAPI.as_view(
        'result_command_resource'
    )
    app.add_url_rule(
        '/api/v1/results/',
        defaults={'id': None}, view_func=result_resource, methods=['GET']
    )
    app.add_url_rule(
        '/api/v1/results/<int:id>',
        view_func=result_resource, methods=['PUT', 'DELETE']
    )
    app.add_url_rule(
        '/api/v1/results/<int:id>/commands',
        view_func=result_command_resource, methods=['POST']
    )

    return app
