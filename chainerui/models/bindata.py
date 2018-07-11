from base64 import b64encode

from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import LargeBinary
from sqlalchemy import String

from chainerui import DB_BASE


class Bindata(DB_BASE):
    __tablename__ = 'bindata'

    id = Column(Integer, primary_key=True)
    asset_id = Column(Integer, ForeignKey('asset.id'))
    name = Column(String(512))
    tag = Column(String(512))
    note = Column(String(512))
    content = Column(LargeBinary(1e7))

    def __init__(self, asset_id=None, name=None, tag=None, note=None,
                 content=None):
        self.asset_id = asset_id
        self.name = name
        self.tag = tag
        self.note = note
        self.content = content

    def __repr__(self):
        return '<Bindata id: %r />' % (self.id)

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
