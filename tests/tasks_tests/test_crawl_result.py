import datetime
import json
import os
import shutil
import tempfile
import unittest

from chainerui.models.result import Result
from chainerui.tasks.crawl_result import _check_log_updated


class TestCrawlResult(unittest.TestCase):

    def setUp(self):
        test_dir = tempfile.mkdtemp(prefix='chainerui_test_crawl_result')
        self._dir = test_dir

        path = os.path.join(test_dir, 'result')
        self._result_path = path
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

    def tearDown(self):
        if os.path.exists(self._dir):
            shutil.rmtree(self._dir)

    def test_check_log_updated(self):
        result = Result(path_name=self._result_path)
        assert _check_log_updated(result)
        assert result.log_modified_at is not None
        # NOTE: getmtime precision is rough, so back 0.1s on purpose
        modified_at = result.log_modified_at - datetime.timedelta(
            milliseconds=100)
        result.log_modified_at = modified_at

        with open(os.path.join(self._result_path, 'log'), 'r') as f:
            logs = json.load(f)
        logs.append({
            "main/loss": 0.04882155358791351,
            "validation/main/loss": 0.09093106538057327,
            "iteration": 1800,
            "elapsed_time": 23.046298027038574,
            "epoch": 3,
            "main/accuracy": 0.9839146733283997,
            "validation/main/accuracy": 0.9726001620292664
        })
        with open(os.path.join(self._result_path, 'log'), 'w') as f:
            json.dump(logs, f)
        assert _check_log_updated(result)
        assert result.log_modified_at != modified_at
        modified_at = result.log_modified_at

        assert not _check_log_updated(result)
        assert result.log_modified_at == modified_at

        os.remove(os.path.join(self._result_path, 'log'))
        assert not _check_log_updated(result)
