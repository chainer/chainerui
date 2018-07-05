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


class Asset(DB_BASE):
    __tablename__ = 'asset'

    id = Column(Integer, primary_key=True)
    result_id = Column(Integer, ForeignKey('result.id'))
    summary = Column(String(512))
    content_list = relationship('Bindata', cascade='all, delete-orphan')
    file_modified_at = Column(DateTime, default=datetime.datetime.now())

    def __init__(self, result_id=None, summary=None, file_modified_at=None):
        self.result_id = result_id
        self.summary = json.dumps(summary)
        self.file_modified_at = file_modified_at
        self.content_list = []

    @classmethod
    def create(cls, result_id=None, summary=None, file_modified_at=None):
        """Initialize an instance and save it to db."""
        asset = cls(result_id, summary, file_modified_at)

        DB_SESSION.add(asset)
        DB_SESSION.commit()

        return asset

    def __repr__(self):
        return '<Asset id: %r, />' % (self.id)

    @property
    def serialize(self):
        summary = json.loads(self.summary)
        return {
            'train_info': summary,
            'contents': {c.tag: c.serialize for c in self.content_list}
        }
