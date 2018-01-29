from json import dumps


def is_jsonable(obj):
    # Try to dump invalid object with default json library
    try:
        dumps(obj)
    except TypeError:
        return False
    return True
