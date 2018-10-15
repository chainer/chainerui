import os
import shutil
import tempfile

import pytest

from chainerui import create_app
from chainerui import db


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


@pytest.fixture(scope='function')
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


@pytest.fixture(scope='function')
def app():
    app = create_app()
    app.testing = True
    return app.test_client()


@pytest.fixture(scope='function')
def func_init_db(func_dir):
    url = 'sqlite:///' + os.path.join(func_dir, 'chainerui.db')
    db.setup(url=url, echo=False)

    yield

    if db._session is not None:
        db.session.remove()
    db.remove_db()


@pytest.fixture(scope='function')
def func_db(func_init_db):
    db.upgrade()
