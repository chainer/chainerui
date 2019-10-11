import datetime
import os
import time

from chainerui.client.helper import urlopen
from chainerui.utils.save_args import convert_dict


def get_default_url():
    return os.getenv('CHAINERUI_URL', 'http://localhost:5000')


def get_default_project_path():
    return os.getenv('CHAINERUI_PROJECT_PATH', os.path.abspath(os.getcwd()))


def make_timestamp(dt=None):
    if dt is None:
        dt = datetime.datetime.now()
    return time.mktime(dt.timetuple()) + dt.microsecond / 1e6


def format_datetime(dt=None):
    if dt is None:
        dt = datetime.datetime.now()
    return dt.strftime('%Y%m%d-%H%M%S.%f')


class Client(object):

    def __init__(self, url=None, crawlable=False):
        if url is None:
            url = get_default_url()
        self.url = (url[:len(url)-1] if url.endswith('/') else url) + '/api/v1'
        self.crawlable = crawlable

        # Basically, the project path should be set current working directory
        # to menage experiments easier, but on some environment, working
        # directories are same at all times. To handle this, use environment
        # variable.
        self.project_path = get_default_project_path()
        self.project_id = None
        self.result_id = None
        self.cached_logs = []
        self.first_reset = False

    def setup_project(self, project_name=None):
        """Setup project on ChainerUI server

        Project path on default is working directory. First, check the project
        path is registered or not, and if not found, register the project path.
        Second, if ``project_name`` is set and changed, update the project
        name.

        Args:
            project_name (str): If set, update the project name. If set
                ``None`` (on default), try to get environment variable,
                ``'CHAINERUI_PROJECT_NAME'`` if set.

        Returns:
            bool: When succeed to setup, return ``True``
        """

        project_path = self.project_path
        if project_name is None:
            project_name = os.getenv('CHAINERUI_PROJECT_NAME', None)

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
                    'name': project_name,
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
        if project_name is not None and\
                project_res['project']['name'] != project_name:
            # update project name
            project_req = {'project': {'name': project_name}}
            project_res, msg = urlopen(
                'PUT', self.project_url, data=project_req)
            if project_res is None:
                print('update error, URL: {}, Message: {}'.format(
                    self.project_url, msg))
                # fail to update project name, but the target project has been
                # registered, so not return False

        self.project_id = project_id
        return True

    def register_result(self, result_name=None, overwrite_result=False):
        """Register result on ChaienrUI server

        Basically result path is same as project path, but to be unique key,
        add start time on the result path. The result path is virtual one,
        not make physical directory. If ``overwrite_result`` set ``True``,
        the client tool not add start time and continue to use same result
        record.

        Args:
            result_name (str): If set, update the result name. If set
                ``None`` (on default), try to get environment variable,
                ``'CHAINERUI_RESULT_NAME'`` if set.
            overwrite_result (bool): If set ``True``, not set start time on
                the result path and overwrite data on the result.

        Returns:
            bool:  When succeed to setup, return ``True``
        """

        now = datetime.datetime.now()
        result_path = self.project_path
        if result_name is None:
            result_name = os.getenv('CHAINERUI_RESULT_NAME', None)

        if overwrite_result:
            check_url = '{}?path_name={}'.format(
                self.results_url, result_path)
            result_res, msg = urlopen('GET', check_url)
            if result_res is None:
                if (result_path + '\' is not found') not in msg:
                    print('connection error, URL: {}, Message: {}'.format(
                        check_url, msg))
                    return False
            else:
                # result is found, overwrite on the result record
                self.result_id = result_res['result']['id']
                self.first_reset = True
                if result_name is not None and\
                        result_res['result']['name'] != result_name:
                    # update result name
                    result_req = {'result': {'name': result_name}}
                    result_res, msg = urlopen(
                        'PUT', self.result_url, data=result_req)
                    if result_res is None:
                        print('update error, URL: {}, Message: {}'.format(
                            self.result_url, msg))
                        # fail to update result name, but the target result
                        # has been found, so not return False
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
                'name': result_name,
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
        """Post logs

        If fail to post the ``logs``, the data is cached and try to post them
        next time with new one.

        Args:
            logs (list): stats data to post.
            modified_at (datetime): last modified time.
        """

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
         crawlable=False, conditions=None):
    """Initialize client tools

    Initialize client object, then setup project and result. Even if some
    errors are occurred, client object is set ``None`` and without exception.

    Args:
        url (str): ChainerUI server URL. set ``'localhost:5000'`` on default.
        project_name (str): project name is set from project path, working
            directory on default. If set, ChainerUI shows the name instead
            the project path.
        result_name (str): result name is set project path + start time
            on default. If set, ChainerUI shows the name + start time instead
            the path.
        overwrite_result (bool): the client tool make different job results
            every time on default. If set ``True``, the client tool posts
            logs on the same result.
        crawlable (bool): to inform server not to crawl physical logs.
        conditions (:class:`argparse.Namespace` or dict): Experiment conditions
            to show on a job table. Keys are show as table header and values
            are show at a job row.
    """

    global _client
    if _client is None:
        _client = Client(url=url, crawlable=crawlable)

    if not _client.setup_project(project_name=project_name):
        _client = None
        return

    if not _client.register_result(
            result_name=result_name, overwrite_result=overwrite_result):
        _client = None
        return

    if conditions is not None:
        args = convert_dict(conditions)
        _client.post_args(args)


def log_reporter():
    """Log reporter via POST API

    Return a callback function to post a log to a ChainerUI server. If the
    initialization (see ``chainerui.init()``) is failed, the callback function
    do nothing when called. If the initialization is done but fail to send the
    log by some kind of error, the log is cached and try to post it next time
    with new one.

    The callback function is expected to use with ``postprocess``
    option of Chainer ``LogReport`` extension:

    .. code-block:: python

       >>> chainerui.init()
       >>>
       >>> trainer = chainer.training.Trainer(...)
       >>> trainer.extend(
       >>>     extensions.LogReport(postprocess=chainerui.log_reporter()))

    Returns:
        func: function.
    """
    class PostProcess(object):

        def __call__(self, stats_cpu):
            if _client is None:
                return

            _client.post_log([stats_cpu])

    return PostProcess()


def log(value):
    """Send log

    Send log data and will be shown ad training log on web browser.

    Example:

    .. code-block:: python

       >>> chainerui.init()
       >>> # ...
       >>> stats = {
       >>>     'epoch': epoch,
       >>>     'train/loss': loss,
       >>>     }
       >>> chainerui.log(stats)

    Args:
        value (dict): target log.
    """
    if _client is None:
        return
    _client.post_log([value])
