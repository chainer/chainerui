''' result.py '''


from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from chainer_ui import DB_BASE
from chainer_ui.models.log import Log
from chainer_ui.models.argument import Argument
from chainer_ui.models.command import Command
from chainer_ui.models.snapshot import Snapshot


class Result(DB_BASE):
    ''' Result Model '''
    __tablename__ = 'result'

    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey('project.id'))
    path_name = Column(String(512), unique=True)
    name = Column(String(512))
    is_unregistered = Column(Boolean(), default=False)
    logs = relationship('Log', cascade='all, delete-orphan')
    args = relationship(
        'Argument', uselist=False, cascade='all, delete-orphan'
    )
    commands = relationship('Command', cascade='all, delete-orphan')
    snapshots = relationship('Snapshot', cascade='all, delete-orphan')

    def __init__(self, path_name=None, name=None, project_id=None):
        self.path_name = path_name
        self.name = name
        self.project_id = project_id

    def __repr__(self):
        return '<Result id: %r, path_name: %r />' % (self.id, self.path_name)

    @property
    def serialize(self):
        ''' serialize '''
        return {
            'id': self.id,
            'pathName': self.path_name,
            'name': self.name,
            'isUnregistered': self.is_unregistered,
            'logs': [log.serialize for log in self.logs],
            'args': self.args.serialize if self.args is not None else [],
            'commands': [cmd.serialize for cmd in self.commands],
            'snapshots': [cmd.serialize for cmd in self.snapshots]
        }
