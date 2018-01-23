import json
import os
import shutil
import tempfile
import unittest

from chainerui import CHAINERUI_ENV
from chainerui import create_app
from chainerui import create_db
from chainerui import DB_FILE_PATH
from chainerui.models.project import Project
from chainerui import upgrade_db
from chainerui.utils.commands_state import CommandsState

from six import string_types

from tests.helpers import assert_json_api
from tests.helpers import NotInTestEnvironmentException


def setup_test_project(root_path):
    # log only
    path = os.path.join(root_path, '10000')
    os.makedirs(path)
    log = [
        {
            "main/loss": 0.1933198869228363,
            "validation/main/loss": 0.09147150814533234,
            "iteration": 600,
            "elapsed_time": 16.052587032318115,
            "epoch": 1,
            "main/accuracy": 0.9421835541725159,
            "validation/main/accuracy": 0.9703000783920288
        },
        {
            "main/loss": 0.07222291827201843,
            "validation/main/loss": 0.08141259849071503,
            "iteration": 1200,
            "elapsed_time": 19.54666304588318,
            "epoch": 2,
            "main/accuracy": 0.9771820902824402,
            "validation/main/accuracy": 0.975399911403656
        }
    ]
    with open(os.path.join(path, 'log'), 'w') as f:
        json.dump(log, f)

    # log, args
    path = os.path.join(root_path, '10001')
    os.makedirs(path)
    args = {
        "resume": "",
        "batchsize": 100,
        "epoch": 20,
        "frequency": -1,
        "gpu": 0,
        "unit": 1000,
        "out": "results"
    }
    with open(os.path.join(path, 'log'), 'w') as f:
        json.dump(log, f)
    with open(os.path.join(path, 'args'), 'w') as f:
        json.dump(args, f)

    # log, args, commands
    path = os.path.join(root_path, '10002')
    os.makedirs(path)
    commands = [
        {
            "name": "take_snapshot",
            "request": {
                "created_at": "2017-09-26T16:44:33.410023",
                "status": "OPEN",
                "body": None,
                "schedule": {
                    "value": 4,
                    "key": "epoch"
                }
            },
            "response": {
                "executed_at": "2017-09-26T16:44:35.730431",
                "epoch": 4,
                "iteration": 2400,
                "elapsed_time": 76.96686792373657,
                "status": "SUCCESS",
                "body": None
            }
        }
    ]
    with open(os.path.join(path, 'log'), 'w') as f:
        json.dump(log, f)
    with open(os.path.join(path, 'args'), 'w') as f:
        json.dump(args, f)
    with open(os.path.join(path, 'commands'), 'w') as f:
        json.dump(commands, f)
    open(os.path.join(path, 'snapshot_iter_2400'), 'w').close()

    # log, args, commands, status(run)
    path = os.path.join(root_path, '10003')
    os.makedirs(path)
    with open(os.path.join(path, 'log'), 'w') as f:
        json.dump(log, f)
    with open(os.path.join(path, 'args'), 'w') as f:
        json.dump(args, f)
    with open(os.path.join(path, 'commands'), 'w') as f:
        json.dump(commands, f)
    CommandsState.run(path)

    # log, args, commands, status(stop)
    path = os.path.join(root_path, '10004')
    os.makedirs(path)
    with open(os.path.join(path, 'log'), 'w') as f:
        json.dump(log, f)
    with open(os.path.join(path, 'args'), 'w') as f:
        json.dump(args, f)
    with open(os.path.join(path, 'commands'), 'w') as f:
        json.dump(commands, f)
    CommandsState.stop(path)

    # log, args, commands, status(not run)
    path = os.path.join(root_path, '10005')
    os.makedirs(path)
    with open(os.path.join(path, 'log'), 'w') as f:
        json.dump(log, f)
    with open(os.path.join(path, 'args'), 'w') as f:
        json.dump(args, f)
    with open(os.path.join(path, 'commands'), 'w') as f:
        json.dump(commands, f)
    CommandsState._dump(path, CommandsState._load(path, initialize=True))


def setup_test_db(project_path, project_name):
    create_db()
    upgrade_db()

    # insert test data
    Project.create(project_path, project_name)


class TestAPI(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        if not CHAINERUI_ENV == 'test':
            raise NotInTestEnvironmentException(
                'set environment variable CHAINERUI_ENV=test '
                'when you run this test'
            )

        test_dir = tempfile.mkdtemp(prefix='chainerui_test_api')
        cls._dir = test_dir
        project_path = os.path.join(test_dir, 'test_project')
        setup_test_project(project_path)
        cls._project_path = project_path

    @classmethod
    def tearDownClass(cls):
        if os.path.exists(cls._dir):
            shutil.rmtree(cls._dir)

    def setUp(self):
        project_name = 'my-project'
        setup_test_db(self._project_path, project_name)
        self._project_name = project_name

        app = create_app()
        app.testing = True
        self.app = app.test_client()

    def tearDown(self):
        # remove test db if exists
        if os.path.exists(DB_FILE_PATH):
            os.remove(DB_FILE_PATH)

    def assert_test_project(self, project, name=None):
        assert len(project) == 3
        assert project['pathName'] == self._project_path
        assert project['name'] == self._project_name if name is None else name
        assert isinstance(project['id'], int)

    def assert_test_project_result(self, result, name=None):
        assert len(result) == 8
        assert isinstance(result['commands'], list)
        assert isinstance(result['logs'], list)
        assert isinstance(result['args'], list)
        assert isinstance(result['snapshots'], list)
        assert isinstance(result['isUnregistered'], bool)
        assert isinstance(result['id'], int)
        assert result['pathName'].startswith(self._project_path)
        assert result['name'] == name

    # GET /api/v1/projects
    def test_get_project_list(self):
        resp = self.app.get('/api/v1/projects')
        data = assert_json_api(resp)
        assert len(data) == 1
        assert isinstance(data['projects'], list)
        self.assert_test_project(data['projects'][0])

    # GET /api/v1/projects/<int:id>
    def test_get_project(self):
        resp = self.app.get('/api/v1/projects/1')
        data = assert_json_api(resp)
        assert len(data) == 1
        self.assert_test_project(data['project'])

        resp = self.app.get('/api/v1/projects/12345')
        data = assert_json_api(resp, 404)
        assert len(data) == 2
        assert isinstance(data['message'], string_types)
        assert data['project'] is None

    # PUT /api/v1/projects/<int:id>
    def test_put_project(self):
        request_json = {
            'project': {
                'id': 1,
                'name': 'new-name',
            }
        }

        resp = self.app.put(
            '/api/v1/projects/1',
            data=json.dumps(request_json),
            content_type='application/json')
        data = assert_json_api(resp)
        assert len(data) == 1
        self.assert_test_project(
            data['project'], name=request_json['project']['name'])

        resp = self.app.put('/api/v1/projects/12345')
        data = assert_json_api(resp, 404)
        assert len(data) == 2
        assert isinstance(data['message'], string_types)
        assert data['project'] is None

    # DELETE /api/v1/projects/<int:id>
    def test_delete_project(self):
        resp = self.app.delete('/api/v1/projects/1')
        data = assert_json_api(resp)
        assert len(data) == 1
        self.assert_test_project(data['project'])

        resp = self.app.delete('/api/v1/projects/12345')
        data = assert_json_api(resp, 404)
        assert len(data) == 2
        assert isinstance(data['message'], string_types)
        assert data['projects'] is None  # TODO(ofk): Is projects key correct?

    # GET /api/v1/projects/<int:project_id>/results
    def test_get_result_list(self):
        resp = self.app.get('/api/v1/projects/1/results')
        data = assert_json_api(resp)
        assert len(data) == 1
        assert len(data['results']) >= 3
        for i in range(3):
            self.assert_test_project_result(data['results'][i])

        # raise an unexpected exception when GET /api/v1/projects/12345/results

    # GET /api/v1/projects/<int:project_id>/results/<int:id>
    def test_get_result(self):
        for i in range(3):
            resp = self.app.get('/api/v1/projects/1/results/' + str(i + 1))
            data = assert_json_api(resp)
            assert len(data) == 1
            self.assert_test_project_result(data['result'])
            assert data['result']['id'] == i + 1

        # raise an unexpected exception
        #   when GET /api/v1/projects/1/results/12345
        # not raise an exception when GET /api/v1/projects/12345/results/1

    # PUT /api/v1/projects/<int:project_id>/results/<int:id>
    def test_put_result(self):
        request_jsons = [
            {
                'result': {
                    'id': 1,
                    'name': 'new-name1',
                }
            },
            {
                'result': {
                    'id': 2,
                    'name': 'new-name2',
                    'isUnregistered': True,
                }
            },
            {
                'result': {
                    'id': 3,
                    'name': 'new-name3',
                    'isUnregistered': False,
                }
            },
        ]

        for i in range(3):
            resp = self.app.put(
                '/api/v1/projects/1/results/' + str(i + 1),
                data=json.dumps(request_jsons[i]),
                content_type='application/json')
            data = assert_json_api(resp)
            assert len(data) == 1
            self.assert_test_project_result(
                data['result'], request_jsons[i]['result']['name'])

        resp = self.app.put('/api/v1/projects/1/results/12345')
        data = assert_json_api(resp, 404)
        assert len(data) == 2
        assert isinstance(data['message'], string_types)
        assert data['result'] is None

        # not raise an exception when PUT /api/v1/projects/12345/results/1

    # DELETE /api/v1/projects/<int:project_id>/results/<int:id>
    def test_delete_result(self):
        for i in range(3):
            resp = self.app.delete('/api/v1/projects/1/results/' + str(i + 1))
            data = assert_json_api(resp)
            assert len(data) == 1
            self.assert_test_project_result(data['result'])

        resp = self.app.delete('/api/v1/projects/1/results/12345')
        data = assert_json_api(resp, 404)
        assert len(data) == 2
        assert isinstance(data['message'], string_types)
        assert data['result'] is None

        # not raise an exception when DELETE /api/v1/projects/12345/results/1

    # POST /api/v1/projects/<int:project_id>/results/<int:result_id>/commands,
    def test_post_result_command(self):
        request_jsons = [
            {
                'name': 'adjust_hyperparams',
                'body': {
                    'alpha': 0.0007,
                    'beta1': 0.8,
                    'beat2': 1.0,
                },
                'schedule': {
                    'value': 4,
                    'key': 'epoch',
                },
                'resultId': 1,
            },
            {
                'name': 'adjust_hyperparams',
                'body': None,
                'schedule': None,
                'resultId': 2,
            },
            {
                'name': 'take_snapshot',
                'schedule': {
                    'value': 4800,
                    'key': 'iteration',
                },
                'resultId': 3,
            },
        ]

        # job has already started
        for i in range(3):
            resp = self.app.post(
                '/api/v1/projects/1/results/4/commands',
                data=json.dumps(request_jsons[i]),
                content_type='application/json')
            data = assert_json_api(resp)
            assert len(data) == 1
            assert len(data['commands']) > 0
            command = data['commands'][0]
            assert isinstance(command['id'], int)
            assert isinstance(command['name'], string_types)
            assert len(command['request']) == 4
            assert command['request']['schedule'] is None or isinstance(
                command['request']['schedule'], dict)
            assert command['request']['body'] is None or isinstance(
                command['request']['body'], dict)
            assert isinstance(command['request']['created_at'], string_types)
            assert isinstance(command['request']['status'], string_types)
            assert 'response' in command

        # not set extension
        resp = self.app.post(
            '/api/v1/projects/1/results/3/commands',
            data=json.dumps(request_jsons[0]),
            content_type='application/json')
        data = assert_json_api(resp, 400)
        assert len(data) == 1
        assert isinstance(data['message'], string_types)
        assert 'not set' in data['message']

        # jos has stopped
        resp = self.app.post(
            '/api/v1/projects/1/results/5/commands',
            data=json.dumps(request_jsons[0]),
            content_type='application/json')
        data = assert_json_api(resp, 400)
        assert len(data) == 1
        assert isinstance(data['message'], string_types)
        assert 'stopped' in data['message']

        # not set extension
        resp = self.app.post(
            '/api/v1/projects/1/results/6/commands',
            data=json.dumps(request_jsons[0]),
            content_type='application/json')
        data = assert_json_api(resp, 400)
        assert len(data) == 1
        assert isinstance(data['message'], string_types)
        assert 'not run' in data['message']

        request_jsons = [
            {
                'name': 'invalid_schedule',
                'schedule': {
                    'value': None,
                    'key': 'epoch',
                },
                'resultId': 1,
            },
            {
                'name': None,
                'resultId': 2,
            },
        ]

        for i in range(2):
            resp = self.app.post(
                '/api/v1/projects/1/results/4/commands',
                data=json.dumps(request_jsons[i]),
                content_type='application/json')
            data = assert_json_api(resp, 400)
            assert len(data) == 1
            assert isinstance(data['message'], string_types)

        resp = self.app.post('/api/v1/projects/1/results/3/commands')
        data = assert_json_api(resp, 400)
        assert len(data) == 1
        assert isinstance(data['message'], string_types)

        resp = self.app.post('/api/v1/projects/1/results/12345/commands')
        data = assert_json_api(resp, 404)
        assert isinstance(data['message'], string_types)
        assert data['result'] is None

        # not raise an exception
        #   when PUT /api/v1/projects/12345/results/1/commands
