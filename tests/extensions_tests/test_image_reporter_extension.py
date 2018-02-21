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
        summary._chainerui_global_observation = {}
        if os.path.exists(self._dir):
            shutil.rmtree(self._dir)

    def test_report_and_call(self):
        updater = MagicMock()
        updater.epoch = 0
        updater.epoch_detail = 0
        updater.iteration = 1
        trainer = MagicMock()
        trainer.out = self._dir
        trainer.updater = updater

        target = ImageReport()
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
        summary._chainerui_global_observation[
            image_prefix+'/test/tag1'] = img1
        img2 = np.zeros(3000).reshape((10, 10, 10, 3))
        img2[0, 0, 0, 1] = 1
        summary._chainerui_global_observation[
            image_prefix+'/test/tag2'] = img1

        # add image as batch
        updater.epoch = 2
        updater.epoch_detail = 2
        updater.iteration = 100
        target(trainer)
        assert len(target._infos) == 2
        npy1_name = 'iter_100_%s.npy' % target._get_hash('test/tag1')
        npy1_path = os.path.join(self._dir, npy1_name)
        assert os.path.exists(npy1_path)
        with open(npy1_path, 'rb') as f:
            npy1 = np.load(f)
        assert np.allclose(npy1, img1)

        info_path = os.path.join(self._dir, target._info_name)
        assert os.path.exists(info_path)
        with open(info_path, 'r') as f:
            info = json.load(f)
        assert len(info) == 2

        def check_first_info(info):
            assert info['epoch'] == 2
            assert info['iteration'] == 100
            assert info['name'] == 'test'
            if info['tag'] == 'tag1':
                assert info['path'] == npy1_name
            else:
                assert info['tag'] == 'tag2'
                assert info['path'] == 'iter_100_%s.npy' % target._get_hash(
                    'test/tag2')
        check_first_info(info[0])
        check_first_info(info[1])

        # count up epoch, but no new image
        updater.epoch = 3
        updater.epoch_detail = 3
        updater.iteration = 150
        target(trainer)
        assert len(target._infos) == 2

        # add 2nd. batch image, and get latest image
        img3 = np.zeros(3000).reshape((10, 10, 10, 3))
        img3[0, 0, 0, 2] = 1
        summary._chainerui_global_observation[
            image_prefix+'/test/tag1'] = img3
        img4 = np.zeros(3000).reshape((10, 10, 10, 3))
        img4[0, 0, 1, 0] = 1
        summary._chainerui_global_observation[
            image_prefix+'/test'] = img4
        updater.epoch = 4
        updater.epoch_detail = 4
        updater.iteration = 200
        target(trainer)
        assert len(target._infos) == 4
        npy4_name = 'iter_200_%s.npy' % target._get_hash('test')
        npy4_path = os.path.join(self._dir, npy4_name)
        assert os.path.exists(npy4_path)
        with open(npy4_path, 'rb') as f:
            npy4 = np.load(f)
        assert np.allclose(npy4, img4)

        with open(info_path, 'r') as f:
            info = json.load(f)
        assert len(info) == 4

        def check_second_info(info):
            assert info['epoch'] == 4
            assert info['iteration'] == 200
            assert info['name'] == 'test'
            if 'tag' in info:
                assert info['tag'] == 'tag1'
                assert info['path'] == 'iter_200_%s.npy' % target._get_hash(
                    'test/tag1')
            else:
                assert info['path'] == npy4_name
        check_second_info(info[2])
        check_second_info(info[3])
