import chainer
from chainer import cuda
from chainer import reporter
import numpy as np


CHAINERUI_IMAGE_PREFIX = 'chainerui_image'


class ImageSummary(object):

    def __init__(self):
        self.observation = {}


chainerui_image_observer = ImageSummary()


def image(images, name=None, ch_axis=1, row=0, mode=None, batched=True):
    """summary images to visualize.

    A batch of image is registered on global observation and these images
    are collected by :class:`chainerui.extensions.ImageReporter`. This function
    expects to be used with :class:`chainer.training.Trainer`. If using this
    function without :class:`chainer.training.Trainer`, need to setup
    :class:`chainer.Reporter` before using it.

    Example of how to set arguments::

       >>> from chainerui import summary
       >>>
       >>> x.shape  # = [Batchsize, Channel, Hight, Width]
       (10, 3, 5, 5)
       >>> summary.image(x, name='test')  # images are tiled as 1x10
       >>> summary.image(x, name='test', row=5)  # images are tiled as 2x5
       >>>
       >>> x.shape  # = [B, H, W, C]
       (10, 5, 5, 3)
       >>> # need to set channel axis explicitly
       >>> summary.image(x, name='test', ch_axis=-1, row=5)
       >>>
       >>> x.shape  # = [H, W, C]
       (5, 5, 3)
       >>> # need to set as a non-batched image
       >>> summary.image(x, name='test', ch_axis=-1, batched=False)
       >>>
       >>> x.shape  # = [B, H, W], grayscale images
       (10, 5, 5)
       >>> summary.image(x, name='test')  # image are tiled as 1x10
       >>> summary.image(x, name='test', row=5)  # image are tiled as 2x5
       >>>
       >>> x.shape  # = [H, W], a grayscale image
       (5, 5)
       >>> # need to set as a non-bathed image
       >>> summary.image(x, name='test', batched=False)

    Args:
        images (:class:`numpy.ndarray` or :class:`cupy.ndarray` or
            `chainer.Variable`): batch of images. If Number of dimension is
            3 (or 2 when set `batched=False`), the pixels assume as
            black and white image.
        name (str): name of image. when not setting, assigned number
            automatically.
        ch_axis (int): index number of channel dimension. set 1 by default.
            if the images don't have channel axis, this parameter is ignored.
        row (int): row size to visualize batched images. when set 0,
            show on unstuck. if images set only one image, the row size
            will be ignored.
        mode (str): if the images are not RGB or RGBA space, set their
            color space code. ChainerUI supports 'HSV'.
        batched (bool): if the image is not batched, set `False`.
    """

    ndim = images.ndim
    if batched:
        if not (ndim == 3 or ndim == 4):
            raise ValueError(
                'Number of array dimension %d must be 3 or 4', ndim)
        if ndim == 3:
            ch_axis = None
    else:
        if not (ndim == 2 or ndim == 3):
            raise ValueError(
                'Number of array dimension %d must be 2 or 3', ndim)
        if ndim == 2:
            ch_axis = None
        images = images.reshape(1, *images.shape)

    current_reporter = reporter.get_current_reporter()
    observer = chainerui_image_observer
    with reporter.report_scope(observer.observation):
        if name is None:
            # TODO(disktnk): support tupled image and increment automatically
            name = '0'
        if isinstance(images, chainer.Variable):
            images = images.data
        images = cuda.to_cpu(images)
        if ch_axis is not None and ch_axis != -1:
            roll_ax = np.append(np.delete(np.arange(
                images.ndim), ch_axis), ch_axis)
            images = images.transpose(roll_ax)
        value = dict(array=images)
        if row > 0:
            value['row'] = row
        if mode is not None:
            value['mode'] = mode.lower()
        current_reporter.report({name: value}, observer)
