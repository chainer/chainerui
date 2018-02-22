from base64 import b64encode
import io
import json
import os

import numpy as np
from PIL import Image

from chainerui import DB_SESSION
from chainerui.models.result import Result


def _serialize(img):
    buf = io.BytesIO()
    buf(img)


def collect_images(result_id):
    current_result = DB_SESSION.query(Result).filter_by(id=result_id).first()

    path_name = current_result.path_name
    with open(os.path.join(path_name, '.chainerui_images'), 'r') as f:
        image_info = json.load(f)

    rows, cols = 10, 10
    images = []
    for info in image_info:
        image_path = info['path']
        iteration = info['iteration']
        with open(os.path.join(path_name, image_path), 'rb') as f:
            x = np.load(f)
        x = np.asarray(np.clip(x * 255, 0.0, 255.0), dtype=np.uint8)
        _, H, W, C = x.shape
        x = x.reshape((rows, cols, H, W, C))
        x = x.transpose(0, 2, 1, 3, 4)
        x = x.reshape((rows * H, cols * W, 3))

        buf = io.BytesIO()
        Image.fromarray(x).save(buf, format='PNG')
        imgb64 = b64encode(buf.getvalue()).decode('utf-8')
        image_dict = {
            'src': 'data:image/png;base64,%s' % imgb64,
            'name': info['name'],
            'iteration': iteration,
        }
        if 'tag' in info:
            image_dict['tag'] = info['tag']
        images.append(image_dict)

    return images
