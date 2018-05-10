import pytest

from chainerui.models import Log
from chainerui.models import Result


def get_test_logs():
    logs_json = [
        {
            "main/loss": 0.40800962336361407,
            "main/accuracy": 0.8862333340570331,
            "validation/main/loss": 0.19627878157887607,
            "validation/main/accuracy": 0.9437000030279159,
            "epoch": 1,
            "iteration": 600,
            "elapsed_time": 11.176028114001383
        },
        {
            "main/loss": 0.175308293333898,
            "main/accuracy": 0.9492000019550324,
            "validation/main/loss": 0.14389827038859948,
            "validation/main/accuracy": 0.9580000054836273,
            "epoch": 2,
            "iteration": 1200,
            "elapsed_time": 22.5790320849992
        },
        {
            "main/loss": 0.12263125797733665,
            "main/accuracy": 0.9651666717727979,
            "validation/main/loss": 0.11622621351154522,
            "validation/main/accuracy": 0.9643000048398972,
            "epoch": 3,
            "iteration": 1800,
            "elapsed_time": 33.954753322002944
        },
        {
            "main/loss": 0.09348084449768067,
            "main/accuracy": 0.9736166762312254,
            "validation/main/loss": 0.0913344160350971,
            "validation/main/accuracy": 0.9728000032901764,
            "epoch": 4,
            "iteration": 2400,
            "elapsed_time": 46.84794206800143
        },
        {
            "main/loss": 0.07337521777333071,
            "main/accuracy": 0.9787000101804734,
            "validation/main/loss": 0.08345628718438093,
            "validation/main/accuracy": 0.9745000076293945,
            "epoch": 5,
            "iteration": 3000,
            "elapsed_time": 58.61258131300565
        },
        {
            "main/loss": 0.05976833035470918,
            "main/accuracy": 0.9828166776895523,
            "validation/main/loss": 0.07841673109389376,
            "validation/main/accuracy": 0.9764000064134598,
            "epoch": 6,
            "iteration": 3600,
            "elapsed_time": 70.17813067500538
        },
        {
            "main/loss": 0.04946699039855351,
            "main/accuracy": 0.9863833442330361,
            "validation/main/loss": 0.08190375177306124,
            "validation/main/accuracy": 0.974200005531311,
            "epoch": 7,
            "iteration": 4200,
            "elapsed_time": 82.8319199510006
        }
    ]
    return list(map(Log, logs_json))


def get_test_result(path_name):
    result = Result(
        path_name=path_name,
        name="test-result",
    )
    result.logs = get_test_logs()
    return result


@pytest.mark.parametrize('logs_limit,expected_indices', [
    (-1, range(7)),
    (0, []),
    (5, [0, 1, 3, 4, 6]),
    (7, range(7)),
    (100, range(7)),
])
def test_sampled_logs(tmpdir, logs_limit, expected_indices):
    result = get_test_result(str(tmpdir))
    logs = result.logs
    sampled_logs = result.sampled_logs(logs_limit)
    assert len(sampled_logs) == len(expected_indices)
    for i, j in enumerate(expected_indices):
        sampled_logs[i] == logs[j]
