import datetime
import os
import warnings

import chainer
from chainer import cuda

from chainerui.report.utils import get_hash
from chainerui.report.utils import get_unixtime


_write_wav = None


def _set_wav_writer():
    try:
        from scipy.io.wavfile import write

        def scipy_write_wav(out, data, rate):
            return write(out, rate, data)

        return scipy_write_wav
    except (ImportError, TypeError):
        return None


_write_wav = _set_wav_writer()
_available = _write_wav is not None


def check_available():
    if not _available:
        warnings.warn('Scipy is not installed on your environment, '
                      'so no audio file will be output at this time.'
                      'Please install Scipy to save WAV files.\n\n'
                      '  % pip install scipy\n')
    return _available


def report(audio, sample_rate, out, name):
    if isinstance(audio, chainer.Variable):
        audio = audio.data
    audio = cuda.to_cpu(audio)
    now = datetime.datetime.now()
    ts = get_unixtime(now)
    filename = '{}_{}.wav'.format(name, get_hash('{}'.format(ts)))
    filepath = os.path.join(out, filename)
    _write_wav(filepath, audio, sample_rate)

    return filename, now
