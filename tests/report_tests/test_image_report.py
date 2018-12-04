import os
import unittest
import warnings

import chainer
import numpy as np
import pytest
import six

from chainerui.report import image_report


@unittest.skipUnless(image_report._available, 'Pillow is not installed')
def test_available():
    with warnings.catch_warnings(record=True) as w:
        assert image_report.check_available()
        assert len(w) == 0


def test_available_not_installed():
    import sys
    is_installed = 'PIL' in sys.modules

    def check_available():
        with warnings.catch_warnings(record=True) as w:
            assert not image_report.check_available()
            assert len(w) == 1

    if is_installed:
        pil = sys.modules['PIL']
        try:
            sys.modules['PIL'] = ImportError()
            six.moves.reload_module(image_report)
            check_available()
        finally:
            sys.modules['PIL'] = pil
            six.moves.reload_module(image_report)
    else:
        check_available()


def test_report_error(func_dir):
    img = np.zeros(10)
    with pytest.raises(ValueError) as e:
        image_report.report(img, func_dir, 'test', batched=False)
    assert 'must be 2 or 3' in str(e.value)


def test_report_error_batch(func_dir):
    img = np.zeros(10).reshape(2, 5)
    with pytest.raises(ValueError) as e:
        image_report.report(img, func_dir, 'test')
    assert 'must be 3 or 4' in str(e.value)


@unittest.skipUnless(image_report._available, 'Pillow is not installed')
def test_report_bchw_row0(func_dir):
    img = np.zeros(10*3*5*5, dtype=np.float32).reshape((10, 3, 5, 5))
    filename, created_at = image_report.report(img, func_dir, 'test')
    assert filename.startswith('test_')
    path = os.path.join(func_dir, filename)
    assert os.path.exists(path)
    assert created_at is not None


@unittest.skipUnless(image_report._available, 'Pillow is not installed')
def test_report_bchw_row2(func_dir):
    img = np.zeros(10*3*5*5, dtype=np.float32).reshape((10, 3, 5, 5))
    filename, created_at = image_report.report(img, func_dir, 'test', row=2)
    assert filename.startswith('test_')
    path = os.path.join(func_dir, filename)
    assert os.path.exists(path)
    assert created_at is not None


@unittest.skipUnless(image_report._available, 'Pillow is not installed')
def test_report_bhwc_row0(func_dir):
    img = np.zeros(10*5*5*3, dtype=np.float32).reshape((10, 5, 5, 3))
    filename, created_at = image_report.report(
        img, func_dir, 'test', ch_axis=-1)
    assert filename.startswith('test_')
    path = os.path.join(func_dir, filename)
    assert os.path.exists(path)
    assert created_at is not None


@unittest.skipUnless(image_report._available, 'Pillow is not installed')
def test_report_bhwc_row2(func_dir):
    img = np.zeros(10*5*5*3, dtype=np.float32).reshape((10, 5, 5, 3))
    filename, created_at = image_report.report(
        img, func_dir, 'test', ch_axis=-1, row=2)
    assert filename.startswith('test_')
    path = os.path.join(func_dir, filename)
    assert os.path.exists(path)
    assert created_at is not None


@unittest.skipUnless(image_report._available, 'Pillow is not installed')
def test_report_chw_chainer_variable(func_dir):
    img = np.zeros(3*5*5, dtype=np.float32).reshape((3, 5, 5))
    img = chainer.Variable(img)
    filename, created_at = image_report.report(
        img, func_dir, 'test', ch_axis=0, batched=False)
    assert filename.startswith('test_')
    path = os.path.join(func_dir, filename)
    assert os.path.exists(path)
    assert created_at is not None


@unittest.skipUnless(image_report._available, 'Pillow is not installed')
def test_report_hwc_hsv(func_dir):
    img = np.zeros(5*5*3, dtype=np.float32).reshape((5, 5, 3))
    filename, created_at = image_report.report(
        img, func_dir, 'test',  ch_axis=-1, mode='HSV', batched=False)
    assert filename.startswith('test_')
    path = os.path.join(func_dir, filename)
    assert os.path.exists(path)
    assert created_at is not None


@unittest.skipUnless(image_report._available, 'Pillow is not installed')
def test_report_bhw_uint8(func_dir):
    img = np.zeros(8*5*10, dtype=np.uint8).reshape((8, 5, 10))
    filename, created_at = image_report.report(img, func_dir, 'test')
    assert filename.startswith('test_')
    path = os.path.join(func_dir, filename)
    assert os.path.exists(path)
    assert created_at is not None


@unittest.skipUnless(image_report._available, 'Pillow is not installed')
def test_report_hw(func_dir):
    img = np.zeros(5*10, dtype=np.float32).reshape((5, 10))
    filename, created_at = image_report.report(
        img, func_dir, 'test', batched=False)
    assert filename.startswith('test_')
    path = os.path.join(func_dir, filename)
    assert os.path.exists(path)
    assert created_at is not None
