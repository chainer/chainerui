import datetime

from flask import jsonify
from flask import request
from flask.views import MethodView

from chainerui.database import db
from chainerui.models.log import Log
from chainerui.models.project import Project
from chainerui.models.result import Result


class LogAPI(MethodView):

    def post(self, project_id=None, result_id=None):
        project = db.session.query(Project).filter_by(id=project_id).first()
        if project is None:
            return jsonify({
                'project': None,
                'message': 'No interface defined for URL.'
            }), 404
        result = db.session.query(Result).filter_by(id=result_id).first()
        if result is None:
            return jsonify({
                'result': None,
                'message': 'No interface defined for URL.'
            }), 404

        data = request.get_json()
        log_json = data.get('log')
        modified_at = log_json.get('modifiedAt', None)
        if modified_at is not None:
            result.log_modified_at = datetime.datetime.fromtimestamp(
                modified_at)
        log_values = log_json.get('values', [])
        reset = log_json.get('reset', False)
        if reset:
            result.logs = []
        for value in log_values:
            result.logs.append(Log(value))

        db.session.commit()

        return jsonify({
            'logs': {
                'resultId': result.id,
                'insertedLogCount': len(log_values),
                'totalLogCount': len(result.logs)
            }
        })
