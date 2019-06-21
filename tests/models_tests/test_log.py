from chainerui.models.log import Log


def get_test_json():
    return [
        {
            "loss": 100,
            "epoch": 1,
        },
        {
            "loss": 90,
            "epoch": 2,
        }
    ]


def test_log_serialize_numbers():
    json_data = get_test_json()
    logs = [Log(data) for data in json_data]
    serialized_data = [log.serialize for log in logs]

    assert serialized_data[0]['logDict']['epoch'] == 1
    assert serialized_data[1]['logDict']['epoch'] == 2


def test_log_serialize_arbitrary_data():
    json_data = get_test_json()
    json_data.insert(
        0,
        {
            "loss": 110,
            "epoch": 0,
            "model_files": ["Model", "model.py"]
        }
    )

    logs = [Log(data) for data in json_data]
    serialized_data = [log.serialize for log in logs]

    assert serialized_data[0]['logDict']['epoch'] == 0
    assert serialized_data[0]['logDict']['model_files'] is None
    assert serialized_data[1]['logDict']['epoch'] == 1
    assert serialized_data[2]['logDict']['epoch'] == 2


def test_log_serialize_nan_and_inf():
    json_data = get_test_json()
    json_data.insert(
        0,
        {
            "loss": float('nan'),
            "epoch": float('inf'),
            "iteration": 0,
        }
    )

    logs = [Log(data) for data in json_data]
    serialized_data = [log.serialize for log in logs]

    assert serialized_data[0]['logDict']['iteration'] == 0
    assert serialized_data[0]['logDict']['epoch'] is None
    assert serialized_data[0]['logDict']['loss'] is None
    assert serialized_data[1]['logDict']['epoch'] == 1
    assert serialized_data[2]['logDict']['epoch'] == 2
