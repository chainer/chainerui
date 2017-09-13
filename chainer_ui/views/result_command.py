""" results.py """

import os
import json
import tempfile
import shutil
from datetime import datetime


from flask import jsonify, request
from flask.views import MethodView


from chainer_ui import DB_SESSION
from chainer_ui.models.result import Result


class ResultCommandAPI(MethodView):
    """ ResultCommandAPI """

    def post(self, id):
        ''' POST /api/v1/results/<int:id>/commands '''

        result = DB_SESSION.query(Result).filter_by(id=id).first()

        if result is None:
            response = jsonify({
                'result': None,
                'message': 'No interface defined for URL.'
            })
            return response, 404

        request_json = request.get_json()

        if 'name' not in request_json:
            return jsonify({
                'message': 'Name is required'
            }), 400

        if 'schedule' in request_json:

            if list(request_json['schedule'].keys()) != ['key', 'value']:
                return jsonify({
                    'message': 'The schedule required key and value'
                }), 400

            if request_json['schedule']['key'] not in ['epoch', 'iteration']:
                return jsonify({
                    'message': 'Schedule key should be epoch or iteration.'
                }), 400

        command = {
            'request': {
                'status': 'open'
            }
        }

        command['name'] = request_json['name']
        command['request']['created_at'] = datetime.now().isoformat()

        if 'body' in request_json:
            command['request']['body'] = request_json['body']

        if 'schedule' in request_json:
            command['request']['schedule'] = request_json['schedule']

        command_path = os.path.join(result.path_name, 'commands')

        if os.path.isfile(command_path):
            with open(command_path) as json_data:
                command_list = json.load(json_data)
        else:
            command_list = []

        command_list.append(command)

        _fd, path = tempfile.mkstemp(prefix='commands', dir=result.path_name)
        with os.fdopen(_fd, 'w') as _f:
            json.dump(command_list, _f, indent=4)

        shutil.move(path, command_path)

        return jsonify(command)
