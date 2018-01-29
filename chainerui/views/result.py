from flask import jsonify
from flask import request
from flask.views import MethodView

from chainerui import DB_SESSION
from chainerui.models.project import Project
from chainerui.models.result import Result
from chainerui.tasks import collect_results
from chainerui.tasks import crawl_result


class ResultAPI(MethodView):
    """ResultAPI."""

    def get(self, id=None, project_id=None):
        """get."""
        project = DB_SESSION.query(Project).\
            filter_by(id=project_id).\
            first()
        if project is None:
            return jsonify({
                'project': None,
                'message': 'No interface defined for URL.'
            }), 404

        if id is None:

            collect_results(project)

            results = DB_SESSION.query(Result).\
                filter_by(project_id=project_id).\
                filter_by(is_unregistered=False).\
                all()

            for result in results:
                result = crawl_result(result.id)

            return jsonify({
                'results': [r.serialize for r in results]
            })

        else:

            result = DB_SESSION.query(Result).\
                filter_by(id=id).\
                filter_by(is_unregistered=False).\
                first()

            if result is None:
                return jsonify({
                    'result': None,
                    'message': 'No interface defined for URL.'
                }), 404

            result = crawl_result(result.id)

            return jsonify({
                'result': result.serialize
            })

    def put(self, id, project_id=None):
        """put."""
        result = DB_SESSION.query(Result).filter_by(id=id).first()
        if result is None:
            response = jsonify({
                'result': None, 'message': 'No interface defined for URL.'
            })
            return response, 404

        request_json = request.get_json()
        request_result = request_json.get('result')

        name = request_result.get('name', None)
        if name is not None:
            result.name = name

        is_unregistered = request_result.get('isUnregistered', None)
        if is_unregistered is not None:
            result.is_unregistered = is_unregistered

        DB_SESSION.add(result)
        DB_SESSION.commit()

        return jsonify({'result': result.serialize})

    def delete(self, id, project_id=None):
        """delete."""
        result = DB_SESSION.query(Result).filter_by(id=id).first()
        if result is None:
            response = jsonify({
                'result': None, 'message': 'No interface defined for URL.'
            })
            return response, 404

        DB_SESSION.delete(result)
        DB_SESSION.commit()

        return jsonify({'result': result.serialize})
