import datetime

from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy.orm import relationship
from sqlalchemy import String

from chainerui import database
from chainerui import db
from chainerui.tasks.crawl_result import crawl_result


class Result(database.BASE):
    """Result Model."""
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
    log_modified_at = Column(DateTime, default=None)
    created_at = Column(DateTime, default=datetime.datetime.now())
    updated_at = Column(
        DateTime,
        default=datetime.datetime.now()
    )

    def __init__(self, path_name=None, name=None, project_id=None,
                 log_modified_at=None):
        self.path_name = path_name
        self.name = name
        self.project_id = project_id
        self.log_modified_at = log_modified_at

    def __repr__(self):
        return '<Result id: %r, path_name: %r />' % (self.id, self.path_name)

    @classmethod
    def create(cls, path_name=None, name=None, project_id=None,
               log_modified_at=None):
        """Initialize an instance and save it to db."""
        result = cls(path_name, name, project_id, log_modified_at)

        db.session.add(result)
        db.session.commit()

        crawl_result(result, True)

        return result

    def sampled_logs(self, logs_limit=-1):
        """Return up to `logs_limit` logs.

        If `logs_limit` is -1, this function will return all logs that belong
        to the result.
        """
        logs_count = len(self.logs)
        if logs_limit == -1 or logs_count <= logs_limit:
            return self.logs
        elif logs_limit == 0:
            return []
        elif logs_limit == 1:
            return [self.logs[-1]]
        else:
            def get_sampled_log(idx):
                # always include the first and last element of `self.logs`
                return self.logs[idx * (logs_count - 1) // (logs_limit - 1)]
            return [get_sampled_log(i) for i in range(logs_limit)]

    def serialize_with_sampled_logs(self, logs_limit=-1):
        """serialize a result with up to `logs_limit` logs.

        If `logs_limit` is -1, this function will return a result with all its
        logs.
        """

        return {
            'id': self.id,
            'pathName': self.path_name,
            'name': self.name,
            'isUnregistered': self.is_unregistered,
            'logs': [log.serialize for log in self.sampled_logs(logs_limit)],
            'args': self.args.serialize if self.args is not None else [],
            'commands': [cmd.serialize for cmd in self.commands],
            'snapshots': [cmd.serialize for cmd in self.snapshots],
            'logModifiedAt': self.log_modified_at
        }

    @property
    def serialize(self):
        """serialize."""

        return self.serialize_with_sampled_logs(-1)
