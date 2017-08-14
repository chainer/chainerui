import os
import re
import json

from flask import Flask, render_template, request, jsonify, url_for
from flask_apscheduler import APScheduler

app = Flask(__name__)
project_root = os.environ.get('CHAINER_UI_TARGET_ROOT')


# static url cache buster
@app.context_processor
def override_url_for():
    return dict(url_for=dated_url_for)

def dated_url_for(endpoint, **values):
    if endpoint == 'static':
        filename = values.get('filename', None)
        if filename:
            file_path = os.path.join(app.root_path,
                                     endpoint, filename)
            values['_'] = int(os.stat(file_path).st_mtime)
    return url_for(endpoint, **values)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/v1/experiments', methods=['GET'])
def get_experiments():
    return jsonify(explore_project_dir())

def explore_project_dir():
    result_file_pattern = "\Aresult*"
    experiments = []
    result_index = 1

    _experiment_names = os.listdir(project_root)
    experiment_names = [f for f in _experiment_names if os.path.isdir(os.path.join(project_root, f))]

    for experiment_index, experiment_name in enumerate(experiment_names):
        results = []

        _result_names = os.listdir(os.path.join(project_root, experiment_name))
        result_names = [f for f in _result_names if os.path.isdir(os.path.join(*[project_root, experiment_name, f]))]
        filterd_result_names = [f for f in result_names if re.search(result_file_pattern, f, re.IGNORECASE)]

        for result_name in filterd_result_names:
            result = {'id': result_index , 'name': result_name, 'logs': [], 'args': {}}
            result_index += 1

            result_args_file = os.path.join(*[project_root, experiment_name, result_name, 'args'])
            if os.path.isfile(result_args_file):
                with open(result_args_file) as json_data:
                    result['args'] = json.load(json_data)

            result_log_file = os.path.join(*[project_root, experiment_name, result_name, 'log'])
            if os.path.isfile(result_log_file):
                with open(result_log_file) as json_data:
                    result['logs'] = json.load(json_data)

            results.append(result)

        experiments.append({'id': experiment_index + 1, 'name': experiment_name, 'results': results})

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

    # scheduler = APScheduler()
    # scheduler.init_app(app)
    # scheduler.start()

    app.run()
