import json


class NotInTestEnvironmentException(Exception):
    pass


def is_valid_json_str(json_str):
    try:
        json.loads(json_str)
    except json.decoder.JSONDecodeError:
        return False
    return True
