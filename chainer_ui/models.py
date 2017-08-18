''' models.py '''

import json

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import BASE



class Result(BASE):
    ''' Result Model '''
    __tablename__ = 'result'

    id = Column(Integer, primary_key=True)
    path_name = Column(String(512), unique=True)
    logs = relationship('Log')
    args = relationship('Argument', uselist=False)

    def __init__(self, path_name=None):
        self.path_name = path_name

    def __repr__(self):
        return '<Result id: %r, path_name: %r />' % (self.id, self.path_name)

    @property
    def serialize(self):
        ''' serialize '''
        return {
            'id': self.id,
            'pathName': self.path_name,
            'logs': [log.serialize for log in self.logs],
            'args': self.args.serialize
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

    @property
    def serialize(self):
        ''' serialize '''

        log_items = []

        for item in json.loads(self.data).items():
            log_items.append({
                'logId': self.id,
                'key': item[0],
                'value': item[1]
            })

        return {
            'id': self.id,
            'resultId': self.result_id,
            'logItems': log_items
        }


class Argument(BASE):
    ''' Argument Model '''
    __tablename__ = 'argument'

    id = Column(Integer, primary_key=True)
    result_id = Column(Integer, ForeignKey('result.id'))
    data = Column(String(1024))

    def __init__(self, data=None):
        self.data = data

    def __repr__(self):
        return '<Argument id: %r />' % (self.id)

    @property
    def serialize(self):
        ''' serialize '''

        arguments = []

        for item in json.loads(self.data).items():
            arguments.append({
                'resultId': self.result_id,
                'key': item[0],
                'value': item[1]
            })

        return arguments
