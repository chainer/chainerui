import contextlib
import datetime
import json
import os
import shutil
import warnings

from chainerui.utils import tempdir


class _Summary(object):

    def __init__(self):
        self.cache = []
        self.filename = '.chainerui_assets'
        self.default_output_path = ''
        self.out = None

    def add(self, value):
        self.cache.append(value)

    def get_outpath(self, out):
        # return output path led by argument > global priority
        if out is not None:
            return out

        if self.out is None:
            warnings.warn('Output directory is not set, so empty path(\'\') '
                          'is set as output directory')
            return self.default_output_path
        return self.out

    def save(self, out):
        with tempdir(prefix='chainerui_', dir=out) as tempd:
            path = os.path.join(tempd, self.filename)
            with open(path, 'w') as f:
                json.dump(self.cache, f, indent=4)

            shutil.move(path, os.path.join(out, self.filename))


_chainerui_asset_observer = _Summary()


class _Reporter(object):

    def __init__(self, prefix=None, out=None, **kwargs):
        self.prefix = prefix
        self.out = _chainerui_asset_observer.get_outpath(out)
        self.value = kwargs

        self.images = {}
        self.count = 0

    def image(self, images, name=None, ch_axis=1, row=0, mode=None,
              batched=True):
        from chainerui.report.image_report import check_available
        if not check_available():
            return
        from chainerui.report.image_report import report as _image

        col_name = name
        if col_name is None:
            col_name = 'image_{:d}'.format(self.count)
        if self.prefix is not None:
            col_name = self.prefix + col_name
        filename, _ = _image(
            images, self.out, col_name, ch_axis, row, mode, batched)
        self.images[col_name] = filename

        self.count += 1

    def save(self):
        cached = False
        if self.images:
            self.value['images'] = self.images
            cached = True
        if not cached:
            return
        self.value['timestamp'] = datetime.datetime.now().isoformat()
        _chainerui_asset_observer.add(self.value)
        _chainerui_asset_observer.save(self.out)


def set_out(path):
    _chainerui_asset_observer.out = path


@contextlib.contextmanager
def reporter(prefix=None, out=None, **kwargs):
    """Summary media assets to visualize.

    ``reporter`` function collects media assets by the ``with`` statement and
    aggregates in a row to visualize. This function returns an object which
    provides the following methods.

    * ``image``: almost same as :func:`~chainerui.summary.image`

    Example of how to set several assets::

       >>> from chainerui.summary import reporter
       >>> summary.set_out('/path/to/output')  # same as 'log' file directory
       >>>
       >>> with reporter(epoch=1, iteration=10) as r:
       >>>     r.image(image_array1)
       >>>     r.image(image_array2)
       >>> # image_array1 and image_array2 will be shown in a row.

    Arguments:
        prefix (str): prefix of column name.
        out (str): directory path of output.
        **kwargs (dict): key-value pair to show as description. regardless of
            empty or not, timestamp is added.
    """

    report = _Reporter(prefix, out, **kwargs)
    yield report
    report.save()


def image(images, name=None, ch_axis=1, row=0, mode=None, batched=True,
          out=None, **kwargs):
    """Summary images to visualize.

    Array of images are converted as image format (PNG format on default),
    saved to output directory, and reported to the ChainerUI server.
    The images are saved every called this function. The images will be shown
    on `assets` endpoint vertically. If need to aggregate images in a row, use
    :func:`~chainerui.summary.reporter`.

    Examples of how to set arguments::

       >>> from chainerui import summary
       >>> summary.set_out('/path/to/log')  # same as 'log' file directory
       >>>
       >>> x.shape  # = [Batchsize, Channel, Hight, Width]
       (10, 3, 5, 5)
       >>> summary.image(x, name='test')  # images are tiled as 1x10
       >>> summary.image(x, name='test', row=5)  # images are tiled as 2x5
       >>>
       >>> x.shape  # = [C, H, W]
       (3, 5, 5)
       >>> # need to set as a non-batched image and channel axis explicitly
       >>> summary.image(x, name='test', ch_axis=0, batched=False)
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

    Add description about the image::

       >>> summary.image(x, name='test', epoch=1, iteration=100)
       >>> # 'epoch' and 'iteration' column will be shown.

    Args:
        images (:class:`numpy.ndarray` or :class:`cupy.ndarray` or
            `chainer.Variable`): batch of images. If Number of dimension is
            3 (or 2 when set `batched=False`), the pixels assume as
            black and white image.
        name (str): name of image. set as column name. when not setting,
            assigned ``'image'``.
        ch_axis (int): index number of channel dimension. set 1 by default.
            if the images don't have channel axis, this parameter is ignored.
        row (int): row size to visualize batched images. when set 0,
            show on unstuck. if images set only one image, the row size
            will be ignored.
        mode (str): if the images are not RGB or RGBA space, set their
            color space code. ChainerUI supports 'HSV'.
        batched (bool): if the image is not batched, set ``False``.
        out (str): directory path of output.
        **kwargs (dict): key-value pair to show as description. regardless of
            empty or not, timestamp on created the image is added.
    """

    from chainerui.report.image_report import check_available
    if not check_available():
        return
    from chainerui.report.image_report import report as _image

    out_path = _chainerui_asset_observer.get_outpath(out)
    col_name = name
    if col_name is None:
        col_name = 'image'
    filename, created_at = _image(
        images, out_path, col_name, ch_axis, row, mode, batched)

    value = kwargs
    value['timestamp'] = created_at.isoformat()
    value['images'] = {col_name: filename}
    _chainerui_asset_observer.add(value)
    _chainerui_asset_observer.save(out_path)
