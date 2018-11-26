import os
import unittest
import warnings

import chainer
import numpy as np

from chainerui.report import audio_report


def test_available():
    def is_scipy_installed():
        try:
            import scipy  # NOQA

            return True
        except (ImportError, TypeError):
            return False

    def is_librosa_installed():
        try:
            import librosa  # NOQA

            return True
        except (ImportError, TypeError):
            return False

    available = is_scipy_installed() or is_librosa_installed()
    with warnings.catch_warnings(record=True) as w:
        assert audio_report.check_available() == available

    if available:
        assert len(w) == 0
    else:
        assert len(w) == 1


@unittest.skipUnless(audio_report._available, 'Audio module is not installed')
def test_report(func_dir):
    data = np.random.uniform(-1, 1, 44100)
    audio = (data/np.max(np.abs(data)) * 32767).astype(np.int16)
    filename, created_at = audio_report.report(audio, 44100, func_dir, 'test')
    assert filename.startswith('test_')
    path = os.path.join(func_dir, filename)
    assert os.path.exists(path)
    assert created_at is not None


@unittest.skipUnless(audio_report._available, 'Audio module is not installed')
def test_report_chainer_variable(func_dir):
    data = np.random.uniform(-1, 1, 44100)
    audio = (data/np.max(np.abs(data)) * 32767).astype(np.int16)
    audio = chainer.Variable(audio)
    filename, created_at = audio_report.report(audio, 44100, func_dir, 'test')
    assert filename.startswith('test_')
    path = os.path.join(func_dir, filename)
    assert os.path.exists(path)
    assert created_at is not None
