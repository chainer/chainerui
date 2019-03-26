import json
import urllib3


def urlopen(method, url, headers=None, data=None):
    """connect and get information via HTTP request

    A simplified wrapper for HTTP request, fixed by JSON data format.
    When an error is occurred, error message is converted to text and return
    ``(None, text)`` tuple. This simplification is favor for especially during
    training phase not to stop processes.

    Arguments:
        method (str): method type, GET/POST/PUT/DELETE
        url (str): target URL
        headers (str): content type, ``'application/json'`` is set on default.
            currently only supports JSON type.
        data (dict or list): dict or list data, dumped as JSON automatically

    Returns:
        tuple: ``(Response, '')`` when not error, ``(None, str)`` when error
            has occurred.
    """

    if headers is None:
        headers = {'Content-Type': 'application/json'}
    json_data = None
    if data is not None:
        json_data = json.dumps(data)
    http = urllib3.PoolManager()
    try:
        res = http.request(method, url, body=json_data, headers=headers)
    except (urllib3.exceptions.NewConnectionError,
            urllib3.exceptions.MaxRetryError) as e:
        return None, 'cannot connect to the URL: ' + url
    except urllib3.exceptions.HTTPError as e:
        return None, e.message

    obj = json.loads(res.data.decode('utf8'))
    if res.status != 200:
        return None, 'error: ' + obj.get('message', '')

    return obj, ''
