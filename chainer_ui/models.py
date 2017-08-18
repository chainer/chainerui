''' models.py '''

from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from database import Base

class Result(Base):
    ''' Result Model '''
    __tablename__ = 'result'

    id = Column(Integer, primary_key=True)
    path_name = Column(String(512), unique=True)
    logs = relationship('Log')

    def __init__(self, path_name=None):
        self.path_name = path_name

    def __repr__(self):
        return '<Result id: %r, path_name: %r />' % (self.id, self.path_name)

    @property
    def serialize(self):
        ''' Return object data in easily serializeable format '''
        return {
            'id': self.id,
            'pathName': self.path_name
        }


class Log(Base):
    ''' Log Model '''
    __tablename__ = 'log'

    id = Column(Integer, primary_key=True)
    result_id = Column(Integer, ForeignKey('result.id'))
    log_items = relationship('LogItem')

    def __repr__(self):
        return '<Log id: %r />' % (self.id)


class LogItem(Base):
    ''' LogItem Model '''
    __tablename__ = 'log_item'

    id = Column(Integer, primary_key=True)
    log_id = Column(Integer, ForeignKey('log.id'))
    key = Column(String(64))
    value = Column(String(64))

    def __init__(self, key=None, value=None):
        self.key = key
        self.value = value

    def __repr__(self):
        return '<LogItem id: %r />' % (self.id)
