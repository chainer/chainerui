# -*- coding: utf-8 -*-

''' util.py '''

import os
import json

from database import create_db_session
from models import Result, Log, Argument, Command, Snapshot




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
        'logs': [],
        'args': [],
        'commands': [],
        'snapshots': []
    }

    if os.path.isdir(path):
        result['logs'] = explore_log_file(path, 'log')
        result['args'] = explore_log_file(path, 'args')
        result['commands'] = explore_log_file(path, 'commands')
        result['snapshots'] = [x for x in os.listdir(path) if x.count('snapshot_iter_')]

    return result


def crawl_result_table():
    ''' crawl_result_table '''

    db_session = create_db_session()

    for result in db_session.query(Result).all():
        crawl_result = explore_result_dir(result.path_name)

        if result.args is None:
            result.args = Argument(json.dumps(crawl_result['args']))

        if len(result.logs) < len(crawl_result['logs']):
            for log in crawl_result['logs'][len(result.logs):]:
                result.logs.append(Log(json.dumps(log)))

        result.commands = [Command(cmd['name'], json.dumps(cmd['body']), json.dumps(cmd['executed_at'])) for cmd in crawl_result['commands']]


        print(crawl_result['snapshots'])

        

        result.snapshots = [Snapshot(s, int(s.split('snapshot_iter_')[1])) for s in crawl_result['snapshots']]

        db_session.commit()
