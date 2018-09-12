import os

from flask import Flask
from flask import jsonify
from flask import render_template
from flask import send_from_directory
from flask import url_for
from sqlalchemy.exc import OperationalError

from chainerui import _version
from chainerui.database import db


__version__ = _version.__version__


CHAINERUI_ENV = os.getenv('CHAINERUI_ENV', 'production')


def create_app():
    """create_app."""

    app = Flask(__name__)
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
        db.session.remove()

    @app.route('/')
    @app.route('/projects/<int:project_id>')
    @app.route('/projects/<int:project_id>/results/<int:result_id>')
    @app.route('/projects/<int:project_id>/results/<int:result_id>/assets')
    def index(**kwargs):
        """render react app."""
        return render_template('index.html')

    @app.route('/favicon.ico')
    def favicon():
        return send_from_directory(
            os.path.join(app.root_path, 'static', 'dist'),
            'favicon.ico', mimetype='image/vnd.microsoft.icon')

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
    from chainerui.views.result_image import ResultAssetAPI

    project_resource = ProjectAPI.as_view('project_resource')
    result_resource = ResultAPI.as_view('result_resource')
    result_command_resource = ResultCommandAPI.as_view(
        'result_command_resource')
    result_assets_resource = ResultAssetAPI.as_view('result_assets_resource')

    # project API
    app.add_url_rule(
        '/api/v1/projects',
        defaults={'id': None}, view_func=project_resource, methods=['GET'])
    app.add_url_rule(
        '/api/v1/projects', view_func=project_resource, methods=['POST'])
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

    # result image API
    app.add_url_rule(
        '/api/v1/projects/<int:project_id>/results/<int:result_id>/assets',
        view_func=result_assets_resource, methods=['GET'])
    app.add_url_rule(
        '/api/v1/projects/<int:project_id>/results/<int:result_id>/assets/<int:content_id>',  # NOQA
        view_func=result_assets_resource, methods=['GET'])

    return app
