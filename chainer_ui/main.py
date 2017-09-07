# -*- coding: utf-8 -*-

''' Chainer-UI API '''

import os
import json
import argparse
import shutil
import tempfile

from flask import Flask, request, render_template, jsonify, abort, url_for
from flask_apscheduler import APScheduler

from models import Result
from database import init_db, create_db_session

from util import crawl_result_table


APP = Flask(__name__)


# static url cache buster
@APP.context_processor
def override_url_for():
    ''' override_url_for '''
    return dict(url_for=dated_url_for)


def dated_url_for(endpoint, **values):
    ''' dated_url_for '''
    # todo: utilとかに移動したい
    if endpoint == 'static':
        filename = values.get('filename', None)
        if filename:
            file_path = os.path.join(APP.root_path, endpoint, filename)
            values['_'] = int(os.stat(file_path).st_mtime)
    return url_for(endpoint, **values)


@APP.route('/')
@APP.route('/results/<int:result_id>')
def index(**kwargs):
    ''' render react app '''
    return render_template('index.html')


@APP.route('/api/v1/results', methods=['GET'])
def get_results():
    ''' /api/v1/results '''

    db_session = create_db_session()
    results = db_session.query(Result).all()

    return jsonify({'results': [result.serialize for result in results]})

@APP.route('/api/v1/results/<int:result_id>', methods=['PUT'])
def update_result(result_id):
    ''' PUT /api/v1/results/<int:result_id> '''

    db_session = create_db_session()
    result = db_session.query(Result).filter_by(id=result_id).first()
    if result is None:
        response = jsonify({'result': None, 'message': 'No interface defined for URL.'})
        return response, 404

    request_json = request.get_json()
    request_result = request_json.get('result')

    name = request_result.get('name', None)
    if name is not None:
        result.name = name

    db_session.add(result)
    db_session.commit()

    return jsonify({'result': result.serialize})

@APP.route('/api/v1/results/<int:result_id>', methods=['DELETE'])
def delete_result(result_id):
    ''' DELETE /api/v1/results/<int:result_id> '''

    db_session = create_db_session()
    result = db_session.query(Result).filter_by(id=result_id).first()
    if result is None:
        response = jsonify({'result': None, 'message': 'No interface defined for URL.'})
        return response, 404

    db_session.delete(result)
    db_session.commit()

    # response deleted result
    return jsonify({'result': result.serialize})


@APP.route('/api/v1/results/<int:result_id>/commands', methods=['POST'])
def insert_command(result_id):
    ''' POST /api/v1/results/<int:result_id>/commands '''

    db_session = create_db_session()
    result = db_session.query(Result).filter_by(id=result_id).first()
    if result is None:
        response = jsonify({'result': None, 'message': 'No interface defined for URL.'})
        return response, 404

    request_json = request.get_json()

    command_path = os.path.join(result.path_name, 'commands')
    if os.path.isfile(command_path):
        with open(command_path) as json_data:
            commands = json.load(json_data)
    else:
        commands = []

    commands.append(request_json)

    _fd, path = tempfile.mkstemp(prefix='commands', dir=result.path_name)
    with os.fdopen(_fd, 'w') as _f:
        json.dump(commands, _f, indent=4)

    shutil.move(path, command_path)
    return jsonify(request_json)


if __name__ == '__main__':
    init_db()

    PARSER = argparse.ArgumentParser(description='chainer ui')
    PARSER.add_argument('-H', '--host', required=False, help='host', default='localhost')
    PARSER.add_argument('-p', '--port', required=False, type=int, help='port', default=5000)
    ARGS = PARSER.parse_args()

    APP.config['DEBUG'] = True

    class CrawlJobConfig(object):
        ''' job config '''
        JOBS = [
            {
                'id': 'job1',
                'func': crawl_result_table,
                'trigger': 'interval',
                'seconds': 5
            }
        ]

    APP.config.from_object(CrawlJobConfig())

    SCHEDULER = APScheduler()
    SCHEDULER.init_app(APP)

    SCHEDULER.start()
    APP.run(host=ARGS.host, port=ARGS.port, threaded=True)
