"""empty message.

Revision ID: c78d4004717f
Revises: 6cc68bf684ac
Create Date: 2017-09-22 15:14:36.947242

"""


import datetime

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c78d4004717f'
down_revision = '6cc68bf684ac'
branch_labels = None
depends_on = None

now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")


def upgrade():
    with op.batch_alter_table('result') as batch_op:
        batch_op.add_column(
            sa.Column(
                'created_at',
                sa.DateTime(),
                nullable=False, server_default=now
            )
        )
        batch_op.add_column(
            sa.Column(
                'updated_at',
                sa.DateTime(),
                nullable=False, server_default=now
            )
        )

    with op.batch_alter_table('project') as batch_op:
        batch_op.add_column(
            sa.Column(
                'created_at',
                sa.DateTime(),
                nullable=False, server_default=now
            )
        )
        batch_op.add_column(
            sa.Column(
                'updated_at',
                sa.DateTime(),
                nullable=False, server_default=now
            )
        )


def downgrade():
    with op.batch_alter_table('result') as batch_op:
        batch_op.drop_column('created_at')
        batch_op.drop_column('updated_at')

    with op.batch_alter_table('project') as batch_op:
        batch_op.drop_column('created_at')
        batch_op.drop_column('updated_at')
