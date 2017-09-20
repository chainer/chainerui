""" results.py """


from flask import jsonify, request
from flask.views import MethodView
from chainer_ui import DB_SESSION


from chainer_ui.models.project import Project


class ProjectAPI(MethodView):
    """ ProjectAPI """

    def get(self, id=None):
        """ get """
        projects = DB_SESSION.query(Project).all()
        return jsonify({'projects': [project.serialize for project in projects]})
