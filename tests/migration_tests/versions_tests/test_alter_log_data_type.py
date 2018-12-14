from contextlib import closing
import json
import os
import sqlite3

import alembic
import msgpack

from chainerui.database import db
from chainerui.migration.versions import e3db52a480f8_alter_log_data_type as target  # NOQA


def _upgrade_before_revision(alembic_config):
    script_dir = alembic.script.ScriptDirectory.from_config(alembic_config)
    revisions = [sc.revision for sc in
                 script_dir.walk_revisions('base', target.revision)][::-1]
    for rev in revisions[:-1]:
        alembic.command.upgrade(alembic_config, rev)


def test_upgrade_downgrade(func_dir, func_init_db):
    # NOTE: don't use alembic operation module, the module is not
    #       initialized before calling upgrade command.
    _upgrade_before_revision(db.alembic_config)
    db_file_path = os.path.join(func_dir, 'chainerui.db')

    with closing(sqlite3.connect(db_file_path)) as conn:
        c = conn.cursor()
        insert_sql = 'INSERT INTO log (id, result_id, data) VALUES (?, ?, ?)'

        data1 = {'epoch': 1, 'iterations': 1, 'elapsed_time': 10}
        log1 = (0, 0, json.dumps(data1))
        data2 = {'epoch': 1, 'iterations': 2, 'elapsed_time': 20}
        log2 = (1, 0, json.dumps(data2))
        c.executemany(insert_sql, [log1, log2])
        conn.commit()

    alembic.command.upgrade(db.alembic_config, target.revision)

    with closing(sqlite3.connect(db_file_path)) as conn:
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

    alembic.command.downgrade(db.alembic_config, target.down_revision)

    with closing(sqlite3.connect(db_file_path)) as conn:
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
