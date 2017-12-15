"""empty message.

Revision ID: 1104edb51c0d
Revises: 4e779a5fc57e
Create Date: 2017-09-19 17:49:16.820202

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1104edb51c0d'
down_revision = '4e779a5fc57e'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('project',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('path_name',
                              sa.String(length=512), nullable=False),
                    sa.Column('name', sa.String(length=512), nullable=True),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('path_name')
                    )


def downgrade():
    op.drop_table('project')
