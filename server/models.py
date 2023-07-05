from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt



class User(db.Model):
    __table__ = "users"

    print("adding columns to users")
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True)
    phone_number = db.Column(db.String)
    dob = db.Column(db.String) #<------change data-type to date later?
    # gender = db.Column(db.String)
    profile_image = db.Column(db.String)
    location = db.Column(db.String)
    about = db.Column(db.String)
    #relationships
    # mom_life = db.relationship('MomCategory', back_populates='user')
    print("Done adding columns")
    # messages = db.relationship('Message', back_populates=')

class MomCategory(db.Model):
    __table__ = "momcategories"

    print("adding momcategories columns")
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # user = db.relationship('User', back_populates='mom_life')

class Interest(db.Model):
    __table__ = "interests"
    
    id = db.Column(db.Integer, primary_key=True)
    activity = db.Column(db.String, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

