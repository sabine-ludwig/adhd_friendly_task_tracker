"""

Revision ID: 19a0487aac09
Revises: c4d7f9729c0f
Create Date: 2023-04-26 13:47:25.559489

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '19a0487aac09'
down_revision = 'c4d7f9729c0f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('category',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reward',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('task',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.Column('entry_time', sa.DateTime(), nullable=True),
    sa.Column('start_time', sa.DateTime(), nullable=True),
    sa.Column('completion_time', sa.DateTime(), nullable=True),
    sa.Column('deadline', sa.Date(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.create_unique_constraint(None, ['username'])
        batch_op.create_unique_constraint(None, ['email'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_constraint(None, type_='unique')

    op.drop_table('task')
    op.drop_table('reward')
    op.drop_table('category')
    # ### end Alembic commands ###