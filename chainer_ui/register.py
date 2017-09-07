# -*- coding: utf-8 -*-

''' register.py '''

import os
import argparse

from database import init_db, create_db_session
from models import Result

def contain_log_file(result_path):
    ''' contain_log_file '''
    log_path = os.path.join(result_path, 'log')
    return os.path.isfile(log_path)

def main():
    ''' main '''
    init_db()

    db_session = create_db_session()

    parser = argparse.ArgumentParser()
    parser.add_argument('result')

    arguments = parser.parse_args()

    result_path = os.path.abspath(arguments.result)

    if contain_log_file(result_path):
        new_result_path = Result(result_path)
        db_session.add(new_result_path)
        db_session.commit()

    else:
        print('ng')

if __name__ == '__main__':
    main()
