import json

from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String

from chainerui import database


class Command(database.BASE):
    """Command Model."""
    __tablename__ = 'command'

    id = Column(Integer, primary_key=True)
    result_id = Column(Integer, ForeignKey('result.id'))
    name = Column(String(1024))
    request = Column(String(1024))
    response = Column(String(1024))

    def __init__(self, name=None, request=None, response=None):
        self.name = name
        self.request = json.dumps(request, indent=4)
        self.response = json.dumps(response, indent=4)

    def __repr__(self):
        return '<Command id: %r />' % (self.id)

    @property
    def serialize(self):
        """serialize."""

        if self.request is None:
            request = None
        else:
            request = json.loads(self.request)

        if self.response is None:
            response = None
        else:
            response = json.loads(self.response)

        return {
            'id': self.id,
            'name': self.name,
            'request': request,
            'response': response
        }
