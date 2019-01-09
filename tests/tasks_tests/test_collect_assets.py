from collections import OrderedDict
import json
import os

import pytest

from chainerui.models.result import Result
from chainerui import summary
from chainerui.tasks import collect_assets


@pytest.fixture(autouse=True, scope='function')
def result_path(func_dir, func_db):
    info_path = os.path.join(func_dir, summary.CHAINERUI_ASSETS_METAFILE_NAME)

    with open(os.path.join(func_dir, 'img1_1.png'), 'w') as f:
        f.write('text')
    with open(os.path.join(func_dir, 'img1_2.png'), 'w') as f:
        f.write('text2')
    with open(os.path.join(func_dir, 'audio1_1.wav'), 'w') as f:
        f.write('audio1')
    with open(os.path.join(func_dir, 'img2.png'), 'w') as f:
        f.write('text3')

    test_data = [
        {
            'iteration': 1000,
            'epoch': 1,
            'images': OrderedDict([
                ('0', 'img1_1.png'),
                ('1', 'img1_2.png'),
            ]),
            'audios': OrderedDict([('2', 'audio1_1.wav')]),
            'texts': OrderedDict([('3', 'content')])
        },
        {
            'iteration': 2000,
            'epoch': 2,
            'custom': 'test',
            'images': OrderedDict([
                ('seg', 'img2.png'),
            ])
        },
        {
            'iteration': 2500,
            'epoch': 2,
            'custom': 'no binary data',
            'texts': OrderedDict([('text', 'content')])
        }
    ]
    with open(info_path, 'w') as f:
        json.dump(test_data, f)

    return func_dir


def _get_dummy_result(path):
    r = Result(path_name=path)
    r.id = 0
    return r


def test_collect_assets_no_meta(func_dir):
    os.remove(os.path.join(func_dir, summary.CHAINERUI_ASSETS_METAFILE_NAME))
    result = _get_dummy_result(func_dir)

    collect_assets.collect_assets(result)
    assert len(result.assets) == 0


def test_collect_assets(func_dir):
    result = _get_dummy_result(func_dir)
    collect_assets.collect_assets(result)
    actual_list = result.assets

    assert len(actual_list) == 3
    actual_asset1 = actual_list[0]
    assert len(actual_asset1.content_list) == 3
    assert actual_asset1.content_list[0].name == 'img1_1.png'
    assert actual_asset1.content_list[0].tag == '0'
    assert actual_asset1.content_list[0].content == b'text'
    assert actual_asset1.content_list[1].name == 'img1_2.png'
    assert actual_asset1.content_list[1].tag == '1'
    assert actual_asset1.content_list[1].content == b'text2'
    assert actual_asset1.content_list[2].name == 'audio1_1.wav'
    assert actual_asset1.content_list[2].tag == '2'
    assert actual_asset1.content_list[2].content == b'audio1'
    actual_asset1_summary = json.loads(actual_asset1.summary)
    assert 'iteration' in actual_asset1_summary
    assert actual_asset1_summary['iteration'] == 1000
    assert 'epoch' in actual_asset1_summary
    assert actual_asset1_summary['epoch'] == 1
    assert 'texts' not in actual_asset1_summary
    assert actual_asset1_summary.get('3', None) == 'content'

    actual_asset2 = actual_list[1]
    actual_asset2_summary = json.loads(actual_asset2.summary)
    assert 'images' not in actual_asset2_summary
    assert 'custom' in actual_asset2_summary
    assert actual_asset2_summary['custom'] == 'test'
    assert len(actual_asset2.content_list) == 1
    assert actual_asset2.content_list[0].name == 'img2.png'
    assert actual_asset2.content_list[0].tag == 'seg'
    assert actual_asset2.content_list[0].content == b'text3'

    actual_asset3 = actual_list[2]
    actual_asset3_summary = json.loads(actual_asset3.summary)
    assert actual_asset3_summary.get('iteration', None) == 2500
    assert actual_asset3_summary.get('epoch', None) == 2
    assert actual_asset3_summary.get('custom', None) == 'no binary data'
    assert 'texts' not in actual_asset3_summary
    assert actual_asset3_summary.get('text', None) == 'content'


def test_collect_assets_no_updated(func_dir):
    result = _get_dummy_result(func_dir)
    collect_assets.collect_assets(result)
    first_assets = result.assets
    assert len(first_assets) == 3

    collect_assets.collect_assets(result, first_assets)
    assert first_assets == result.assets


def test_collect_assets_updated(func_dir):
    info_path = os.path.join(func_dir, summary.CHAINERUI_ASSETS_METAFILE_NAME)
    result = _get_dummy_result(func_dir)
    collect_assets.collect_assets(result)
    first_assets = result.assets
    assert len(first_assets) == 3

    with open(os.path.join(func_dir, 'img1_3.png'), 'w') as f:
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

    collect_assets.collect_assets(result)
    second_assets = result.assets
    assert len(second_assets) == 4

    actual_asset4 = second_assets[3]
    assert len(actual_asset4.content_list) == 1
    assert actual_asset4.content_list[0].name == 'img1_3.png'
    assert actual_asset4.content_list[0].tag == '0'
    assert actual_asset4.content_list[0].content == b'text add'
    actual_asset4_summary = json.loads(actual_asset4.summary)
    assert 'iteration' in actual_asset4_summary
    assert actual_asset4_summary['iteration'] == 3000
    assert 'epoch' in actual_asset4_summary
    assert actual_asset4_summary['epoch'] == 3


def test_collect_assets_new_meta(func_dir):
    info_path = os.path.join(func_dir, summary.CHAINERUI_ASSETS_METAFILE_NAME)
    result = _get_dummy_result(func_dir)
    collect_assets.collect_assets(result)
    first_assets = result.assets
    assert len(first_assets) == 3

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
    collect_assets.collect_assets(result)
    second_assets = result.assets
    assert len(second_assets) == 1
    actual_asset1 = second_assets[0]
    assert len(actual_asset1.content_list) == 2
    assert actual_asset1.content_list[0].name == 'img1_1.png'
    assert actual_asset1.content_list[0].tag == '0'
    assert actual_asset1.content_list[0].content == b'text'
    assert actual_asset1.content_list[1].name == 'img1_2.png'
    assert actual_asset1.content_list[1].tag == '1'
    assert actual_asset1.content_list[1].content == b'text2'
    actual_asset1_summary = json.loads(actual_asset1.summary)
    assert 'iteration' in actual_asset1_summary
    assert actual_asset1_summary['iteration'] == 1001
    assert 'epoch' in actual_asset1_summary
    assert actual_asset1_summary['epoch'] == 1
