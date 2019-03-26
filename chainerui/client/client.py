import datetime
import os
import time

from chainerui.client.helper import urlopen


def get_default_url():
    return os.getenv('CHAINERUI_URL', 'http://localhost:5000')


def make_timestamp(dt=None):
    if dt is None:
        dt = datetime.datetime.now()
    return time.mktime(dt.timetuple()) + dt.microsecond / 1e6


def format_datetime(dt=None):
    if dt is None:
        dt = datetime.datetime.now()
    return dt.strftime('%Y%m%d-%H%M%S.%f')


class Client(object):

    def __init__(self, url=None, project_name=None, crawlable=False,
                 result_dir='results'):
        if url is None:
            url = get_default_url()
        self.url = (url[:len(url)-1] if url.endswith('/') else url) + '/api/v1'
        self.project_name = project_name
        self.crawlable = crawlable
        self.result_dir = result_dir

        self.project_path = os.path.abspath(os.getcwd())
        self.project_id = None
        self.result_id = None
        self.log_path = None
        self.cached_logs = []
        self.first_reset = False

    def setup_project(self):
        project_path = self.project_path

        # check the path exists or not
        check_url = '{}?path_name={}'.format(self.projects_url, project_path)
        project_res, msg = urlopen('GET', check_url)
        # if project is not found, create a project
        if project_res is None:
            if project_path not in msg:
                print(msg)
                return False
            # if message includes pathname, means not found error
            # and continue to process
            project_req = {
                'project': {
                    'path_name': project_path,
                    'name': self.project_name,
                    'crawlable': self.crawlable,
                },
            }
            project_res, msg = urlopen(
                'POST', self.projects_url, data=project_req)
            if msg != '':
                print(msg)
                return False

        project_id = project_res['project']['id']
        if self.project_name is not None and\
                project_res['project']['name'] != self.project_name:
            # update project name
            project_req = {'project': {'name': self.project_name}}
            project_res, msg = urlopen(
                'PUT', self.project_url, data=project_req)
            if msg != '':
                print(msg)
                return False

        self.project_id = project_id
        return True

    def register_result(self, result_name=None):
        if result_name is not None:
            self.log_path = os.path.join(
                self.project_path, self.result_dir, result_name)
            # check the result path exists or not
            check_url = '{}?path_name={}'.format(
                self.results_url, self.log_path)
            result_res, _ = urlopen('GET', check_url)  # ignore error
            if result_res is not None:
                self.result_id = result_res['result']['id']
                self.first_reset = True

        now = datetime.datetime.now()
        if self.result_id is None:
            if self.log_path is None:
                self.log_path = os.path.join(
                    self.project_path, self.result_dir, format_datetime(now))
                os.makedirs(self.log_path)
            result_req = {
                'result': {
                    'pathName': self.log_path,
                    'crawlable': False,
                    'logModifiedAt': make_timestamp(now),
                }
            }
            result_res, msg = urlopen(
                'POST', self.results_url, data=result_req)
            if msg != '':
                print(msg)
                return None  # ignore error
            self.result_id = result_res['result']['id']
        return result_res

    def post_log(self, logs, modified_at=None):
        if modified_at is None:
            modified_at = make_timestamp()
        self.cached_logs.extend(logs)
        log_req = {
            'log': {
                'values': self.cached_logs,
                'modifiedAt': modified_at,
                'reset': self.first_reset,
            }
        }
        log_res, msg = urlopen('POST', self.logs_url, data=log_req)
        if msg != '' or log_req is None:
            return -1  # ignore error
        self.first_reset = False
        self.cached_logs = []
        return log_res['logs']['totalLogCount']

    def post_args(self, conditions):
        arg_req = {'argument': conditions}
        urlopen('POST', self.args_url, data=arg_req)

    @property
    def projects_url(self):
        return '{}/projects'.format(self.url)

    @property
    def project_url(self):
        assert self.project_id is not None
        return '{}/{}'.format(self.projects_url, self.project_id)

    @property
    def results_url(self):
        return '{}/results'.format(self.project_url)

    @property
    def result_url(self):
        assert self.result_id is not None
        return '{}/{}'.format(self.results_url, self.result_id)

    @property
    def logs_url(self):
        return '{}/logs'.format(self.result_url)

    @property
    def args_url(self):
        return '{}/args'.format(self.result_url)


_client = None


def init(url=None, project_name=None, result_dir='results', result_name=None,
         crawlable=False):
    global _client
    if _client is None:
        _client = Client(
            url=url, project_name=project_name, crawlable=crawlable,
            result_dir=result_dir)

    _client.setup_project()
    _client.register_result(result_name=result_name)


def get_log_path():
    if _client is None:
        raise ValueError('TODO')
    return _client.log_path


def get_log_report_post_process():
    if _client is None:
        raise ValueError('TODO')

    class PostProcess(object):
        def __init__(self):
            self.cached_logs = []

        def __call__(self, stats_cpu):
            self.cached_logs.append(stats_cpu)
            updated_idx = _client.post_log(self.cached_logs)
            if updated_idx >= 0:
                self.cached_logs = []

    return PostProcess()