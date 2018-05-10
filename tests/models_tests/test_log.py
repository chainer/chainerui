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


def find_log_item(log_items, key):
    matching_log_items = [
        log_item for log_item in log_items if log_item['key'] == key
    ]
    return matching_log_items[0]


def test_log_serialize_numbers():
    json_data = get_test_json()
    logs = [Log(data) for data in json_data]
    serialized_data = [log.serialize for log in logs]

    assert find_log_item(serialized_data[0]['logItems'], 'epoch')['value'] == 1
    assert find_log_item(serialized_data[1]['logItems'], 'epoch')['value'] == 2


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

    assert find_log_item(serialized_data[0]['logItems'], 'epoch')['value'] == 0
    assert find_log_item(
        serialized_data[0]['logItems'], 'model_files')['value'] is None
    assert find_log_item(serialized_data[1]['logItems'], 'epoch')['value'] == 1
    assert find_log_item(serialized_data[2]['logItems'], 'epoch')['value'] == 2


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

    assert find_log_item(
        serialized_data[0]['logItems'], 'iteration')['value'] == 0
    assert find_log_item(
        serialized_data[0]['logItems'], 'epoch')['value'] is None
    assert find_log_item(
        serialized_data[0]['logItems'], 'loss')['value'] is None
    assert find_log_item(serialized_data[1]['logItems'], 'epoch')['value'] == 1
    assert find_log_item(serialized_data[2]['logItems'], 'epoch')['value'] == 2
