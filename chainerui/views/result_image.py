from flask import jsonify
from flask.views import MethodView

from chainerui import DB_SESSION
from chainerui.models.asset import Asset
from chainerui.models.project import Project
from chainerui.models.result import Result
from chainerui.tasks.collect_images import collect_images


class ResultImageAPI(MethodView):

    def get(self, result_id=None, project_id=None):
        # project is not necessary to collect images,
        # but check parent project exists or not
        project = DB_SESSION.query(Project).\
            filter_by(id=project_id).\
            first()
        if project is None:
            return jsonify({
                'project': None,
                'message': 'No interface defined for URL.'
            }), 404

        result = DB_SESSION.query(Result).\
            filter_by(id=result_id).\
            filter_by(is_unregistered=False).\
            first()
        if result is None:
            return jsonify({
                'result': None,
                'message': 'No interface defined for URL.'
            }), 404

        assets = DB_SESSION.query(Asset).\
            filter_by(result_id=result_id).\
            order_by(Asset.id).all()
        if assets is None:
            assets = []

        images = collect_images(result, assets)

        return jsonify({'images': [image.serialize for image in images]})
