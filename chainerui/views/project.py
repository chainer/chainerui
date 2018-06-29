from flask import jsonify
from flask import request
from flask.views import MethodView

from chainerui import DB_SESSION
from chainerui.models.project import Project


class ProjectAPI(MethodView):
    """ProjectAPI."""

    def get(self, id=None):
        """get."""

        if id is None:
            projects = DB_SESSION.query(Project).all()
            return jsonify({
                'projects': [project.serialize for project in projects]
            })

        else:
            project = DB_SESSION.query(Project).filter_by(id=id).first()
            if project is None:
                return jsonify({
                    'project': None,
                    'message': 'No interface defined for URL.'
                }), 404
            return jsonify({
                'project': project.serialize
            })

    def post(self):
        data = request.get_json()  # if invalid data, raise BadRequest
        project_json = data.get('project')
        path = project_json.get('path_name', '')
        if path == '':
            return jsonify({
                'project': None,
                'message': 'Path of the project is not set.'
            }), 400
        name = project_json.get('name', '')
        if name == '':
            name = path

        project = DB_SESSION.query(Project).filter_by(path_name=path).first()
        if project is None:
            project = Project.create(path, name)
            return jsonify({
                'project': project.serialize
            })
        else:
            return jsonify({
                'project': None,
                'message': 'Pathname already registered.'
            }), 400

    def put(self, id):
        """put."""

        project = DB_SESSION.query(Project).filter_by(id=id).first()

        if project is None:
            return jsonify({
                'project': None,
                'message': 'No interface defined for URL.'
            }), 404

        request_project = request.get_json().get('project')
        project_name = request_project.get('name', None)

        if project_name is not None:
            project.name = project_name

        DB_SESSION.add(project)
        DB_SESSION.commit()

        return jsonify({
            'project': project.serialize
        })

    def delete(self, id):
        """delete."""
        project = DB_SESSION.query(Project).filter_by(id=id).first()

        if project is None:
            response = jsonify({
                'projects': None,
                'message': 'No interface defined for URL.'
            })
            return response, 404

        DB_SESSION.delete(project)
        DB_SESSION.commit()

        return jsonify({
            'project': project.serialize
        })
