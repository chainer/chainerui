import os
import unittest
import warnings

import chainer
import numpy as np
import six

from chainerui.report import audio_report


@unittest.skipUnless(audio_report._available, 'Audio module is not installed')
def test_available():
    with warnings.catch_warnings(record=True) as w:
        assert audio_report.check_available()
        assert len(w) == 0


def test_available_not_scipy_installed():
    import sys
    is_installed = 'scipy' in sys.modules or 'librosa' in sys.modules

    def check_available():
        with warnings.catch_warnings(record=True) as w:
            assert not audio_report.check_available()
            assert len(w) == 1

    if is_installed:
        scipy = sys.modules.get('scipy.io.wavfile', None)
        librosa = sys.modules.get('librosa.output', None)
        try:
            sys.modules['scipy.io.wavfile'] = ImportError()
            sys.modules['librosa.output'] = ImportError()
            six.moves.reload_module(audio_report)
            check_available()
        finally:
            sys.modules['scipy.io.wavfile'] = scipy
            sys.modules['librosa.output'] = librosa
            six.moves.reload_module(audio_report)
    else:
        check_available()


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
