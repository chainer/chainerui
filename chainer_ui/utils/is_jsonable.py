import json


def is_jsonable(obj):
    try:
        json.dumps(obj)
    except:
        return False
    return True
