"""empty message

Revision ID: f521758d1a54
Revises: c5af005bcba0
Create Date: 2023-06-18 17:00:10.980876

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'f521758d1a54'
down_revision = 'c5af005bcba0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_activity',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('activity_type', sa.String(length=255), nullable=False),
    sa.Column('task_type', sa.String(length=255), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('category')
    with op.batch_alter_table('task', schema=None) as batch_op:
        batch_op.add_column(sa.Column('task_type', sa.String(length=255), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('task', schema=None) as batch_op:
        batch_op.drop_column('task_type')

    op.create_table('category',
    sa.Column('id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', mysql.VARCHAR(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.drop_table('user_activity')
    # ### end Alembic commands ###
