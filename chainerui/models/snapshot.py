from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String

from chainerui import database


class Snapshot(database.BASE):
    """Snapshot Model."""
    __tablename__ = 'snapshot'

    id = Column(Integer, primary_key=True)
    result_id = Column(Integer, ForeignKey('result.id'))
    name = Column(String(1024))
    iteration = Column(Integer)

    def __init__(self, name=None, iteration=None):
        self.name = name
        self.iteration = iteration

    def __repr__(self):
        return '<Snapshot id: %r />' % (self.id)

    @property
    def serialize(self):
        """serialize."""

        return {
            "id": self.id,
            "name": self.name,
            "iteration": self.iteration
        }
