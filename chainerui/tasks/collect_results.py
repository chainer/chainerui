import datetime
import os

from chainerui.database import db
from chainerui.models.result import Result


def _list_result_paths(target_path, log_file_name='not used anymore'):
    """list_result_paths."""

    result_list = []

    for root, _dirs, _files in os.walk(os.path.abspath(target_path)):
        for name in _files:
            if name == 'log.jsonl' or name == 'log':
                result_list.append(root)

    return result_list


def _register_result(project_id, result_path):
    result_path = os.path.abspath(result_path)

    jsonl_path = os.path.join(result_path, 'log.jsonl')
    json_path = os.path.join(result_path, 'log')

    contain_log_file = os.path.isfile(jsonl_path) or \
        os.path.isfile(json_path)

    if not contain_log_file:
        return

    Result.create(project_id=project_id, path_name=result_path)


def collect_results(project, force=False):
    """collect_results."""
    if not project.crawlable:
        return project

    now = datetime.datetime.now()

    if (now - project.updated_at).total_seconds() < 4 and (not force):
        return project

    result_paths = []
    if os.path.isdir(project.path_name):
        result_paths.extend(_list_result_paths(project.path_name))

    registered_results = db.session.query(Result.path_name).filter_by(
        project_id=project.id
    ).all()
    registered_paths = {r.path_name for r in registered_results}

    for result_path in result_paths:
        if result_path not in registered_paths:
            _register_result(project.id, result_path)

    project.updated_at = datetime.datetime.now()

    db.session.commit()

    return project
