"""empty message.

Revision ID: 6cc68bf684ac
Revises: 1104edb51c0d
Create Date: 2017-09-20 09:52:16.837947

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6cc68bf684ac'
down_revision = '1104edb51c0d'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('result') as batch_op:
        batch_op.add_column(
            sa.Column('project_id', sa.Integer(), nullable=True))
        sa.ForeignKeyConstraint(['project_id'], ['project.id'])


def downgrade():
    with op.batch_alter_table('result') as batch_op:
        batch_op.drop_column('project_id')
