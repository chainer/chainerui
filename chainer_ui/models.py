''' models.py '''

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import BASE



class Result(BASE):
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


class Log(BASE):
    ''' Log Model '''
    __tablename__ = 'log'

    id = Column(Integer, primary_key=True)
    result_id = Column(Integer, ForeignKey('result.id'))
    data = Column(String(1024))

    def __init__(self, data=None):
        self.data = data

    def __repr__(self):
        return '<Log id: %r />' % (self.id)
