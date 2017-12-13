import json


from sqlalchemy import Column, Integer, String, ForeignKey
from chainerui import DB_BASE


class Log(DB_BASE):
    """Log Model."""
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
        """serialize."""

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
