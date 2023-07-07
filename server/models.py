from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

class Friendship(db.Model, SerializerMixin):
    __tablename__= "friendships"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    requesting_user_id = db.Column(db.Integer, db.ForeignKey('users.id') )
    receiving_user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    #Relationship - Friendship has ONE Friendship status. Thru FriendshipStatus, Friendship has many messages
    friendship_status = db.relationship('FriendshipStatus', back_populates='friendship', cascade="all, delete-orphan"  )

    #Serialize rules
    # serialize_rules = ('-friendship_status',)

    @property
    def serialize(self):
        return {
            "id":self.id,
            "requesting_user_id":self.requesting_user_id,
            "receiving_user_id":self.receiving_user_id
        }


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
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())
    category_mom_id = db.Column(db.Integer, db.ForeignKey('category_moms.id'))
    interest_id = db.Column(db.Integer, db.ForeignKey('interests.id'))

    #relationships
    mom_life = db.relationship('Category_Mom', backref='users')
    interests = db.relationship('Interest', backref='users')

    #friendship relationships:
    friends_requested = db.relationship('Friendship', foreign_keys=[Friendship.requesting_user_id], backref='receiving_user')
    requests_received = db.relationship('Friendship', foreign_keys=[Friendship.receiving_user_id], backref='requesting_user')

    #association proxies
    pending_friend = association_proxy('friends_requested', 'receiving_user')
    aspiring_friend = association_proxy('requests_received', 'requesting_user')

    #serialize rules to avoid max recursion
    # serialize_rules = (
    #     '-friends_requested.receiving_user.friends_requested',
    #     '-requests_received.requesting_user.requests_received',
    #     '-mom_life.users',
    #     '-interests.users')
    
    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'username' : self.username,
            'password' : self.password,
            'email' : self.email,
            'phone_number': self.phone_number,
            'dob': self.dob,
            'profile_image': self.profile_image, 
            'location': self.location,
            'about' : self.about,
            'mom_life':self.mom_life.type,
            'interests':self.interests.activity,
            # 'friends_requested':self.friends_requested[Friendship.receiving_user_id],
            # 'requests_received':self.requests_received[Friendship.requesting_user_id]
        }
    
    def friend(self, user):
        pass

class FriendshipStatus(db.Model, SerializerMixin):
    __tablename__ = "friendshipstatuses"
    
    id = db.Column(db.Integer, primary_key=True)
    friendship_id = db.Column(db.Integer, db.ForeignKey('friendships.id'))
    message_id = db.Column(db.Integer, db.ForeignKey('messages.id'))
    status = db.Column(db.String)

    #RELATIONSHIP - Friendship status has many friendships and many messages
    message = db.relationship('Message', back_populates='friendship_status')
    friendship = db.relationship('Friendship', back_populates='friendship_status')

    #Serializer Rules
    serialize_rule = ('-message.friendship_status', '-friendship.friendship_status')


class Message(db.Model, SerializerMixin):
    __tablename__ = "messages"
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    
    #RELATIONSHIP
    friendship_status = db.relationship('FriendshipStatus', back_populates='message', cascade="all, delete-orphan" )

    #Serialize Rules
    serialize_rules=('-friendship_status.message',)
    

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

    

 


