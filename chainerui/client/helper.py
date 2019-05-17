import json
import urllib3


def urlopen(method, url, content_type='json', data=None, return_type='json'):
    """connect and get information via HTTP request

    A simplified wrapper for HTTP request, favor for JSON data format.
    When an error is occurred, error message is converted to text and return
    ``(None, text)`` tuple. This simplification is prefer especially to during
    training phase not to stop processes.

    Arguments:
        method (str): method type, GET/POST/PUT/DELETE
        url (str): target URL
        content_type (str): content type set on HTTP request header,
            ``'application/json'`` is set on default.
        data (obj): when ``content_type`` is ``'json'``, request data is dumped
            as JSON automatically.
        return_type (str): type name. returned value is converted JSON on
            default.

    Returns:
        tuple: ``(Response, '')`` when not error, ``(None, str)`` when error
            has occurred.
    """

    headers = {}
    body = data
    if content_type == 'json':
        headers['Content-Type'] = 'application/json'
        if data is not None:
            body = json.dumps(data)
    else:
        headers['Content-Type'] = content_type
    http = urllib3.PoolManager()
    try:
        res = http.request(method, url, body=body, headers=headers)
    except (urllib3.exceptions.NewConnectionError,
            urllib3.exceptions.MaxRetryError) as e:
        return None, 'cannot connect to the URL: {}, {}'.format(url, e)
    except urllib3.exceptions.HTTPError as e:
        return None, e.message

    str_data = res.data.decode('utf8')
    if return_type == 'json':
        try:
            obj = json.loads(str_data)
            if res.status != 200:
                return None, 'error: ' + obj.get('message', '')
        except ValueError:
            return None, 'error: ' + str_data
    else:
        obj = str_data

    return obj, ''
