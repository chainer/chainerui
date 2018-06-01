import json
from mock import MagicMock
from mock import patch
import os
import shutil
import tempfile
import unittest

import numpy as np
from PIL import Image

from chainerui.tasks import collect_images


class TestApp(unittest.TestCase):

    def setUp(self):
        self._dir = tempfile.mkdtemp(prefix='chainerui_test_collect_images')

    def tearDown(self):
        if os.path.exists(self._dir):
            shutil.rmtree(self._dir)

    def test_collect_images(self):
        result = MagicMock()
        result.path_name = self._dir

        mock_filter_by = MagicMock()
        mock_filter_by.first.return_value = result
        mock_query = MagicMock()
        mock_query.filter_by.return_value = mock_filter_by
        mock_session = MagicMock()
        mock_session.query.return_value = mock_query

        with patch('chainerui.tasks.collect_images.DB_SESSION', mock_session):
            collect_images.collect_images(0)

        img1_1 = np.zeros(2*5*5*5*3, dtype=np.uint8).reshape((10, 25, 3))
        img1_1[0, 0, 0] = 1
        img1_1_path = os.path.join(self._dir, 'img1_1.png')
        Image.fromarray(img1_1).save(img1_1_path)
        img1_2 = np.zeros(5*5*3, dtype=np.uint8).reshape((5, 5, 3))
        img1_2[0, 0, 1] = 1
        img1_2_path = os.path.join(self._dir, 'img1_2.png')
        Image.fromarray(img1_2).save(img1_2_path)
        img1_3 = np.zeros(5*5*3, dtype=np.uint8).reshape((5, 5, 3))
        img1_3[0, 1, 0] = 1
        img1_3_path = os.path.join(self._dir, 'img1_3.png')
        Image.fromarray(img1_3).save(img1_3_path)
        img2 = np.ones(2*5*5*5*3, dtype=np.uint8).reshape((10, 25, 3))
        img2_path = os.path.join(self._dir, 'img2.png')
        Image.fromarray(img2).save(img2_path)

        test_data = [
            {
                'iteration': 1000,
                'epoch': 1,
                'images': {
                    '0': [img1_1_path],
                    '1': [img1_2_path, img1_3_path],
                }
            },
            {
                'iteration': 2000,
                'epoch': 2,
                'custom': 'test',
                'images': {
                    'seg': [img2_path],
                }
            }
        ]
        with open(os.path.join(self._dir, '.chainerui_images'), 'w') as f:
            json.dump(test_data, f)

        with patch('chainerui.tasks.collect_images.DB_SESSION', mock_session):
            actual_list = collect_images.collect_images(0)

        assert len(actual_list) == 2
        actual_img1 = actual_list[0]
        assert len(actual_img1['contents']) == 2
        assert '0' in actual_img1['contents']
        assert len(actual_img1['contents']['0']) == 1
        img1_1_str = collect_images._make_src_tag(
            collect_images._serialize(img1_1_path))
        assert actual_img1['contents']['0'][0] == img1_1_str
        assert '1' in actual_img1['contents']
        assert len(actual_img1['contents']['1']) == 2
        img1_2_0_str = collect_images._make_src_tag(
            collect_images._serialize(img1_2_path))
        assert actual_img1['contents']['1'][0] == img1_2_0_str
        img1_2_1_str = collect_images._make_src_tag(
            collect_images._serialize(img1_3_path))
        assert actual_img1['contents']['1'][1] == img1_2_1_str
        assert 'iteration' in actual_img1['train_info']
        assert actual_img1['train_info']['iteration'] == 1000
        assert 'epoch' in actual_img1['train_info']
        assert actual_img1['train_info']['epoch'] == 1

        actual_img2 = actual_list[1]
        assert 'images' not in actual_img2['train_info']
        assert 'custom' in actual_img2['train_info']
        assert actual_img2['train_info']['custom'] == 'test'
