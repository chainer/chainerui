""" results.py """


from flask import jsonify, request
from flask.views import MethodView
from chainer_ui import create_db_session


from chainer_ui.models.result import Result


class ResultAPI(MethodView):
    """ ResultsAPI """

    def get(self, id=None):
        """ get """
        db_session = create_db_session()
        results = db_session.query(Result).all()
        return jsonify({'results': [result.serialize for result in results]})

    def put(self, id):
        """ put """
        db_session = create_db_session()
        result = db_session.query(Result).filter_by(id=id).first()
        if result is None:
            response = jsonify({'result': None, 'message': 'No interface defined for URL.'})
            return response, 404

        request_json = request.get_json()
        request_result = request_json.get('result')

        name = request_result.get('name', None)
        if name is not None:
            result.name = name

        db_session.add(result)
        db_session.commit()

        return jsonify({'result': result.serialize})

    def delete(self, id):
        """ delete """
        db_session = create_db_session()
        result = db_session.query(Result).filter_by(id=id).first()
        if result is None:
            response = jsonify({'result': None, 'message': 'No interface defined for URL.'})
            return response, 404

        db_session.delete(result)
        db_session.commit()

        return jsonify({'result': result.serialize})
