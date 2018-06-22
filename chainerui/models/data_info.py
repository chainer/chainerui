import datetime
import json

from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy.orm import relationship
from sqlalchemy import String

from chainerui import DB_BASE
from chainerui import DB_SESSION


class DataInfo(DB_BASE):
    __tablename__ = 'data_info'

    id = Column(Integer, primary_key=True)
    result_id = Column(Integer, ForeignKey('result.id'))
    meta_info = Column(String(512))
    content_list = relationship('DataContent', cascade='all, delete-orphan')
    file_modified_at = Column(DateTime, default=datetime.datetime.now())

    def __init__(self, result_id=None, meta_info=None, file_modified_at=None):
        self.result_id = result_id
        self.meta_info = json.dumps(meta_info)
        self.file_modified_at = file_modified_at
        self.content_list = []

    @classmethod
    def create(cls, result_id=None, meta_info=None, file_modified_at=None):
        """Initialize an instance and save it to db."""
        data_info = cls(result_id, meta_info, file_modified_at)

        DB_SESSION.add(data_info)
        DB_SESSION.commit()

        return data_info

    def __repr__(self):
        return '<DataInfo id: %r, />' % (self.id)

    @property
    def serialize(self):
        meta_info = json.loads(self.meta_info)
        return {
            'train_info': meta_info,
            'contents': {c.tag: c.serialize for c in self.content_list}
        }
