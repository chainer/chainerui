import json
import os
import shutil
import tempfile
import unittest

from six import string_types

from chainerui import CHAINERUI_ENV
from chainerui import create_app
from chainerui import db
from chainerui.models.project import Project
from chainerui import upgrade_db
from chainerui.utils.commands_state import CommandsState
from tests.helpers import assert_json_api
from tests.helpers import NotInTestEnvironmentException


def setup_test_project(root_path):
    # log only
    path = os.path.join(root_path, '10000')
    os.makedirs(path)
    log = [
        {
            "main/loss": 0.40800962336361407,
            "main/accuracy": 0.8862333340570331,
            "validation/main/loss": 0.19627878157887607,
            "validation/main/accuracy": 0.9437000030279159,
            "epoch": 1,
            "iteration": 600,
            "elapsed_time": 11.176028114001383
        },
        {
            "main/loss": 0.175308293333898,
            "main/accuracy": 0.9492000019550324,
            "validation/main/loss": 0.14389827038859948,
            "validation/main/accuracy": 0.9580000054836273,
            "epoch": 2,
            "iteration": 1200,
            "elapsed_time": 22.5790320849992
        },
        {
            "main/loss": 0.12263125797733665,
            "main/accuracy": 0.9651666717727979,
            "validation/main/loss": 0.11622621351154522,
            "validation/main/accuracy": 0.9643000048398972,
            "epoch": 3,
            "iteration": 1800,
            "elapsed_time": 33.954753322002944
        },
        {
            "main/loss": 0.09348084449768067,
            "main/accuracy": 0.9736166762312254,
            "validation/main/loss": 0.0913344160350971,
            "validation/main/accuracy": 0.9728000032901764,
            "epoch": 4,
            "iteration": 2400,
            "elapsed_time": 46.84794206800143
        },
        {
            "main/loss": 0.07337521777333071,
            "main/accuracy": 0.9787000101804734,
            "validation/main/loss": 0.08345628718438093,
            "validation/main/accuracy": 0.9745000076293945,
            "epoch": 5,
            "iteration": 3000,
            "elapsed_time": 58.61258131300565
        },
        {
            "main/loss": 0.05976833035470918,
            "main/accuracy": 0.9828166776895523,
            "validation/main/loss": 0.07841673109389376,
            "validation/main/accuracy": 0.9764000064134598,
            "epoch": 6,
            "iteration": 3600,
            "elapsed_time": 70.17813067500538
        },
        {
            "main/loss": 0.04946699039855351,
            "main/accuracy": 0.9863833442330361,
            "validation/main/loss": 0.08190375177306124,
            "validation/main/accuracy": 0.974200005531311,
            "epoch": 7,
            "iteration": 4200,
            "elapsed_time": 82.8319199510006
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


def setup_test_db(project_path, project_name):
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
        db.init()
        db.setup(test_mode=True)

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
        db.drop(test_mode=True)

    def assert_test_project(self, project, path=None, name=None):
        assert len(project) == 3
        assert project['pathName'] == self._project_path if \
            path is None else path
        assert project['name'] == self._project_name if name is None else name
        assert isinstance(project['id'], int)

    def assert_test_project_result(self, result, name=None, logs_limit=None):
        assert len(result) == 9
        assert isinstance(result['commands'], list)
        self.assert_test_logs(result['logs'], logs_limit)
        assert isinstance(result['args'], list)
        assert isinstance(result['snapshots'], list)
        assert isinstance(result['isUnregistered'], bool)
        assert isinstance(result['id'], int)
        assert result['pathName'].startswith(self._project_path)
        assert result['name'] == name

    def assert_test_logs(self, logs, logs_limit=None):
        assert isinstance(logs, list)
        assert logs_limit is None or logs_limit == -1 \
            or len(logs) == min(7, logs_limit)

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

    # POST /api/v1/projects
    def test_post_project(self):
        temp_dir = os.path.join(self._dir, 'test_post_project')
        os.mkdir(temp_dir)

        # success
        request_json = {'project': {'path_name': temp_dir}}
        resp = self.app.post(
            '/api/v1/projects', data=json.dumps(request_json),
            content_type='application/json')
        data = assert_json_api(resp)
        assert len(data) == 1
        self.assert_test_project(data['project'], path=temp_dir, name=temp_dir)

        # fail, required param is lack
        request_json = {'project': {'name': 'name'}}
        resp = self.app.post(
            '/api/v1/projects', data=json.dumps(request_json),
            content_type='application/json')
        data = assert_json_api(resp, 400)
        assert len(data) == 2

        # fail, the path is duplicated
        request_json = {'project': {'path_name': self._project_path}}
        resp = self.app.post(
            '/api/v1/projects', data=json.dumps(request_json),
            content_type='application/json')
        data = assert_json_api(resp, 400)
        assert len(data) == 2

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
        for logs_limit in [None, -1, 0, 5, 7, 100]:
            url = '/api/v1/projects/1/results'
            if logs_limit is not None:
                url += '?logs_limit=' + str(logs_limit)

            resp = self.app.get(url)
            data = assert_json_api(resp)
            assert len(data) == 1
            assert len(data['results']) >= 3
            for i in range(3):
                self.assert_test_project_result(
                    data['results'][i], logs_limit=logs_limit)

        # raise an unexpected exception when GET /api/v1/projects/12345/results

    # GET /api/v1/projects/<int:project_id>/results/<int:id>
    def test_get_result(self):
        for logs_limit in [None, -1, 0, 5, 7, 100]:
            for i in range(3):
                url = '/api/v1/projects/1/results/' + str(i + 1)
                if logs_limit is not None:
                    url += '?logs_limit=' + str(logs_limit)

                resp = self.app.get(url)
                data = assert_json_api(resp)
                assert len(data) == 1
                self.assert_test_project_result(
                    data['result'], logs_limit=logs_limit)
                assert data['result']['id'] == i + 1

        # invalid project ID
        resp = self.app.get('/api/v1/projects/12345/results/1')
        data = assert_json_api(resp, 404)
        assert len(data) == 2
        assert isinstance(data['message'], string_types)
        assert data['project'] is None

        # invalid result ID
        resp = self.app.get('/api/v1/projects/1/results/12345')
        data = assert_json_api(resp, 404)
        assert len(data) == 2
        assert isinstance(data['message'], string_types)
        assert data['result'] is None

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
        project2_path = os.path.join(self._dir, 'test_project2')
        result_path = os.path.join(project2_path, '10003')
        os.makedirs(result_path)
        with open(os.path.join(result_path, 'log'), 'w') as f:
            json.dump([], f)
        Project.create(project2_path, 'command-test-project')

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

        # not set extension
        resp = self.app.post(
            '/api/v1/projects/2/results/4/commands',
            data=json.dumps(request_jsons[0]),
            content_type='application/json')
        data = assert_json_api(resp, 400)
        assert len(data) == 1
        assert isinstance(data['message'], string_types)
        assert 'not set' in data['message']

        # job run on v0.1.0 so .chainerui_commands is not created
        with open(os.path.join(result_path, 'commands'), 'w') as f:
            json.dump([], f)
        resp = self.app.post(
            '/api/v1/projects/2/results/4/commands',
            data=json.dumps(request_jsons[0]),
            content_type='application/json')
        data = assert_json_api(resp, 400)
        assert len(data) == 1
        assert isinstance(data['message'], string_types)
        assert 'stopped' in data['message']

        # extension is set up but not run
        os.remove(os.path.join(result_path, '.chainerui_commands'))
        CommandsState._dump(result_path, CommandsState._load(
            result_path, initialize=True))
        resp = self.app.post(
            '/api/v1/projects/2/results/4/commands',
            data=json.dumps(request_jsons[0]),
            content_type='application/json')
        data = assert_json_api(resp, 400)
        assert len(data) == 1
        assert isinstance(data['message'], string_types)
        assert 'not run' in data['message']

        # job has already started
        CommandsState.run(result_path)
        for i in range(3):
            resp = self.app.post(
                '/api/v1/projects/2/results/4/commands',
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

        # job has stopped
        CommandsState.stop(result_path)
        resp = self.app.post(
            '/api/v1/projects/2/results/4/commands',
            data=json.dumps(request_jsons[0]),
            content_type='application/json')
        data = assert_json_api(resp, 400)
        assert len(data) == 1
        assert isinstance(data['message'], string_types)
        assert 'stopped' in data['message']

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
                '/api/v1/projects/2/results/4/commands',
                data=json.dumps(request_jsons[i]),
                content_type='application/json')
            data = assert_json_api(resp, 400)
            assert len(data) == 1
            assert isinstance(data['message'], string_types)

        resp = self.app.post('/api/v1/projects/2/results/4/commands')
        data = assert_json_api(resp, 400)
        assert len(data) == 1
        assert isinstance(data['message'], string_types)

        resp = self.app.post('/api/v1/projects/2/results/12345/commands')
        data = assert_json_api(resp, 404)
        assert isinstance(data['message'], string_types)
        assert data['result'] is None

        # not raise an exception
        #   when PUT /api/v1/projects/12345/results/4/commands
