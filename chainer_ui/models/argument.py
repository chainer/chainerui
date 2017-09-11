''' argument.py '''


import json


from sqlalchemy import Column, Integer, String, ForeignKey
from chainer_ui import DB_BASE


class Argument(DB_BASE):
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
