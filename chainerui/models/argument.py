import json

from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String

from chainerui import database


class Argument(database.BASE):
    """Argument Model."""
    __tablename__ = 'argument'

    id = Column(Integer, primary_key=True)
    result_id = Column(Integer, ForeignKey('result.id'))
    data = Column(String(1024))

    def __init__(self, data=None):
        self.data = data

    def __repr__(self):
        return '<Argument id: %r />' % (self.id)

    @property
    def serialize(self):
        """serialize."""

        arguments = []

        if isinstance(json.loads(self.data), dict):
            for k, v in json.loads(self.data).items():
                arguments.append({
                    'resultId': self.result_id,
                    'key': k,
                    'value': str(v) if v is not None else None,
                })

        return arguments
