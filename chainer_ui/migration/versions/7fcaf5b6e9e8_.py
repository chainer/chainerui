"""empty message

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
    op.add_column(
        'command',
        sa.Column('request', sa.String(1024))
    )

    op.add_column(
        'command',
        sa.Column('response', sa.String(1024))
    )

    op.drop_column(
        'command', 'body'
    )


def downgrade():
    op.drop_column(
        'command', 'request'
    )

    op.drop_column(
        'command', 'response'
    )

    op.add_column(
        'command',
        sa.Column('body', sa.String(1024))
    )
