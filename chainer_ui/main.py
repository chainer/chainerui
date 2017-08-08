import os
import re
import json

from flask import Flask, render_template, request, jsonify
from flask_apscheduler import APScheduler

app = Flask(__name__)
project_root = os.environ.get('CHAINER_UI_TARGET_ROOT')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/v1/experiments', methods=['GET'])
def get_experiments():
    return jsonify(explore_project_dir())

def explore_project_dir():
    result_file_pattern = "\Aresult*"

    experiments = []

    _experiment_names = os.listdir(project_root)
    experiment_names = [f for f in _experiment_names if os.path.isdir(os.path.join(project_root, f))]

    for experiment_name in experiment_names:
        results = []

        _result_names = os.listdir(os.path.join(project_root, experiment_name))
        result_names = [f for f in _result_names if os.path.isdir(os.path.join(*[project_root, experiment_name, f]))]
        filterd_result_names = [f for f in result_names if re.search(result_file_pattern, f, re.IGNORECASE)]

        for result_name in filterd_result_names:
            result_log_file = os.path.join(*[project_root, experiment_name, result_name, 'log'])

            if os.path.isfile(result_log_file):
                with open(result_log_file) as json_data:
                    results.append({'logs': json.load(json_data), 'args': {}})

        experiments.append({'name': experiment_name, 'results': results})

    return {'experiments': experiments}

class JobConfig(object):
    JOBS = [{
        'id': 'job1',
        'func': explore_project_dir,
        'trigger': 'interval',
        'seconds': 5
    }]

if __name__ == '__main__':
    app.config.from_object(JobConfig())

    scheduler = APScheduler()
    scheduler.init_app(app)
    scheduler.start()

    app.run()
