import datetime

from flask import jsonify
from flask import request
from flask.views import MethodView

from chainerui.database import db
from chainerui.models.project import Project
from chainerui.models.result import Result
from chainerui.tasks import collect_results
from chainerui.tasks import crawl_result


class ResultAPI(MethodView):
    """ResultAPI."""

    def get(self, id=None, project_id=None):
        """get."""
        logs_limit = request.args.get('logs_limit', default=-1, type=int)

        project = db.session.query(Project).filter_by(
            id=project_id).first()
        if project is None:
            return jsonify({
                'project': None,
                'message': 'No interface defined for URL.'
            }), 404

        if id is None:
            path = request.args.get('path_name', default=None)
            if path is not None:
                result = db.session.query(Result).filter_by(
                    path_name=path).first()
                if result is None:
                    return jsonify({
                        'result': None,
                        'message': 'Result path \'%s\' is not found' % path
                    }), 400
                return jsonify({'result': result.serialize})

            collect_results(project)

            results = db.session.query(Result).\
                filter_by(project_id=project_id).\
                filter_by(is_unregistered=False).\
                all()

            # NOTE: To improve performance, aggregate commit phase. By set
            # `commit=False`, implicit transaction is not closed, UPDATE query
            # is not committed. Consequently a process of serializing does not
            # have to call SELECT query again.
            for result in results:
                crawl_result(result, commit=False)
            db.session.commit()
            rs = [r.serialize_with_sampled_logs(logs_limit) for r in results]

            return jsonify({'results': rs})

        else:

            result = db.session.query(Result).\
                filter_by(id=id).\
                filter_by(is_unregistered=False).\
                first()

            if result is None:
                return jsonify({
                    'result': None,
                    'message': 'No interface defined for URL.'
                }), 404

            result = crawl_result(result)

            return jsonify({
                'result': result.serialize_with_sampled_logs(logs_limit)
            })

    def post(self, project_id=None):
        project = db.session.query(Project).filter_by(id=project_id).first()
        if project is None:
            return jsonify({
                'project': None,
                'message': 'No interface defined for URL.'
            }), 404

        data = request.get_json()
        result_json = data.get('result')
        path = result_json.get('pathName', '')
        if path == '':
            return jsonify({
                'result': None,
                'message': 'Path of the result is not set.'
            }), 400
        result = db.session.query(Result).filter_by(path_name=path).first()
        if result is not None:
            return jsonify({
                'result': None,
                'message': 'Result path \'%s\' already registered.' % path
            }), 400

        name = result_json.get('name', None)
        crawlable = result_json.get('crawlable', True)
        log_modified_at = result_json.get('logModifiedAt', None)
        if log_modified_at is not None:
            log_modified_at = datetime.datetime.fromtimestamp(log_modified_at)
        result = Result.create(
            path_name=path, name=name, project_id=project_id,
            log_modified_at=log_modified_at, crawlable=crawlable)
        # don't return all data to reduce data size
        return jsonify({
            'result': {'id': result.id}
        })

    def put(self, id, project_id=None):
        """put."""
        result = db.session.query(Result).filter_by(id=id).first()
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

        db.session.add(result)
        db.session.commit()

        return jsonify({'result': result.serialize})

    def delete(self, id, project_id=None):
        """delete."""
        result = db.session.query(Result).filter_by(id=id).first()
        if result is None:
            response = jsonify({
                'result': None, 'message': 'No interface defined for URL.'
            })
            return response, 404

        db.session.delete(result)
        db.session.commit()

        return jsonify({'result': result.serialize})
