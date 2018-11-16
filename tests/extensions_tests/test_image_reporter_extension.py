import json
from mock import MagicMock
import os
import unittest
import warnings

import numpy as np

from chainerui.extensions import image_reporter_extension
from chainerui.extensions.image_reporter_extension import ImageReport
from chainerui import summary
from tests.conftest import TempDirTestCase


class TestImageReport(TempDirTestCase):

    def _make_trainer_mock(self, epoch, iteration):
        updater = MagicMock()
        updater.epoch = epoch
        updater.epoch_detail = epoch
        updater.iteration = iteration
        trainer = MagicMock()
        trainer.out = self.dir
        trainer.updater = updater
        return trainer

    def _equal_image(self, img1, img2):
        from PIL import ImageChops
        return ImageChops.difference(img1, img2).getbbox() is None

    def _make_image_info(self, img, mode=None):
        value = {'image': img}
        if mode is not None:
            value['mode'] = mode
        return value

    def test_available(self):
        try:
            import PIL  # NOQA
            available = True
        except ImportError:
            available = False

        with warnings.catch_warnings(record=True) as w:
            assert ImageReport.available() == available

        # It shows warning only when Pillow is not available
        if available:
            assert len(w) == 0
        else:
            assert len(w) == 1

    @unittest.skipUnless(
        image_reporter_extension._available, 'Pillow is not installed')
    def test_call_empty(self):
        trainer = self._make_trainer_mock(0, 1)

        target = ImageReport()
        target.initialize(trainer)
        target(trainer)
        assert len(target._infos) == 0

        # count up epoch, but no image
        trainer.updater.epoch = 1
        trainer.updater.epoch_detail = 1
        target(trainer)
        assert len(target._infos) == 0

    @unittest.skipUnless(
        image_reporter_extension._available, 'Pillow is not installed')
    def test_call_twice(self):
        from PIL import Image

        # register stuck image, color(hsv) and grayscale
        image_prefix = summary.CHAINERUI_IMAGE_PREFIX
        img1 = np.zeros(50*25*3, dtype=np.uint8).reshape((50, 25, 3))
        img1[0, 0, 0] = 1
        observation = summary.chainerui_image_observer.observation
        observation[image_prefix+'/name1'] = self._make_image_info(img1, 'hsv')
        img2 = np.zeros(50*25, dtype=np.uint8).reshape((50, 25))
        img2[0, 1] = 1
        observation[image_prefix+'/name2'] = self._make_image_info(img2)

        # make image
        target = ImageReport()
        trainer = self._make_trainer_mock(2, 100)
        target.initialize(trainer)

        target(trainer)
        assert len(target._infos) == 1
        png1_name = 'iter_100_%s.png' % target._get_hash('name1')
        png1_path = os.path.join(self.dir, png1_name)
        assert os.path.exists(png1_path)
        loaded_img1 = Image.open(png1_path)
        expected_img1 = Image.fromarray(img1, mode='HSV').convert('RGB')
        assert self._equal_image(loaded_img1, expected_img1)
        png2_name = 'iter_100_%s.png' % target._get_hash('name2')
        png2_path = os.path.join(self.dir, png2_name)
        assert os.path.exists(png2_path)
        loaded_img2 = Image.open(png2_path)
        expected_img2 = Image.fromarray(img2)
        assert self._equal_image(loaded_img2, expected_img2)

        # confirm metadata
        info_path = os.path.join(self.dir, target._info_name)
        assert os.path.exists(info_path)
        with open(info_path, 'r') as f:
            info = json.load(f)
        assert len(info) == 1
        assert info[0]['epoch'] == 2
        assert info[0]['iteration'] == 100
        assert len(info[0]['images']) == 2

        assert 'name1' in info[0]['images']
        assert info[0]['images']['name1'] == png1_name
        assert 'name2' in info[0]['images']
        assert info[0]['images']['name2'] == png2_name

        # count up epoch, but no new image
        trainer.updater.epoch = 3
        trainer.updater.epoch_detail = 3
        trainer.updater.iteration = 150
        target(trainer)
        assert len(target._infos) == 1

        # register 2nd. stuck image, color(float) and grayscale
        img3 = np.full(50*25*3, 0.1).reshape((50, 25, 3))
        img3[0, 0, 2] = 0.9
        observation[image_prefix+'/name1'] = self._make_image_info(img3)
        img4 = np.zeros(100, dtype=np.uint8).reshape((10, 10))
        img4[0, 1] = 1
        observation[image_prefix+'/name2'] = self._make_image_info(img4)

        # make image
        trainer.updater.epoch = 4
        trainer.updater.epoch_detail = 4
        trainer.updater.iteration = 200
        target(trainer)
        assert len(target._infos) == 2
        png3_name = 'iter_200_%s.png' % target._get_hash('name1')
        png3_path = os.path.join(self.dir, png3_name)
        assert os.path.exists(png3_path)
        loaded_img3 = Image.open(png3_path)
        expected_img3 = Image.fromarray(target._normalize_8bit(img3))
        assert self._equal_image(loaded_img3, expected_img3)
        png4_name = 'iter_200_%s.png' % target._get_hash('name2')
        png4_path = os.path.join(self.dir, png4_name)
        assert os.path.exists(png4_path)
        loaded_img4 = Image.open(png4_path)
        expected_img4 = Image.fromarray(img2)
        assert self._equal_image(loaded_img4, expected_img4)

        # confirm metadata
        with open(info_path, 'r') as f:
            info = json.load(f)
        assert len(info) == 2
        assert info[1]['epoch'] == 4
        assert info[1]['iteration'] == 200
        assert len(info[1]['images']) == 2

        assert 'name1' in info[1]['images']
        assert info[1]['images']['name1'] == png3_name
        assert 'name2' in info[1]['images']
        assert info[1]['images']['name2'] == png4_name

    @unittest.skipUnless(
        image_reporter_extension._available, 'Pillow is not installed')
    def test_with_makefn(self):
        from PIL import Image
        trainer = self._make_trainer_mock(1, 10)

        def create_image_generator(name):
            image_prefix = summary.CHAINERUI_IMAGE_PREFIX
            name = image_prefix + '/' + name

            def maker(trainer):
                img = np.ones(10*25*3, dtype=np.uint8).reshape((10, 25, 3))
                # register image directory because to omit setup reporter
                summary.chainerui_image_observer.observation[
                    name] = self._make_image_info(img)
            return maker
        target = ImageReport(image_generator=create_image_generator('test'))
        target.initialize(trainer)
        target(trainer)
        assert len(target._infos) == 1
        png_name = 'iter_10_%s.png' % target._get_hash('test')
        png_path = os.path.join(self.dir, png_name)
        assert os.path.exists(png_path)
        loaded_img = Image.open(png_path)
        expected_img = Image.fromarray(
            np.ones(10*25*3, dtype=np.uint8).reshape((10, 25, 3)))
        assert self._equal_image(loaded_img, expected_img)
