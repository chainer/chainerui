''' Chainer-UI API '''

import os
import json

import argparse
from flask import Flask, render_template, jsonify

APP = Flask(__name__)

@APP.route('/')
def index():
    ''' / '''
    return render_template('index.html')

@APP.route('/api/v1/experiments', methods=['GET'])
def get_experiments():
    ''' /api/v1/experiments '''
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
    PARSER = argparse.ArgumentParser(description='chainer ui')
    PARSER.add_argument('-d', '--dir', required=True, type=str, help='target directory')
    ARGS = PARSER.parse_args()

    APP.config['TARGET_DIR'] = ARGS.dir
    APP.run()
