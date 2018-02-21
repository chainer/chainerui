import chainer
from chainer import cuda
from chainer import reporter


CHAINERUI_IMAGE_PREFIX = 'image'
_chainerui_global_observation = {}


def image(images, name, tag=None,
          observation=_chainerui_global_observation):
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
    """

    current_reporter = reporter.get_current_reporter()
    with reporter.report_scope(observation):
        name = '%s/%s' % (CHAINERUI_IMAGE_PREFIX, name)
        if tag is not None:
            name = '%s/%s' % (name, tag)
        if isinstance(images, chainer.Variable):
            images = images.data
        images = cuda.to_cpu(images)
        current_reporter.report({name: images}, None)
