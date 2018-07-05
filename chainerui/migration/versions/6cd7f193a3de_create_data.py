"""empty message

Revision ID: 6cd7f193a3de
Revises: e3db52a480f8
Create Date: 2018-06-15 17:22:02.936060

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6cd7f193a3de'
down_revision = 'e3db52a480f8'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'asset',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('result_id', sa.Integer(), nullable=False),
        sa.Column('summary', sa.String(length=1024), nullable=True),
        sa.Column('file_modified_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['result_id'], ['result.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'bindata',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('asset_id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=1024), nullable=False),
        sa.Column('tag', sa.String(length=1024), nullable=True),
        sa.Column('note', sa.String(length=1024), nullable=True),
        # < 10MB
        sa.Column('content', sa.LargeBinary(length=1e7), nullable=False),
        sa.ForeignKeyConstraint(['asset_id'], ['asset.id'], ),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade():
    op.drop_table('bindata')
    op.drop_table('asset')
