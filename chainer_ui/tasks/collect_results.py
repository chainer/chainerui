''' collect_results.py '''

import os

from chainer_ui import DB_SESSION
from chainer_ui.models.project import Project


def _list_result_paths(target_path, log_file_name='log'):
    ''' list_result_paths '''

    result_list = []

    for root, _dirs, _files in os.walk(os.path.abspath(target_path)):
        for name in _files:
            if name == log_file_name:
                result_list.append(root)

    return result_list


def _register_result(project_id, result_path):
    from chainer_ui import DB_SESSION
    from chainer_ui.models.result import Result

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


def collect_results():
    ''' collect_results '''

    for project in DB_SESSION.query(Project).all():
        result_paths = []

        if os.path.isdir(project.path_name):
            result_paths.extend(_list_result_paths(project.path_name))

        for result_path in result_paths:
            _register_result(project.id, result_path)
