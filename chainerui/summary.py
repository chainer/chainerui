import contextlib
import datetime
import json
import os
import warnings

import filelock

from chainerui.logging import logger


CHAINERUI_ASSETS_METAFILE_NAME = '.chainerui_assets'


class _Summary(object):

    def __init__(self):
        self.cache = []
        self.filename = CHAINERUI_ASSETS_METAFILE_NAME
        self.default_output_path = ''
        self.out = None
        self.saved_idx = 0

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

    def save(self, out, timeout):
        filepath = os.path.join(out, self.filename)
        lockpath = filepath + '.lock'

        try:
            with filelock.FileLock(lockpath, timeout=timeout):
                saved_assets_list = []
                if os.path.isfile(filepath):
                    with open(filepath) as f:
                        saved_assets_list = json.load(f)
                saved_assets_list.extend(self.cache[self.saved_idx:])
                with open(filepath, 'w') as f:
                    json.dump(saved_assets_list, f, indent=4)
                self.saved_idx = len(self.cache)
        except filelock.Timeout:
            logger.error('Process to write a list of assets is timeout')


_chainerui_asset_observer = _Summary()


class _Reporter(object):

    def __init__(self, prefix=None, out=None, subdir='', **kwargs):
        self.prefix = prefix
        self.out = _chainerui_asset_observer.get_outpath(out)
        self.subdir = subdir
        self.value = kwargs

        self.images = {}
        self.audios = {}
        self.texts = {}
        self.count = 0

    def image(self, images, name=None, ch_axis=1, row=0, mode=None,
              batched=True, subdir=''):
        """Summarize images to visualize.

        Args:
            images (:class:`numpy.ndarray` or :class:`cupy.ndarray` or \
                :class:`chainer.Variable`): batch of images. If Number of
                dimension is 3 (or 2 when set `batched=False`), the pixels
                assume as black and white image.
            name (str): name of image. set as column name. when not setting,
                assigned ``'image'`` + sequential number.
            ch_axis (int): index number of channel dimension. set 1 by default.
                if the images don't have channel axis, this parameter is
                ignored.
            row (int): row size to visualize batched images. when set 0,
                show on unstuck. if images set only one image, the row size
                will be ignored.
            mode (str): if the images are not RGB or RGBA space, set their
                color space code. ChainerUI supports 'HSV'.
            batched (bool): if the image is not batched, set ``False``.
            subdir (str): sub-directory path of output.
        """
        from chainerui.report.image_report import check_available
        if not check_available():
            return
        from chainerui.report.image_report import report as _image

        col_name = self.get_col_name(name, 'image')
        out_dir, rel_out_dir = self.get_subdir(subdir)
        filename, _ = _image(
            images, out_dir, col_name, ch_axis, row, mode, batched)
        self.images[col_name] = os.path.join(rel_out_dir, filename)

        self.count += 1

    def audio(self, audio, sample_rate, name=None, subdir=''):
        """Summarize audio to listen on web browser.

        Args:
            audio (:class:`numpy.ndarray` or :class:`cupy.ndarray` or \
                :class:`chainer.Variable`): sampled wave array.
            sample_rate (int): sampling rate.
            name (str): name of image. set as column name. when not setting,
                assigned ``'audio'`` + sequential number.
            subdir (str): sub-directory path of output.
        """

        from chainerui.report.audio_report import check_available
        if not check_available():
            return
        from chainerui.report.audio_report import report as _audio

        col_name = self.get_col_name(name, 'audio')
        out_dir, rel_out_dir = self.get_subdir(subdir)
        filename, _ = _audio(audio, sample_rate, out_dir, col_name)
        self.audios[col_name] = os.path.join(rel_out_dir, filename)

        self.count += 1

    def text(self, text, name=None):
        """Summarize texts to show on a browser.

        Arguments:
            text (str): generated text.
            name (str): name of text. set as column name. when not setting,
                assigned ``'text'``.
        """
        col_name = self.get_col_name(name, 'text')
        self.texts[col_name] = text

        self.count += 1

    def get_col_name(self, name, media_type):
        col_name = name
        if col_name is None:
            col_name = '{}_{:d}'.format(media_type, self.count)
        if self.prefix is not None:
            col_name = self.prefix + col_name
        return col_name

    def get_subdir(self, subdir):
        rel_out_dir = os.path.join(self.subdir, subdir)
        out_dir = os.path.join(self.out, rel_out_dir)
        if not os.path.isdir(out_dir):
            os.makedirs(out_dir)
        return out_dir, rel_out_dir

    def save(self, timeout):
        cached = False
        if self.images:
            self.value['images'] = self.images
            cached = True
        if self.audios:
            self.value['audios'] = self.audios
            cached = True
        if self.texts:
            self.value['texts'] = self.texts
            cached = True
        if not cached:
            return
        self.value['timestamp'] = datetime.datetime.now().isoformat()
        _chainerui_asset_observer.add(self.value)
        _chainerui_asset_observer.save(self.out, timeout)


def set_out(path):
    """Set output path.

    Summary module requires output directory. Once set output path using this
    function, summary module shares the path.

    Args:
        path (str): directory path of output.
    """

    _chainerui_asset_observer.out = path


@contextlib.contextmanager
def reporter(prefix=None, out=None, subdir='', timeout=5, **kwargs):
    """Summarize media assets to visualize.

    ``reporter`` function collects media assets by the ``with`` statement and
    aggregates in same row to visualize. This function returns an object which
    provides the following methods.

    * :meth:`~chainerui.summary._Reporter.image`: collect images. almost same \
        as :func:`~chainerui.summary.image`
    * :meth:`~chainerui.summary._Reporter.audio`: collect audio. almost same \
        as :func:`~chainerui.summary.audio`
    * :meth:`~chainerui.summary._Reporter.text`: collect text. almost same \
        as :func:`~chainerui.summary.text`

    Example of how to set several assets:

       >>> from chainerui import summary
       >>> summary.set_out('path/to/output')  # same as 'log' file directory
       >>>
       >>> image_array1 = np.zeros((1, 3, 224, 224))
       >>> image_array2 = np.zeros((1, 3, 224, 224))
       >>> audio_array = np.random.uniform(-1, 1, 16000)
       >>>
       >>> from chainerui.summary import reporter
       >>> with reporter(epoch=1, iteration=10) as r:
       ...     r.image(image_array1)
       ...     r.image(image_array2)
       ...     r.audio(audio_array, 44100)
       >>> # image_array1 and image_array2 are visualized on a browser
       >>> # audio_array can be listened on a browser

    Args:
        prefix (str): prefix of column name.
        out (str): directory path of output.
        subdir (str): sub-directory path of output.
        **kwargs (dict): key-value pair to show as description. regardless of
            empty or not, timestamp is added.
    """

    report = _Reporter(prefix, out, subdir, **kwargs)
    yield report
    report.save(timeout)


def image(images, name=None, ch_axis=1, row=0, mode=None, batched=True,
          out=None, subdir='', timeout=5, **kwargs):
    """Summarize images to visualize.

    Array of images are converted as image format (PNG format on default),
    saved to output directory, and reported to the ChainerUI server.
    The images are saved every called this function. The images will be shown
    on `assets` endpoint vertically. If need to aggregate images in a row, use
    :func:`~chainerui.summary.reporter`.

    Examples of how to set arguments:

       >>> from chainerui import summary
       >>> summary.set_out('path/to/log')  # same as 'log' file directory
       >>>
       >>> x = np.zeros((10, 3, 5, 5))  # = [Batchsize, Channel, Height, Width]
       >>> summary.image(x, name='test')  # images are tiled as 1x10
       >>> summary.image(x, name='test', row=2)  # images are tiled as 2x5
       >>>
       >>> x = np.zeros((3, 5, 5))  # = [C, H, W]
       >>> # need to set as a non-batched image and channel axis explicitly
       >>> summary.image(x, name='test', ch_axis=0, batched=False)
       >>>
       >>> x = np.zeros((10, 5, 5, 3))  # = [B, H, W, C]
       >>> # need to set channel axis explicitly
       >>> summary.image(x, name='test', ch_axis=-1, row=2)
       >>>
       >>> x = np.zeros((5, 5, 3))  # = [H, W, C]
       >>> # need to set as a non-batched image
       >>> summary.image(x, name='test', ch_axis=-1, batched=False)
       >>>
       >>> x = np.zeros((10, 5, 5))  # = [B, H, W], grayscale images
       >>> summary.image(x, name='test')  # image are tiled as 1x10
       >>> summary.image(x, name='test', row=2)  # image are tiled as 2x5
       >>>
       >>> x = np.zeros((5, 5)) # = [H, W], a grayscale image
       >>> # need to set as a non-bathed image
       >>> summary.image(x, name='test', batched=False)

    Add description about the image::

       >>> summary.image(x, name='test', epoch=1, iteration=100)
       >>> # 'epoch' and 'iteration' column will be shown.

    Args:
        images (:class:`numpy.ndarray` or :class:`cupy.ndarray` or \
            :class:`chainer.Variable`): batch of images. If Number of dimension
            is 3 (or 2 when set `batched=False`), the pixels assume as
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
        subdir (str): sub-directory path of output.
        **kwargs (dict): key-value pair to show as description. regardless of
            empty or not, timestamp on created the image is added.
    """

    from chainerui.report.image_report import check_available
    if not check_available():
        return
    from chainerui.report.image_report import report as _image

    out_root = _chainerui_asset_observer.get_outpath(out)
    out_path = os.path.join(out_root, subdir)
    if not os.path.isdir(out_path):
        os.makedirs(out_path)
    col_name = name
    if col_name is None:
        col_name = 'image'
    filename, created_at = _image(
        images, out_path, col_name, ch_axis, row, mode, batched)

    value = kwargs
    value['timestamp'] = created_at.isoformat()
    value['images'] = {col_name: os.path.join(subdir, filename)}
    _chainerui_asset_observer.add(value)
    _chainerui_asset_observer.save(out_root, timeout)


def audio(audio, sample_rate, name=None, out=None, subdir='', timeout=5,
          **kwargs):
    """Summarize audio files to listen on a browser.

    An sampled array is converted as WAV audio file, saved to output directory,
    and reported to the ChainerUI server. The audio file is saved every called
    this function. The audio file will be listened on `assets` endpoint
    vertically. If need to aggregate audio files in row, use
    :func:`~chainerui.summary.reporter`.

    Example of how to set arguments:

       >>> from chainerui import summary
       >>> summary.set_out('path/to/output')
       >>> rate = 44100
       >>>
       >>> sampled_array = np.random.uniform(-1, 1, 16000)
       >>> summary.audio(sampled_array, rate, name='test')
       >>> # sampled_array can be listened on a browser.

    Add description about the audio file:

       >>> summary.audio(
       ...     sampled_array, rate, name='test', epoch=1, iteration=100)
       >>> # 'epoch' and 'iteration' column will be shown.

    Args:
        audio (:class:`numpy.ndarray` or :class:`cupy.ndarray` or \
            :class:`chainer.Variable`): sampled wave array.
        sample_rate (int): sampling rate.
        name (str): name of image. set as column name. when not setting,
            assigned ``'audio'``.
        out (str): directory path of output.
        subdir (str): sub-directory path of output.
        **kwargs (dict): key-value pair to show as description. regardless of
            empty or not, timestamp on created the image is added.
    """

    from chainerui.report.audio_report import check_available
    if not check_available():
        return
    from chainerui.report.audio_report import report as _audio

    out_root = _chainerui_asset_observer.get_outpath(out)
    out_path = os.path.join(out_root, subdir)
    if not os.path.isdir(out_path):
        os.makedirs(out_path)
    col_name = name
    if col_name is None:
        col_name = 'audio'
    filename, created_at = _audio(audio, sample_rate, out_path, col_name)

    value = kwargs
    value['timestamp'] = created_at.isoformat()
    value['audios'] = {col_name: os.path.join(subdir, filename)}
    _chainerui_asset_observer.add(value)
    _chainerui_asset_observer.save(out_root, timeout)


def text(text, name=None, out=None, timeout=5, **kwargs):
    """Summarize texts to show on a browser.

    Texts generated by training model is saved as asset and reported to the
    ChainerUI.

    Arguments:
        text (str): generated text.
        name (str): name of text. set as column name. when not setting,
            assigned ``'text'``.
        out (str): directory path of output.
        **kwargs (dict): key-value pair to show as description. regardless of
            empty or not, timestamp on created the text is added.
    """

    out_path = _chainerui_asset_observer.get_outpath(out)
    col_name = name
    if col_name is None:
        col_name = 'text'

    value = kwargs
    value['timestamp'] = datetime.datetime.now().isoformat()
    value['texts'] = {col_name: text}
    _chainerui_asset_observer.add(value)
    _chainerui_asset_observer.save(out_path, timeout)
