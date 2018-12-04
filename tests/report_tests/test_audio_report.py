import os
import unittest
import warnings

import numpy as np
import six

try:
    import chainer  # NOQA
    _chainer_installed = True
except (ImportError, TypeError):
    _chainer_installed = False

if _chainer_installed:
    from chainerui.report import audio_report
    _audio_report_available = audio_report._available
else:
    _audio_report_available = False


@unittest.skipUnless(_audio_report_available, 'Audio report is not available')
def test_available():
    with warnings.catch_warnings(record=True) as w:
        assert audio_report.check_available()
        assert len(w) == 0


@unittest.skipUnless(_chainer_installed, 'Chainer is not installed')
def test_available_not_scipy_installed():
    import sys
    is_installed = 'scipy.io.wavfile' in sys.modules

    def check_available():
        with warnings.catch_warnings(record=True) as w:
            assert not audio_report.check_available()
            assert len(w) == 1

    if is_installed:
        scipy = sys.modules['scipy.io.wavfile']
        try:
            sys.modules['scipy.io.wavfile'] = ImportError()
            six.moves.reload_module(audio_report)
            check_available()
        finally:
            sys.modules['scipy.io.wavfile'] = scipy
            six.moves.reload_module(audio_report)
    else:
        check_available()


@unittest.skipUnless(_audio_report_available, 'Audio report is not available')
def test_report(func_dir):
    audio = np.random.uniform(-1, 1, 16000)
    filename, created_at = audio_report.report(audio, 16000, func_dir, 'test')
    assert filename.startswith('test_')
    path = os.path.join(func_dir, filename)
    assert os.path.exists(path)
    assert created_at is not None


@unittest.skipUnless(_audio_report_available, 'Audio report is not available')
def test_report_chainer_variable(func_dir):
    audio = np.random.uniform(-1, 1, 16000)
    audio = chainer.Variable(audio)
    filename, created_at = audio_report.report(audio, 16000, func_dir, 'test')
    assert filename.startswith('test_')
    path = os.path.join(func_dir, filename)
    assert os.path.exists(path)
    assert created_at is not None
