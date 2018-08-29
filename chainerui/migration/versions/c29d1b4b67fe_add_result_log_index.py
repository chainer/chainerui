"""empty message

Revision ID: c29d1b4b67fe
Revises: 6cd7f193a3de
Create Date: 2018-08-28 09:54:01.296143

"""
from alembic import op


# revision identifiers, used by Alembic.
revision = 'c29d1b4b67fe'
down_revision = '6cd7f193a3de'
branch_labels = None
depends_on = None


def upgrade():
    op.create_index('idx_result_project_id', 'result', ['project_id'])
    op.create_index('idx_log_result_id', 'log', ['result_id'])


def downgrade():
    op.drop_index('idx_log_result_id')
    op.drop_index('idx_result_project_id')
