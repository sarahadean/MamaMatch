from flask import Flask, request, jsonify, make_response, abort, session
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from models import db, User, Category_Mom, Interest, Friendship, Message
from config import db, app, api
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask_restful import Resource
import traceback


login_manager = LoginManager()
login_manager.init_app(app)


@app.route('/')
def index():
    return '<h1>Welcome to MamaMatch</h1>'

@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(id=user_id).first()

class Signup(Resource):
    def post(self):
        data = request.get_json()

        try: 
            new_user = User(
                name = data['name'],
                username = data['username'],
                email = data['email'],
                # phone_number = data['phone_number'],
                # dob = data['dob'],
                # profile_image = data['profile_image'],
                # location = data['location'],
                # about = data['about'],
                # category_mom_id = data.get('category_mom_id'),
                # interest_id = data.get('interest_id')
            )
            new_user.password_hash = data['password']
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return make_response(new_user.to_dict(), 201)
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
        
api.add_resource(Signup, '/signup')

class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username = data.get('username')).first()
        password = request.get_json()['password']

        if user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
        
        return{'Invalid Username/Password'}, 401


api.add_resource(Login, '/login')


@app.route("/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return f'Goodbye, Mama! Have a great day!'

class AuthorizedSession(Resource):
    def get(self):
        try:
            user = User.query.filter_by(
                id = session.get('user_id')).first()
            return make_response(user.to_dict(), 200)
        except:
            return make_response({'message': 'Must Log In'}, 401)

api.add_resource(AuthorizedSession, '/authorize_session')
# class AuthorizeSession(Resource):
#     def get(self):
#         try: 
#             user = User.query.filter_by(
#                 id = session.get('user_id')).first()
#             return make_response(user.to_dict(), 200)
#         except Exception as e:
#             traceback.print_exc()
#             return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
        
#         # if current_user.is_authenticated:
#         #     user = current_user
#         #     return make_response(user.serialize, 200)
#         # return {'error': "401 Unauthorized"}, 401

# api.add_resource(AuthorizeSession, '/authorize_session')

# Display users that are not already in friendship with current user
class FilteredUsers(Resource):
    def get(self, id):
        try: 
            user = User.query.filter_by(id=id).first()
            #all friendships for user
            all_user_friendships = Friendship.query.filter(
                (Friendship.receiving_user_id == user.id) |
                (Friendship.requesting_user_id == user.id)
            ).all()
            #list of only ids
            friend_ids = []
            for friendship in all_user_friendships:
                friend_ids.append(friendship.receiving_user_id)
                friend_ids.append(friendship.requesting_user_id)
            
            filtered_users = [user.serialize for user in User.query.filter(~User.id.in_(friend_ids))]
            return make_response(filtered_users, 200)
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
        
api.add_resource(FilteredUsers, '/filtered_users/<int:id>')     

#User can update or delete their profile/account
class Users(Resource):
    def get(self, id):
        try: 
            user_info = User.query.filter_by(id=id).first()
            if not user_info:
                return {"User not found"}, 404
            return make_response(user_info.serialize, 200)
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
        
api.add_resource(Users, '/users/<int:id>')
     


#<------------------------FRIENDSHIP ROUTES----------------------->

#Creates new friendship
# Gets all user's friendships (will comment out this later) 
class UserFriendships(Resource):
    # def get(self, id):
    #     user = User.query.filter_by(id=id).first()
    #     if not user:
    #         return {"User not found"}, 404
    #     try:
    #         all_friendships = Friendship.query.filter(
    #             (Friendship.receiving_user_id == user.id) |
    #             (Friendship.requesting_user_id == user.id)
    #         ).all()
    #         serialized_friends = [friend.serialize for friend in all_friendships]
    #         return make_response(serialized_friends, 200)
    #     except Exception as e:
    #         traceback.print_exc()
    #         return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
        
    def post(self):
        data = request.get_json()
        try: 
            new_friendship = Friendship(
            requesting_user_id = data['requesting_user_id'],
            receiving_user_id= data['receiving_user_id'],
            status = data.get('status'))
            db.session.add(new_friendship)
            db.session.commit()
            return make_response(new_friendship.serialize, 201)
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
       
api.add_resource(UserFriendships, '/user_friendships')

#Retrieve's user's PENDING and CONFIRMED status friendships and users associated 
@app.route('/user_friendships/<int:id>/<string:status>')
def get_confirmed_friends(id, status):
        user = User.query.filter_by(id=id).first()
        if not user:
            return {"User not found"}, 404
        try:
            all_friendships = Friendship.query.filter(
                    ((Friendship.receiving_user_id == user.id) |
                    (Friendship.requesting_user_id == user.id)) & (Friendship.status == f'{status}')
                ).all()
            friend_ids = []
            for friendship in all_friendships:
                friend_ids.append(friendship.receiving_user_id)
                friend_ids.append(friendship.requesting_user_id)
            
            friendship_users = User.query.filter(User.id.in_(friend_ids) & (User.id != user.id)).all()
            serialized_users = [friendship_user.serialize for friendship_user in friendship_users]

        # Return serialized users as a list
            return {"users": serialized_users}, 200
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500


#GET can be deleted later
# Change's friendship status or delete's friendship
class FriendshipById(Resource):
    def get(self, id):
        #filters by id of friendship
        try:
            selected_friendship = Friendship.query.filter_by(id=id).first()
            if selected_friendship:
                return make_response(selected_friendship.serialize, 200)  
            else:
                return {"Error: Validation error"}, 400           
        except: 
            return {"Error: Not found"}, 404
    
    def patch(self, friendship_id):
        data = request.get_json()
        try:
            selected_friendship = Friendship.query.filter_by(id=friendship_id).first().serialize
            if selected_friendship:
                for attr in data:
                    setattr(selected_friendship, attr, data.get(attr))
                db.session.add(selected_friendship)
                db.session.commit()
                return make_response(selected_friendship, 200)
            return{"Friendship not found"}, 404
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
    
    def delete(self, id):
        try:
            selected_friendship = Friendship.query.filter_by(id=id).first()
            if not selected_friendship:
                return {"Friendship not found"}, 404
            else:
                db.session.delete(selected_friendship)
                db.session.commit()
                return {}, 204
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500 


api.add_resource(FriendshipById, '/friendship/<int:id>')

#Routes needed:
# - list of messages for user - GET and POST, DELETE
# - get's messages for individual friendship

#shows list of messages grouped by friendship for user
class Messages(Resource):
    def get(self, id):
        try: 
            friendship_messages = [message.serialize for message in Message.query.filter(Message.friendship_id == id).all()]
            return make_response(friendship_messages, 200)
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500 

    def post(self):
        pass

api.add_resource(Messages, '/messages/<int:id>')

#shows messages for individual friendship
class FriendshipMessages(Resource):
    def get(self):
        pass

    def delete(self):
        pass

api.add_resource(FriendshipMessages, '/friendshipmessages')

if __name__ == '__main__':
    app.run(port=5555)