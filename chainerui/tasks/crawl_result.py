import datetime
import json
import os

from chainerui.database import db
from chainerui.logging import logger
from chainerui.models.argument import Argument
from chainerui.models.command import Command
from chainerui.models.log import Log
from chainerui.models.snapshot import Snapshot
from chainerui.utils import is_numberable


def load_result_json(result_path, json_file_name, format='json'):
    """load_result_json."""
    json_path = os.path.join(result_path, json_file_name)

    _list = []
    if os.path.isfile(json_path):
        with open(json_path) as json_data:
            try:
                if format == 'json':
                    _list = json.load(json_data)
                elif format == 'jsonl':
                    _list = [json.loads(json_line) for json_line in json_data]
            except ValueError as err:
                logger.error(
                    'Failed to load json: {}, {}'.format(json_path, err))

    return _list


def crawl_result_path(result_path, include_log):
    """crawl_result_path."""
    result = {
        'logs': [],
        'args': [],
        'commands': [],
        'snapshots': []
    }

    if os.path.isdir(result_path):
        if include_log:
            if os.path.isfile(os.path.join(result_path, 'log')):
                result['logs'] = load_result_json(result_path, 'log', 'json')
            elif os.path.isfile(os.path.join(result_path, 'log.jsonl')):
                result['logs'] = load_result_json(
                    result_path,
                    'log.jsonl',
                    'jsonl'
                )
        result['args'] = load_result_json(result_path, 'args')
        result['commands'] = load_result_json(result_path, 'commands')

        snapshots = [
            x for x in os.listdir(result_path) if x.count('snapshot_iter_')
        ]
        snapshots.sort()
        result['snapshots'] = snapshots

    return result


def _check_log_updated(result):
    log_json_path = os.path.join(result.path_name, 'log')
    log_jsonl_path = os.path.join(result.path_name, 'log.jsonl')

    exist_log_json = os.path.isfile(log_json_path)
    exist_log_jsonl = os.path.isfile(log_jsonl_path)

    if not exist_log_json and not exist_log_jsonl:
        # log file is removed, so don't have to update
        return False

    if exist_log_jsonl:
        log_json_path = log_jsonl_path

    current_modified_at = result.log_modified_at
    modified_at = datetime.datetime.fromtimestamp(
        os.path.getmtime(log_json_path))
    if current_modified_at is None or current_modified_at != modified_at:
        result.log_modified_at = modified_at
        return True

    return False


def _update_to_default_name(result):
    conf_path = os.path.join(result.path_name, '.chainerui_conf')
    if not os.path.isfile(conf_path):
        return
    with open(conf_path) as f:
        try:
            chainerui_conf = json.load(f)
        except ValueError as err:
            logger.error(
                'Failed to load json: {}, {}'.format(conf_path, err))
            return
    default_name = chainerui_conf.get('default_result_name', None)
    if default_name is None:
        return
    result.name = default_name


def crawl_result(result, force=False, commit=True):
    """crawl_results."""
    if not result.crawlable:
        return result
    now = datetime.datetime.now()

    if (not force) and (now - result.updated_at).total_seconds() < 4:
        return result

    # if log file is not updated, not necessary to get log contents
    is_updated = _check_log_updated(result)
    crawled_result = crawl_result_path(result.path_name, is_updated)

    if is_updated:
        current_log_idx = len(result.logs)
        if len(crawled_result['logs']) < current_log_idx:
            current_log_idx = 0
            result.logs = []
            result.args = None
        for log in crawled_result['logs'][current_log_idx:]:
            result.logs.append(Log(log))

    if result.args is None:
        result.args = Argument(json.dumps(crawled_result['args']))

    if result.name is None:
        _update_to_default_name(result)

    # commands list includes new commands and already registered commands.
    # registered commands can be get response, so need to update
    current_cmd_idx = len(result.commands)
    if len(crawled_result['commands']) < current_cmd_idx:
        current_cmd_idx = 0
        result.commands = []
        result.snapshots = []
    for cmd in crawled_result['commands'][current_cmd_idx:]:
        result.commands.append(Command(**cmd))
    for i, cmd in enumerate(crawled_result['commands'][:current_cmd_idx]):
        result.commands[i].update(cmd.get('response', None))

    # snapshots file list are sorted but not natural order, for example,
    # 'iter_900' set latter than 'iter_1000', so need to check the file
    # is registered or not.
    registered_snapshot_keys = [ss.iteration for ss in result.snapshots]
    for i, snapshot in enumerate(crawled_result['snapshots']):
        number_str = snapshot.split('snapshot_iter_')[1]
        if not is_numberable(number_str):
            continue
        number = int(number_str)
        if number in registered_snapshot_keys:
            continue
        result.snapshots.append(Snapshot(snapshot, number))

    result.updated_at = datetime.datetime.now()
    if commit:
        db.session.commit()

    return result
