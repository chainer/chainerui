import json
from mock import MagicMock
from mock import patch
import os
import shutil
import tempfile
import unittest

import numpy as np

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

        img1_1 = np.zeros(10*5*5*3, dtype=np.uint8).reshape((10, 5, 5, 3))
        img1_1[0, 0, 0, 0] = 1
        npy1_1_path = os.path.join(self._dir, 'img1_1_path.npy')
        np.save(npy1_1_path, img1_1)
        img1_2 = np.zeros(10*5*5*3, dtype=np.uint8).reshape((10, 5, 5, 3))
        img1_2[0, 0, 1, 0] = 1
        npy1_2_path = os.path.join(self._dir, 'img1_2_path.npy')
        np.save(npy1_2_path, img1_2)
        img1_3 = np.zeros(5*5*3, dtype=np.uint8).reshape((5, 5, 3))
        img1_3[0, 1, 0] = 1
        npy1_3_path = os.path.join(self._dir, 'img1_3_path.npy')
        np.save(npy1_3_path, img1_3)
        img2 = np.full(10*5*5*3, 0.1).reshape((10, 5, 5, 3))
        npy2_path = os.path.join(self._dir, 'img2_path.npy')
        np.save(npy2_path, img2)

        test_data = [
            {
                'iteration': 1000,
                'epoch': 1,
                'images': [
                    {
                        'row': 2,
                        'path': npy1_1_path,
                        'name': '0'
                    },
                    {
                        'path': npy1_2_path,
                        'name': '1'
                    },
                    {
                        'path': npy1_3_path,
                        'name': '2'
                    }
                ]
            },
            {
                'iteration': 2000,
                'epoch': 2,
                'images': [
                    {
                        'row': 2,
                        'path': npy2_path,
                        'name': '0'
                    }
                ]
            }
        ]
        with open(os.path.join(self._dir, '.chainerui_images'), 'w') as f:
            json.dump(test_data, f)

        with patch('chainerui.tasks.collect_images.DB_SESSION', mock_session):
            actual_list = collect_images.collect_images(0)

        assert len(actual_list) == 2
        actual_img1 = actual_list[0]
        assert len(actual_img1['contents']) == 3
        img1_1 = img1_1.reshape((2, 5, 5, 5, 3)).transpose(
            0, 2, 1, 3, 4).reshape((10, 25, 3))
        img1_1_str = collect_images._make_src_tag(
            collect_images._serialize(img1_1))
        assert '0' in actual_img1['contents']
        assert len(actual_img1['contents']['0']) == 1
        assert actual_img1['contents']['0'][0] == img1_1_str
        img1_2_0_str = collect_images._make_src_tag(
            collect_images._serialize(img1_2[0]))
        assert '1' in actual_img1['contents']
        assert len(actual_img1['contents']['1']) == 10
        assert actual_img1['contents']['1'][0] == img1_2_0_str
        img1_3_str = collect_images._make_src_tag(
            collect_images._serialize(img1_3))
        assert '2' in actual_img1['contents']
        assert len(actual_img1['contents']['2']) == 1
        assert actual_img1['contents']['2'][0] == img1_3_str
        assert 'iteration' in actual_img1['train_info']
        assert actual_img1['train_info']['iteration'] == 1000
        assert 'epoch' in actual_img1['train_info']
        assert actual_img1['train_info']['epoch'] == 1

        actual_img1 = actual_list[1]
        assert len(actual_img1['contents']) == 1
