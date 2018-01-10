import json


class NotInTestEnvironmentException(Exception):
    pass


def is_valid_json_str(json_str):
    try:
        json.loads(json_str)
    except json.decoder.JSONDecodeError:
        return False
    return True


def assert_json_api(resp, status_code=200):
    assert resp.status_code == status_code
    json_str = resp.data.decode()
    assert is_valid_json_str(json_str)
    return json.loads(json_str)
