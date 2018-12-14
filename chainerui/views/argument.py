import json

from flask import jsonify
from flask import request
from flask.views import MethodView

from chainerui.database import db
from chainerui.models.argument import Argument
from chainerui.models.project import Project
from chainerui.models.result import Result


class ArgumentAPI(MethodView):

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
        args = data.get('argument', {})
        result.args = Argument(json.dumps(args))

        db.session.commit()

        return jsonify({
            'argument': {'id': result.args.id, 'resultId': result.id}
        })
