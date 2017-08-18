''' util.py '''

import os
import json

from database import create_db_session
from models import Result, Log




def explore_log_file(result_path, log_file_name):
    ''' explore_log_file '''
    log_path = os.path.join(result_path, log_file_name)

    log = []
    if os.path.isfile(log_path):
        with open(log_path) as json_data:
            log = json.load(json_data)

    return log


def explore_result_dir(path):
    ''' explore_result_dir '''
    result = {
        'logs': []
    }

    if os.path.isdir(path):
        result['logs'] = explore_log_file(path, 'log')

    return result


def crawl_result_table():
    ''' crawl_result_table '''

    db_session = create_db_session()

    for result in db_session.query(Result).all():
        print(result.path_name)

        crawl_result = explore_result_dir(result.path_name)

        if len(result.logs) < len(crawl_result['logs']):
            for log in crawl_result['logs'][len(result.logs):]:
                result.logs.append(Log(str(log)))

        db_session.commit()
