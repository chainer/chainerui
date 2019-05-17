import json
from mock import MagicMock
from mock import patch
from multiprocessing import Process
import os
import unittest
import warnings

import filelock
import numpy as np
import pytest

from chainerui import summary


try:
    import chainer  # NOQA
    _chainer_installed = True
except (ImportError, TypeError):
    _chainer_installed = False

if _chainer_installed:
    from chainerui.report import audio_report
    _audio_report_available = audio_report._available

    from chainerui.report import image_report
    _image_report_available = image_report._available
else:
    _audio_report_available = False
    _image_report_available = False


@pytest.fixture(autouse=True, scope='function')
def clear_cache():
    yield
    summary._chainerui_asset_observer.out = None
    summary._chainerui_asset_observer.cache = []
    summary._chainerui_asset_observer.saved_idx = 0


@unittest.skipUnless(_image_report_available, 'Image report is not available')
def test_summary_image_without_output_path(func_dir):
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


@unittest.skipUnless(_image_report_available, 'Image report is not available')
def test_summary_reporter_image_without_output_path(func_dir):
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


@unittest.skipUnless(_image_report_available, 'Image report is not available')
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
    summary.image(img2, 'test', out=func_dir, subdir='image', epoch=20)

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
    assert saved_filename2.startswith(os.path.join('image', 'test_'))
    assert saved_filename2.endswith('.png')


@unittest.skipUnless(_audio_report_available, 'Audio report is not available')
def test_summary_audio(func_dir):
    audio = np.random.uniform(-1, 1, 16000)
    summary.audio(audio, 16000, out=func_dir, epoch=10)

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

    summary.audio(audio, 16000, out=func_dir, subdir='audio', epoch=20)
    with open(meta_filepath, 'r') as f:
        metas2 = json.load(f)
    assert len(metas2) == 2
    assert 'timestamp' in metas2[1]
    assert 'epoch' in metas2[1]
    assert metas2[1]['epoch'] == 20
    assert 'audios' in metas2[1]
    assert 'audio' in metas2[1]['audios']
    saved_filename = metas2[1]['audios']['audio']
    assert saved_filename.startswith(os.path.join('audio', 'audio_'))
    assert saved_filename.endswith('.wav')


def test_summary_text(func_dir):
    summary.text('content', out=func_dir, epoch=10)

    meta_filepath = os.path.join(
        func_dir, summary.CHAINERUI_ASSETS_METAFILE_NAME)
    assert os.path.exists(meta_filepath)

    with open(meta_filepath, 'r') as f:
        metas = json.load(f)
    assert len(metas) == 1
    assert 'timestamp' in metas[0]
    assert metas[0].get('epoch', None) == 10
    assert 'texts' in metas[0]
    assert metas[0]['texts'].get('text', None) == 'content'

    summary.text('content2', 'text2', out=func_dir, epoch=20)
    with open(meta_filepath, 'r') as f:
        metas2 = json.load(f)
    assert len(metas2) == 2
    assert 'timestamp' in metas2[1]
    assert metas2[1].get('epoch', None) == 20
    assert 'texts' in metas2[1]
    assert metas2[1]['texts'].get('text2', None) == 'content2'


@unittest.skipUnless(_image_report_available, 'Image report is not available')
@unittest.skipUnless(_audio_report_available, 'Audio report is not available')
def test_summary_reporter_mix(func_dir):
    img = np.zeros(10*3*5*5, dtype=np.float32).reshape((10, 3, 5, 5))
    img2 = np.copy(img)
    audio = np.random.uniform(-1, 1, 16000)
    audio2 = np.copy(audio)

    with summary.reporter(prefix='with_', out=func_dir, epoch=10) as r:
        r.image(img)
        r.image(img2, 'test_image', subdir='image')
        r.audio(audio, 16000)
        r.audio(audio2, 16000, 'test_audio', subdir='audio')
        r.text('content')
        r.text('content2', 'test_text')

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
    assert saved_filename1.startswith(os.path.join('image', 'with_test_image'))
    assert saved_filename1.endswith('.png')
    assert 'with_audio_2' in metas[0]['audios']
    saved_filename3 = metas[0]['audios']['with_audio_2']
    assert saved_filename3.startswith('with_audio_2')
    assert saved_filename3.endswith('.wav')
    assert 'with_test_audio' in metas[0]['audios']
    saved_filename4 = metas[0]['audios']['with_test_audio']
    assert saved_filename4.startswith(os.path.join('audio', 'with_test_audio'))
    assert saved_filename4.endswith('.wav')
    assert 'texts' in metas[0]
    assert metas[0]['texts'].get('with_text_4', None) == 'content'
    assert metas[0]['texts'].get('with_test_text', None) == 'content2'

    img3 = np.copy(img)
    img4 = np.copy(img)
    audio3 = np.copy(audio)
    audio4 = np.copy(audio)

    with summary.reporter(
            prefix='with_', out=func_dir, subdir='sub', epoch=20) as r:
        r.image(img3)
        r.image(img4, 'test_image', subdir='image')
        r.audio(audio3, 44100)
        r.audio(audio4, 44100, 'test_audio', subdir='audio')
        r.text('content')
        r.text('content2', 'test_text')

    with open(meta_filepath, 'r') as f:
        metas2 = json.load(f)
    assert len(metas2) == 2
    assert 'timestamp' in metas2[1]
    assert 'epoch' in metas2[1]
    assert metas2[1]['epoch'] == 20
    assert 'images' in metas2[1]
    assert 'with_image_0' in metas2[1]['images']
    saved_filename = metas2[1]['images']['with_image_0']
    assert saved_filename.startswith(os.path.join('sub', 'with_image_0'))
    assert saved_filename.endswith('.png')
    assert 'with_test_image' in metas2[1]['images']
    saved_filename1 = metas2[1]['images']['with_test_image']
    assert saved_filename1.startswith(
        os.path.join('sub', 'image', 'with_test_image'))
    assert saved_filename1.endswith('.png')
    assert 'with_audio_2' in metas2[1]['audios']
    saved_filename2 = metas2[1]['audios']['with_audio_2']
    assert saved_filename2.startswith(os.path.join('sub', 'with_audio_2'))
    assert saved_filename2.endswith('.wav')
    assert 'with_test_audio' in metas2[1]['audios']
    saved_filename3 = metas2[1]['audios']['with_test_audio']
    assert saved_filename3.startswith(os.path.join(
        'sub', 'audio', 'with_test_audio'))
    assert saved_filename3.endswith('.wav')
    assert 'texts' in metas2[1]
    assert metas2[1]['texts'].get('with_text_4', None) == 'content'
    assert metas2[1]['texts'].get('with_test_text', None) == 'content2'


def test_summary_reporter_empty(func_dir):
    with summary.reporter(out=func_dir, epoch=10):
        pass

    meta_filepath = os.path.join(
        func_dir, summary.CHAINERUI_ASSETS_METAFILE_NAME)
    assert not os.path.exists(meta_filepath)


@unittest.skipUnless(_chainer_installed, 'Chainer is not installed')
def test_summary_image_unavailable(func_dir):
    mock_checker = MagicMock(return_value=False)
    with patch('chainerui.report.image_report.check_available', mock_checker):
        summary.image(np.zeros(10), out=func_dir)

    assert not os.path.exists(
        os.path.join(func_dir, summary.CHAINERUI_ASSETS_METAFILE_NAME))


@unittest.skipUnless(_chainer_installed, 'Chainer is not installed')
def test_summary_audio_unavailable(func_dir):
    mock_checker = MagicMock(return_value=False)
    with patch('chainerui.report.audio_report.check_available', mock_checker):
        summary.audio(np.zeros(10), 40, out=func_dir)

    assert not os.path.exists(
        os.path.join(func_dir, summary.CHAINERUI_ASSETS_METAFILE_NAME))


@unittest.skipUnless(_chainer_installed, 'Chainer is not installed')
def test_reporter_image_unavailable(func_dir):
    mock_checker = MagicMock(return_value=False)
    with patch('chainerui.report.image_report.check_available', mock_checker):
        with summary.reporter(out=func_dir) as r:
            r.image(np.zeros(10))

    assert not os.path.exists(
        os.path.join(func_dir, summary.CHAINERUI_ASSETS_METAFILE_NAME))


@unittest.skipUnless(_chainer_installed, 'Chainer is not installed')
def test_reporter_audio_unavailable(func_dir):
    mock_checker = MagicMock(return_value=False)
    with patch('chainerui.report.audio_report.check_available', mock_checker):
        with summary.reporter(out=func_dir) as r:
            r.audio(np.zeros(10), 40)

    assert not os.path.exists(
        os.path.join(func_dir, summary.CHAINERUI_ASSETS_METAFILE_NAME))


@unittest.skipUnless(_image_report_available, 'Image report is not available')
def test_summary_called_multiple_script(func_dir):
    # This test is not enough to check that _Summary object accepts whether
    # called by multiple scripts or not, but it's difficult to test it.
    # By increasing lock counter with taking a file lock during this test,
    # the meta file is shared by multiple scripts virtually, and check the
    # asset list is appended correctly.
    meta_filepath = os.path.join(
        func_dir, summary.CHAINERUI_ASSETS_METAFILE_NAME)
    metalock_filepath = meta_filepath + '.lock'

    img = np.zeros(10*3*5*5, dtype=np.float32).reshape((10, 3, 5, 5))
    summary.image(img, out=func_dir, epoch=10)
    assert os.path.exists(meta_filepath)

    try:
        p = Process(
            target=summary.image, args=(img,),
            kwargs={'out': func_dir, 'epoch': 20})

        with filelock.FileLock(metalock_filepath):
            # virtually other script handles the meta file
            # save a next image, expected to write after lock file is released
            p.start()
            # set dummy text, this process means added asset by other process
            with open(meta_filepath, 'r') as f:
                saved = json.load(f)
                assert len(saved) == 1
            with open(meta_filepath, 'w') as f:
                saved.append({'dummy': 'text'})
                json.dump(saved, f, indent=4)
    finally:
        p.join()

    with open(meta_filepath) as f:
        saved = json.load(f)
        assert len(saved) == 3
        assert saved[1].get('dummy', None) == 'text'
        assert saved[2].get('epoch', None) == 20


@unittest.skipUnless(_image_report_available, 'Image report is not available')
def test_summary_timeout(func_dir, caplog):
    meta_filepath = os.path.join(
        func_dir, summary.CHAINERUI_ASSETS_METAFILE_NAME)
    metalock_filepath = meta_filepath + '.lock'

    with filelock.FileLock(metalock_filepath):
        img = np.zeros(10*3*5*5, dtype=np.float32).reshape((10, 3, 5, 5))
        with summary.reporter(out=func_dir, timeout=0.1) as r:
            # test process has already handled meta file,
            # this saving process should be timeout
            r.image(img)

    assert len(caplog.records) == 1
    assert 'is timeout' in caplog.records[0].message
    assert not os.path.exists(meta_filepath)
