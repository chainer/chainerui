"""empty message.

Revision ID: 7fcaf5b6e9e8
Revises: 213e2a3392f2
Create Date: 2017-09-13 17:58:59.577263

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7fcaf5b6e9e8'
down_revision = '213e2a3392f2'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('command') as batch_op:
        batch_op.add_column(sa.Column('request', sa.String(1024)))
        batch_op.add_column(sa.Column('response', sa.String(1024)))
        batch_op.drop_column('body')


def downgrade():
    with op.batch_alter_table('command') as batch_op:
        batch_op.drop_column('request')
        batch_op.drop_column('response')
        batch_op.add_column(sa.Column('body', sa.String(1024), nullable=True))
