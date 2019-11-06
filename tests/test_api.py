import json
import os

import pytest
from six import string_types

from chainerui.models.project import Project
from chainerui import summary
from chainerui.utils.commands_state import CommandsState
from tests.helpers import assert_json_api


def _setup_test_project(root_path):
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


@pytest.fixture(autouse=True, scope='function')
def project(func_dir, func_db):
    project_path = os.path.join(func_dir, 'test_project')
    _setup_test_project(project_path)
    project_name = 'my-project'
    Project.create(project_path, project_name)

    return project_path, project_name


def _assert_test_project(project, path, name):
    assert len(project) == 3
    assert project['pathName'] == path
    assert project['name'] == name
    assert isinstance(project['id'], int)


def _assert_test_project_result(result, path, name, logs_limit=None):
    assert len(result) == 9
    assert isinstance(result['commands'], list)
    _assert_test_logs(result['logs'], logs_limit)
    assert isinstance(result['args'], list)
    assert isinstance(result['snapshots'], list)
    assert isinstance(result['isUnregistered'], bool)
    assert isinstance(result['id'], int)
    assert result['pathName'].startswith(path)
    assert result['name'] == name


def _assert_test_logs(logs, logs_limit=None):
    assert isinstance(logs, list)
    assert logs_limit is None or logs_limit == -1 or len(logs) == min(
        7, logs_limit)


# GET /api/v1/projects
def test_get_project_list(project, app):
    path, name = project
    resp = app.get('/api/v1/projects')
    data = assert_json_api(resp)
    assert len(data) == 1
    assert isinstance(data['projects'], list)
    _assert_test_project(data['projects'][0], path, name)


# GET /api/v1/projects?path_name=<string:path>
def test_get_project_with_name(project, app):
    # success
    url = '/api/v1/projects?path_name=' + project[0]
    resp = app.get(url)
    data = assert_json_api(resp)
    assert len(data) == 1
    _assert_test_project(data['project'], *project)

    # fail
    dummy_project_path = 'no-exist'
    url = '/api/v1/projects?path_name=' + dummy_project_path
    resp = app.get(url)
    data = assert_json_api(resp, 400)
    assert len(data) == 2
    assert isinstance(data['message'], string_types)
    assert data['project'] is None
    assert dummy_project_path in data['message']


# GET /api/v1/projects/<int:id>
def test_get_project(project, app):
    resp = app.get('/api/v1/projects/1')
    data = assert_json_api(resp)
    assert len(data) == 1
    _assert_test_project(data['project'], *project)

    resp = app.get('/api/v1/projects/12345')
    data = assert_json_api(resp, 404)
    assert len(data) == 2
    assert isinstance(data['message'], string_types)
    assert data['project'] is None


# POST /api/v1/projects
def test_post_project(func_dir, project, app):
    temp_dir = os.path.join(func_dir, 'test_post_project')
    os.mkdir(temp_dir)

    # success
    request_json = {'project': {'path_name': temp_dir}}
    resp = app.post(
        '/api/v1/projects', data=json.dumps(request_json),
        content_type='application/json')
    data = assert_json_api(resp)
    assert len(data) == 1
    _assert_test_project(data['project'], temp_dir, temp_dir)

    # fail, required param is lack
    request_json = {'project': {'name': 'name'}}
    resp = app.post(
        '/api/v1/projects', data=json.dumps(request_json),
        content_type='application/json')
    data = assert_json_api(resp, 400)
    assert len(data) == 2

    # fail, the path is duplicated
    request_json = {'project': {'path_name': project[0]}}
    resp = app.post(
        '/api/v1/projects', data=json.dumps(request_json),
        content_type='application/json')
    data = assert_json_api(resp, 400)
    assert len(data) == 2


# PUT /api/v1/projects/<int:id>
def test_put_project(project, app):
    request_json = {
        'project': {
            'id': 1,
            'name': 'new-name',
        }
    }

    resp = app.put(
        '/api/v1/projects/1', data=json.dumps(request_json),
        content_type='application/json')
    data = assert_json_api(resp)
    assert len(data) == 1
    _assert_test_project(
        data['project'], project[0], name=request_json['project']['name'])

    resp = app.put('/api/v1/projects/12345')
    data = assert_json_api(resp, 404)
    assert len(data) == 2
    assert isinstance(data['message'], string_types)
    assert data['project'] is None


# DELETE /api/v1/projects/<int:id>
def test_delete_project(project, app):
    resp = app.delete('/api/v1/projects/1')
    data = assert_json_api(resp)
    assert len(data) == 1
    _assert_test_project(data['project'], *project)

    resp = app.delete('/api/v1/projects/12345')
    data = assert_json_api(resp, 404)
    assert len(data) == 2
    assert isinstance(data['message'], string_types)
    assert data['projects'] is None  # TODO(ofk): Is projects key correct?


# GET /api/v1/projects/<int:project_id>/results
def test_get_result_list(project, app):
    for logs_limit in [None, -1, 0, 5, 7, 100]:
        url = '/api/v1/projects/1/results'
        if logs_limit is not None:
            url += '?logs_limit=' + str(logs_limit)

        resp = app.get(url)
        data = assert_json_api(resp)
        assert len(data) == 1
        assert len(data['results']) >= 3
        for i in range(3):
            _assert_test_project_result(
                data['results'][i], project[0], None, logs_limit=logs_limit)

    # raise an unexpected exception when GET /api/v1/projects/12345/results


def test_get_result_with_name(project, app):
    # success
    url = '/api/v1/projects/1/results?path_name=' + os.path.join(
        project[0], '10000')
    resp = app.get(url)
    data = assert_json_api(resp)
    assert len(data) == 1
    _assert_test_project_result(data['result'], project[0], None)

    # fail
    dummy_result_path = os.path.join(project[0], 'no-exist')
    url = '/api/v1/projects/1/results?path_name=' + dummy_result_path
    resp = app.get(url)
    data = assert_json_api(resp, 400)
    assert len(data) == 2
    assert isinstance(data['message'], string_types)
    assert data['result'] is None
    assert dummy_result_path in data['message']


# GET /api/v1/projects/<int:project_id>/results/<int:id>
def test_get_result(project, app):
    for logs_limit in [None, -1, 0, 5, 7, 100]:
        for i in range(3):
            url = '/api/v1/projects/1/results/' + str(i + 1)
            if logs_limit is not None:
                url += '?logs_limit=' + str(logs_limit)

            resp = app.get(url)
            data = assert_json_api(resp)
            assert len(data) == 1
            _assert_test_project_result(
                data['result'], project[0], None, logs_limit=logs_limit)
            assert data['result']['id'] == i + 1

    # invalid project ID
    resp = app.get('/api/v1/projects/12345/results/1')
    data = assert_json_api(resp, 404)
    assert len(data) == 2
    assert isinstance(data['message'], string_types)
    assert data['project'] is None

    # invalid result ID
    resp = app.get('/api/v1/projects/1/results/12345')
    data = assert_json_api(resp, 404)
    assert len(data) == 2
    assert isinstance(data['message'], string_types)
    assert data['result'] is None


# POST /api/v1/projects/<int:project_id>/results/
def test_post_result(project, app):
    temp_dir = os.path.join(project[0], 'test_post_result')
    os.mkdir(temp_dir)

    # success
    test_time = os.path.getmtime(os.path.abspath(__file__))
    request_json = {
        'result': {
            'pathName': temp_dir,
            'name': 'post_test',
            'crawlable': False,
            'logModifiedAt': test_time
        }
    }
    resp = app.post(
        '/api/v1/projects/1/results', data=json.dumps(request_json),
        content_type='application/json')
    data = assert_json_api(resp)
    assert len(data) == 1
    # project ID 1 has already registered 3 results
    assert data['result']['id'] == 4

    # fail, same path
    request_json['result']['name'] = 'post_test 2'
    resp = app.post(
        '/api/v1/projects/1/results', data=json.dumps(request_json),
        content_type='application/json')
    data = assert_json_api(resp, 400)
    assert len(data) == 2
    assert isinstance(data['message'], string_types)
    assert data['result'] is None

    # fail, required param is lack
    del request_json['result']['pathName']
    resp = app.post(
        '/api/v1/projects/1/results', data=json.dumps(request_json),
        content_type='application/json')
    data = assert_json_api(resp, 400)
    assert len(data) == 2
    assert isinstance(data['message'], string_types)
    assert data['result'] is None

    # fail, invalid project ID
    resp = app.post(
        '/api/v1/projects/12345/results', data=json.dumps(request_json),
        content_type='application/json')
    data = assert_json_api(resp, 404)
    assert len(data) == 2
    assert isinstance(data['message'], string_types)
    assert data['project'] is None


# PUT /api/v1/projects/<int:project_id>/results/<int:id>
def test_put_result(project, app):
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
        resp = app.put(
            '/api/v1/projects/1/results/' + str(i + 1),
            data=json.dumps(request_jsons[i]),
            content_type='application/json')
        data = assert_json_api(resp)
        assert len(data) == 1
        _assert_test_project_result(
            data['result'], project[0], request_jsons[i]['result']['name'])

    resp = app.put('/api/v1/projects/1/results/12345')
    data = assert_json_api(resp, 404)
    assert len(data) == 2
    assert isinstance(data['message'], string_types)
    assert data['result'] is None

    # not raise an exception when PUT /api/v1/projects/12345/results/1


# DELETE /api/v1/projects/<int:project_id>/results/<int:id>
def test_delete_result(project, app):
    for i in range(3):
        resp = app.delete('/api/v1/projects/1/results/' + str(i + 1))
        data = assert_json_api(resp)
        assert len(data) == 1
        _assert_test_project_result(data['result'], project[0], None)

    resp = app.delete('/api/v1/projects/1/results/12345')
    data = assert_json_api(resp, 404)
    assert len(data) == 2
    assert isinstance(data['message'], string_types)
    assert data['result'] is None

    # not raise an exception when DELETE /api/v1/projects/12345/results/1


# POST /api/v1/projects/<int:project_id>/results/<int:result_id>/logs
def test_post_log(app):
    # success
    test_time = os.path.getmtime(os.path.abspath(__file__))
    request_json = {
        'log': {
            'values': [
                {'epoch': 8, 'loss': 0.1}, {'epoch': 9, 'loss': 0.1}
            ],
            'modifiedAt': test_time
        }
    }
    resp = app.post(
        '/api/v1/projects/1/results/1/logs', data=json.dumps(request_json),
        content_type='application/json')
    data = assert_json_api(resp)
    assert len(data) == 1
    assert data['logs']['resultId'] == 1
    assert data['logs']['insertedLogCount'] == 2
    assert data['logs']['totalLogCount'] == 9

    # success, reset
    request_json = {
        'log': {
            'values': [
                {'epoch': 1, 'loss': 0.1}, {'epoch': 2, 'loss': 0.1}
            ],
            'reset': True
        }
    }
    resp = app.post(
        '/api/v1/projects/1/results/1/logs', data=json.dumps(request_json),
        content_type='application/json')
    data = assert_json_api(resp)
    assert len(data) == 1
    assert data['logs']['resultId'] == 1
    assert data['logs']['insertedLogCount'] == 2
    assert data['logs']['totalLogCount'] == 2

    # success, empty log
    request_json['log']['values'] = []
    request_json['log']['reset'] = False
    resp = app.post(
        '/api/v1/projects/1/results/1/logs',
        data=json.dumps(request_json), content_type='application/json')
    data = assert_json_api(resp)
    assert len(data) == 1
    assert data['logs']['resultId'] == 1
    assert data['logs']['insertedLogCount'] == 0
    assert data['logs']['totalLogCount'] == 2

    # fail, invalid project ID
    resp = app.post(
        '/api/v1/projects/12345/results/1/logs',
        data=json.dumps(request_json), content_type='application/json')
    data = assert_json_api(resp, 404)
    assert len(data) == 2
    assert isinstance(data['message'], string_types)
    assert data['project'] is None

    # fail, invalid result ID
    resp = app.post(
        '/api/v1/projects/1/results/12345/logs',
        data=json.dumps(request_json), content_type='application/json')
    data = assert_json_api(resp, 404)
    assert len(data) == 2
    assert isinstance(data['message'], string_types)
    assert data['result'] is None


# POST /api/v1/projects/<int:project_id>/results/<int:result_id>/args
def test_post_argument(app):
    # success
    request_json = {'argument': {'key': 'value'}}
    resp = app.post(
        '/api/v1/projects/1/results/1/args', data=json.dumps(request_json),
        content_type='application/json')
    data = assert_json_api(resp)
    assert len(data) == 1
    assert data['argument']['resultId'] == 1

    # success, empty args
    request_json['argument'] = {}
    resp = app.post(
        '/api/v1/projects/1/results/1/args',
        data=json.dumps(request_json), content_type='application/json')
    data2 = assert_json_api(resp)
    assert len(data2) == 1
    assert data2['argument']['id'] == data['argument']['id'] + 1

    # fail, invalid project ID
    resp = app.post(
        '/api/v1/projects/12345/results/1/args',
        data=json.dumps(request_json), content_type='application/json')
    data = assert_json_api(resp, 404)
    assert len(data) == 2
    assert isinstance(data['message'], string_types)
    assert data['project'] is None

    # fail, invalid result ID
    resp = app.post(
        '/api/v1/projects/1/results/12345/args',
        data=json.dumps(request_json), content_type='application/json')
    data = assert_json_api(resp, 404)
    assert len(data) == 2
    assert isinstance(data['message'], string_types)
    assert data['result'] is None


# POST /api/v1/projects/<int:project_id>/results/<int:result_id>/commands,
def test_post_result_command(func_dir, app):
    project2_path = os.path.join(func_dir, 'test_project2')
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
    resp = app.post(
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
    resp = app.post(
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
    resp = app.post(
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
        resp = app.post(
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
    resp = app.post(
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
        resp = app.post(
            '/api/v1/projects/2/results/4/commands',
            data=json.dumps(request_jsons[i]),
            content_type='application/json')
        data = assert_json_api(resp, 400)
        assert len(data) == 1
        assert isinstance(data['message'], string_types)

    resp = app.post('/api/v1/projects/2/results/4/commands')
    data = assert_json_api(resp, 400)
    assert len(data) == 1
    assert isinstance(data['message'], string_types)

    resp = app.post('/api/v1/projects/2/results/12345/commands')
    data = assert_json_api(resp, 404)
    assert isinstance(data['message'], string_types)
    assert data['result'] is None

    # not raise an exception
    #   when PUT /api/v1/projects/12345/results/4/commands


# GET /api/v1/projects/<int:project_id>/results/<int:id>/assets
def test_get_assets(func_dir, app):
    project3_path = os.path.join(func_dir, 'test_project3')
    path = os.path.join(project3_path, '10004')
    os.makedirs(path)
    assets_info = [
        {
            "epoch": 1,
            "iteration": 600,
            "images": {
                "train": "iter_600_61b3a8fa.png",
                "train_reconstructed": "iter_600_c15c042b.jpg",
            },
            "audios": {
                "sampling": "audio_0_755e0f8b17cd.wav",
            },
        }
    ]
    with open(os.path.join(
            path, summary.CHAINERUI_ASSETS_METAFILE_NAME), 'w') as f:
        json.dump(assets_info, f)
    open(os.path.join(path, 'iter_600_61b3a8fa.png'), 'w') .close()
    open(os.path.join(path, 'iter_600_c15c042b.jpg'), 'w') .close()
    open(os.path.join(path, 'audio_0_755e0f8b17cd.wav'), 'w') .close()
    with open(os.path.join(path, 'log'), 'w') as f:
        json.dump([], f)
    Project.create(project3_path, 'assets-test-project')

    url = '/api/v1/projects/2/results/4/assets'
    resp = app.get(url)
    data = assert_json_api(resp)
    assert 'assets' in data
    assert len(data['assets']) == 1
    assert 'contents' in data['assets'][0]
    assert len(data['assets'][0]['contents']) == 3
    assert 'train_info' in data['assets'][0]

    # invalid project ID
    resp = app.get('/api/v1/projects/12345/results/4/assets')
    data = assert_json_api(resp, 404)
    assert len(data) == 2
    assert isinstance(data['message'], string_types)
    assert data['project'] is None

    # invalid result ID
    resp = app.get('/api/v1/projects/2/results/12345/assets')
    data = assert_json_api(resp, 404)
    assert len(data) == 2
    assert isinstance(data['message'], string_types)
    assert data['result'] is None

    # empty assets
    resp = app.get('/api/v1/projects/1/results/1/assets')
    data = assert_json_api(resp)
    assert 'assets' in data
    assert len(data['assets']) == 0

    # resource check
    resource_url_png = url + '/1'
    resp = app.get(resource_url_png)
    assert resp.status_code == 200
    resource_url_jpg = url + '/2'
    resp = app.get(resource_url_jpg)
    assert resp.status_code == 200
    resource_url_wav = url + '/3'
    resp = app.get(resource_url_wav)
    assert resp.status_code == 200

    resource_url = url + '/4'
    resp = app.get(resource_url)
    data = assert_json_api(resp, 404)
    assert len(data) == 2
    assert isinstance(data['message'], string_types)
    assert data['asset'] is None


# PATCH /api/v1/projects/<int:project_id>/results/
def test_patch_results(project, app):
    # simplest case
    request_json = {
        "results": [
            {
                "id": 1,
                "isUnregistered": 0
            },
            {
                "id": 2,
                "isUnregistered": 1
            }
        ]
    }
    resp = app.patch(
        '/api/v1/projects/1/results', data=json.dumps(request_json),
        content_type='application/json')
    data = assert_json_api(resp)
    assert len(data) == 1
    assert 'results' in data
    assert len(data['results']) == len(request_json["results"])

    # The API will return no response for the part of the request that id(s) is not given.
    request_json = {
        "results": [
            {
                "id": 1,
                "isUnregistered": 0
            },
            {
                "isUnregistered": 1
            }
        ]
    }
    resp = app.patch(
        '/api/v1/projects/1/results', data=json.dumps(request_json),
        content_type='application/json')
    data = assert_json_api(resp)
    assert len(data) == 1
    assert 'results' in data
    assert len(data['results']) == len(request_json["results"]) - 1

    # The API will return no response for the part of the request that couldn't find the result on the table by id.
    request_json = {
        "results": [
            {
                "id": 1,
                "isUnregistered": 0
            },
            {
                "id": 9999,
                "isUnregistered": 1
            }
        ]
    }
    resp = app.patch(
        '/api/v1/projects/1/results', data=json.dumps(request_json),
        content_type='application/json')
    data = assert_json_api(resp)
    assert len(data) == 1
    assert 'results' in data
    assert len(data['results']) == len(request_json["results"]) - 1

    # not raise an exception
    #   when PATCH /api/v1/projects/12345/results/
