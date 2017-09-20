""" results.py """


from flask import jsonify, request
from flask.views import MethodView
from chainer_ui import DB_SESSION


from chainer_ui.models.result import Result


class OldResultAPI(MethodView):
    """ ResultsAPI """

    def get(self, id=None):
        """ get """
        results = DB_SESSION.query(Result).filter_by(is_unregistered=False)
        return jsonify({'results': [result.serialize for result in results]})

    def put(self, id):
        """ put """
        result = DB_SESSION.query(Result).filter_by(id=id).first()
        if result is None:
            response = jsonify({'result': None, 'message': 'No interface defined for URL.'})
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

    def delete(self, id):
        """ delete """
        result = DB_SESSION.query(Result).filter_by(id=id).first()
        if result is None:
            response = jsonify({'result': None, 'message': 'No interface defined for URL.'})
            return response, 404

        DB_SESSION.delete(result)
        DB_SESSION.commit()

        return jsonify({'result': result.serialize})
