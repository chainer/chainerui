import json
from mock import MagicMock
import os
import shutil
import tempfile
import unittest

import numpy as np

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

    def _make_image_summary_value(self, img, row=None):
        value = dict(array=img)
        if row is not None:
            value['row'] = row
        return value

    def test_call(self):
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
        img1 = np.zeros(3000).reshape((10, 10, 10, 3))
        img1[0, 0, 0, 0] = 1
        observation = summary.chainerui_image_observer.observation
        observation[image_prefix+'/name1'] = self._make_image_summary_value(
            img1, 5)
        img2 = np.zeros(3000).reshape((10, 10, 10, 3))
        img2[0, 0, 0, 1] = 1
        observation[image_prefix+'/name2'] = self._make_image_summary_value(
            img2, 2)

        # add image as batch
        updater.epoch = 2
        updater.epoch_detail = 2
        updater.iteration = 100
        target(trainer)
        assert len(target._infos) == 1
        npy1_name = 'iter_100_%s.npy' % target._get_hash('name1')
        npy1_path = os.path.join(self._dir, npy1_name)
        assert os.path.exists(npy1_path)
        with open(npy1_path, 'rb') as f:
            npy1 = np.load(f)
        assert np.allclose(npy1, img1)

        info_path = os.path.join(self._dir, target._info_name)
        assert os.path.exists(info_path)
        with open(info_path, 'r') as f:
            info = json.load(f)
        assert len(info) == 1
        assert info[0]['epoch'] == 2
        assert info[0]['iteration'] == 100
        assert len(info[0]['images']) == 2

        def check_first_info(info):
            if info['name'] == 'name1':
                assert info['path'] == npy1_name
                assert info['row'] == 5
            else:
                assert info['name'] == 'name2'
                assert info['path'] == 'iter_100_%s.npy' % target._get_hash(
                    'name2')
                assert info['row'] == 2
        check_first_info(info[0]['images'][0])
        check_first_info(info[0]['images'][1])

        # count up epoch, but no new image
        updater.epoch = 3
        updater.epoch_detail = 3
        updater.iteration = 150
        target(trainer)
        assert len(target._infos) == 1

        # add 2nd. batch image, and get latest image
        img3 = np.zeros(3000).reshape((10, 10, 10, 3))
        img3[0, 0, 0, 2] = 1
        observation[image_prefix+'/name1'] = self._make_image_summary_value(
            img3, 5)
        img4 = np.zeros(3000).reshape((10, 10, 10, 3))
        img4[0, 0, 1, 0] = 1
        observation[image_prefix+'/0'] = self._make_image_summary_value(
            img4)
        updater.epoch = 4
        updater.epoch_detail = 4
        updater.iteration = 200
        target(trainer)
        assert len(target._infos) == 2
        npy4_name = 'iter_200_%s.npy' % target._get_hash('0')
        npy4_path = os.path.join(self._dir, npy4_name)
        assert os.path.exists(npy4_path)
        with open(npy4_path, 'rb') as f:
            npy4 = np.load(f)
        assert np.allclose(npy4, img4)

        with open(info_path, 'r') as f:
            info = json.load(f)
        assert len(info) == 2
        assert info[1]['epoch'] == 4
        assert info[1]['iteration'] == 200
        assert len(info[1]['images']) == 2

        def check_second_info(info):
            if info['name'] == 'name1':
                assert info['path'] == 'iter_200_%s.npy' % target._get_hash(
                    'name1')
            else:
                assert info['name'] == '0'
                assert info['path'] == npy4_name
                assert 'row' not in info
        check_second_info(info[1]['images'][0])
        check_second_info(info[1]['images'][1])

    def test_with_makefn(self):
        updater = MagicMock()
        updater.epoch = 1
        updater.epoch_detail = 1
        updater.iteration = 10
        trainer = MagicMock()
        trainer.out = self._dir
        trainer.updater = updater

        def create_image_fn(name):
            image_prefix = summary.CHAINERUI_IMAGE_PREFIX
            name = image_prefix + '/' + name

            def maker(trainer):
                img = np.ones(750).reshape((10, 5, 5, 3))
                summary.chainerui_image_observer.observation[
                    name] = self._make_image_summary_value(img)
            return maker
        target = ImageReport(image_fn=create_image_fn('test'))
        target.initialize(trainer)
        target(trainer)
        assert len(target._infos) == 1
        npy_name = 'iter_10_%s.npy' % target._get_hash('test')
        npy_path = os.path.join(self._dir, npy_name)
        assert os.path.exists(npy_path)
