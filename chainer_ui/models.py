from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Experiment(Base):
    __tablename__ = 'experiment'

    id = Column(Integer, primary_key=True)
    name = Column(String(128), unique=True)
    results = relationship('Result')

    def __init__(self, name=None):
        self.name = name

    def __repr__(self):
        return '<Experiment id: %r, name: %r />' % (self.id, self.name)


class Result(Base):
    __tablename__ = 'result'

    id = Column(Integer, primary_key=True)
    name = Column(String(128))
    experiment_id = Column(Integer, ForeignKey('experiment.id'))
    arguments = relationship('Argument')
    logs = relationship('Log')

    def __init__(self, name=None):
        self.name = name

    def __repr__(self):
        return '<Result id: %r, name: %r />' % (self.id, self.name)


class Argument(Base):
    __tablename__ = 'argument'

    id = Column(Integer, primary_key=True)
    result_id = Column(Integer, ForeignKey('result.id'))
    key = Column(String(128))
    value = Column(String(128))

    def __init__(self, key=None, value=None):
        self.key = key
        self.value = value

    def __repr__(self):
        return '<Argument id: %r />' % (self.id)


class Log(Base):
    __tablename__ = 'log'

    id = Column(Integer, primary_key=True)
    result_id = Column(Integer, ForeignKey('result.id'))
    name = Column(String(128))

    def __init__(self, name=None):
        self.name = name

    def __repr__(self):
        return '<Log id: %r />' % (self.id)