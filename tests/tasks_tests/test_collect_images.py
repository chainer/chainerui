from collections import OrderedDict
import json
import os

import pytest

from chainerui.models.result import Result
from chainerui.tasks import collect_images


@pytest.fixture(autouse=True, scope='function')
def result_path(func_dir, func_db):
    info_path = os.path.join(func_dir, '.chainerui_images')

    with open(os.path.join(func_dir, 'img1_1.png'), 'w') as f:
        f.write('text')
    with open(os.path.join(func_dir, 'img1_2.png'), 'w') as f:
        f.write('text2')
    with open(os.path.join(func_dir, 'img2.png'), 'w') as f:
        f.write('text3')

    test_data = [
        {
            'iteration': 1000,
            'epoch': 1,
            'images': OrderedDict([
                ('0', 'img1_1.png'),
                ('1', 'img1_2.png'),
            ])
        },
        {
            'iteration': 2000,
            'epoch': 2,
            'custom': 'test',
            'images': OrderedDict([
                ('seg', 'img2.png'),
            ])
        }
    ]
    with open(info_path, 'w') as f:
        json.dump(test_data, f)

    return func_dir


def _get_dummy_result(path):
    r = Result(path_name=path)
    r.id = 0
    return r


def test_collect_images_no_meta(result_path):
    os.remove(os.path.join(result_path, '.chainerui_images'))
    result = _get_dummy_result(result_path)

    actual_list = collect_images.collect_images(result, [])
    assert len(actual_list) == 0


def test_collect_images(result_path):
    result = _get_dummy_result(result_path)
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
    actual_img1_summary = json.loads(actual_img1.summary)
    assert 'iteration' in actual_img1_summary
    assert actual_img1_summary['iteration'] == 1000
    assert 'epoch' in actual_img1_summary
    assert actual_img1_summary['epoch'] == 1

    actual_img2 = actual_list[1]
    actual_img2_summary = json.loads(actual_img2.summary)
    assert 'images' not in actual_img2_summary
    assert 'custom' in actual_img2_summary
    assert actual_img2_summary['custom'] == 'test'
    assert len(actual_img2.content_list) == 1
    assert actual_img2.content_list[0].name == 'img2.png'
    assert actual_img2.content_list[0].tag == 'seg'
    assert actual_img2.content_list[0].content == b'text3'


def test_collect_images_no_updated(result_path):
    result = _get_dummy_result(result_path)
    first_assets = collect_images.collect_images(result, [])
    assert len(first_assets) == 2

    second_assets = collect_images.collect_images(result, first_assets)
    assert first_assets == second_assets


def test_collect_images_updated(result_path):
    info_path = os.path.join(result_path, '.chainerui_images')
    result = _get_dummy_result(result_path)
    first_assets = collect_images.collect_images(result, [])
    assert len(first_assets) == 2

    with open(os.path.join(result_path, 'img1_3.png'), 'w') as f:
        f.write('text add')
    test_data2 = {
        'iteration': 3000,
        'epoch': 3,
        'images': {
            '0': 'img1_3.png',
        }
    }
    with open(info_path, 'r') as f:
        meta = json.load(f)
    meta.append(test_data2)
    with open(info_path, 'w') as f:
        json.dump(meta, f)

    second_assets = collect_images.collect_images(result, first_assets)
    assert len(second_assets) == 3

    actual_img3 = second_assets[2]
    assert len(actual_img3.content_list) == 1
    assert actual_img3.content_list[0].name == 'img1_3.png'
    assert actual_img3.content_list[0].tag == '0'
    assert actual_img3.content_list[0].content == b'text add'
    actual_img3_summary = json.loads(actual_img3.summary)
    assert 'iteration' in actual_img3_summary
    assert actual_img3_summary['iteration'] == 3000
    assert 'epoch' in actual_img3_summary
    assert actual_img3_summary['epoch'] == 3


def test_collect_images_new_meta(result_path):
    info_path = os.path.join(result_path, '.chainerui_images')
    result = _get_dummy_result(result_path)
    first_assets = collect_images.collect_images(result, [])
    assert len(first_assets) == 2

    test_data = [
        {
            'iteration': 1001,
            'epoch': 1,
            'images': OrderedDict([
                ('0', 'img1_1.png'),
                ('1', 'img1_2.png'),
            ])
        }
    ]
    with open(info_path, 'w') as f:
        json.dump(test_data, f)
    second_assets = collect_images.collect_images(result, first_assets)
    assert len(second_assets) == 1
    actual_img1 = second_assets[0]
    assert len(actual_img1.content_list) == 2
    assert actual_img1.content_list[0].name == 'img1_1.png'
    assert actual_img1.content_list[0].tag == '0'
    assert actual_img1.content_list[0].content == b'text'
    assert actual_img1.content_list[1].name == 'img1_2.png'
    assert actual_img1.content_list[1].tag == '1'
    assert actual_img1.content_list[1].content == b'text2'
    actual_img1_summary = json.loads(actual_img1.summary)
    assert 'iteration' in actual_img1_summary
    assert actual_img1_summary['iteration'] == 1001
    assert 'epoch' in actual_img1_summary
    assert actual_img1_summary['epoch'] == 1
