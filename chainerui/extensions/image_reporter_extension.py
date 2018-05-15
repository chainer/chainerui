import hashlib
import json
import os
import shutil
import tempfile

from chainer.training import extension
from chainer.training import trigger as trigger_module
import numpy as np

from chainerui import summary


class ImageReport(extension.Extension):
    """Reports images for visualizing

    This extension supports visualizing image data on ChainerUI.
    """

    def __init__(self, trigger=(1, 'epoch'), image_generator=None):
        self._trigger = trigger_module.get_trigger(trigger)
        self._fn = image_generator
        self._info_name = '.chainerui_images'
        self._infos = []

    def initialize(self, trainer):
        observer = summary.chainerui_image_observer
        trainer.reporter.add_observer(
            summary.CHAINERUI_IMAGE_PREFIX, observer)
        self._observer = observer

    def __call__(self, trainer):
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
        images_info = []
        for key, value in pooled_images.items():
            file_name = 'iter_%d_%s.npy' % (
                updater.iteration, self._get_hash(key))
            path = os.path.join(out_path, file_name)
            if not os.path.exists(path):
                # TODO(disktnk) should execute as queue worker
                np.save(path, value['array'])
            image_info = {
                'path': file_name,
                'name': key
            }
            if 'row' in value:
                image_info['row'] = value['row']
            if 'mode' in value:
                image_info['mode'] = value['mode']
            images_info.append(image_info)
        info = {
            'epoch': updater.epoch,
            'iteration': updater.iteration,
            'images': images_info
        }
        self._infos.append(info)

        fd, path = tempfile.mkstemp(prefix=self._info_name, dir=out_path)
        with os.fdopen(fd, 'w') as f:
            json.dump(self._infos, f, indent=4)

        new_path = os.path.join(out_path, self._info_name)
        shutil.move(path, new_path)

    def _get_hash(self, key):
        return hashlib.md5(key.encode('utf-8')).hexdigest()[:8]
