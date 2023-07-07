from flask import Flask, request, jsonify, make_response, abort, session
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
from models import db, User, Category_Mom, Interest
from config import db, app, api
import traceback

migrate = Migrate(app, db)
api = Api(app)

# class Category_Moms(Resource):
#     def get(self):
#         moms = [mom.serialize for mom in Category_Mom.query.all()]
#         return make_response(moms, 200)
# api.add_resource(Category_Moms, '/category_moms') 


###------------User and User ID Routes ------------### 
class Users(Resource):
    def get(self):
        try:
            all_users = User.query.all()
            user_list = []
            for user in all_users:
                user_info = {
                    'id': user.id,
                    'name': user.name,
                    'username' : user.username,
                    # 'password' : user.password,
                    'email' : user.email,
                    'phone_number': user.phone_number,
                    'dob': user.dob,
                    'profile_image': user.profile_image, 
                    'location': user.location,
                    'about' : user.about,
                    'mom_life':user.mom_life.type,
                    'interests':user.interests.activity
                }
                user_list.append(user_info)
            return make_response(user_list, 200)
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
    

class UsersId(Resource):
    def get(self, id):
        try: 
            user = User.query.filter_by(id=id).first()
            if user:
                user_info = {
                    'id': user.id,
                    'name': user.name,
                    'username' : user.username,
                    'password' : user.password,
                    'email' : user.email,
                    'phone_number': user.phone_number,
                    'dob': user.dob,
                    'profile_image': user.profile_image, 
                    'location': user.location,
                    'about' : user.about,
                    'mom_life':user.mom_life.type,
                    'interests':user.interests.activity,
                    # 'friends_requested':user.friends_requested.receiving_user,
                    # 'requests_received':user.requests_received.requesting_user
                }
            return make_response(user_info, 200)
        except:
            return {"User not found"}, 404
    
    def patch(self, id):
        data = request.get_json()
        user = User.query.filter_by(id=id)
        if user:
            try:
                for attr in user:
                    setattr(user, attr, data.get(attr))
                
                db.session.add(user)
                db.session.commit()
                return make_response(user.to_dict(), 200)
            except:
                return {"Validation error"}, 400
        return {"User not found"}, 404
    
    def delete(self, id):
        user = User.query.filter_by(id=id)
        if user:
            user.session.delete()
            user.session.commit()
            return make_response(user, 204)
        return {"User not found"}, 404
    
api.add_resource(UsersId, '/users/<int:id>')
api.add_resource(Users, '/users')


#####-------FRIENDSHIPS----------####
class Friendships(Resource):
    def get(self):
        try:
            all_friendships = [friends.to_dict() for friends in Friendships.query.all()]
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