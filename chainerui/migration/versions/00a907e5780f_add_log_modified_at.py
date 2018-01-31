"""empty message

Revision ID: 00a907e5780f
Revises: c78d4004717f
Create Date: 2018-01-31 12:19:39.490933

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '00a907e5780f'
down_revision = 'c78d4004717f'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('result') as batch_op:
        batch_op.add_column(
            sa.Column(
                'log_modified_at',
                sa.DateTime(),
                nullable=True
            )
        )


def downgrade():
    with op.batch_alter_table('result') as batch_op:
        batch_op.drop_column('log_modified_at')
