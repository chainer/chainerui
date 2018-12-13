import hashlib
import time


def get_hash(key):
    return hashlib.md5(key.encode('utf-8')).hexdigest()[:12]


def get_unixtime(dt):
    # same as datetime.timestamp, but Python2.7 does not support the method.
    return time.mktime(dt.timetuple()) + dt.microsecond/1e6
