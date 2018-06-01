import datetime
import json
import os

from chainerui import DB_SESSION
from chainerui.models.argument import Argument
from chainerui.models.log import Log
from chainerui.models.result import Result
from chainerui.models.snapshot import Snapshot
from chainerui.utils.command_item import CommandItem
from chainerui.utils import is_numberable


def load_result_json(result_path, json_file_name):
    """load_result_json."""
    json_path = os.path.join(result_path, json_file_name)

    _list = []
    if os.path.isfile(json_path):
        with open(json_path) as json_data:
            try:
                _list = json.load(json_data)
            except json.decoder.JSONDecodeError as err:
                print("Failed to load result json: {}, {}".format(json_path, err))

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
            result['logs'] = load_result_json(result_path, 'log')
        result['args'] = load_result_json(result_path, 'args')
        result['commands'] = CommandItem.load_commands(result_path)

        snapshots = [
            x for x in os.listdir(result_path) if x.count('snapshot_iter_')
        ]
        snapshots.sort()
        result['snapshots'] = snapshots

    return result


def _check_log_updated(result):
    log_json_path = os.path.join(result.path_name, 'log')
    if not os.path.isfile(log_json_path):
        # log file is removed, so don't have to update
        return False

    current_modified_at = result.log_modified_at
    modified_at = datetime.datetime.fromtimestamp(
        os.path.getmtime(log_json_path))
    if current_modified_at is None or current_modified_at != modified_at:
        result.log_modified_at = modified_at
        return True

    return False


def crawl_result(result_id, force=False):
    """crawl_results."""

    current_result = DB_SESSION.query(Result).filter_by(id=result_id).first()

    now = datetime.datetime.now()

    if (not force) and (now - current_result.updated_at).total_seconds() < 4:
        return current_result

    # if log file is not updated, not necessary to get log contents
    is_updated = _check_log_updated(current_result)
    crawled_result = crawl_result_path(current_result.path_name, is_updated)

    if is_updated:
        current_log_idx = len(current_result.logs)
        if len(crawled_result['logs']) < current_log_idx:
            current_log_idx = 0
            current_result.logs = []
            current_result.args = None
        for log in crawled_result['logs'][current_log_idx:]:
            current_result.logs.append(Log(log))

    if current_result.args is None:
        current_result.args = Argument(json.dumps(crawled_result['args']))

    current_result.commands = []
    current_result.snapshots = []

    for cmd in crawled_result['commands']:
        current_result.commands.append(cmd.to_model())

    for snapshot in crawled_result['snapshots']:
        number_str = snapshot.split('snapshot_iter_')[1]
        if is_numberable(number_str):
            current_result.snapshots.append(
                Snapshot(snapshot, int(number_str))
            )

    current_result.updated_at = datetime.datetime.now()
    DB_SESSION.commit()

    return current_result
