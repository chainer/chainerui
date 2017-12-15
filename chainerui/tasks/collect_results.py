import datetime
import os

from chainerui import DB_SESSION


def _list_result_paths(target_path, log_file_name='log'):
    """list_result_paths."""

    result_list = []

    for root, _dirs, _files in os.walk(os.path.abspath(target_path)):
        for name in _files:
            if name == log_file_name:
                result_list.append(root)

    return result_list


def _register_result(project_id, result_path):
    from chainerui import DB_SESSION
    from chainerui.models.result import Result

    result_path = os.path.abspath(result_path)

    contain_log_file = os.path.isfile(os.path.join(result_path, 'log'))

    if not contain_log_file:
        return False

    result_size = DB_SESSION.query(Result).filter_by(
        path_name=result_path
    ).count()

    if result_size is 0:
        new_result = Result(project_id=project_id, path_name=result_path)
        DB_SESSION.add(new_result)
        DB_SESSION.commit()


def collect_results(project, force=False):
    """collect_results."""

    now = datetime.datetime.now()

    if (now - project.updated_at).total_seconds() < 4 and (not force):
        return project

    result_paths = []

    if os.path.isdir(project.path_name):
        result_paths.extend(_list_result_paths(project.path_name))

    for result_path in result_paths:
        _register_result(project.id, result_path)

    project.updated_at = datetime.datetime.now()

    DB_SESSION.commit()
