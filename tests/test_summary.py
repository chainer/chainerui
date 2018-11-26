import json
from mock import MagicMock
from mock import patch
import os
import unittest
import warnings

import numpy as np
import pytest

from chainerui.report import audio_report
from chainerui.report import image_report
from chainerui import summary


@pytest.fixture(autouse=True, scope='function')
def clear_cache():
    yield
    summary._chainerui_asset_observer.out = None
    summary._chainerui_asset_observer.cache = []


def test_summary_set_out_with_warning_image(func_dir):
    summary._chainerui_asset_observer.default_output_path = func_dir
    meta_filepath = os.path.join(
        func_dir, summary.CHAINERUI_ASSETS_METAFILE_NAME)

    with warnings.catch_warnings(record=True) as w:
        warnings.simplefilter('always')
        img = np.zeros(10*3*5*5, dtype=np.float32).reshape((10, 3, 5, 5))
        summary.image(img)
        assert len(w) == 1
        assert os.path.exists(meta_filepath)

        summary.set_out(func_dir)
        summary.image(img)
        assert len(w) == 1


def test_summary_set_out_reporter_image(func_dir):
    summary._chainerui_asset_observer.default_output_path = func_dir
    meta_filepath = os.path.join(
        func_dir, summary.CHAINERUI_ASSETS_METAFILE_NAME)

    with warnings.catch_warnings(record=True) as w:
        warnings.simplefilter('always')
        img = np.zeros(10*3*5*5, dtype=np.float32).reshape((10, 3, 5, 5))
        with summary.reporter() as r:
            r.image(img)
        assert len(w) == 1
        assert os.path.exists(meta_filepath)

        summary.set_out(func_dir)
        with summary.reporter() as r:
            r.image(img)
        assert len(w) == 1


@unittest.skipUnless(image_report._available, 'Pillow is not installed')
def test_summary_image(func_dir):
    img = np.zeros(10*3*5*5, dtype=np.float32).reshape((10, 3, 5, 5))
    summary.image(img, out=func_dir, epoch=10)

    meta_filepath = os.path.join(
        func_dir, summary.CHAINERUI_ASSETS_METAFILE_NAME)
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
    summary.image(img2, 'test', out=func_dir, epoch=20)

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


@unittest.skipUnless(audio_report._available, 'Audio module is not installed')
def test_summary_audio(func_dir):
    data = np.random.uniform(-1, 1, 44100)
    audio = (data/np.max(np.abs(data)) * 32767).astype(np.int16)
    summary.audio(audio, 44100, out=func_dir, epoch=10)

    meta_filepath = os.path.join(
        func_dir, summary.CHAINERUI_ASSETS_METAFILE_NAME)
    assert os.path.exists(meta_filepath)

    with open(meta_filepath, 'r') as f:
        metas = json.load(f)
    assert len(metas) == 1
    assert 'timestamp' in metas[0]
    assert 'epoch' in metas[0]
    assert metas[0]['epoch'] == 10
    assert 'audios' in metas[0]
    assert 'audio' in metas[0]['audios']
    saved_filename = metas[0]['audios']['audio']
    assert saved_filename.startswith('audio_')
    assert saved_filename.endswith('.wav')

    summary.audio(audio, 44100, out=func_dir, epoch=20)
    with open(meta_filepath, 'r') as f:
        metas2 = json.load(f)
    assert len(metas2) == 2
    assert 'timestamp' in metas2[1]
    assert 'epoch' in metas2[1]
    assert metas2[1]['epoch'] == 20
    assert 'audios' in metas2[1]
    assert 'audio' in metas2[1]['audios']
    saved_filename = metas2[1]['audios']['audio']
    assert saved_filename.startswith('audio_')
    assert saved_filename.endswith('.wav')


@unittest.skipUnless(image_report._available, 'Pillow is not installed')
@unittest.skipUnless(audio_report._available, 'Audio module is not installed')
def test_summary_reporter_mix(func_dir):
    img = np.zeros(10*3*5*5, dtype=np.float32).reshape((10, 3, 5, 5))
    img2 = np.copy(img)
    data = np.random.uniform(-1, 1, 44100)
    audio = (data/np.max(np.abs(data)) * 32767).astype(np.int16)
    audio2 = np.copy(audio)

    with summary.reporter(prefix='with_', out=func_dir, epoch=10) as r:
        r.image(img)
        r.image(img2, 'test_image')
        r.audio(audio, 44100)
        r.audio(audio2, 44100, 'test_audio')

    meta_filepath = os.path.join(
        func_dir, summary.CHAINERUI_ASSETS_METAFILE_NAME)
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
    assert 'with_test_image' in metas[0]['images']
    saved_filename1 = metas[0]['images']['with_test_image']
    assert saved_filename1.startswith('with_test_image')
    assert saved_filename1.endswith('.png')
    assert 'with_audio_2' in metas[0]['audios']
    saved_filename3 = metas[0]['audios']['with_audio_2']
    assert saved_filename3.startswith('with_audio_2')
    assert saved_filename3.endswith('.wav')
    assert 'with_test_audio' in metas[0]['audios']
    saved_filename4 = metas[0]['audios']['with_test_audio']
    assert saved_filename4.startswith('with_test_audio')
    assert saved_filename4.endswith('.wav')

    img3 = np.copy(img)
    img4 = np.copy(img)
    audio3 = np.copy(audio)
    audio4 = np.copy(audio)

    with summary.reporter(prefix='with_', out=func_dir, epoch=20) as r:
        r.image(img3)
        r.image(img4, 'test_image')
        r.audio(audio3, 44100)
        r.audio(audio4, 44100, 'test_audio')

    with open(meta_filepath, 'r') as f:
        metas2 = json.load(f)
    assert len(metas2) == 2
    assert 'timestamp' in metas2[1]
    assert 'epoch' in metas2[1]
    assert metas2[1]['epoch'] == 20
    assert 'images' in metas2[1]
    assert 'with_image_0' in metas2[1]['images']
    saved_filename = metas2[1]['images']['with_image_0']
    assert saved_filename.startswith('with_image_0')
    assert saved_filename.endswith('.png')
    assert 'with_test_image' in metas2[1]['images']
    saved_filename1 = metas2[1]['images']['with_test_image']
    assert saved_filename1.startswith('with_test_image')
    assert saved_filename1.endswith('.png')
    assert 'with_audio_2' in metas2[1]['audios']
    saved_filename2 = metas2[1]['audios']['with_audio_2']
    assert saved_filename2.startswith('with_audio_2')
    assert saved_filename2.endswith('.wav')
    assert 'with_test_audio' in metas2[1]['audios']
    saved_filename3 = metas2[1]['audios']['with_test_audio']
    assert saved_filename3.startswith('with_test_audio')
    assert saved_filename3.endswith('.wav')


def test_summary_reporter_empty(func_dir):
    with summary.reporter(out=func_dir, epoch=10):
        pass

    meta_filepath = os.path.join(
        func_dir, summary.CHAINERUI_ASSETS_METAFILE_NAME)
    assert not os.path.exists(meta_filepath)


def test_summary_image_unavailable(func_dir):
    mock_checker = MagicMock(return_value=False)
    with patch('chainerui.report.image_report.check_available', mock_checker):
        summary.image(np.zeros(10), out=func_dir)

    assert not os.path.exists(os.path.join(func_dir, '.chainerui_assets'))


def test_reporter_image_unavailable(func_dir):
    mock_checker = MagicMock(return_value=False)
    with patch('chainerui.report.image_report.check_available', mock_checker):
        with summary.reporter(out=func_dir) as r:
            r.image(np.zeros(10))

    assert not os.path.exists(os.path.join(func_dir, '.chainerui_assets'))
