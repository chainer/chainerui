from flask.globals import current_app

from chainerui.utils.json import dumps


# Simplified based on
#   https://github.com/pallets/flask/blob/0.12.2/flask/json.py#L198-L265
def jsonify(data):
    return current_app.response_class(
        dumps(data) + '\n',
        mimetype=current_app.config['JSONIFY_MIMETYPE']
    )
