import unittest

import chainer
import numpy as np

from chainerui import summary


class TestImage(unittest.TestCase):

    def tearDown(self):
        summary._chainerui_global_observation = {}

    def test_image(self):
        img = np.zeros(750).reshape((10, 5, 5, 3))

        with self.assertRaises(IndexError) as e:
            summary.image(img, 'test')
        assert 'out of range' in str(e.exception)

        reporter = chainer.Reporter()
        with reporter.scope(self):
            summary.image(img, 'test')

        assert len(summary._chainerui_global_observation) == 1
        key = summary.CHAINERUI_IMAGE_PREFIX+'/test'
        assert key in summary._chainerui_global_observation

        img2 = np.zeros(750).reshape((10, 5, 5, 3))
        img2[0, 0, 0, 1] = 1
        with reporter.scope(self):
            summary.image(img2, 'test')
        assert len(summary._chainerui_global_observation) == 1
        assert key in summary._chainerui_global_observation
        assert np.allclose(summary._chainerui_global_observation[key], img2)

        img3 = np.zeros(750).reshape((10, 5, 5, 3))
        img3[0, 0, 0, 2] = 1
        img3 = chainer.Variable(img3)
        with reporter.scope(self):
            summary.image(img3, 'test', tag='tag')
        assert len(summary._chainerui_global_observation) == 2
        key_tag = summary.CHAINERUI_IMAGE_PREFIX+'/test/tag'
        assert key in summary._chainerui_global_observation
        assert np.allclose(summary._chainerui_global_observation[key_tag],
                           img3.data)

        img4 = np.zeros(750).reshape((10, 3, 5, 5))
        img4[0, 0, 1, 0] = 1
        with reporter.scope(self):
            summary.image(img4, 'test', ch_axis=1)
        assert len(summary._chainerui_global_observation) == 2
        expected_img4 = img4.transpose(0, 2, 3, 1)
        assert np.allclose(summary._chainerui_global_observation[key],
                           expected_img4)
