import unittest

import json
import os


from chainerui import create_app, create_db, upgrade_db
from chainerui import CHAINERUI_ENV, DB_FILE_PATH
from chainerui.models.project import Project


TEST_PROJECT_PATH = os.path.abspath(os.path.join(__file__, '../../examples'))
TEST_PROJECT_NAME = 'my-project'


class NotInTestEnvironmentException(Exception):
    pass


def setup_test_db():
    create_db()
    upgrade_db()

    # insert test data
    Project.create(TEST_PROJECT_PATH, TEST_PROJECT_NAME)


def is_valid_json_str(json_str):
    try:
        json.loads(json_str)
    except json.decoder.JSONDecodeError:
        return False
    return True


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

    def assert_successful(self, resp):
        assert resp.status_code == 200
        assert is_valid_json_str(resp.data.decode())

    # GET /api/v1/projects
    def test_get_project_list(self):
        resp = self.app.get('/api/v1/projects')
        self.assert_successful(resp)

    # GET /api/v1/projects/<int:id>
    def test_get_project(self):
        resp = self.app.get('/api/v1/projects/1')
        self.assert_successful(resp)

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
        self.assert_successful(resp)

    # DELETE /api/v1/projects/<int:id>
    def test_delete_project(self):
        resp = self.app.delete('/api/v1/projects/1')
        self.assert_successful(resp)

    # GET /api/v1/projects/<int:project_id>/results
    def test_get_result_list(self):
        resp = self.app.get('/api/v1/projects/1/results')
        self.assert_successful(resp)

    # GET /api/v1/projects/<int:project_id>/results/<int:id>
    def test_get_result(self):
        for i in range(3):
            resp = self.app.get('/api/v1/projects/1/results/' + str(i + 1))
            self.assert_successful(resp)

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

            self.assert_successful(resp)

    # DELETE /api/v1/projects/<int:project_id>/results/<int:id>
    def test_delete_result(self):
        for i in range(3):
            resp = self.app.delete('/api/v1/projects/1/results/' + str(i + 1))
            self.assert_successful(resp)

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
            self.assert_successful(resp)
