import os
import shutil
import tempfile

import pytest


@pytest.fixture(scope='session')
def base_dir():
    base = tempfile.mkdtemp(prefix='chainerui_test_')
    yield(base)
    shutil.rmtree(base)


def _make_new_directory(base):
    # when the function is run with parameterized test, the 'test_dir' has
    # already created, so create another directory with sequential ID
    seq_id = -1
    new_dir = base
    while True:
        if not os.path.exists(new_dir):
            break
        seq_id += 1
        new_dir = '{}_{:d}'.format(base, seq_id)
    os.makedirs(new_dir)
    return new_dir


@pytest.fixture(autouse=True, scope='function')
def func_dir(request, base_dir):
    func_name = request.function.__name__
    func_base = os.path.join(base_dir, func_name)
    return _make_new_directory(func_base)


class TempDirTestCase(object):

    @pytest.fixture(autouse=True, scope='function')
    def make_method_dir(self, request, base_dir):
        cls_name = request.cls.__name__
        func_name = request.function.__name__
        func_base = os.path.join(base_dir, cls_name, func_name)
        test_dir = _make_new_directory(func_base)

        self.dir = test_dir
