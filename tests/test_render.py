import io
import json
import os
from string import Template
import subprocess
import sys
import unittest

import pytest


def _check_flake8():
    try:
        import flake8  # NOQA
    except (ImportError, TypeError):
        return False
    return True


def _check_matplotlib():
    try:
        import matplotlib  # NOQA
    except (ImportError, TypeError):
        return False
    return True


def _get_script_path(dir, rendered_log):
    current_dir = os.path.abspath(os.path.dirname(__file__))
    assert current_dir.endswith(os.path.sep + 'tests')
    render_tmp_path = os.path.normpath(os.path.join(
        current_dir, '..', 'frontend', 'src', 'utils', 'render.py.tmpl'))
    assert os.path.exists(render_tmp_path)

    with io.open(render_tmp_path, encoding='utf-8') as f:
        script_tmpl = Template(f.read())

    script = script_tmpl.substitute(rendered_log=rendered_log)
    script_path = os.path.join(dir, 'render.py')
    with io.open(script_path, 'w', newline='\n', encoding='utf-8') as f:
        f.write(script)

    return script_path


def _get_simple_logs():
    logs = {
        'data': {
            '1': {
                'name': 'first',
                'log': [
                    {
                        'loss': 0.1,
                        'loss2': 0.11,
                        'accuracy': 0.75,
                        'epoch': 1,
                        'iteration': 100
                    },
                    {
                        'loss': 0.01,
                        'loss2': 0.011,
                        'accuracy': 0.9,
                        'epoch': 2,
                        'iteration': 200
                    },
                ]
            },
            '2': {
                'name': 'long-long-long-long-long-second',
                'log': [
                    {
                        'loss': 0.15,
                        'loss2': 0.16,
                        'accuracy': 0.70,
                        'epoch': 1,
                        'iteration': 100
                    },
                    {
                        'loss': 0.015,
                        'loss2': 0.016,
                        'accuracy': 0.95,
                        'epoch': 2,
                        'iteration': 200
                    },
                ]
            }
        },
    }
    return logs


def _get_render_module(script_path, module_name):
    if sys.version_info.major == 2:
        import imp
        return imp.load_source(module_name, script_path)

    import importlib.util
    spec = importlib.util.spec_from_file_location(module_name, script_path)
    render = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(render)
    return render


def _run_on_tempd(dir, f, *args, **kwargs):
    cwd = os.getcwd()
    try:
        os.chdir(dir)
        f(*args, **kwargs)
    finally:
        os.chdir(cwd)


@unittest.skipUnless(_check_flake8(), 'flake8 is not installed')
def test_script_format(func_dir):
    script_path = _get_script_path(func_dir, '{}')  # dummy log data, not used
    res = subprocess.call(['flake8', script_path])
    assert res == 0


@unittest.skipUnless(_check_matplotlib(), 'matplotlib is not installed')
def test_render(func_dir):
    logs = _get_simple_logs()
    both_config = {
        'xAxis': 'epoch',
        'yLeftAxis': ['loss', 'loss2'],
        'yRightAxis': ['accuracy'],
        'resultIds': [1, 2]
    }
    logs['config'] = both_config
    logs_str = json.dumps(logs)
    script_path = _get_script_path(func_dir, logs_str)
    render = _get_render_module(script_path, 'test_render')

    assert render.download().strip() == logs_str

    _run_on_tempd(func_dir, render.main)

    assert os.path.exists(os.path.join(func_dir, 'log_chart.png'))


@unittest.skipUnless(_check_matplotlib(), 'matplotlib is not installed')
def test_render_right(func_dir):
    script_path = _get_script_path(func_dir, '{}')  # dummy log data, not used
    render = _get_render_module(script_path, 'test_render_right')

    logs = _get_simple_logs()
    both_config = {
        'xAxis': 'epoch',
        'yLeftAxis': [],
        'yRightAxis': ['accuracy'],
        'resultIds': [1, 2]
    }
    logs['config'] = both_config
    _run_on_tempd(func_dir, render.render, logs)

    assert os.path.exists(os.path.join(func_dir, 'log_chart.png'))


@unittest.skipUnless(_check_matplotlib(), 'matplotlib is not installed')
def test_render_left(func_dir):
    script_path = _get_script_path(func_dir, '{}')  # dummy log data, not used
    render = _get_render_module(script_path, 'test_render_left')

    logs = _get_simple_logs()
    both_config = {
        'xAxis': 'epoch',
        'yLeftAxis': ['loss', 'loss2'],
        'yRightAxis': [],
        'resultIds': [1, 2]
    }
    logs['config'] = both_config
    _run_on_tempd(func_dir, render.render, logs)

    assert os.path.exists(os.path.join(func_dir, 'log_chart.png'))


@unittest.skipUnless(_check_matplotlib(), 'matplotlib is not installed')
def test_render_empty(func_dir):
    script_path = _get_script_path(func_dir, '{}')  # dummy log data, not used
    render = _get_render_module(script_path, 'test_render_empty')

    logs = _get_simple_logs()
    configs = [
        {
            'xAxis': '',
            'yLeftAxis': ['loss', 'loss2'],
            'yRightAxis': ['accuracy'],
            'resultIds': [1, 2],
            'title': 'no selected x axis'
        },
        {
            'xAxis': 'step',
            'yLeftAxis': ['loss', 'loss2'],
            'yRightAxis': ['accuracy'],
            'resultIds': [1, 2],
            'title': 'invalid x-axis'
        },
        {
            'xAxis': 'epoch',
            'yLeftAxis': [],
            'yRightAxis': [],
            'resultIds': [1, 2],
            'title': 'no selected y values'
        },
        {
            'xAxis': 'epoch',
            'yLeftAxis': ['loss3'],
            'yRightAxis': [],
            'resultIds': [1, 2],
            'title': 'selected invalid y values'
        },
        {
            'xAxis': 'epoch',
            'yLeftAxis': ['loss', 'loss2'],
            'yRightAxis': ['accuracy'],
            'resultIds': [],
            'title': 'no selected results'
        },
        {
            'xAxis': 'epoch',
            'yLeftAxis': ['loss', 'loss2'],
            'yRightAxis': ['accuracy'],
            'resultIds': [3],
            'title': 'selected invalid result'
        }
    ]
    for config in configs:
        title = config.pop('title')
        logs['config'] = config
        _run_on_tempd(func_dir, render.render, logs)

        if os.path.exists(os.path.join(func_dir, 'log_chart.png')):
            pytest.fail('plot chart should not be created on {}'.format(title))
