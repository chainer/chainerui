''' result.py '''


from flask import jsonify, request
from flask.views import MethodView


from chainer_ui import DB_SESSION
from chainer_ui.models.result import Result


class ResultAPI(MethodView):
    ''' ResultAPI '''

    def get(self, id=None, project_id=None):
        ''' get '''

        results = DB_SESSION.query(Result).\
            filter_by(project_id=project_id).\
            filter_by(is_unregistered=False).\
            all()

        return jsonify({'results': [result.serialize for result in results]})
