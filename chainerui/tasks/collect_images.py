from base64 import b64encode
import json
import os

from chainerui import DB_SESSION
from chainerui.models.result import Result


def _serialize(path):
    with open(path, 'rb') as f:
        data = f.read()
    return b64encode(data).decode('utf-8')


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
        image_paths = base_info.pop('images')
        images = {'contents': {}, 'train_info': {}}
        for key, paths in image_paths.items():
            img_strs = [_make_src_tag(
                _serialize(os.path.join(path_name, path))) for path in paths]
            images['contents'][key] = img_strs
        for k, v in base_info.items():
            images['train_info'][k] = v
        images_list.append(images)

    return images_list
