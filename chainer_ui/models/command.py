''' command.py '''


from sqlalchemy import Column, Integer, String, ForeignKey
from chainer_ui import DB_BASE


class Command(DB_BASE):
    ''' Command Model '''
    __tablename__ = 'command'

    id = Column(Integer, primary_key=True)
    result_id = Column(Integer, ForeignKey('result.id'))
    name = Column(String(1024))
    request = Column(String(1024))
    response = Column(String(1024))

    def __init__(self, name=None, request=None, response=None):
        self.name = name
        self.request = request
        self.response = response

    def __repr__(self):
        return '<Command id: %r />' % (self.id)

    @property
    def serialize(self):
        ''' serialize '''

        return {
            'id': self.id,
            'name': self.name,
            'request': self.request,
            'response': self.response
        }
