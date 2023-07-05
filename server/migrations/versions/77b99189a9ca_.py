"""empty message

Revision ID: 77b99189a9ca
Revises: 
Create Date: 2023-07-05 13:36:35.232018

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '77b99189a9ca'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('username', sa.String(), nullable=True),
    sa.Column('password', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('phone_number', sa.String(), nullable=True),
    sa.Column('dob', sa.String(), nullable=True),
    sa.Column('profile_image', sa.String(), nullable=True),
    sa.Column('location', sa.String(), nullable=True),
    sa.Column('about', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('category_moms',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_category_moms_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('interests',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('activity', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_interests_user_id_users')),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('activity')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('interests')
    op.drop_table('category_moms')
    op.drop_table('users')
    # ### end Alembic commands ###
