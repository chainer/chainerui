from base64 import b64encode

from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import LargeBinary
from sqlalchemy import String

from chainerui import DB_BASE


class DataContent(DB_BASE):
    __tablename__ = 'data_content'

    id = Column(Integer, primary_key=True)
    data_info_id = Column(Integer, ForeignKey('data_info.id'))
    name = Column(String(512))
    tag = Column(String(512))
    content = Column(LargeBinary(1e7))

    def __init__(self, data_info_id=None, name=None, tag=None, content=None):
        self.data_info_id = data_info_id
        self.name = name
        self.tag = tag
        self.content = content

    def __repr__(self):
        return '<DataContent id: %r />' % (self.id)

    def _convert(self):
        b64_data = b64encode(self.content).decode('utf-8')
        ext = self.name.split('.')[-1].lower()
        if ext == 'png':
            return 'data:image/png;base64,' + b64_data
        else:
            raise ValueError('"%s" is not support' % ext)

    @property
    def serialize(self):
        return self._convert()
