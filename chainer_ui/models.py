# -*- coding: utf-8 -*-

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
    name = Column(String(512))
    logs = relationship('Log', cascade='all, delete-orphan')
    args = relationship('Argument', uselist=False, cascade='all, delete-orphan')
    commands = relationship('Command', cascade='all, delete-orphan')
    snapshots = relationship('Snapshot', cascade='all, delete-orphan')

    def __init__(self, path_name=None, name=None):
        self.path_name = path_name
        self.name = name

    def __repr__(self):
        return '<Result id: %r, path_name: %r />' % (self.id, self.path_name)

    @property
    def serialize(self):
        ''' serialize '''
        return {
            'id': self.id,
            'pathName': self.path_name,
            'name': self.name,
            'logs': [log.serialize for log in self.logs],
            'args': self.args.serialize if self.args is not None else [],
            'commands': [cmd.serialize for cmd in self.commands],
            'snapshots': [cmd.serialize for cmd in self.snapshots]
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

        if isinstance(json.loads(self.data), dict):
            for item in json.loads(self.data).items():
                arguments.append({
                    'resultId': self.result_id,
                    'key': item[0],
                    'value': item[1]
                })

        return arguments

class Command(BASE):
    ''' Command Model '''
    __tablename__ = 'command'

    id = Column(Integer, primary_key=True)
    result_id = Column(Integer, ForeignKey('result.id'))
    name = Column(String(1024))
    body = Column(String(1024))

    def __init__(self, name=None, body=None, executed_at=None):
        self.name = name
        self.body = body

    def __repr__(self):
        return '<Command id: %r />' % (self.id)

    @property
    def serialize(self):
        ''' serialize '''

        return {
            "id": self.id,
            "name": self.name,
            "body": self.body
        }


class Snapshot(BASE):
    ''' Snapshot Model '''
    __tablename__ = 'snapshot'

    id = Column(Integer, primary_key=True)
    result_id = Column(Integer, ForeignKey('result.id'))
    name = Column(String(1024))
    iteration = Column(Integer)
    

    def __init__(self, name=None, iteration=None):
        self.name = name
        self.iteration = iteration

    def __repr__(self):
        return '<Snapshot id: %r />' % (self.id)

    @property
    def serialize(self):
        ''' serialize '''

        return {
            "id": self.id,
            "name": self.name,
            "iteration": self.iteration
        }
