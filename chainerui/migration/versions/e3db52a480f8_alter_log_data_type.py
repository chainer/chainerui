"""empty message

Revision ID: e3db52a480f8
Revises: 00a907e5780f
Create Date: 2018-02-08 17:54:46.051323

"""
from alembic import op
import sqlalchemy as sa

import json

import msgpack


# revision identifiers, used by Alembic.
revision = 'e3db52a480f8'
down_revision = '00a907e5780f'
branch_labels = None
depends_on = None


def upgrade():
    conn = op.get_bind()

    temp_log_table = op.create_table(
        'temp_log',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('result_id', sa.Integer(), nullable=True),
        sa.Column('data', sa.LargeBinary(length=2048), nullable=True),
        sa.ForeignKeyConstraint(['result_id'], ['result.id'], ),
        sa.PrimaryKeyConstraint('id'))
    res = conn.execute('SELECT id, result_id, data FROM log')
    results = res.fetchall()
    if len(results) > 0:
        modified_logs = [{
            'id': r[0],
            'result_id': r[1],
            'data': msgpack.packb(json.loads(r[2]), use_bin_type=True)}
            for r in results]
        op.bulk_insert(temp_log_table, modified_logs)
    op.drop_table('log')
    op.rename_table('temp_log', 'log')


def downgrade():
    conn = op.get_bind()

    temp_log_table = op.create_table(
        'temp_log',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('result_id', sa.Integer(), nullable=True),
        sa.Column('data', sa.String(length=1024), nullable=True),
        sa.ForeignKeyConstraint(['result_id'], ['result.id'], ),
        sa.PrimaryKeyConstraint('id'))
    res = conn.execute('SELECT id, result_id, data FROM log')
    results = res.fetchall()
    if len(results) > 0:
        modified_logs = [{
            'id': r[0],
            'result_id': r[1],
            'data': json.dumps(msgpack.unpackb(r[2], encoding='utf-8'))}
            for r in results]
        op.bulk_insert(temp_log_table, modified_logs)
    op.drop_table('log')
    op.rename_table('temp_log', 'log')
