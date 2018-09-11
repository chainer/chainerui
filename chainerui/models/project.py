import datetime

from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Integer
from sqlalchemy.orm import relationship
from sqlalchemy import String

from chainerui import database
from chainerui import db
from chainerui.tasks.collect_results import collect_results


class Project(database.BASE):
    """Project Model."""
    __tablename__ = 'project'

    id = Column(Integer, primary_key=True)
    path_name = Column(String(512), unique=True)
    name = Column(String(512))
    results = relationship('Result', cascade='all, delete-orphan')
    created_at = Column(DateTime, default=datetime.datetime.now())
    updated_at = Column(
        DateTime,
        default=datetime.datetime.now()
    )

    def __init__(self, path_name=None, name=None):
        self.path_name = path_name
        self.name = name

    def __repr__(self):
        return '<Project id: %r, path_name: %r />' % (self.id, self.path_name)

    @classmethod
    def create(cls, path_name=None, name=None):
        """initialize an instance and save it to db."""

        project = cls(path_name, name)

        db.session.add(project)
        db.session.commit()

        collect_results(project, force=True)
        return project

    @property
    def serialize(self):
        """serialize."""
        return {
            'id': self.id,
            'pathName': self.path_name,
            'name': self.name
        }
