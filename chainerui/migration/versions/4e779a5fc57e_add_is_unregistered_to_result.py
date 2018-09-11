"""add_is_unregistered_to_result.

Revision ID: 4e779a5fc57e
Revises: 7fcaf5b6e9e8
Create Date: 2017-09-15 17:23:45.307309

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4e779a5fc57e'
down_revision = '7fcaf5b6e9e8'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('result') as batch_op:
        batch_op.add_column(
            sa.Column('is_unregistered', sa.Boolean(), default=False))


def downgrade():
    with op.batch_alter_table('result') as batch_op:
        batch_op.drop_column('is_unregistered')
