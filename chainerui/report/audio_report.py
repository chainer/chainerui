import datetime
import os
import warnings

import chainer
from chainer import cuda

from chainerui.report.utils import get_hash
from chainerui.report.utils import get_unixtime


try:
    import scipy.io.wavfile

    def scipy_write_wav(out, data, rate):
        return scipy.io.wavfile.write(out, rate, data)

    _write_wav = scipy_write_wav
except (ImportError, TypeError):
    try:
        import librosa.output

        def librosa_write_wav(out, data, rate):
            return librosa.output.write_wav(out, data, rate)

        _write_wav = librosa_write_wav
    except (ImportError, TypeError):
        _write_wav = None


_available = _write_wav is not None


def check_available():
    if not _available:
        warnings.warn('Scipy or librosa is not installed on your environment, '
                      'so no audio file will be output at this time.'
                      'Please install Scipy or librosa to save WAV files.\n\n'
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
