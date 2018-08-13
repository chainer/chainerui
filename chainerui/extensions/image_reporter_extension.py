from collections import OrderedDict
import hashlib
import json
import os
import shutil
import warnings

from chainer.training import extension
from chainer.training import trigger as trigger_module
import numpy as np

from chainerui import summary
from chainerui.utils import tempdir


try:
    from PIL import Image  # NOQA

    _available = True

except (ImportError, TypeError):
    _available = False


def _check_available():
    if not _available:
        warnings.warn('Pillow is not installed on your environment, '
                      'so no image will be output at this time.'
                      'Please install Pillow to save images.\n\n'
                      '  $ pip install Pillow\n')


class ImageReport(extension.Extension):
    """Reports images for visualizing

    This extension supports visualizing image data on ChainerUI.
    """

    def __init__(self, trigger=(1, 'epoch'), image_generator=None):
        _check_available()
        self._trigger = trigger_module.get_trigger(trigger)
        self._fn = image_generator
        self._info_name = '.chainerui_images'
        self._infos = []

    @staticmethod
    def available():
        _check_available()
        return _available

    def initialize(self, trainer):
        self._observer = summary.chainerui_image_observer

    def __call__(self, trainer):
        if not _available:
            return
        if not self._trigger(trainer):
            return
        if self._fn is not None:
            self._fn(trainer)

        image_prefix = summary.CHAINERUI_IMAGE_PREFIX
        observations = self._observer.observation
        pooled_images = OrderedDict()
        keys = observations.keys()
        for k in list(keys):
            if k.startswith(image_prefix):
                pooled_images[k[len(image_prefix) + 1:]] = observations.pop(k)
        if len(pooled_images) == 0:
            return

        out_path = trainer.out
        updater = trainer.updater
        image_path = {}
        for key, value in pooled_images.items():
            image = self._normalize_8bit(value['image'])
            file_name = 'iter_%d_%s.png' % (
                updater.iteration, self._get_hash(key))
            file_path = os.path.join(out_path, file_name)
            self._save_image(image, file_path, mode=value.get('mode', None))
            image_path[key] = file_name
        info = {
            'epoch': updater.epoch,
            'iteration': updater.iteration,
            'images': image_path,
        }
        self._infos.append(info)

        with tempdir(prefix=self._info_name, dir=out_path) as tempd:
            path = os.path.join(tempd, self._info_name)
            with open(path, 'w') as f:
                json.dump(self._infos, f, indent=4)

            shutil.move(path, os.path.join(out_path, self._info_name))

    def _get_hash(self, key):
        return hashlib.md5(key.encode('utf-8')).hexdigest()[:8]

    def _normalize_8bit(self, array):
        if array.dtype == np.uint8:
            return array
        return np.asarray(np.clip(array * 255, 0.0, 255.0), dtype=np.uint8)

    def _save_image(self, img, name, ext='PNG', mode=None):
        if mode is None:
            Image.fromarray(img).save(name, format=ext)
        elif mode == 'hsv':
            Image.fromarray(img, mode='HSV').convert('RGB').save(
                name, format=ext)
