import chainer
from chainer import cuda
from chainer import reporter
import numpy as np


CHAINERUI_IMAGE_PREFIX = 'chainerui_image'


class ImageSummary(object):

    def __init__(self):
        self.observation = {}


chainerui_image_observer = ImageSummary()


def image(images, name, tag=None, ch_axis=-1):
    """summary images to visualize.

    A batch of image is registered on global observation and these images
    are collected by :class:`chainerui.extensions.ImageReporter`. This function
    expects to be used with :class:`chainer.training.Trainer`. If using this
    function without :class:`chainer.training.Trainer`, need to setup
    :class:`chainer.Reporter` before using it.

    Args:
        images (:class:`numpy.ndarray` or :class:`cupy.ndarray` or
            `chainer.Variable`): batch of image, its shape is expected as
            [batch x height x width x channel].
        name (str): name of image.
        tag (str): tar of image, optional.
        ch_axis (int): index number of channel dimension.
    """

    current_reporter = reporter.get_current_reporter()
    observer = chainerui_image_observer
    with reporter.report_scope(observer.observation):
        if tag is not None:
            name = '%s/%s' % (name, tag)
        if isinstance(images, chainer.Variable):
            images = images.data
        images = cuda.to_cpu(images)
        if ch_axis != -1:
            roll_ax = np.append(np.delete(np.arange(
                images.ndim), ch_axis), ch_axis)
            images = images.transpose(roll_ax)
        current_reporter.report({name: images}, observer)
