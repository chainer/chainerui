from math import isinf
from math import isnan

import msgpack
import numbers
from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import LargeBinary

from chainerui import database


class Log(database.BASE):
    """Log Model."""
    __tablename__ = 'log'

    id = Column(Integer, primary_key=True)
    result_id = Column(Integer, ForeignKey('result.id'))
    data = Column(LargeBinary(2048))

    def __init__(self, data=None):
        bdata = msgpack.packb(data, use_bin_type=True)
        self.data = bdata

    def __repr__(self):
        return '<Log id: %r />' % (self.id)

    @property
    def serialize(self):
        """serialize."""

        log_items = []

        data = msgpack.unpackb(self.data, encoding='utf-8')
        for item in data.items():
            value_to_store = (
                None
                if not isinstance(item[1], numbers.Number)
                or isinf(item[1])
                or isnan(item[1])
                else item[1]
            )

            log_items.append({
                'logId': self.id,
                'key': item[0],
                'value': value_to_store
            })

        return {
            'id': self.id,
            'resultId': self.result_id,
            'logItems': log_items
        }
