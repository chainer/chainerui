import datetime
import os
import warnings

import chainer
from chainer import cuda
import numpy

from chainerui.report.utils import get_hash
from chainerui.report.utils import get_unixtime


def _setup_image_module():
    try:
        from PIL import Image  # NOQA
        return Image

    except (ImportError, TypeError):
        return None


_Image = _setup_image_module()
_available = _Image is not None


def check_available():
    if not _available:
        warnings.warn('Pillow is not installed on your environment, '
                      'so no image will be output at this time.'
                      'Please install Pillow to save images.\n\n'
                      '  $ pip install Pillow\n')
    return _available


def report(images, out, name, ch_axis=1, row=0, mode=None, batched=True):
    if isinstance(images, chainer.Variable):
        images = images.data
    images = cuda.to_cpu(images)
    if batched:
        stuck_image = _get_stuck_batched_image(images, ch_axis, row)
    else:
        stuck_image = _get_stuck_image(images, ch_axis)

    now = datetime.datetime.now()
    ts = get_unixtime(now)
    filename = '{}_{}.png'.format(name, get_hash('{}'.format(ts)))
    filepath = os.path.join(out, filename)
    _save_image(_normalize_8bit(stuck_image), filepath, mode=mode)

    return filename, now


def _get_stuck_batched_image(images, ch_axis, row):
    ndim = images.ndim
    if not (ndim == 3 or ndim == 4):
        raise ValueError(
            'Number of array dimension {:d} must be 3 or 4'.format(ndim))

    if ndim == 4:
        images = _move_ch_to_last(images, ch_axis)
        B, H, W, C = images.shape
        if row == 0:
            row = B
        col = B // row
        images = images.reshape(row, col, H, W, C)
        images = images.transpose(0, 2, 1, 3, 4)
        return images.reshape(row * H, col * W, C)

    # ndim == 3
    B, H, W = images.shape
    if row == 0:
        row = B
    col = B // row
    images = images.reshape(row, col, H, W)
    images = images.transpose(0, 2, 1, 3)
    return images.reshape(row * H, col * W)


def _get_stuck_image(images, ch_axis):
    ndim = images.ndim
    if not (ndim == 2 or ndim == 3):
        raise ValueError(
            'Number of array dimension {:d} must be 2 or 3'.format(ndim))
    if ndim == 2:
        return images

    # ndim == 3
    return _move_ch_to_last(images, ch_axis)


def _move_ch_to_last(x, axis):
    if axis == -1:
        return x
    rolled_ax = numpy.append(numpy.delete(numpy.arange(x.ndim), axis), axis)
    return x.transpose(rolled_ax)


def _normalize_8bit(array):
    if array.dtype == numpy.uint8:
        return array
    return numpy.asarray(numpy.clip(array*255, 0.0, 255.0), dtype=numpy.uint8)


def _save_image(img, name, ext='PNG', mode=None):
    if mode is None:
        _Image.fromarray(img).save(name, format=ext)
    elif mode.lower() == 'hsv':
        _Image.fromarray(img, mode='HSV').convert('RGB').save(name, format=ext)
