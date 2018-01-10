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

    # GET /api/v1/projects
    def test_get_project_list(self):
        resp = self.app.get('/api/v1/projects')
        assert_json_api(resp)

    # GET /api/v1/projects/<int:id>
    def test_get_project(self):
        resp = self.app.get('/api/v1/projects/1')
        assert_json_api(resp)

        resp = self.app.get('/api/v1/projects/12345')
        assert_json_api(resp, 404)

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
        assert 'project' in data
        assert 'name' in data['project']
        assert request_json['project']['name'] == data['project']['name']

        resp = self.app.put('/api/v1/projects/12345')
        assert_json_api(resp, 404)

    # DELETE /api/v1/projects/<int:id>
    def test_delete_project(self):
        resp = self.app.delete('/api/v1/projects/1')
        data = assert_json_api(resp)
        assert 'project' in data
        assert 'name' in data['project']

        resp = self.app.delete('/api/v1/projects/12345')
        assert_json_api(resp, 404)

    # GET /api/v1/projects/<int:project_id>/results
    def test_get_result_list(self):
        resp = self.app.get('/api/v1/projects/1/results')
        data = assert_json_api(resp)
        assert 'results' in data
        assert 5 == len(data['results'])

        # raise an unexpected exception when GET /api/v1/projects/12345/results

    # GET /api/v1/projects/<int:project_id>/results/<int:id>
    def test_get_result(self):
        for i in range(3):
            resp = self.app.get('/api/v1/projects/1/results/' + str(i + 1))
            data = assert_json_api(resp)
            assert 'result' in data
            assert 'id' in data['result']
            assert i + 1 == data['result']['id']

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
            assert 'result' in data
            assert 'name' in data['result']
            assert request_jsons[i]['result']['name'] == data['result']['name']

        resp = self.app.put('/api/v1/projects/1/results/12345')
        data = assert_json_api(resp, 404)
        assert 'result' in data
        assert data['result'] is None

        # not raise an exception when PUT /api/v1/projects/12345/results/1

    # DELETE /api/v1/projects/<int:project_id>/results/<int:id>
    def test_delete_result(self):
        for i in range(3):
            resp = self.app.delete('/api/v1/projects/1/results/' + str(i + 1))
            data = assert_json_api(resp)
            assert 'result' in data
            assert 'name' in data['result']

        resp = self.app.delete('/api/v1/projects/1/results/12345')
        data = assert_json_api(resp, 404)
        assert 'result' in data
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
            assert 'commands' in data
            assert len(data['commands']) > 0

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
            assert 'message' in data

        resp = self.app.post('/api/v1/projects/1/results/3/commands')
        data = assert_json_api(resp, 400)
        assert 'message' in data

        resp = self.app.post('/api/v1/projects/1/results/12345/commands')
        data = assert_json_api(resp, 404)
        assert 'result' in data
        assert data['result'] is None

        # not raise an exception
        #   when PUT /api/v1/projects/12345/results/1/commands
