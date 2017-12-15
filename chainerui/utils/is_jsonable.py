import json


def is_jsonable(obj):
    try:
        json.dumps(obj)
    except TypeError:
        return False
    return True
