import datetime
import json
import os

import pytest

from chainerui.models.command import Command
from chainerui.models.log import Log
from chainerui.models.result import Result
from chainerui.models.snapshot import Snapshot
from chainerui.tasks.crawl_result import _check_log_updated
from chainerui.tasks.crawl_result import crawl_result
from chainerui.tasks.crawl_result import load_result_json


@pytest.fixture(autouse=True, scope='function')
def result_path(func_dir):
    log = [
        {
            "main/loss": 0.1933198869228363,
            "validation/main/loss": 0.09147150814533234,
            "iteration": 600,
            "elapsed_time": 16.052587032318115,
            "epoch": 1,
            "main/accuracy": 0.9421835541725159,
            "validation/main/accuracy": 0.9703000783920288
        },
        {
            "main/loss": 0.07222291827201843,
            "validation/main/loss": 0.08141259849071503,
            "iteration": 1200,
            "elapsed_time": 19.54666304588318,
            "epoch": 2,
            "main/accuracy": 0.9771820902824402,
            "validation/main/accuracy": 0.975399911403656
        }
    ]
    with open(os.path.join(func_dir, 'log'), 'w') as f:
        json.dump(log, f)

    with open(os.path.join(func_dir, 'log.txt'), 'w') as f:
        f.write('json')

    open(os.path.join(func_dir, 'snapshot_iter_100'), 'w').close()
    open(os.path.join(func_dir, 'snapshot_iter_invalid'), 'w').close()

    commands = [
        {
            "name": "take_snapshot"
        }
    ]
    with open(os.path.join(func_dir, 'commands'), 'w') as f:
        json.dump(commands, f)


def test_check_log_updated(func_dir):
    result = Result(path_name=func_dir)
    assert _check_log_updated(result)
    assert result.log_modified_at is not None
    # NOTE: getmtime precision is rough, so back 0.1s on purpose
    modified_at = result.log_modified_at - datetime.timedelta(
        milliseconds=100)
    result.log_modified_at = modified_at

    with open(os.path.join(func_dir, 'log'), 'r') as f:
        logs = json.load(f)
    logs.append({
        "main/loss": 0.04882155358791351,
        "validation/main/loss": 0.09093106538057327,
        "iteration": 1800,
        "elapsed_time": 23.046298027038574,
        "epoch": 3,
        "main/accuracy": 0.9839146733283997,
        "validation/main/accuracy": 0.9726001620292664
    })
    with open(os.path.join(func_dir, 'log'), 'w') as f:
        json.dump(logs, f)
    assert _check_log_updated(result)
    assert result.log_modified_at != modified_at
    modified_at = result.log_modified_at

    assert not _check_log_updated(result)
    assert result.log_modified_at == modified_at

    os.remove(os.path.join(func_dir, 'log'))
    assert not _check_log_updated(result)


def test_load_result_json_with_correct_file(func_dir):
    assert len(load_result_json(func_dir, 'log')) > 0


def test_load_result_json_with_incorrect_file(func_dir):
    assert len(load_result_json(func_dir, 'log.txt')) == 0


def test_load_result_json_with_invalid_json(func_dir):
    with open(os.path.join(func_dir, 'log'), 'w') as f:
        f.write('{')  # broken JSON
    assert len(load_result_json(func_dir, 'log')) == 0


def test_crawl_result_reset(func_dir):
    # basic test is checked on 'test_api.py', so this test checks only
    # reset logic.
    result = Result(func_dir)
    result.updated_at = datetime.datetime.now()
    result.logs = [Log({'loss': 0.5}), Log({'loss': 0.2}), Log({'loss': 0.01})]
    result.commands = [Command('take_sanpshot'), Command('stop')]
    result.snapshots = [
        Snapshot('snapshot_iter_10', 10), Snapshot('snapshot_iter_11', 11)]

    actual = crawl_result(result, force=True, commit=False)
    assert len(actual.logs) == 2
    assert len(actual.commands) == 1
    assert len(actual.snapshots) == 1

    open(os.path.join(func_dir, 'snapshot_iter_200'), 'w').close()

    actual2 = crawl_result(actual, force=True, commit=False)
    assert len(actual2.logs) == 2
    assert len(actual2.commands) == 1
    assert len(actual2.snapshots) == 2


def test_crawl_result_default_name(func_dir):
    conf_path = os.path.join(func_dir, '.chainerui_conf')
    chainerui_conf = {'dummy_key': 'default_name'}
    with open(conf_path, 'w') as f:
        json.dump(chainerui_conf, f)
    # basic test is checked on 'test_api.py', so this test checks only
    # reset logic.
    result = Result(func_dir)
    assert result.name is None

    result2 = crawl_result(result, force=True, commit=False)
    assert result2.name is None

    chainerui_conf['default_result_name'] = 'default_name'
    with open(conf_path, 'w') as f:
        json.dump(chainerui_conf, f)
    result3 = crawl_result(result2, force=True, commit=False)
    assert result3.name == 'default_name'

    chainerui_conf['default_result_name'] = 'updated_name'
    with open(conf_path, 'w') as f:
        json.dump(chainerui_conf, f)
    result4 = crawl_result(result3, force=True, commit=False)
    assert result4.name == 'default_name'  # not updated


def test_crawl_result_invalid_default_name_file(func_dir):
    conf_path = os.path.join(func_dir, '.chainerui_conf')
    with open(conf_path, 'w') as f:
        f.write('{"default_result_name": "default_name"')  # broken JSON
    result = Result(func_dir)
    assert result.name is None

    result2 = crawl_result(result, force=True, commit=False)
    assert result2.name is None
