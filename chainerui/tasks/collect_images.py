from base64 import b64encode
import io
import json
import os

import numpy as np
from PIL import Image

from chainerui import DB_SESSION
from chainerui.models.result import Result


def _serialize(img, ext='PNG', mode=None):
    buf = io.BytesIO()
    if mode is None:
        Image.fromarray(img).save(buf, format=ext)
    elif mode == 'hsv':
        Image.fromarray(img, mode='HSV').convert('RGB').save(buf, format=ext)
    return b64encode(buf.getvalue()).decode('utf-8')


def _make_src_tag(src):
    return 'data:image/png;base64,' + src


def collect_images(result_id):
    """collect images from meta file

    Example of returning structure is:
      [
        {
          "contents": {
            "name1": ["data:image/png;base64,...","data:image/png;base64,..."],
            "name2": ["data:image/png;base64,...","data:image/png;base64,..."]
          },
          "train_info" {
            "iteration": 1000,
            "epoch": 1,
            "other_key": "value"
          }
        }, {
          "... (same as above)"
        }
      ]
    """
    current_result = DB_SESSION.query(Result).filter_by(id=result_id).first()

    path_name = current_result.path_name
    info_path = os.path.join(path_name, '.chainerui_images')
    if not os.path.isfile(info_path):
        return []
    with open(info_path, 'r') as f:
        info_list = json.load(f)

    images_list = []
    for base_info in info_list:
        image_info = base_info.pop('images')
        images = {'contents': {}, 'train_info': {}}
        for info in image_info:
            with open(os.path.join(path_name, info['path']), 'rb') as f:
                x = np.load(f)
            if x.dtype != np.uint8:
                x = np.asarray(np.clip(x * 255, 0.0, 255.0), dtype=np.uint8)
            mode = None if 'mode' not in info else info['mode']
            img_srcs = images['contents']
            if x.ndim == 4:
                B, H, W, C = x.shape
                if 'row' in info:
                    rows = info['row']
                    cols = B // rows
                    x = x.reshape((rows, cols, H, W, C))
                    x = x.transpose(0, 2, 1, 3, 4)
                    x = x.reshape((rows * H, cols * W, 3))

                    img_str = _make_src_tag(_serialize(x, mode=mode))
                    img_srcs[info['name']] = [img_str]
                else:
                    unstucked_images = []
                    for xx in x:
                        img_str = _make_src_tag(_serialize(xx, mode=mode))
                        unstucked_images.append(img_str)
                    img_srcs[info['name']] = unstucked_images
            elif x.ndim == 3:
                img_str = _make_src_tag(_serialize(x, mode=mode))
                img_srcs[info['name']] = [img_str]
        for k, v in base_info.items():
            images['train_info'][k] = v
        images_list.append(images)

    return images_list
