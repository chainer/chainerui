import json
import os
import shutil
import tempfile

from chainer.training import extension
from chainer.training import trigger as trigger_module
import numpy as np

from chainerui import reporter


class ImageReport(extension.Extension):
    """Reports images for visualizing

    This extension supports visualizing image data on ChainerUI.
    """

    def __init__(self, trigger=(1, 'epoch')):
        self._trigger = trigger_module.get_trigger(trigger)
        self._info_name = '.chainerui_images'
        self._infos = []

    def __call__(self, trainer):
        if not self._trigger(trainer):
            return

        image_prefix = reporter.CHAINERUI_IMAGE_PREFIX
        # TODO(tanakad) should use copy, but trade-off
        observations = reporter._chainerui_global_observation
        pooled_images = {}
        for k, v in observations.items():
            if k.startswith(image_prefix):
                pooled_images[k[len(image_prefix) + 1:]] = v
        if len(pooled_images) == 0:
            return

        out_path = trainer.out
        for key, images in pooled_images.items():
            names = key.split('/')
            if len(names) > 1:
                name = names[0]
                tag = key[len(name) + 1:]
            else:
                name = key
                tag = None

            updater = trainer.updater
            file_name = 'iter_%d.npy' % updater.iteration
            path = os.path.join(out_path, file_name)
            # TODO(tanakad) should execute as queue worker
            np.save(path, images)
            info = {
                'epoch': updater.epoch,
                'iteration': updater.iteration,
                'name': name,
                'tag': tag,
                'path': file_name,
            }
            self._infos.append(info)

        fd, path = tempfile.mkstemp(prefix=self._info_name, dir=out_path)
        with os.fdopen(fd, 'w') as f:
            json.dump(self._infos, f, indent=4)

        new_path = os.path.join(out_path, self._info_name)
        shutil.move(path, new_path)
