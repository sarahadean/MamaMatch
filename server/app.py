from flask import Flask, request, jsonify, make_response, abort, session
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from models import db, User, Category_Mom, Interest, Friendship, Message
from config import db, app, api
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask_restful import Resource
import traceback
import ipdb


login_manager = LoginManager()
login_manager.init_app(app)


@app.route('/')
def index():
    return '<h1>Welcome to MamaMatch</h1>'

@login_manager.user_loader
def load_user(user_id):
    return User.query.filter(User.id == user_id).first()


#============= SIGNUP ===============#
class Signup(Resource):
    def post(self):
        data = request.get_json()

        try: 
            new_user = User(
                name = data.get('name'),
                username = data.get('username'),
                email = data.get('email'),
                # phone_number = data['phone_number'],
                # dob = data['dob'],
                # profile_image = data['profile_image'],
                # location = data['location'],
                # about = data['about'],
                # category_mom_id = data.get('category_mom_id'),
                # interest_id = data.get('interest_id')
            )
            new_user.password_hash = data.get('password')
            db.session.add(new_user)
            db.session.commit()
            # session['user_id'] = new_user.id
            login_user(new_user, remember=True)
            return make_response(new_user.serialize, 201)
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
        
api.add_resource(Signup, '/signup')


#============= LOGIN ===============#
class Login(Resource):
    def post(self):
        try: 
            data = request.get_json()
            user = User.query.filter_by(username = data.get('username')).first()
            password = request.get_json()['password']

            if user.authenticate(password):
                login_user(user, remember=True)
                # session['user_id'] = user.id
                return user.serialize, 200
            
            if not user:
                return{'Invalid Username/Password'}, 401
            
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
    
api.add_resource(Login, '/login')



#============= LOGOUT ===============#

class Logout(Resource):
    def post(self):
        logout_user()
        # session['user_id'] = None
        # ipdb.set_trace()
        return 'Goodbye, Mama! Have a great day!', 200
api.add_resource(Logout, '/logout')


#============= AUTHORIZE SESSION ===============#
class AuthorizedSession(Resource):
    def get(self):
        try:
            if current_user.is_authenticated:
                user = current_user.serialize
                return make_response(user, 200)
            # user = User.query.filter_by(
            #     id = session.get('user_id')).first()
        
        except:
            return make_response('Not Authorized', 401)

api.add_resource(AuthorizedSession, '/authorize_session')


#==============GETS LIST OF USERS THAT DO NOT HAVE FRIENDSHIP WITH CURRENT_USER==========#
class FilteredUsers(Resource):
    def get(self, id):
        try: 
            # user = User.query.filter_by(id=id).first()
            #all friendships for user
            all_user_friendships = Friendship.query.filter(
                (Friendship.receiving_user_id == id) |
                (Friendship.requesting_user_id == id)
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



#============GETS, PATCHES, OR DELETE'S CURRENT USER'S INFORMATION================#
class CurrentUser(Resource):
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
            # return {"User not found"}, 404
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
        
api.add_resource(CurrentUser, '/current_user/<int:id>')
     



#=============== POST - CREATES A NEW FRIENDSHIP ===============# 
class UserFriendships(Resource):
    def post(self):
        data = request.get_json()
        try: 
            new_friendship = Friendship(
            requesting_user_id = data.get('requesting_user_id'),
            receiving_user_id= data.get('receiving_user_id'),
            status = data.get('status'))
            db.session.add(new_friendship)
            db.session.commit()
            return make_response(new_friendship.serialize, 201)
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
api.add_resource(UserFriendships, '/user_friendships')




#=============GETS LIST OF USERS TIED TO FRIENDSHIP WITH CURRENT USER =============#
#=============PENDING OR CONFIRMED STATUS==================#
@app.route('/user_friendships/<int:id>/<string:status>')
def get_confirmed_friends(id, status):
        user = User.query.filter_by(id=id).first()
        if not user:
            return {"User not found"}, 404
        try:
            if status == "PENDING":
                pending_friendships = Friendship.query.filter(
                        ((Friendship.receiving_user_id == user.id) &
        
                        (Friendship.status == "PENDING"))
                    ).all()
                friend_ids = []
                for friendship in pending_friendships:
                    friend_ids.append(friendship.requesting_user_id)
            
            elif status == "CONFIRMED":
                confirmed_friendships = Friendship.query.filter(
                        ((Friendship.receiving_user_id == user.id) | (Friendship.requesting_user_id == user.id)) & 
                        (Friendship.status == f'{status}')).all()
                friend_ids = []
                for friendship in confirmed_friendships:
                    friend_ids.append(friendship.receiving_user_id)
                    friend_ids.append(friendship.requesting_user_id)
                
            friendship_users = User.query.filter(User.id.in_(friend_ids) & (User.id != user.id)).all()
            serialized_users = [friendship_user.serialize for friendship_user in friendship_users]

        # Return serialized users as a list
            return make_response(serialized_users, 200)
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500



#>>>>COULD USE THIS ROUTE TO POPULATE MESSAGES LIST
#MESSAGES LIST WOULD SHOW MESSAGES[1]
#CLICK ON MESSAGE WOULD TAKE TO CONVERSATION COMPONENT
#THIS WILL FURTHER POPULATE ALL THE MESSAGES WITH A MAP
#===============GET ALL USER CONFIRMED FRIENDSHIPS MESSAGES=======================#
@app.route('/user_friendships/<int:id>')
def get_all_friendships(id):
    user = User.query.filter_by(id=id).first()
    if not user:
        return {"User not found"}, 404
    try:
        all_friendships = Friendship.query.filter(
            ((Friendship.receiving_user_id == user.id) |
            (Friendship.requesting_user_id == user.id)) &
            (Friendship.status == "CONFIRMED")
        ).all()
        serialized_friends = [friend.serialize for friend in all_friendships]
        return make_response(serialized_friends, 200)
    except Exception as e:
        traceback.print_exc()
        return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500




#============== PATCH OR DELETE SINGLE FRIENDSHIP =============#
#GET can be deleted later
# Change's friendship status or delete's friendship
class FriendshipById(Resource):
    def patch(self, user_id, friend_id):
        data = request.get_json()
        try:
            selected_friendship = Friendship.query.filter(
                (Friendship.requesting_user_id == friend_id) & 
                (Friendship.receiving_user_id == user_id) ).first()
            
            if selected_friendship:
                selected_friendship.status = data.get("status")
                db.session.add(selected_friendship)
                db.session.commit()

                return make_response(selected_friendship.serialize, 200)
            return{"Friendship not found"}, 404
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
    
    def delete(self, user_id, friend_id):
        try:
            selected_friendship = Friendship.query.filter(
                (Friendship.requesting_user_id == friend_id) & 
                (Friendship.receiving_user_id == user_id) ).first()
            if not selected_friendship:
                return {"Friendship not found"}, 404
            else:
                db.session.delete(selected_friendship)
                db.session.commit()
                return {}, 204
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500 

api.add_resource(FriendshipById, '/friendship/<int:user_id>/<int:friend_id>')




#================= GETS ALL MESSAGES & CREATES NEW MESSAGE FOR FRIENDSHIP ==================#
# creates new message
class Messages(Resource):
    def get(self, id, friend_id):
        user = User.query.filter_by(id=id).first()
        try:
            selected_friendship = Friendship.query.filter(
                ((Friendship.requesting_user_id == user.id) | (Friendship.receiving_user_id == user.id))
                & ((Friendship.requesting_user_id == friend_id) | (Friendship.receiving_user_id == friend_id)) ).first()
            friendship_messages = [message.serialize for message in selected_friendship.messages]
            return make_response(friendship_messages, 200)
        
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500 
        
#post tested in postman and is working
    def post(self, id, friend_id):
        data = request.get_json()
        user = User.query.filter_by(id=id).first()
        #get friendship
        try:
            selected_friendship = Friendship.query.filter(
                ((Friendship.requesting_user_id == id) | (Friendship.receiving_user_id == id))
                & ((Friendship.requesting_user_id == friend_id) | (Friendship.receiving_user_id == friend_id)) ).first()

            new_message = Message(
                friendship_id = selected_friendship.id,
                author_id = id,
                content = data.get("content")
            )
            db.session.add(new_message)
            db.session.commit()

            return make_response(new_message.serialize, 201)
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500 

    def delete(self, id, friend_id):
        pass    

api.add_resource(Messages, '/messages/<int:id>/<int:friend_id>')




#=============GETS SINGLE FRIENDSHIP BY FRIENDSHIP ID===============#

@app.route('/single_friendship/<int:friendship_id>')
def get_single_friendship(friendship_id):
    try: 
        friendship = Friendship.query.filter_by(id=friendship_id).first().serialize
        return make_response(friendship, 200)
    except Exception as e:
        traceback.print_exc()
        return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
    



if __name__ == '__main__':
    app.run(port=5555)