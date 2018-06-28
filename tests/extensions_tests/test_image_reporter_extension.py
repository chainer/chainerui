import json
from mock import MagicMock
import os
import shutil
import tempfile
import unittest
import warnings

import numpy as np

from chainerui.extensions import image_reporter_extension
from chainerui.extensions.image_reporter_extension import ImageReport
from chainerui import summary


class TestImageReport(unittest.TestCase):

    def setUp(self):
        test_dir = tempfile.mkdtemp(prefix='chainerui_test_imgreport')
        self._dir = test_dir

    def tearDown(self):
        summary.chainerui_image_observer.observation = {}
        if os.path.exists(self._dir):
            shutil.rmtree(self._dir)

    def _equal_image(self, img1, img2):
        from PIL import ImageChops
        return ImageChops.difference(img1, img2).getbbox() is None

    def _make_image_summary_value(self, img, row=None, mode=None):
        value = dict(array=img)
        if row is not None:
            value['row'] = row
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
    def test_call(self):
        from PIL import Image
        updater = MagicMock()
        updater.epoch = 0
        updater.epoch_detail = 0
        updater.iteration = 1
        trainer = MagicMock()
        trainer.out = self._dir
        trainer.updater = updater

        target = ImageReport()
        target.initialize(trainer)
        target(trainer)
        assert len(target._infos) == 0

        # count up epoch, but no image
        updater.epoch = 1
        updater.epoch_detail = 1
        target(trainer)
        assert len(target._infos) == 0

        image_prefix = summary.CHAINERUI_IMAGE_PREFIX
        img1 = np.zeros(3000, dtype=np.uint8).reshape((10, 10, 10, 3))
        img1[0, 0, 0, 0] = 1
        observation = summary.chainerui_image_observer.observation
        observation[image_prefix+'/name1'] = self._make_image_summary_value(
            img1, 5, 'hsv')
        img2 = np.zeros(1000, dtype=np.uint8).reshape((10, 10, 10))
        img2[0, 0, 1] = 1
        observation[image_prefix+'/name2'] = self._make_image_summary_value(
            img2, 2)

        # add image as batch
        updater.epoch = 2
        updater.epoch_detail = 2
        updater.iteration = 100
        target(trainer)
        assert len(target._infos) == 1
        png1_name = 'iter_100_%s_0.png' % target._get_hash('name1')
        png1_path = os.path.join(self._dir, png1_name)
        assert os.path.exists(png1_path)
        loaded_img1 = Image.open(png1_path)
        expected_img1 = Image.fromarray(
            img1.reshape((5, 2, 10, 10, 3)).transpose(0, 2, 1, 3, 4).reshape(
                50, 20, 3), mode='HSV').convert('RGB')
        assert self._equal_image(loaded_img1, expected_img1)
        png2_name = 'iter_100_%s_0.png' % target._get_hash('name2')
        png2_path = os.path.join(self._dir, png2_name)
        assert os.path.exists(png2_path)
        loaded_img2 = Image.open(png2_path)
        expected_img2 = Image.fromarray(
            img2.reshape((2, 5, 10, 10)).transpose(0, 2, 1, 3).reshape(
                20, 50))
        assert self._equal_image(loaded_img2, expected_img2)

        info_path = os.path.join(self._dir, target._info_name)
        assert os.path.exists(info_path)
        with open(info_path, 'r') as f:
            info = json.load(f)
        assert len(info) == 1
        assert info[0]['epoch'] == 2
        assert info[0]['iteration'] == 100
        assert len(info[0]['images']) == 2

        assert 'name1' in info[0]['images']
        assert len(info[0]['images']['name1']) == 1
        assert info[0]['images']['name1'][0] == png1_name
        assert 'name2' in info[0]['images']
        assert len(info[0]['images']['name2']) == 1
        assert info[0]['images']['name2'][0] == 'iter_100_%s_0.png' % \
            target._get_hash('name2')

        # count up epoch, but no new image
        updater.epoch = 3
        updater.epoch_detail = 3
        updater.iteration = 150
        target(trainer)
        assert len(target._infos) == 1

        # add 2nd. batch image, and get latest image
        img3 = np.full(3000, 0.1).reshape((10, 10, 10, 3))
        img3[0, 0, 0, 2] = 0.9
        observation[image_prefix+'/name1'] = self._make_image_summary_value(
            img3)
        img4 = np.zeros(100, dtype=np.uint8).reshape((1, 10, 10))
        img4[0, 0, 1] = 1
        observation[image_prefix+'/0'] = self._make_image_summary_value(img4)
        updater.epoch = 4
        updater.epoch_detail = 4
        updater.iteration = 200
        target(trainer)
        assert len(target._infos) == 2
        for i in range(10):
            png3_name = 'iter_200_%s_%d.png' % (target._get_hash('name1'), i)
            png3_path = os.path.join(self._dir, png3_name)
            assert os.path.exists(png3_path)
            loaded_img3 = Image.open(png3_path)
            expected_img3 = Image.fromarray(np.asarray(np.clip(
                img3[i] * 255, 0.0, 255.0), dtype=np.uint8))
            assert self._equal_image(loaded_img3, expected_img3)
        png4_name = 'iter_200_%s_0.png' % target._get_hash('0')
        png4_path = os.path.join(self._dir, png4_name)
        assert os.path.exists(png4_path)

        with open(info_path, 'r') as f:
            info = json.load(f)
        assert len(info) == 2
        assert info[1]['epoch'] == 4
        assert info[1]['iteration'] == 200
        assert len(info[1]['images']) == 2

        assert 'name1' in info[1]['images']
        assert len(info[1]['images']['name1']) == 10
        assert info[1]['images']['name1'][0] == 'iter_200_%s_0.png' % \
            target._get_hash('name1')
        assert '0' in info[1]['images']
        assert len(info[1]['images']['0']) == 1
        for i in range(10):
            png3_name = 'iter_200_%s_%d.png' % (target._get_hash('name1'), i)
            assert info[1]['images']['name1'][i] == png3_name

    @unittest.skipUnless(
        image_reporter_extension._available, 'Pillow is not installed')
    def test_with_makefn(self):
        from PIL import Image
        updater = MagicMock()
        updater.epoch = 1
        updater.epoch_detail = 1
        updater.iteration = 10
        trainer = MagicMock()
        trainer.out = self._dir
        trainer.updater = updater

        def create_image_generator(name):
            image_prefix = summary.CHAINERUI_IMAGE_PREFIX
            name = image_prefix + '/' + name

            def maker(trainer):
                img = np.ones(750, dtype=np.uint8).reshape((10, 5, 5, 3))
                summary.chainerui_image_observer.observation[
                    name] = self._make_image_summary_value(img)
            return maker
        target = ImageReport(image_generator=create_image_generator('test'))
        target.initialize(trainer)
        target(trainer)
        assert len(target._infos) == 1
        png_name = 'iter_10_%s_0.png' % target._get_hash('test')
        png_path = os.path.join(self._dir, png_name)
        assert os.path.exists(png_path)
        loaded_img = Image.open(png_path)
        expected_img = Image.fromarray(
            np.ones(750, dtype=np.uint8).reshape((5, 2, 5, 5, 3)).transpose(
                0, 2, 1, 3, 4).reshape(25, 10, 3))
        assert self._equal_image(loaded_img, expected_img)
