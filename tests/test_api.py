import json
import os
import unittest

from chainerui import CHAINERUI_ENV
from chainerui import create_app
from chainerui import create_db
from chainerui import DB_FILE_PATH
from chainerui.models.project import Project
from chainerui import upgrade_db

from tests.helpers import assert_json_api
from tests.helpers import NotInTestEnvironmentException

TEST_PROJECT_PATH = os.path.abspath(os.path.join(__file__, '../../examples'))
TEST_PROJECT_NAME = 'my-project'


def setup_test_db():
    create_db()
    upgrade_db()

    # insert test data
    Project.create(TEST_PROJECT_PATH, TEST_PROJECT_NAME)


class TestAPI(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        if not CHAINERUI_ENV == 'test':
            raise NotInTestEnvironmentException(
                'set environment variable CHAINERUI_ENV=test '
                'when you run this test'
            )

    def setUp(self):
        setup_test_db()
        app = create_app()
        app.testing = True
        self.app = app.test_client()

    def tearDown(self):
        # remove test db if exists
        if os.path.exists(DB_FILE_PATH):
            os.remove(DB_FILE_PATH)

    def assert_test_project(self, project, name=TEST_PROJECT_NAME):
        assert len(project) == 3
        assert project['pathName'] == TEST_PROJECT_PATH
        assert project['name'] == name
        assert isinstance(project['id'], int)

    def assert_test_project_result(self, result, name=None):
        assert len(result) == 8
        assert isinstance(result['commands'], list)
        assert isinstance(result['logs'], list)
        assert isinstance(result['args'], list)
        assert isinstance(result['snapshots'], list)
        assert isinstance(result['isUnregistered'], bool)
        assert isinstance(result['id'], int)
        assert result['pathName'].startswith(TEST_PROJECT_PATH)
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
        assert isinstance(data['message'], str)
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
        assert isinstance(data['message'], str)
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
        assert isinstance(data['message'], str)
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
        assert isinstance(data['message'], str)
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
        assert isinstance(data['message'], str)
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

        for i in range(3):
            resp = self.app.post(
                '/api/v1/projects/1/results/' + str(i + 1) + '/commands',
                data=json.dumps(request_jsons[i]),
                content_type='application/json')
            data = assert_json_api(resp)
            assert len(data) == 1
            assert len(data['commands']) > 0
            command = data['commands'][0]
            assert isinstance(command['id'], int)
            assert isinstance(command['name'], str)
            assert len(command['request']) == 4
            assert command['request']['schedule'] is None or isinstance(
                command['request']['schedule'], dict)
            assert command['request']['body'] is None or isinstance(
                command['request']['body'], dict)
            assert isinstance(command['request']['created_at'], str)
            assert isinstance(command['request']['status'], str)
            assert command['response'] is None

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
                '/api/v1/projects/1/results/' + str(i + 1) + '/commands',
                data=json.dumps(request_jsons[i]),
                content_type='application/json')
            data = assert_json_api(resp, 400)
            assert len(data) == 1
            assert isinstance(data['message'], str)

        resp = self.app.post('/api/v1/projects/1/results/3/commands')
        data = assert_json_api(resp, 400)
        assert len(data) == 1
        assert isinstance(data['message'], str)

        resp = self.app.post('/api/v1/projects/1/results/12345/commands')
        data = assert_json_api(resp, 404)
        assert isinstance(data['message'], str)
        assert data['result'] is None

        # not raise an exception
        #   when PUT /api/v1/projects/12345/results/1/commands
