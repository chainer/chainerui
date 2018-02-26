import unittest

import chainer
import numpy as np

from chainerui import summary


class TestImage(unittest.TestCase):

    def tearDown(self):
        summary.chainerui_image_observer.observation = {}

    def test_image(self):
        img = np.zeros(750).reshape((10, 5, 5, 3))

        with self.assertRaises(IndexError) as e:
            summary.image(img, 'test')
        assert 'out of range' in str(e.exception)

        reporter = chainer.Reporter()
        observer = summary.chainerui_image_observer
        reporter.add_observer(summary.CHAINERUI_IMAGE_PREFIX, observer)
        with reporter.scope(observer.observation):
            summary.image(img, 'test')

        assert len(observer.observation) == 1
        key = summary.CHAINERUI_IMAGE_PREFIX+'/test'
        assert key in observer.observation

        img2 = np.zeros(750).reshape((10, 5, 5, 3))
        img2[0, 0, 0, 1] = 1
        with reporter.scope(observer.observation):
            summary.image(img2, 'test')
        assert len(observer.observation) == 1
        assert key in observer.observation
        assert np.allclose(observer.observation[key]['array'], img2)
        assert 'row' not in observer.observation[key]

        img3 = np.zeros(750).reshape((10, 5, 5, 3))
        img3[0, 0, 0, 2] = 1
        img3 = chainer.Variable(img3)
        with reporter.scope(observer.observation):
            summary.image(img3, row=5)
        assert len(observer.observation) == 2
        none_key = summary.CHAINERUI_IMAGE_PREFIX+'/0'
        assert none_key in observer.observation
        assert np.allclose(observer.observation[none_key]['array'], img3.data)
        assert observer.observation[none_key]['row'] == 5

        img4 = np.zeros(750).reshape((10, 3, 5, 5))
        img4[0, 0, 1, 0] = 1
        with reporter.scope(observer.observation):
            summary.image(img4, 'test', ch_axis=1)
        assert len(observer.observation) == 2
        expected_img4 = img4.transpose(0, 2, 3, 1)
        assert np.allclose(observer.observation[key]['array'], expected_img4)
        assert 'row' not in observer.observation[key]
