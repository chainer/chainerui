import datetime

from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Integer
from sqlalchemy.orm import relationship
from sqlalchemy import String

from chainerui import database
from chainerui.database import db
from chainerui.tasks.collect_results import collect_results


class Project(database.BASE):
    """Project Model."""
    __tablename__ = 'project'

    id = Column(Integer, primary_key=True)
    path_name = Column(String(512), unique=True)
    name = Column(String(512))
    results = relationship('Result', cascade='all, delete-orphan')
    crawlable = Column(Boolean(), default=True)
    created_at = Column(DateTime, default=datetime.datetime.now())
    updated_at = Column(DateTime, default=datetime.datetime.now())

    def __init__(self, path_name=None, name=None, crawlable=True):
        self.path_name = path_name
        self.name = name
        self.crawlable = crawlable

    def __repr__(self):
        return '<Project id: %r, path_name: %r />' % (self.id, self.path_name)

    @classmethod
    def create(cls, path_name=None, name=None, crawlable=True):
        """initialize an instance and save it to db."""

        project = cls(path_name, name, crawlable)

        db.session.add(project)
        db.session.commit()

        return collect_results(project, force=True)

    @property
    def serialize(self):
        """serialize."""
        return {
            'id': self.id,
            'pathName': self.path_name,
            'name': self.name
        }
