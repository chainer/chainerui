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

    def __init__(self, url=None, project_name=None, crawlable=False):
        if url is None:
            url = get_default_url()
        self.url = (url[:len(url)-1] if url.endswith('/') else url) + '/api/v1'
        self.project_name = project_name
        self.crawlable = crawlable

        self.project_path = os.path.abspath(os.getcwd())
        self.project_id = None
        self.result_id = None
        self.cached_logs = []
        self.first_reset = False

    def setup_project(self):
        project_path = self.project_path

        # check the path exists or not
        check_url = '{}?path_name={}'.format(self.projects_url, project_path)
        project_res, msg = urlopen('GET', check_url)
        # if project is not found, create a project
        if project_res is None:
            if (project_path + '\' is not found') not in msg:
                print('connection error, URL: {}, Message: {}'.format(
                    check_url, msg))
                return False
            # if message includes pathname, means not found error
            # continue to process to register this project
            project_req = {
                'project': {
                    'path_name': project_path,
                    'name': self.project_name,
                    'crawlable': self.crawlable,
                },
            }
            project_res, msg = urlopen(
                'POST', self.projects_url, data=project_req)
            if project_res is None:
                print('register error, URL: {}, Message: {}'. format(
                    self.projects_url, msg))
                return False

        project_id = project_res['project']['id']
        if self.project_name is not None and\
                project_res['project']['name'] != self.project_name:
            # update project name
            project_req = {'project': {'name': self.project_name}}
            project_res, msg = urlopen(
                'PUT', self.project_url, data=project_req)
            if project_res is None:
                print('update error, URL: {}, Message: {}'.format(
                    self.project_url, msg))
                return False

        self.project_id = project_id
        return True

    def register_result(self, result_name=None, overwrite_result=False):
        now = datetime.datetime.now()

        if result_name is None:
            result_path = self.project_path
        else:
            result_path = os.path.join(self.project_path, result_name)

        if overwrite_result:
            check_url = '{}?path_name={}'.format(
                self.results_url, result_path)
            result_res, msg = urlopen('GET', check_url)
            if result_res is None:
                if (result_path + '\' is not found') not in msg:
                    print('connection error, URL: {}, Message: {}'.format(
                        self.check_url, msg))
                    return False
            else:
                # result is found, overwrite on the result record
                self.result_id = result_res['result']['id']
                self.first_reset = True
                return True
        else:
            # result path is required unique key, make dummy path but not
            # make the physical directory.
            result_path += '-' + format_datetime(now)
            if result_name is not None:
                result_name += '-' + format_datetime(now)

        result_req = {
            'result': {
                'pathName': result_path,
                'crawlable': False,
                'logModifiedAt': make_timestamp(now),
            }
        }
        result_res, msg = urlopen('POST', self.results_url, data=result_req)
        if result_res is None:
            print('register error, URL: {}, Message: {}'.format(
                self.results_url, msg))
            return False
        self.result_id = result_res['result']['id']
        return True

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
        if log_res is None:
            print('post log error, URL: {}, Message: {}'.format(
                self.logs_url, msg))
            return

        if log_res['logs']['totalLogCount'] >= 0:
            self.first_reset = False
            self.cached_logs = []

    def post_args(self, conditions):
        arg_req = {'argument': conditions}
        res, msg = urlopen('POST', self.args_url, data=arg_req)
        if res is None:
            print('post args error, URL: {}, Message: {}'.format(
                self.args_url, msg))
            return False
        return True

    @property
    def projects_url(self):
        return '{}/projects'.format(self.url)

    @property
    def project_url(self):
        return '{}/{}'.format(self.projects_url, self.project_id)

    @property
    def results_url(self):
        return '{}/results'.format(self.project_url)

    @property
    def result_url(self):
        return '{}/{}'.format(self.results_url, self.result_id)

    @property
    def logs_url(self):
        return '{}/logs'.format(self.result_url)

    @property
    def args_url(self):
        return '{}/args'.format(self.result_url)


_client = None


def init(url=None, project_name=None, result_name=None, overwrite_result=False,
         crawlable=False):
    global _client
    if _client is None:
        _client = Client(
            url=url, project_name=project_name, crawlable=crawlable)

    if not _client.setup_project():
        _client = None
        return

    if not _client.register_result(
            result_name=result_name, overwrite_result=overwrite_result):
        _client = None


def log_reporter():
    class PostProcess(object):

        def __call__(self, stats_cpu):
            if _client is None:
                return

            _client.post_log([stats_cpu])

    return PostProcess()
