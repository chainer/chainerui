import unittest

import json
import os


from chainerui import create_app, create_db, upgrade_db
from chainerui import CHAINERUI_ENV, DB_FILE_PATH, DB_SESSION
from chainerui.models.project import Project


TEST_PROJECT_PATH = os.path.abspath(os.path.join(__file__, '../examples'))
TEST_PROJECT_NAME = 'my-project'


class NotInTestEnvironmentException(Exception):
    pass


def setup_test_db():
    create_db()
    upgrade_db()

    # insert test data
    project = Project(TEST_PROJECT_PATH, TEST_PROJECT_NAME)
    DB_SESSION.add(project)
    DB_SESSION.commit()


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
        self.assertEqual(resp.status_code, 200)
        self.assertTrue(is_valid_json_str(resp.data.decode()))

    # GET /api/v1/projects
    def test_get_project_list(self):
        resp = self.app.get('/api/v1/projects')
        self.assert_successful(resp)
