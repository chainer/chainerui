''' models.py '''

from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from database import Base

class Experiment(Base):
    ''' Experiment '''
    __tablename__ = 'experiment'

    id = Column(Integer, primary_key=True)
    name = Column(String(128), unique=True)
    results = relationship('Result')

    def __init__(self, name=None):
        self.name = name

    def __repr__(self):
        return '<Experiment id: %r, name: %r />' % (self.id, self.name)

    @property
    def serialize(self):
        ''' Return object data in easily serializeable format '''
        return {
            'id': self.id,
            'name': self.name,
            'results': [i.serialize for i in self.results]
        }


class Result(Base):
    ''' Result '''
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

    @property
    def serialize(self):
        ''' Return object data in easily serializeable format '''
        return {
            'id': self.id,
            'name': self.name,
            'args': dict([i.serialize for i in self.arguments]),
            'logs': [i.serialize for i in self.logs]
        }


class Argument(Base):
    ''' Argument '''
    __tablename__ = 'argument'

    id = Column(Integer, primary_key=True)
    result_id = Column(Integer, ForeignKey('result.id'))
    key = Column(String(128))
    value = Column(String(128))

    def __init__(self, key=None, value=None):
        self.key = key
        self.value = value

    def __repr__(self):
        return '<Argument id: %r, key: %r, value: %r />' % (self.id, self.key, self.value)

    @property
    def serialize(self):
        ''' Return object data in easily serializeable format '''
        return [self.key, self.value]


class Log(Base):
    ''' Log '''
    __tablename__ = 'log'

    id = Column(Integer, primary_key=True)
    result_id = Column(Integer, ForeignKey('result.id'))
    epoch = Column(Integer)
    iteration = Column(Integer)
    main_accuracy = Column(Float)
    main_loss = Column(Float)
    validation_main_accuracy = Column(Float)
    validation_main_loss = Column(Float)
    elapsed_time = Column(Float)

    def __init__(self, epoch=None, iteration=None, main_accuracy=None, main_loss=None,
                 validation_main_accuracy=None, validation_main_loss=None, elapsed_time=None):
        self.epoch = epoch
        self.iteration = iteration
        self.main_accuracy = main_accuracy
        self.main_loss = main_loss
        self.validation_main_accuracy = validation_main_accuracy
        self.validation_main_loss = validation_main_loss
        self.elapsed_time = elapsed_time

    def __repr__(self):
        return '<Log id: %r />' % (self.id)

    @property
    def serialize(self):
        ''' Return object data in easily serializeable format '''
        return {
            'id' : self.id,
            'epoch': self.epoch,
            'iteration' : self.iteration,
            'main_accuracy': self.main_accuracy,
            'main_loss': self.main_loss,
            'validation_main_accuracy': self.validation_main_accuracy,
            'validation_main_loss': self.validation_main_loss,
            'elapsed_time': self.elapsed_time
        }
