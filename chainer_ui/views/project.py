""" project.py """


from flask import jsonify, request
from flask.views import MethodView


from chainer_ui import DB_SESSION
from chainer_ui.models.project import Project


class ProjectAPI(MethodView):
    """ ProjectAPI """

    def get(self, id=None):
        """ get """

        if id is None:
            projects = DB_SESSION.query(Project).all()
            return jsonify({
                'projects': [project.serialize for project in projects]
            })

        else:
            project = DB_SESSION.query(Project).filter_by(id=id).first()
            if project is None:
                return jsonify({
                    'result': None,
                    'message': 'No interface defined for URL.'
                }), 404
            return jsonify({
                'project': project.serialize
            })
