""" results.py """


from flask import jsonify
from flask.views import MethodView
from chainer_ui import create_db_session


from chainer_ui.models.result import Result


class ResultAPI(MethodView):
    """ ResultsAPI """

    def get(self):
        """ get """
        db_session = create_db_session()
        results = db_session.query(Result).all()
        return jsonify({'results': [result.serialize for result in results]})

    def put(self):
        """ put """
        return 'put'

    def delete(self):
        """ delete """
        return 'delete'
