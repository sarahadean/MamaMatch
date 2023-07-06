from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    username = db.Column(db.String)
    password = db.Column(db.String)
    email = db.Column(db.String)
    phone_number = db.Column(db.String)
    dob = db.Column(db.String) #<------change data-type to date later?
    # gender = db.Column(db.String)
    profile_image = db.Column(db.String)
    location = db.Column(db.String)
    about = db.Column(db.String)
    category_mom_id = db.Column(db.Integer, db.ForeignKey('category_moms.id'))
    interest_id = db.Column(db.Integer, db.ForeignKey('interests.id'))

    #relationships
    mom_life = db.relationship('Category_Mom', backref='users')
    interests = db.relationship('Interest', backref='users')
    message_list = db.relationship('Message', back_populates='user')

    #friendship relationships:
    # friends_requested = db.relationship('Friendship', backref='receiving_user_id')
    # requests_received = db.relationship('Friendship', backref='requesting_user_id')

    # friends_requested = db.relationship('Friendship', foreign_keys='Friendship.requesting_user_id', backref='receiving_user_id')
    # requests_received = db.relationship('Friendship', foreign_keys='Friendship.receiving_user_id', backref='requesting_user_id')

    #association proxies
    # pending_friend = association_proxy('friends_requested', 'receiving_user_id')
    # aspiring_friend = association_proxy('requests_received', 'requesting_user_id')


# class Friendship(db.Model):
#     __tablename__= "friendships"

#     requesting_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
#     receiving_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
#     status = db.Column(db.String)


class Message(db.Model):
    __tablename__ = "messages"
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates="message_list")
    

class Category_Mom(db.Model):
    __tablename__ = "category_moms"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)


    def __repr__(self):
        return f'{self.type}'

class Category(db.Model):
    __tablename__ = "categories"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

class Interest(db.Model):
    __tablename__ = "interests"

    id = db.Column(db.Integer, primary_key=True)
    activity = db.Column(db.String)

    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # user = db.relationship('User', back_populates='interests')
    def __repr__(self):
        return f'{self.activity}'
    
# class Selection(db.Model):
#     __tablename__ = "selections"

#     id = db.Column(db.Integer, primary_key=True)

    

 


