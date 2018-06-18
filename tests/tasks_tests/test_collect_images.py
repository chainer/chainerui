import json
import os
import shutil
import tempfile
import unittest

from chainerui.models.result import Result
from chainerui.tasks import collect_images


class TestApp(unittest.TestCase):

    def setUp(self):
        self._dir = tempfile.mkdtemp(prefix='chainerui_test_collect_images')

    def tearDown(self):
        if os.path.exists(self._dir):
            shutil.rmtree(self._dir)

    def test_collect_images_no_meta(self):
        result = Result(path_name=self._dir)

        actual_list = collect_images.collect_images(result)
        assert len(actual_list) == 0

    def test_collect_images(self):
        img1_1_path = os.path.join(self._dir, 'img1_1.png')
        open(img1_1_path, 'w').close()
        img1_2_path = os.path.join(self._dir, 'img1_2.png')
        open(img1_2_path, 'w').close()
        img2_path = os.path.join(self._dir, 'img2.png')
        open(img2_path, 'w').close()

        test_data = [
            {
                'iteration': 1000,
                'epoch': 1,
                'images': {
                    '0': img1_1_path,
                    '1': img1_2_path,
                }
            },
            {
                'iteration': 2000,
                'epoch': 2,
                'custom': 'test',
                'images': {
                    'seg': img2_path,
                }
            }
        ]
        with open(os.path.join(self._dir, '.chainerui_images'), 'w') as f:
            json.dump(test_data, f)

        result = Result(path_name=self._dir)
        actual_list = collect_images.collect_images(result)

        assert len(actual_list) == 2
        actual_img1 = actual_list[0]
        assert len(actual_img1['contents']) == 2
        assert '0' in actual_img1['contents']
        img1_1_str = collect_images._make_src_tag(
            collect_images._serialize(img1_1_path))
        assert actual_img1['contents']['0'] == img1_1_str
        assert '1' in actual_img1['contents']
        img1_2_0_str = collect_images._make_src_tag(
            collect_images._serialize(img1_2_path))
        assert actual_img1['contents']['1'] == img1_2_0_str
        assert 'iteration' in actual_img1['train_info']
        assert actual_img1['train_info']['iteration'] == 1000
        assert 'epoch' in actual_img1['train_info']
        assert actual_img1['train_info']['epoch'] == 1

        actual_img2 = actual_list[1]
        assert 'images' not in actual_img2['train_info']
        assert 'custom' in actual_img2['train_info']
        assert actual_img2['train_info']['custom'] == 'test'
        assert len(actual_img2['contents']) == 1
        assert 'seg' in actual_img2['contents']
