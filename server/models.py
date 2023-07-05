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

    #relationships
    mom_life = db.relationship('Category_Mom', back_populates='user')
    # messages = db.relationship('Message', back_populates='')

class Category_Mom(db.Model):
    __tablename__ = "category_moms"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='mom_life')

    def __repr__(self):
        return f'{self.type}'



class Interest(db.Model):
    __tablename__ = "interests"

    id = db.Column(db.Integer, primary_key=True)
    activity = db.Column(db.String, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def __repr__(self):
        return f'{self.activity}'