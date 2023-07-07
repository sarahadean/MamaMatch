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
    def get(self, id):
        try: 
            user_info = User.query.filter_by(id=id).first().serialize
            if user_info:
                return make_response(user_info, 200)
            return {"User not found"}, 404
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
    
    def patch(self, id):
        data = request.get_json()
        try: 
            user_info = User.query.filter_by(id=id).first()
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
    
    def delete(self, id):
        try: 
            user = User.query.filter_by(id=id).first()
            if user:
                db.session.delete(user)
                db.session.commit()
                return make_response({}, 204)
            return {"User not found"}, 404
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
        
api.add_resource(UsersId, '/users/<int:id>')
api.add_resource(Users, '/users')


#####-------FRIENDSHIPS----------####
# query_user_role = User.query.join(roles_users).join(Role).
# filter((roles_users.c.user_id == User.id) & (roles_users.c.role_id == Role.id)).all()
class Friendships(Resource):
    def get(self):
        # query_friendships = User.query.join(Friendship).all()
        try:
            all_friendships = [friends.serialize for friends in Friendship.query.all()]
            return make_response(all_friendships, 200)
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500

class FriendshipStatuses(Resource):
    def get(self):
        pass

class FriendshipsById(Resource):
    def get(self, id):
        pass

api.add_resource(Friendships, '/friendships')
api.add_resource(FriendshipStatuses, '/friendshipstatuses')
api.add_resource(FriendshipsById, '/friendships/<int:id>')

if __name__ == '__main__':
    app.run(port=5555)