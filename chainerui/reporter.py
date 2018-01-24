import chainer
from chainer import reporter
from chainer import cuda


CHAINERUI_IMAGE_PREFIX = 'image'
_chainerui_global_observation = {}


def image(images, name, tag=None,
          observation=_chainerui_global_observation):
    current_reporter = reporter.get_current_reporter()
    with reporter.report_scope(observation):
        name = '%s/%s' % (CHAINERUI_IMAGE_PREFIX, name)
        if tag is not None:
            name = '%s/%s' % (name, tag)
        if isinstance(images, chainer.Variable):
            images = images.data
        images = cuda.to_cpu(images)
        current_reporter.report({name: images}, None)
