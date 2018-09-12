import io

from flask import jsonify
from flask import send_file
from flask.views import MethodView

from chainerui import db
from chainerui.models.asset import Asset
from chainerui.models.bindata import Bindata
from chainerui.models.project import Project
from chainerui.models.result import Result
from chainerui.tasks.collect_images import collect_images


class ResultAssetAPI(MethodView):

    def get(self, result_id=None, project_id=None, content_id=None):
        # project is not necessary to collect assets,
        # but check parent project exists or not
        project = db.session.query(Project).\
            filter_by(id=project_id).\
            first()
        if project is None:
            return jsonify({
                'project': None,
                'message': 'No interface defined for URL.'
            }), 404

        result = db.session.query(Result).\
            filter_by(id=result_id).\
            filter_by(is_unregistered=False).\
            first()
        if result is None:
            return jsonify({
                'result': None,
                'message': 'No interface defined for URL.'
            }), 404

        if content_id is None:
            assets = db.session.query(Asset).\
                filter_by(result_id=result_id).\
                order_by(Asset.id).all()
            if assets is None:
                assets = []
            assets = collect_images(result, assets)
            assets_response = [asset.serialize for asset in assets]
            for asset in assets_response:
                for content in asset['contents']:
                    content['uri'] = self._make_content_uri(
                        project_id, result_id, content['id'])
            return jsonify({'assets': assets_response})

        # sent content binary directly
        bindata = db.session.query(Bindata).\
            filter_by(id=content_id).\
            first()
        if bindata is None:
            return jsonify({
                'asset': None,
                'message': 'No interface defined for URL.'
            }), 404
        return send_file(
            io.BytesIO(bindata.content),
            mimetype=bindata.mimetype(),
            as_attachment=True,
            attachment_filename=bindata.name)

    def _make_content_uri(self, project_id, result_id, content_id):
        return '/api/v1/projects/%d/results/%d/assets/%d' % (
            project_id, result_id, content_id)
