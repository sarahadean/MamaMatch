from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt
from flask_login import UserMixin

class Friendship(db.Model, SerializerMixin, UserMixin):
    __tablename__= "friendships"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    requesting_user_id = db.Column(db.Integer, db.ForeignKey('users.id') )
    receiving_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    status = db.Column(db.String)
    
    #Relationship - Friendship has many messages. Messages has ONE friendship
    message = db.relationship('Message', backref='friendships')
    # friendship_status = db.relationship('FriendshipStatus', back_populates='friendship', cascade="all, delete-orphan"  )

    @property
    def serialize(self):
        return {
            "id":self.id,
            "requesting_user":self.requesting_user_id,
            "receiving_user":self.receiving_user_id,
            "status":self.status,
            # "message":self.message.content
        }


class User(db.Model, SerializerMixin, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String)
    phone_number = db.Column(db.String)
    dob = db.Column(db.String) #<------change data-type to date later?
    # gender = db.Column(db.String)
    profile_image = db.Column(db.String)
    location = db.Column(db.String)
    about = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    category_mom_id = db.Column(db.Integer, db.ForeignKey('category_moms.id'))
    interest_id = db.Column(db.Integer, db.ForeignKey('interests.id'))

    #relationships
    mom_life = db.relationship('Category_Mom', backref='users')
    interests = db.relationship('Interest', backref='users')

    #friendship relationships:
    friends_requested = db.relationship('Friendship', foreign_keys=[Friendship.requesting_user_id],  backref='receiving_user')
    requests_received = db.relationship('Friendship', foreign_keys=[Friendship.receiving_user_id], backref='requesting_user')

    #association proxies
    pending_friend = association_proxy('friends_requested', 'receiving_user')
    aspiring_friend = association_proxy('requests_received', 'requesting_user')

    
    @hybrid_property
    def password_hash(self):
        self._password_hash
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')


    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'username' : self.username,
            'password' : self._password_hash,
            'email' : self.email,
            'phone_number': self.phone_number,
            'dob': self.dob,
            'profile_image': self.profile_image, 
            'location': self.location,
            'about' : self.about,
            # 'mom_life':self.mom_life.type,
            # 'interests':self.interests.activity,
            # 'friends_requested':self.friends_requested,
            # 'requests_received':self.requests_received
        }
    


class Message(db.Model, SerializerMixin):
    __tablename__ = "messages"
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    friendship_id = db.Column(db.Integer, db.ForeignKey('friendships.id'))
    content = db.Column(db.String)

    #RELATIONSHIP
    # friendship = db.relationship('Friendship', back_populates='message')
    # friendship_status = db.relationship('FriendshipStatus', back_populates='message', cascade="all, delete-orphan" )
    
    @property
    def serialize(self):
        return {
            "id": self.id,
            "friendship_id":self.friendship_id,
            "content":self.content
        }

class Category_Mom(db.Model):
    __tablename__ = "category_moms"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'type': self.type
        }

    def __repr__(self):
        return f'{self.type}'

class Interest(db.Model):
    __tablename__ = "interests"

    id = db.Column(db.Integer, primary_key=True)
    activity = db.Column(db.String)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'activity': self.activity
        }

    def __repr__(self):
        return f'{self.activity}'
    
# class Selection(db.Model):
#     __tablename__ = "selections"

#     id = db.Column(db.Integer, primary_key=True)
#     interest_id
#     activity_id

    

 


