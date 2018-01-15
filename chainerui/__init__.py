import errno
import os

from alembic.command import upgrade
from alembic.config import Config
from flask import Flask
from flask import jsonify
from flask import render_template
from flask import url_for
from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session
from sqlalchemy.orm import sessionmaker

from chainerui import _version


__version__ = _version.__version__


CHAINERUI_ENV = os.getenv('CHAINERUI_ENV', 'production')
CHAINERUI_ROOT = os.path.abspath(
    os.path.expanduser(os.getenv('CHAINERUI_ROOT', '~/.chainerui')))
PACKAGE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_FILE_DIR = os.path.join(CHAINERUI_ROOT, 'db')
DB_FILE_NAME = 'chainerui_test.db' if CHAINERUI_ENV == 'test' \
    else 'chainerui.db'
DB_FILE_PATH = os.path.join(DB_FILE_DIR, DB_FILE_NAME)
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + DB_FILE_PATH
ENGINE = create_engine(
    SQLALCHEMY_DATABASE_URI,
    convert_unicode=True,
    connect_args={'check_same_thread': False},
    echo=(CHAINERUI_ENV == 'development')
)
DB_BASE = declarative_base()
DB_SESSION = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=ENGINE)
)


def create_db():
    """create_db."""
    try:
        os.makedirs(DB_FILE_DIR)
    except OSError as exception:
        if exception.errno == errno.EEXIST and os.path.isdir(DB_FILE_DIR):
            pass
        else:
            raise
    print('DB_FILE_PATH: ', DB_FILE_PATH)


def upgrade_db():
    """upgrade_db."""
    ini_path = os.path.join(PACKAGE_DIR, 'alembic.ini')
    config = Config(ini_path)
    config.set_main_option(
        "script_location", os.path.join(PACKAGE_DIR, 'migration'))
    upgrade(config, 'head')


def create_db_session():
    """create_db_session."""
    session = scoped_session(
        sessionmaker(autocommit=False, autoflush=False, bind=ENGINE)
    )
    return session()


def create_app():
    """create_app."""

    app = Flask(__name__)
    app.config['DEBUG'] = False
    app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False

    def dated_url_for(endpoint, **values):
        """dated_url_for."""
        if endpoint == 'static':
            filename = values.get('filename', None)
            if filename:
                file_path = os.path.join(app.root_path, endpoint, filename)
                values['_'] = int(os.stat(file_path).st_mtime)
        return url_for(endpoint, **values)

    @app.context_processor
    def override_url_for():
        """override_url_for."""
        return dict(url_for=dated_url_for)

    @app.teardown_appcontext
    def shutdown_session(exception=None):
        DB_SESSION.remove()

    @app.route('/')
    @app.route('/projects/<int:project_id>')
    @app.route('/projects/<int:project_id>/results/<int:result_id>')
    def index(**kwargs):
        """render react app."""
        return render_template('index.html')

    # error handling
    @app.errorhandler(OperationalError)
    def handle_invalid_usage(error):
        """handle errors caused by db query."""
        print('caught exception from db:', error.args)
        response = jsonify({
            'error': {
                'type': 'DBOperationalError',
                'message': 'Failed to send request to the database.'
            }
        })
        response.status_code = 400  # Bad Request

        return response

    from chainerui.views.project import ProjectAPI
    from chainerui.views.result import ResultAPI
    from chainerui.views.result_command import ResultCommandAPI

    project_resource = ProjectAPI.as_view('project_resource')
    result_resource = ResultAPI.as_view('result_resource')
    result_command_resource = ResultCommandAPI.as_view(
        'result_command_resource')

    # project API
    app.add_url_rule(
        '/api/v1/projects',
        defaults={'id': None}, view_func=project_resource, methods=['GET'])
    app.add_url_rule(
        '/api/v1/projects/<int:id>',
        view_func=project_resource, methods=['GET', 'PUT', 'DELETE'])

    # result API
    app.add_url_rule(
        '/api/v1/projects/<int:project_id>/results',
        defaults={'id': None}, view_func=result_resource, methods=['GET'])
    app.add_url_rule(
        '/api/v1/projects/<int:project_id>/results/<int:id>',
        view_func=result_resource, methods=['GET', 'PUT', 'DELETE'])

    # result command API
    app.add_url_rule(
        '/api/v1/projects/<int:project_id>/results/<int:result_id>/commands',
        view_func=result_command_resource, methods=['POST'])

    return app
