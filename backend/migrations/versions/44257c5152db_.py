"""

Revision ID: 44257c5152db
Revises: 19a0487aac09
Create Date: 2023-04-26 14:08:45.823258

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '44257c5152db'
down_revision = '19a0487aac09'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('task', schema=None) as batch_op:
        batch_op.add_column(sa.Column('status', sa.String(length=255), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('task', schema=None) as batch_op:
        batch_op.drop_column('status')

    # ### end Alembic commands ###
