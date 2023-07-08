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

######## TEST SUCCESSFUL ########
class Users(Resource):
    def get(self):
        try: 
            all_users = [user.serialize for user in User.query.all()]
            return make_response(all_users, 200)
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
        
####### GET, PATCH AND DELETE TEST SUCCESSFUL #######
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
        

#####-------FRIENDSHIP ROUTES----------####
#Routes to retrieve all friendships and create a friendship

######## GET TEST SUCCESSFUL ---- POST TEST NEEDED ########
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
        
    #creating friendship - receiving_user_id or requesting_user_id belongs to user
    def post(self, username):
        user = User.query.filter_by(username=username).first()

api.add_resource(UserFriendships, '/<string:username>/friendships')
api.add_resource(UsersId, '/users/<string:username>')
api.add_resource(Users, '/users')       


#Needed Routes:
#PATCH PENDING friends to CONFIRMED or DELETED
#PATCH CONFIRMED friends to


# Route to GET list of friends by status (CONFIRMED and PENDING friends) 
# PENDING status currently includes BOTH requests received AND requests sent
# ######### RETRIEVE LIST OF FRIENDSHIPS BY STATUS TEST SUCCESSFUL ###########   
@app.route('/<string:username>/<string:status>')
def get_confirmed_friends(username, status):
        user = User.query.filter_by(username=username).first()
        if not user:
            return {"User not found"}, 404
        try:
            all_friendships = Friendship.query.filter(
                    ((Friendship.receiving_user_id == user.id) |
                    (Friendship.requesting_user_id == user.id)) & (Friendship.status == f'{status}')
                ).all()
            serialized_friends = [friend.serialize for friend in all_friendships]
            #GET CONFIRMED or PENDING friends
            return make_response(serialized_friends, 200)
        except:
            return {"Validation error"}, 400


###### RETRIEVE ONE FRIENDSHIP - TEST pending ########
#change status of single friendship = PATCH or DELETE
class FriendshipById(Resource):
    selected_friendship = Friendship.query.filter_by(id=id).first().serialize
    def get(self, id):
        #filters by id of friendship
        try:
            selected_friendship = Friendship.query.filter_by(id=id).first().serialize
            if selected_friendship:
                return make_response(selected_friendship, 200)
            return {"Not found"}, 404
        except:
            return {"Validation error"}, 400
    
    def patch(self, friendship_id):
        data = request.get_json()
        try:
            receiving_user = self.id
            selected_friendship = Friendship.query.filter_by(id=friendship_id, receiving_user_id=receiving_user).first().serialize
            if selected_friendship:
                status = data.get("status")
                selected_friendship.status = status
                db.session.commit()
                return make_response(selected_friendship, 200)
            return{"Friendship not found"}, 404
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
    
    def delete(self, id):
        try:
            selected_friendship = Friendship.query.filter_by(id=id).first().serialize
            if selected_friendship:
                db.session.delete(selected_friendship)
                db.session.commit()
                return {"Deletion successful"}, 204
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500   
api.add_resource(FriendshipById, '/friendship/<int:id>')
if __name__ == '__main__':
    app.run(port=5555)