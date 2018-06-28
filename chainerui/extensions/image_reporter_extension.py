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
        observer = summary.chainerui_image_observer
        trainer.reporter.add_observer(
            summary.CHAINERUI_IMAGE_PREFIX, observer)
        self._observer = observer

    def __call__(self, trainer):
        if not _available:
            return
        if not self._trigger(trainer):
            return
        if self._fn is not None:
            self._fn(trainer)

        image_prefix = summary.CHAINERUI_IMAGE_PREFIX
        observations = self._observer.observation
        pooled_images = {}
        keys = observations.keys()
        for k in list(keys):
            if k.startswith(image_prefix):
                pooled_images[k[len(image_prefix) + 1:]] = observations.pop(k)
        if len(pooled_images) == 0:
            return

        out_path = trainer.out
        updater = trainer.updater
        image_paths = {}
        for key, value in pooled_images.items():
            images = self._make_image(value['array'], value.get('row', None))
            paths = []
            for i, img in enumerate(images):
                file_name = 'iter_%d_%s_%d.png' % (
                    updater.iteration, self._get_hash(key), i)
                path = os.path.join(out_path, file_name)
                if not os.path.exists(path):
                    # TODO(disktnk) should execute as queue worker
                    self._save_image(img, path, mode=value.get('mode', None))
                paths.append(file_name)
            image_paths[key] = paths
        info = {
            'epoch': updater.epoch,
            'iteration': updater.iteration,
            'images': image_paths,
        }
        self._infos.append(info)

        with tempdir(prefix=self._info_name, dir=out_path) as tempd:
            path = os.path.join(tempd, self._info_name)
            with open(path, 'w') as f:
                json.dump(self._infos, f, indent=4)

            shutil.move(path, os.path.join(out_path, self._info_name))

    def _get_hash(self, key):
        return hashlib.md5(key.encode('utf-8')).hexdigest()[:8]

    def _make_image(self, array, row=None):
        images = []
        x = array
        if array.dtype != np.uint8:
            x = np.asarray(np.clip(x * 255, 0.0, 255.0), dtype=np.uint8)
        if x.ndim == 4:
            B, H, W, C = x.shape
            if row is not None:
                col = B // row
                x = x.reshape((row, col, H, W, C))
                x = x.transpose(0, 2, 1, 3, 4)
                x = x.reshape((row * H, col * W, C))
                images.append(x)
            else:
                images = [img for img in x]
        elif x.ndim == 3:
            B, H, W = x.shape
            if row is not None:
                col = B // row
                x = x.reshape((row, col, H, W))
                x = x.transpose(0, 2, 1, 3)
                x = x.reshape((row * H, col * W))
                images.append(x)
            else:
                images = [img for img in x]
        return images

    def _save_image(self, img, name, ext='PNG', mode=None):
        if mode is None:
            Image.fromarray(img).save(name, format=ext)
        elif mode == 'hsv':
            Image.fromarray(img, mode='HSV').convert('RGB').save(
                name, format=ext)
