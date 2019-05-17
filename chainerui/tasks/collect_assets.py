from collections import OrderedDict
import datetime
import json
import os

from chainerui.database import db
from chainerui.models.asset import Asset
from chainerui.models.bindata import Bindata
from chainerui import summary


def collect_assets(result, force=False):
    """collect assets from meta file

    Collecting assets only when the metafile is updated. If number of assets
    are decreased, assets are reset and re-collect the assets.
    """
    path_name = result.path_name
    info_path = os.path.join(path_name, summary.CHAINERUI_ASSETS_METAFILE_NAME)
    if not os.path.isfile(info_path):
        return
    start_idx = len(result.assets)
    file_modified_at = datetime.datetime.fromtimestamp(os.path.getmtime(
        info_path))
    if start_idx > 0:
        if result.assets[-1].file_modified_at == file_modified_at:
            return

    with open(info_path, 'r') as f:
        info_list = json.load(f, object_pairs_hook=OrderedDict)

    if len(info_list) < start_idx:
        start_idx = 0
        result.assets = []

    for base_info in info_list[start_idx:]:
        asset_path = base_info.pop('images', {})
        asset_path.update(base_info.pop('audios', {}))
        base_info.update(base_info.pop('texts', {}))
        asset = Asset.create(
            result_id=result.id, summary=base_info,
            file_modified_at=file_modified_at)
        for key, path in asset_path.items():
            with open(os.path.join(path_name, path), 'rb') as f:
                data = f.read()
            content = Bindata(
                asset_id=asset.id, name=path, tag=key, content=data)
            asset.content_list.append(content)
        result.assets.append(asset)

    db.session.commit()
