from collections import OrderedDict
import datetime
import json
import os

from chainerui import db
from chainerui.models.asset import Asset
from chainerui.models.bindata import Bindata


def collect_images(result, assets, force=False):
    """collect images from meta file

    Collecting images only when the metafile is updated. If number of images
    are decreased, assets are reset and re-collect the images.
    """
    path_name = result.path_name
    info_path = os.path.join(path_name, '.chainerui_images')
    start_idx = len(assets)
    if not os.path.isfile(info_path):
        return assets
    file_modified_at = datetime.datetime.fromtimestamp(os.path.getmtime(
        info_path))
    if start_idx > 0:
        if assets[-1].file_modified_at == file_modified_at:
            return assets

    with open(info_path, 'r') as f:
        info_list = json.load(f, object_pairs_hook=OrderedDict)

    if len(info_list) < start_idx:
        start_idx = 0
        assets = []

    for base_info in info_list[start_idx:]:
        image_path = base_info.pop('images')
        asset = Asset.create(
            result_id=result.id, summary=base_info,
            file_modified_at=file_modified_at)
        for key, path in image_path.items():
            with open(os.path.join(path_name, path), 'rb') as f:
                data = f.read()
            content = Bindata(
                asset_id=asset.id, name=path, tag=key, content=data)
            asset.content_list.append(content)
        assets.append(asset)

    db.session.commit()

    return assets
