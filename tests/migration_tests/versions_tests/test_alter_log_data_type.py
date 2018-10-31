from contextlib import closing
import json
import sqlite3
import unittest

import alembic
import msgpack

from chainerui import CHAINERUI_ENV
from chainerui import db
from chainerui.migration.versions import e3db52a480f8_alter_log_data_type as target  # NOQA
from tests.helpers import NotInTestEnvironmentException


class TestUpgrade(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        if not CHAINERUI_ENV == 'test':
            raise NotInTestEnvironmentException(
                'set environment variable CHAINERUI_ENV=test '
                'when you run this test'
            )
        db.init_db()
        db.setup(test_mode=True)
        cls.db_file_path = db._sqlite_db_file_path

        config = db.alembic_config
        cls._config = config

        script_dir = alembic.script.ScriptDirectory.from_config(config)
        revisions = [sc.revision for sc in
                     script_dir.walk_revisions('base', target.revision)][::-1]
        for rev in revisions[:-1]:
            alembic.command.upgrade(config, rev)

    @classmethod
    def tearDownClass(cls):
        db.session.remove()
        db.remove_db()

    def test_upgrade_downgrade(self):
        # NOTE: don't use alembic operation module, the module is not
        #       initialized before calling upgrade command.
        with closing(sqlite3.connect(self.db_file_path)) as conn:
            c = conn.cursor()
            insert_sql = 'INSERT INTO log (id, result_id, data) VALUES ' +\
                         '(?, ?, ?)'

            data1 = {'epoch': 1, 'iterations': 1, 'elapsed_time': 10}
            log1 = (0, 0, json.dumps(data1))
            data2 = {'epoch': 1, 'iterations': 2, 'elapsed_time': 20}
            log2 = (1, 0, json.dumps(data2))
            c.executemany(insert_sql, [log1, log2])
            conn.commit()

        alembic.command.upgrade(self._config, target.revision)

        with closing(sqlite3.connect(self.db_file_path)) as conn:
            c = conn.cursor()
            select_sql = 'SELECT id, result_id, data FROM log ORDER BY id'
            rows = c.execute(select_sql).fetchall()
            assert len(rows) == 2
            log1 = rows[0]
            assert len(log1) == 3
            data1 = msgpack.unpackb(log1[2], raw=False)
            assert len(data1) == 3
            assert data1['epoch'] == 1
            assert data1['iterations'] == 1
            assert data1['elapsed_time'] == 10

        alembic.command.downgrade(self._config, target.down_revision)

        with closing(sqlite3.connect(self.db_file_path)) as conn:
            c = conn.cursor()
            select_sql = 'SELECT id, result_id, data FROM log ORDER BY id'
            rows = c.execute(select_sql).fetchall()
            assert len(rows) == 2
            log1 = rows[0]
            assert len(log1) == 3
            data1 = json.loads(log1[2])
            assert len(data1) == 3
            assert data1['epoch'] == 1
            assert data1['iterations'] == 1
            assert data1['elapsed_time'] == 10
