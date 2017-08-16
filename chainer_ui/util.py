''' util.py '''
import os
import json
from database import db_session
from models import Experiment, Result, Argument, Log

def explore_project_dir(target_dir=None):
    ''' explore_project_dir '''
    experiments = []
    result_index = 1

    _experiment_names = os.listdir(target_dir)
    experiment_names = [
        f for f in _experiment_names if os.path.isdir(os.path.join(target_dir, f))
    ]
    filterd_experiment_names = [f for f in experiment_names if f[0] not in ['.', '_']]

    for experiment_index, experiment_name in enumerate(filterd_experiment_names):
        results = []

        results_path = os.path.join(*[target_dir, experiment_name, 'results'])

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

    db_session.query(Experiment).delete()
    db_session.query(Result).delete()
    db_session.query(Argument).delete()
    db_session.query(Log).delete()

    for experiment in experiments:
        _experiment = Experiment(experiment['name'])

        for result in experiment['results']:
            arguments = []
            logs = []
            _result = Result(result['name'])

            for key, value in result['args'].items():
                arguments.append(Argument(key, value))

            for log in result['logs']:
                logs.append(Log(
                    log['epoch'],
                    log['iteration'],
                    log['main/accuracy'],
                    log['main/loss'],
                    log['validation/main/accuracy'],
                    log['validation/main/loss'],
                    log['elapsed_time']
                ))

            _result.arguments = arguments
            _result.logs = logs
            _experiment.results.append(_result)

        db_session.add(_experiment)
        db_session.commit()

    return experiments