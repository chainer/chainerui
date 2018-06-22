import datetime
import json
import os

from chainerui import DB_SESSION
from chainerui.models.data_info import DataInfo
from chainerui.models.data_content import DataContent


def collect_images(result, data_infos, force=False):
    """collect images from meta file

    Example of returning structure will be:
      [
        {
          "contents": {
            "name1": "data:image/png;base64,...",
            "name2": "data:image/png;base64,..."
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
    path_name = result.path_name
    info_path = os.path.join(path_name, '.chainerui_images')
    start_idx = len(data_infos)
    if not os.path.isfile(info_path):
        return data_infos
    file_modified_at = datetime.datetime.fromtimestamp(os.path.getmtime(
        info_path))
    if start_idx > 0:
        if data_infos[-1].file_modified_at == file_modified_at:
            return data_infos

    with open(info_path, 'r') as f:
        info_list = json.load(f)

    if len(info_list) < start_idx:
        start_idx = 0
        data_infos = []

    for base_info in info_list[start_idx:]:
        image_path = base_info.pop('images')
        data_info = DataInfo.create(result.id, base_info, file_modified_at)
        for key, path in image_path.items():
            with open(os.path.join(path_name, path), 'rb') as f:
                data = f.read()
            content = DataContent(data_info.id, path, key, data)
            data_info.content_list.append(content)
        data_infos.append(data_info)

    DB_SESSION.commit()

    return data_infos
