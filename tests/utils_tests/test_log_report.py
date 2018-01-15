import json
import os
import shutil
import tempfile
import unittest

from chainerui.utils import log_report


class TestLogReport(unittest.TestCase):

    def setUp(self):
        self._dir = tempfile.mkdtemp()

    def tearDown(self):
        if os.path.exists(self._dir):
            shutil.rmtree(self._dir)

    def test_add_log_without_elapsed_time(self):
        test_dir = os.path.join(self._dir, 'result')
        target = log_report.LogReport(test_dir, {'batchsize': 100})
        assert os.path.exists(test_dir)
        assert os.path.exists(os.path.join(test_dir, 'args'))

        log = {'epoch': 1, 'iteration': 100, 'loss': 0.1}
        target(log)
        log_path = os.path.join(test_dir, 'log')
        assert os.path.exists(log_path)

        with open(log_path) as f:
            target_log = json.load(f)
        assert len(target_log) == 1
        target_log0 = target_log[0]
        assert target_log0['epoch'] == 1
        assert target_log0['iteration'] == 100
        assert target_log0['loss'] - 0.1 < 1e-10
        assert 'elapsed_time' in target_log0

        log2 = {'epoch': 10, 'iteration': 1000, 'loss': 0.001}
        target(log2)
        with open(log_path) as f:
            target_log = json.load(f)
        assert len(target_log) == 2
        target_log1 = target_log[1]
        assert target_log1['epoch'] == 10
        assert target_log1['iteration'] == 1000
        assert target_log1['loss'] - 0.001 < 1e-10
        assert target_log1['elapsed_time'] > 0

    def test_add_log_with_elapsed_time(self):
        test_dir = os.path.join(self._dir, 'result2')
        target = log_report.LogReport(test_dir)
        assert os.path.exists(test_dir)
        assert not os.path.exists(os.path.join(test_dir, 'args'))

        log = {'epoch': 1, 'iteration': 100, 'loss': 0.1, 'elapsed_time': 150}
        target(log)
        log_path = os.path.join(test_dir, 'log')
        assert os.path.exists(log_path)

        with open(log_path) as f:
            target_log = json.load(f)
        assert len(target_log) == 1
        target_log0 = target_log[0]
        assert target_log0['epoch'] == 1
        assert target_log0['iteration'] == 100
        assert target_log0['loss'] - 0.1 < 1e-10
        assert target_log0['elapsed_time'] == 150
