from flask import Flask, request, jsonify, make_response, abort, session
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
from models import db, User, Category_Mom, Interest, Friendship
from config import db, app, api
import traceback

migrate = Migrate(app, db)
api = Api(app)




###------------User and User ID Routes ------------### 

class Users(Resource):
    def get(self):
        try: 
            all_users = [user.serialize for user in User.query.all()]
            return make_response(all_users, 200)
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
        

# class Users(Resource):
#     def get(self):
#         try:
#             all_users = User.query.all()
#             user_list = []
#             for user in all_users:
#                 user_info = {
#                     'id': user.id,
#                     'name': user.name,
#                     'username' : user.username,
#                     # 'password' : user.password,
#                     'email' : user.email,
#                     'phone_number': user.phone_number,
#                     'dob': user.dob,
#                     'profile_image': user.profile_image, 
#                     'location': user.location,
#                     'about' : user.about,
#                     'mom_life':user.mom_life.type,
#                     'interests':user.interests.activity
#                 }
#                 user_list.append(user_info)
#             return make_response(user_list, 200)
#         except Exception as e:
#             traceback.print_exc()
#             return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
    
class UsersId(Resource):
    def get(self, username):
        try: 
            user_info = User.query.filter_by(username=username).first().serialize
            if user_info:
                return make_response(user_info, 200)
            return {"User not found"}, 404
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
    
    def patch(self, username):
        data = request.get_json()
        try: 
            user_info = User.query.filter_by(username=username).first()
            if user_info:
                #if attr is mom_life or interested - 
                for attr in data:
                    setattr(user_info, attr, data.get(attr))
                    
                    db.session.add(user_info)
                    db.session.commit()
                    return make_response(user_info.serialize, 200)
                else:
                    return {"Validation error"}, 400
            return {"User not found"}, 404
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
    
    def delete(self, username):
        try: 
            user = User.query.filter_by(username=username).first()
            if user:
                db.session.delete(user)
                db.session.commit()
                return make_response({}, 204)
            return {"User not found"}, 404
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
        

#####-------FRIENDSHIPS----------####
# query_user_role = User.query.join(roles_users).join(Role).
# filter((roles_users.c.user_id == User.id) & (roles_users.c.role_id == Role.id)).all()
class UserFriendships(Resource):
    def get(self, username):
        user = User.query.filter_by(username=username).first()
        if not user:
            return {"User not found"}, 404
        try:
            all_friendships = Friendship.query.filter(
                (Friendship.receiving_user_id == user.id) |
                (Friendship.requesting_user_id == user.id)
            ).all()
            serialized_friends = [friend.serialize for friend in all_friendships]
            return make_response(serialized_friends, 200)
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
        


api.add_resource(UserFriendships, '/users/<string:username>/friendships')
api.add_resource(UsersId, '/users/<string:username>')
api.add_resource(Users, '/users')

if __name__ == '__main__':
    app.run(port=5555)