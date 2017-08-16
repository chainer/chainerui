''' Chainer-UI API '''

import os
import argparse

from flask import Flask, render_template, jsonify, url_for
from flask_apscheduler import APScheduler

from models import Experiment, Result, Argument, Log
from database import init_db

from util import explore_project_dir


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
def index():
    ''' / '''
    return render_template('index.html')


@APP.route('/api/v1/experiments', methods=['GET'])
def get_experiments():
    ''' /api/v1/experiments '''
    # todo: データ数が増えると遅くなるので、result毎に別のAPIにするか考える
    experiments = Experiment.query.join(Result).join(Log).join(Argument).all()
    return jsonify({'experiments': [i.serialize for i in experiments]})


if __name__ == '__main__':
    init_db()

    PARSER = argparse.ArgumentParser(description='chainer ui')
    PARSER.add_argument('-d', '--dir', required=True, type=str, help='target directory')
    ARGS = PARSER.parse_args()

    APP.config['TARGET_DIR'] = ARGS.dir
    APP.config['DEBUG'] = True

    class JobConfig(object):
        ''' job config '''
        JOBS = [
            {
                'id': 'job1',
                'func': explore_project_dir,
                'trigger': 'interval',
                'kwargs': [('target_dir', APP.config['TARGET_DIR'])],
                'seconds': 3
            }
        ]

    APP.config.from_object(JobConfig())

    SCHEDULER = APScheduler()
    SCHEDULER.init_app(APP)

    SCHEDULER.start()
    APP.run()
