import chainer
import unittest

import numpy as np

from chainerui import summary


class TestImage(unittest.TestCase):

    def tearDown(self):
        summary.chainerui_image_observer.observation = {}

    def test_image_error(self):
        img = np.zeros(10)
        with self.assertRaises(ValueError) as e:
            summary.image(img, 'test', batched=False)
        assert 'must be 2 or 3' in str(e.exception)

        img = np.zeros(10).reshape(2, 5)
        with self.assertRaises(ValueError) as e:
            summary.image(img, 'test')
        assert 'must be 3 or 4' in str(e.exception)

    def test_image_bchw(self):
        observer = summary.chainerui_image_observer

        # unstuck
        img = np.zeros(10*3*5*5).reshape((10, 3, 5, 5))
        summary.image(img, 'test')
        assert len(observer.observation) == 1
        key = summary.CHAINERUI_IMAGE_PREFIX+'/test'
        assert key in observer.observation
        expected_img = np.zeros(10*3*5*5).reshape((50, 5, 3))
        assert np.allclose(observer.observation[key]['image'], expected_img)

        # stuck, overwrite
        img2 = np.zeros(10*3*5*5).reshape((10, 3, 5, 5))
        img2[0, 0, 0, 0] = 10
        summary.image(img2, 'test', row=2)
        assert len(observer.observation) == 1
        expected_img2 = np.zeros(10*3*5*5).reshape((10, 25, 3))
        expected_img2[0, 0, 0] = 10
        assert np.allclose(observer.observation[key]['image'], expected_img2)

    def test_image_bhwc(self):
        observer = summary.chainerui_image_observer

        # unstuck
        img = np.zeros(10*5*5*3).reshape((10, 5, 5, 3))
        summary.image(img, 'test', ch_axis=-1)
        assert len(observer.observation) == 1
        key = summary.CHAINERUI_IMAGE_PREFIX+'/test'
        assert key in observer.observation
        expected_img = np.zeros(10*3*5*5).reshape((50, 5, 3))
        assert np.allclose(observer.observation[key]['image'], expected_img)

        # stuck
        img2 = np.zeros(10*5*5*3).reshape((10, 5, 5, 3))
        img2[0, 0, 0, 0] = 10
        summary.image(img2, 'test2', ch_axis=-1, row=2)
        assert len(observer.observation) == 2
        key2 = summary.CHAINERUI_IMAGE_PREFIX+'/test2'
        assert key2 in observer.observation
        expected_img2 = np.zeros(10*5*5*3).reshape((10, 25, 3))
        expected_img2[0, 0, 0] = 10
        assert np.allclose(observer.observation[key2]['image'], expected_img2)

    def test_image_bhw_no_name(self):
        observer = summary.chainerui_image_observer

        # unstuck
        img = np.zeros(10*5*5).reshape((10, 5, 5))
        summary.image(img)
        assert len(observer.observation) == 1
        key = summary.CHAINERUI_IMAGE_PREFIX+'/0'
        assert key in observer.observation
        expected_img = np.zeros(10*5*5).reshape((50, 5))
        assert np.allclose(observer.observation[key]['image'], expected_img)

        # stuck
        img2 = np.zeros(10*5*5).reshape((10, 5, 5))
        img2[0, 0, 0] = 10
        summary.image(img2, row=2)
        assert len(observer.observation) == 1
        expected_img2 = np.zeros(10*5*5).reshape((10, 25))
        expected_img2[0, 0] = 10
        assert np.allclose(observer.observation[key]['image'], expected_img2)

    def test_image_chw(self):
        observer = summary.chainerui_image_observer

        img = np.zeros(3*5*5).reshape((3, 5, 5))
        img = chainer.Variable(img)
        summary.image(img, 'test', ch_axis=0, batched=False)
        assert len(observer.observation) == 1
        key = summary.CHAINERUI_IMAGE_PREFIX+'/test'
        assert key in observer.observation
        expected_img = np.zeros(5*5*3).reshape((5, 5, 3))
        assert np.allclose(observer.observation[key]['image'], expected_img)
        assert 'mode' not in observer.observation[key]

    def test_image_hwc_hsv(self):
        observer = summary.chainerui_image_observer

        img = np.zeros(5*5*3).reshape((5, 5, 3))
        img = chainer.Variable(img)
        summary.image(img, 'test', batched=False, ch_axis=-1, mode='HSV')
        assert len(observer.observation) == 1
        key = summary.CHAINERUI_IMAGE_PREFIX+'/test'
        assert key in observer.observation
        assert np.allclose(observer.observation[key]['image'], img.data)
        assert 'mode' in observer.observation[key]
        assert observer.observation[key]['mode'] == 'hsv'

    def test_image_hw(self):
        observer = summary.chainerui_image_observer

        img = np.zeros(5*10).reshape((5, 10))
        img = chainer.Variable(img)
        summary.image(img, 'test', batched=False)
        assert len(observer.observation) == 1
        key = summary.CHAINERUI_IMAGE_PREFIX+'/test'
        assert key in observer.observation
        assert np.allclose(observer.observation[key]['image'], img.data)
