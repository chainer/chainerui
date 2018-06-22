import json
import os
import shutil
import tempfile
import unittest

from chainerui import CHAINERUI_ENV
from chainerui import create_db
from chainerui import DB_FILE_PATH
from chainerui import DB_SESSION
from chainerui import upgrade_db
from chainerui.models.result import Result
from chainerui.tasks import collect_images
from tests.helpers import NotInTestEnvironmentException


class TestApp(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        if not CHAINERUI_ENV == 'test':
            raise NotInTestEnvironmentException(
                'set environment variable CHAINERUI_ENV=test '
                'when you run this test'
            )

    def setUp(self):
        create_db()
        upgrade_db()

        dir = tempfile.mkdtemp(prefix='chainerui_test_collect_images')
        info_path = os.path.join(dir, '.chainerui_images')

        with open(os.path.join(dir, 'img1_1.png'), 'w') as f:
            f.write('text')
        with open(os.path.join(dir, 'img1_2.png'), 'w') as f:
            f.write('text2')
        with open(os.path.join(dir, 'img2.png'), 'w') as f:
            f.write('text3')

        test_data = [
            {
                'iteration': 1000,
                'epoch': 1,
                'images': {
                    '0': 'img1_1.png',
                    '1': 'img1_2.png',
                }
            },
            {
                'iteration': 2000,
                'epoch': 2,
                'custom': 'test',
                'images': {
                    'seg': 'img2.png',
                }
            }
        ]
        with open(info_path, 'w') as f:
            json.dump(test_data, f)

        self._dir = dir
        self._info_path = info_path

    def tearDown(self):
        if os.path.exists(self._dir):
            shutil.rmtree(self._dir)
        DB_SESSION.remove()
        if os.path.exists(DB_FILE_PATH):
            os.remove(DB_FILE_PATH)

    def _get_dummy_result(self):
        r = Result(path_name=self._dir)
        r.id = 0
        return r

    def test_collect_images_no_meta(self):
        os.remove(self._info_path)
        result = self._get_dummy_result()

        actual_list = collect_images.collect_images(result, [])
        assert len(actual_list) == 0

    def test_collect_images(self):
        result = self._get_dummy_result()
        actual_list = collect_images.collect_images(result, [])

        assert len(actual_list) == 2
        actual_img1 = actual_list[0]
        assert len(actual_img1.content_list) == 2
        assert actual_img1.content_list[0].name == 'img1_1.png'
        assert actual_img1.content_list[0].tag == '0'
        assert actual_img1.content_list[0].content == b'text'
        assert actual_img1.content_list[1].name == 'img1_2.png'
        assert actual_img1.content_list[1].tag == '1'
        assert actual_img1.content_list[1].content == b'text2'
        actual_img1_meta = json.loads(actual_img1.meta_info)
        assert 'iteration' in actual_img1_meta
        assert actual_img1_meta['iteration'] == 1000
        assert 'epoch' in actual_img1_meta
        assert actual_img1_meta['epoch'] == 1

        actual_img2 = actual_list[1]
        actual_img2_meta = json.loads(actual_img2.meta_info)
        assert 'images' not in actual_img2_meta
        assert 'custom' in actual_img2_meta
        assert actual_img2_meta['custom'] == 'test'
        assert len(actual_img2.content_list) == 1
        assert actual_img2.content_list[0].name == 'img2.png'
        assert actual_img2.content_list[0].tag == 'seg'
        assert actual_img2.content_list[0].content == b'text3'

    def test_collect_images_no_updated(self):
        result = self._get_dummy_result()
        first_data_infos = collect_images.collect_images(result, [])
        assert len(first_data_infos) == 2

        second_data_infos = collect_images.collect_images(
            result, first_data_infos)
        assert first_data_infos == second_data_infos

    def test_collect_images_updated(self):
        result = self._get_dummy_result()
        first_data_infos = collect_images.collect_images(result, [])
        assert len(first_data_infos) == 2

        with open(os.path.join(self._dir, 'img1_3.png'), 'w') as f:
            f.write('text add')
        test_data2 = {
            'iteration': 3000,
            'epoch': 3,
            'images': {
                '0': 'img1_3.png',
            }
        }
        with open(self._info_path, 'r') as f:
            meta = json.load(f)
        meta.append(test_data2)
        with open(self._info_path, 'w') as f:
            json.dump(meta, f)

        second_data_infos = collect_images.collect_images(
            result, first_data_infos)
        assert len(second_data_infos) == 3

        actual_img3 = second_data_infos[2]
        assert len(actual_img3.content_list) == 1
        assert actual_img3.content_list[0].name == 'img1_3.png'
        assert actual_img3.content_list[0].tag == '0'
        assert actual_img3.content_list[0].content == b'text add'
        actual_img3_meta = json.loads(actual_img3.meta_info)
        assert 'iteration' in actual_img3_meta
        assert actual_img3_meta['iteration'] == 3000
        assert 'epoch' in actual_img3_meta
        assert actual_img3_meta['epoch'] == 3

    def test_collect_images_new_meta(self):
        result = self._get_dummy_result()
        first_data_infos = collect_images.collect_images(result, [])
        assert len(first_data_infos) == 2

        test_data = [
            {
                'iteration': 1001,
                'epoch': 1,
                'images': {
                    '0': 'img1_1.png',
                    '1': 'img1_2.png',
                }
            }
        ]
        with open(self._info_path, 'w') as f:
            json.dump(test_data, f)
        second_data_infos = collect_images.collect_images(
            result, first_data_infos)
        assert len(second_data_infos) == 1
        actual_img1 = second_data_infos[0]
        assert len(actual_img1.content_list) == 2
        assert actual_img1.content_list[0].name == 'img1_1.png'
        assert actual_img1.content_list[0].tag == '0'
        assert actual_img1.content_list[0].content == b'text'
        assert actual_img1.content_list[1].name == 'img1_2.png'
        assert actual_img1.content_list[1].tag == '1'
        assert actual_img1.content_list[1].content == b'text2'
        actual_img1_meta = json.loads(actual_img1.meta_info)
        assert 'iteration' in actual_img1_meta
        assert actual_img1_meta['iteration'] == 1001
        assert 'epoch' in actual_img1_meta
        assert actual_img1_meta['epoch'] == 1
