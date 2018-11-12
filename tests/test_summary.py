import json
import os
import unittest

import numpy as np
import pytest

from chainerui.report import image_report
from chainerui import summary


@pytest.fixture(autouse=True, scope='function')
def clear_cache():
    yield
    summary._chainerui_asset_observer.cache = []


@unittest.skipUnless(
        image_report.check_available(), 'Pillow is not installed')
def test_summay_image(func_dir, clear_cache):
    img = np.zeros(10*3*5*5, dtype=np.float32).reshape((10, 3, 5, 5))
    summary.image(img, func_dir, epoch=10)

    meta_filepath = os.path.join(func_dir, '.chainerui_assets')
    assert os.path.exists(meta_filepath)

    with open(meta_filepath, 'r') as f:
        metas = json.load(f)
    assert len(metas) == 1
    assert 'timestamp' in metas[0]
    assert 'epoch' in metas[0]
    assert metas[0]['epoch'] == 10
    assert 'images' in metas[0]
    assert 'image' in metas[0]['images']
    saved_filename = metas[0]['images']['image']
    assert saved_filename.startswith('image_')
    assert saved_filename.endswith('.png')

    img2 = np.zeros(10*3*5*5, dtype=np.float32).reshape((10, 3, 5, 5))
    summary.image(img2, func_dir, 'test', epoch=20)

    with open(meta_filepath, 'r') as f:
        metas2 = json.load(f)
    assert len(metas2) == 2
    assert 'timestamp' in metas2[1]
    assert 'epoch' in metas2[1]
    assert metas2[1]['epoch'] == 20
    assert 'images' in metas2[1]
    assert 'test' in metas2[1]['images']
    saved_filename2 = metas2[1]['images']['test']
    assert saved_filename != saved_filename2
    assert saved_filename2.startswith('test_')
    assert saved_filename2.endswith('.png')


@unittest.skipUnless(
        image_report.check_available(), 'Pillow is not installed')
def test_summay_reporter(func_dir, clear_cache):
    img = np.zeros(10*3*5*5, dtype=np.float32).reshape((10, 3, 5, 5))
    img2 = np.copy(img)
    img3 = np.copy(img)

    with summary.reporter(func_dir, prefix='with_', epoch=10) as r:
        r.image(img)
        r.image(img2, 'test')
        r.image(img3, 'test')

    meta_filepath = os.path.join(func_dir, '.chainerui_assets')
    assert os.path.exists(meta_filepath)

    with open(meta_filepath, 'r') as f:
        metas = json.load(f)
    assert len(metas) == 1
    assert 'timestamp' in metas[0]
    assert 'epoch' in metas[0]
    assert metas[0]['epoch'] == 10
    assert 'images' in metas[0]
    assert 'with_image_0' in metas[0]['images']
    saved_filename = metas[0]['images']['with_image_0']
    assert saved_filename.startswith('with_image_0')
    assert saved_filename.endswith('.png')
    assert 'with_test' in metas[0]['images']
    saved_filename1 = metas[0]['images']['with_test']
    assert saved_filename1.startswith('with_test_')
    assert saved_filename1.endswith('.png')
    assert 'with_test_2' in metas[0]['images']
    saved_filename2 = metas[0]['images']['with_test_2']
    assert saved_filename2.startswith('with_test_2_')
    assert saved_filename2.endswith('.png')

    img4 = np.zeros(10*3*5*5, dtype=np.float32).reshape((10, 3, 5, 5))
    img5 = np.copy(img4)
    img6 = np.copy(img4)

    with summary.reporter(func_dir, prefix='with_', epoch=20) as r:
        r.image(img4)
        r.image(img5, 'test')
        r.image(img6, 'test')

    with open(meta_filepath, 'r') as f:
        metas2 = json.load(f)
    assert len(metas2) == 2
    assert 'timestamp' in metas2[1]
    assert 'epoch' in metas2[1]
    assert metas2[1]['epoch'] == 20
    assert 'images' in metas2[1]
    assert 'with_image_0' in metas2[1]['images']
    saved_filename3 = metas2[1]['images']['with_image_0']
    assert saved_filename3.startswith('with_image_0')
    assert saved_filename3.endswith('.png')
    assert 'with_test' in metas2[1]['images']
    saved_filename4 = metas2[1]['images']['with_test']
    assert saved_filename4.startswith('with_test_')
    assert saved_filename4.endswith('.png')
    assert 'with_test_2' in metas2[1]['images']
    saved_filename5 = metas2[1]['images']['with_test_2']
    assert saved_filename5.startswith('with_test_2_')
    assert saved_filename5.endswith('.png')
