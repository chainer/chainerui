from __future__ import absolute_import
import datetime
import os

from flask import Flask
from flask import jsonify
from flask import render_template
from flask import request
from flask import send_from_directory
from flask import url_for
from sqlalchemy.exc import OperationalError

from chainerui.database import db
from chainerui.logging import logger


def create_app():
    """create_app."""

    app = Flask(__name__)
    app.logger.disabled = True
    for h in app.logger.handlers[:]:
        app.logger.removeHandler(h)
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
        logger.error('caught exception from db: %s' % error.args)
        response = jsonify({
            'error': {
                'type': 'DBOperationalError',
                'message': 'Failed to send request to the database.'
            }
        })
        response.status_code = 400  # Bad Request

        return response

    @app.before_request
    def add_timestamp():
        request._comming_at = datetime.datetime.now()

    @app.after_request
    def output_log(response):
        now = datetime.datetime.now()
        log_msg = '%s - - [%s] "%s %s %s" %d' % (
            request.remote_addr, now.replace(microsecond=0),
            request.method, request.full_path,
            request.environ.get('SERVER_PROTOCOL'), response.status_code)
        if response.content_length is not None:
            log_msg += ' %d' % response.content_length
        if request._comming_at is not None:
            delta = (now - request._comming_at).total_seconds()
            log_msg += ' %.6f' % delta
        logger.info(log_msg)
        return response

    from chainerui.views.argument import ArgumentAPI
    from chainerui.views.log import LogAPI
    from chainerui.views.project import ProjectAPI
    from chainerui.views.result import ResultAPI
    from chainerui.views.result_asset import ResultAssetAPI
    from chainerui.views.result_command import ResultCommandAPI

    project_resource = ProjectAPI.as_view('project_resource')
    result_resource = ResultAPI.as_view('result_resource')
    log_resource = LogAPI.as_view('log_resource')
    arg_resource = ArgumentAPI.as_view('arg_resource')
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
        '/api/v1/projects/<int:project_id>/results',
        view_func=result_resource, methods=['POST'])
    app.add_url_rule(
        '/api/v1/projects/<int:project_id>/results/<int:id>',
        view_func=result_resource, methods=['GET', 'PUT', 'DELETE'])

    # result log API
    app.add_url_rule(
        '/api/v1/projects/<int:project_id>/results/<int:result_id>/logs',
        view_func=log_resource, methods=['POST'])
    # result argument API
    app.add_url_rule(
        '/api/v1/projects/<int:project_id>/results/<int:result_id>/args',
        view_func=arg_resource, methods=['POST'])

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
