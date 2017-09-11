""" results.py """

import os
import json
import tempfile
import shutil


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
            response = jsonify({'result': None, 'message': 'No interface defined for URL.'})
            return response, 404

        request_json = request.get_json()

        command_path = os.path.join(result.path_name, 'commands')
        if os.path.isfile(command_path):
            with open(command_path) as json_data:
                commands = json.load(json_data)
        else:
            commands = []

        commands.append(request_json)

        _fd, path = tempfile.mkstemp(prefix='commands', dir=result.path_name)
        with os.fdopen(_fd, 'w') as _f:
            json.dump(commands, _f, indent=4)

        shutil.move(path, command_path)
        return jsonify(request_json)
