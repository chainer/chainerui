''' Chainer-UI API '''

import os
import json

import argparse
from flask import Flask, render_template, jsonify, url_for
from flask_apscheduler import APScheduler

from models import Experiment, Result, Argument, Log
from database import db_session

from database import init_db


APP = Flask(__name__)


# static url cache buster
@APP.context_processor
def override_url_for():
    return dict(url_for=dated_url_for)

def dated_url_for(endpoint, **values):
    if endpoint == 'static':
        filename = values.get('filename', None)
        if filename:
            file_path = os.path.join(APP.root_path,
                                     endpoint, filename)
            values['_'] = int(os.stat(file_path).st_mtime)
    return url_for(endpoint, **values)


@APP.route('/')
def index():
    ''' / '''
    return render_template('index.html')

@APP.route('/api/v1/experiments', methods=['GET'])
def get_experiments():
    ''' /api/v1/experiments '''

    db_session.query(Experiment).delete()
    db_session.query(Result).delete()

    for experiment in explore_project_dir()['experiments']:
        print(experiment['name'])
        _experiment = Experiment(experiment['name'])

        for result in experiment['results']:
            print(result['name'])
            _result = Result(result['name'])

            _argument = Argument('foo', 'var')
            _log = Log('log')

            _result.arguments.append(_argument)
            _result.logs.append(_log)

            _experiment.results.append(_result)

        db_session.add(_experiment)
        db_session.commit()

    for e in Experiment.query.all():
        for r in e.results:
            print(e, r)
            print("- {0}".format(r.arguments))
            print("- {0}".format(r.logs))
            print()

    return jsonify(explore_project_dir())

def explore_project_dir():
    ''' explore_project_dir '''
    experiments = []
    result_index = 1

    _experiment_names = os.listdir(APP.config['TARGET_DIR'])
    experiment_names = [
        f for f in _experiment_names if os.path.isdir(os.path.join(APP.config['TARGET_DIR'], f))
    ]
    filterd_experiment_names = [f for f in experiment_names if f[0] not in ['.', '_']]

    for experiment_index, experiment_name in enumerate(filterd_experiment_names):
        results = []

        results_path = os.path.join(*[APP.config['TARGET_DIR'], experiment_name, 'results'])

        if os.path.isdir(results_path):

            result_names = os.listdir(results_path)
            result_names = [f for f in result_names if os.path.isdir(os.path.join(results_path, f))]

            for result_name in result_names:
                result = {'id': result_index, 'name': result_name, 'logs': [], 'args': {}}
                result_index += 1

                result_path = os.path.join(results_path, result_name)

                result_args_file = os.path.join(result_path, 'args')
                if os.path.isfile(result_args_file):
                    with open(result_args_file) as json_data:
                        result['args'] = json.load(json_data)

                result_log_file = os.path.join(result_path, 'log')
                if os.path.isfile(result_log_file):
                    with open(result_log_file) as json_data:
                        result['logs'] = json.load(json_data)

                results.append(result)

        experiments.append({
            'id': experiment_index + 1,
            'name': experiment_name,
            'results': results
        })

    return {'experiments': experiments}

if __name__ == '__main__':
    init_db()

    PARSER = argparse.ArgumentParser(description='chainer ui')
    PARSER.add_argument('-d', '--dir', required=True, type=str, help='target directory')
    ARGS = PARSER.parse_args()

    APP.config['TARGET_DIR'] = ARGS.dir

    APP.config['DEBUG'] = True
    APP.run()
