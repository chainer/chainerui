import chainer
from chainer import cuda
from chainer import reporter
import numpy as np


CHAINERUI_IMAGE_PREFIX = 'chainerui_image'


class ImageSummary(object):

    def __init__(self):
        self.observation = {}


chainerui_image_observer = ImageSummary()


def image(images, name=None, ch_axis=1, row=0):
    """summary images to visualize.

    A batch of image is registered on global observation and these images
    are collected by :class:`chainerui.extensions.ImageReporter`. This function
    expects to be used with :class:`chainer.training.Trainer`. If using this
    function without :class:`chainer.training.Trainer`, need to setup
    :class:`chainer.Reporter` before using it.

    Args:
        images (:class:`numpy.ndarray` or :class:`cupy.ndarray` or
            `chainer.Variable`): batch of images or an image.
        name (str): name of image. when not setting, assigned number
            automatically.
        ch_axis (int): index number of channel dimension. set 1 by default.
        row (int): row size to visualize batched images. when set 0,
            show on unstuck. if images set only one image, the row size
            will be ignored.
    """

    current_reporter = reporter.get_current_reporter()
    observer = chainerui_image_observer
    with reporter.report_scope(observer.observation):
        if name is None:
            name = '0'
        if isinstance(images, chainer.Variable):
            images = images.data
        images = cuda.to_cpu(images)
        if ch_axis != -1:
            roll_ax = np.append(np.delete(np.arange(
                images.ndim), ch_axis), ch_axis)
            images = images.transpose(roll_ax)
        value = dict(array=images)
        if row > 0:
            value['row'] = row
        current_reporter.report({name: value}, observer)
