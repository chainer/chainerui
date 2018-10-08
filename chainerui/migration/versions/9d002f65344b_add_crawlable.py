"""empty message

Revision ID: 9d002f65344b
Revises: c29d1b4b67fe
Create Date: 2018-10-08 18:26:28.588362

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9d002f65344b'
down_revision = 'c29d1b4b67fe'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('project') as batch_op:
        batch_op.add_column(
            sa.Column('crawlable', sa.Boolean(), default=True))

    with op.batch_alter_table('result') as batch_op:
        batch_op.add_column(
            sa.Column('crawlable', sa.Boolean(), default=True))


def downgrade():
    with op.batch_alter_table('project') as batch_op:
        batch_op.drop_column('crawlable')

    with op.batch_alter_table('result') as batch_op:
        batch_op.drop_column('crawlable')
