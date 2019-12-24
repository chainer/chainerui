import contextlib
import json
import os
import platform
import shutil

from chainerui import app
from chainerui.database import db
from chainerui.models import Project
from chainerui.utils import tempdir
import chromedriver_binary as cb
from PIL import Image
from selenium import webdriver
from selenium.webdriver.chrome.options import Options


def main():
    """make animation GIF for README top

    Required:
      * chainerui==lateset
      * selenium==3.14.1
      * chromedriver-binary==2.42.0
      * Pillow==5.3.0

    Preparation:
      * set original database
      * run server on default, port number '5000' is fixed

    Usage:
      $ mkdir -p $HOME/.chainerui/db/
      $ export CHAINERUI_DB_URL=sqlite:///$HOME/.chainerui/db/gif_ani.db
      $ chainerui db upgrade
      $ chainerui server
      $ # other terminal
      $ python cap_training.py
    """

    base_logs = os.path.join('..', '..', 'examples', 'log-file', 'results')
    log_dirs = ['18003', '18948', '19204', '19205']
    chainerui_url = 'http://localhost:5000/projects/1'
    out = os.path.dirname(os.path.abspath(__file__))

    db_url = os.getenv('CHAINERUI_DB_URL', None)
    if db_url is None:
        raise ValueError('set \'CHAINERUI_DB_URL\', see comment')
    if not db.setup(url=db_url):
        raise ValueError('database initialize error')
    if not app._check_db_revision():
        raise ValueError('unsupported database schema error')

    def load_log(path):
        with open(path, 'rb') as f:
            log_json = json.load(f)
        return log_json
    logs = [load_log(os.path.join(base_logs, d, 'log')) for d in log_dirs]
    snapshots = []

    with tempdir(prefix='chainer_task_') as tempd:
        with chrome_driver() as driver:
            prj_path = os.path.join(tempd, 'result')

            for i in range(11):
                # reset result directory
                if os.path.exists(prj_path):
                    shutil.rmtree(prj_path, ignore_errors=False)
                    os.makedirs(prj_path)

                snap_logs = yield_logs(logs, i)
                prj = create_prj(prj_path, log_dirs, snap_logs)

                driver.get(chainerui_url)
                if i == 0:
                    # checkbox status is memorized, should use 'is_selected'
                    driver.find_element_by_xpath(
                        '/html/body/div/div/div/div/div[1]/div/div/div[1]/ul[1]/li/div[4]/input').click()  # NOQA
                shot_path = os.path.join(tempd, '{:d}.png'.format(i))
                driver.save_screenshot(shot_path)
                snapshots.append(shot_path)

                db.session.delete(prj)
                db.session.commit()

        draw_gif(snapshots, out)


def yield_logs(logs, i):
    assert i >= 0
    assert i <= 10
    assert len(logs) == 4

    log1 = logs[0][:4 + i*2]
    log2 = logs[1][:4 + i*2]
    log3 = logs[2][:i*2]
    log4 = logs[3][:i*2]

    return [log1, log2, log3, log4]


def create_prj(prj_path, dir_names, snap_logs):
    assert len(dir_names) == len(snap_logs)

    for i, name in enumerate(dir_names):
        result_path = os.path.join(prj_path, name)
        os.makedirs(result_path)
        log_path = os.path.join(result_path, 'log')
        with open(log_path, 'w') as f:
            json.dump(snap_logs[i], f)

    prj_name = 'mnist'
    return Project.create(prj_path, prj_name)


@contextlib.contextmanager
def chrome_driver():
    chrome_driver_path = cb.utils.get_chromedriver_path()
    chrome_driver_exe = os.path.join(
        chrome_driver_path, cb.utils.get_chromedriver_filename())
    if os.name != 'nt' and 'microsoft' in platform.uname().version.lower():
        chrome_driver_exe += '.exe'
    if not os.path.exists(chrome_driver_exe):
        msg = 'invalid driver module at \'{}\' error'.format(chrome_driver_exe)
        raise ValueError(msg)

    options = Options()
    options.add_argument('--headless')
    options.add_argument('--window-size=1200,1024')
    driver = webdriver.Chrome(
        chrome_options=options, executable_path=chrome_driver_exe)

    try:
        yield driver
    finally:
        driver.quit()


def draw_gif(snapshot_paths, out):
    snapshots = [Image.open(p).resize((1200, 1024)) for p in snapshot_paths]
    # add last snap on purpose
    snapshots.append(snapshots[-1])

    out_path = os.path.join(out, 'project_training_animation.gif')
    snapshots[0].save(
        out_path, save_all=True, append_images=snapshots[1:], optimize=False,
        duration=500, loop=0)


if __name__ == '__main__':
    main()
