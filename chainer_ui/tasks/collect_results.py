''' collect_results.py '''

import os


def _list_result_paths(target_path, log_file_name='log'):
    ''' list_result_paths '''

    result_list = []

    for root, _dirs, _files in os.walk(os.path.abspath(target_path)):
        for name in _files:
            if name == log_file_name:
                result_list.append(root)

    return result_list


def _register_result(result_path):
    from chainer_ui import create_db_session
    from chainer_ui.models.result import Result

    result_path = os.path.abspath(result_path)

    contain_log_file = os.path.isfile(os.path.join(result_path, 'log'))

    if not contain_log_file:
        return False

    db_session = create_db_session()

    result_size = db_session.query(Result).filter_by(
        path_name=result_path
    ).count()

    if result_size is 0:
        new_result = Result(result_path)
        db_session.add(new_result)
        db_session.commit()


def collect_results(target_dir_list=None):
    ''' collect_results '''

    if target_dir_list is None:
        return

    result_paths = []

    for target_path in target_dir_list:
        if os.path.isdir(target_path):
            result_paths.extend(_list_result_paths(target_path))

    for result_path in result_paths:
        _register_result(result_path)
