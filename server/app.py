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
app.secret_key = b"'\xb4\x14f\xfdk\xa8p\xeb\x9d\xf0jmn\x08k"
api = Api(app)


@app.route('/')
def index():
    return '<h1>Welcome to MamaMatch</h1>'


class Signup(Resource):
    def post(self):
        data = request.get_json()
        try: 
            new_user = User(
                name = data['name'],
                username = data['username'],
                password = data['password'],
                email = data['email'],
                phone_number = data['phone_number'],
                dob = data['dob'],
                profile_image = data['profile_image'],
                location = data['location'],
                about = data['about'],
                category_mom_id = data['category_mom_id'],
                interest_id = data['interest_id']
            )
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return make_response(new_user.serialize, 201)
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
        
api.add_resource(Signup, '/signup')

###------------User and User ID Routes ------------### 
# *****DONE***** - TEST SUCCESSFUL ########
# Display users that are not already in friendship with current user
#get all current_user friendships
#get all users
#remove users from list that match received_user_id or received_user_id
class FilteredUsers(Resource):
    def get(self, id):
        try: 
            user = User.query.filter_by(id=id).first()
            all_user_friendships = Friendship.query.filter(
                (Friendship.receiving_user_id == user.id),
                (Friendship.requesting_user_id == user.id)
            ).all()
            friend_ids = [(friendship.receiving_user_id != user.id | friendship.requesting_user_id != user.id) for friendship in all_user_friendships]
            
            filtered_users = [user.serialize for user in User.query.filter(User.id not in friend_ids or User.id != user.id)]
            return make_response(filtered_users, 200)
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
       
api.add_resource(FilteredUsers, '/filteredusers/<int:id>')     


# *****DONE****** - GET, PATCH AND DELETE TEST SUCCESSFUL #######
#This is for user when logged in to update their profile
class UserById(Resource):
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
        
api.add_resource(UserById, '/userbyid/<int:id>')
     

#<------------------------FRIENDSHIP ROUTES----------------------->

# ****in progress
######## GET TEST SUCCESSFUL ---- POST TEST NEEDED ########
#Routes to retrieve all friendships for user and create a friendship


class UserFriendships(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
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
        
###### TEST PENDING LOGIN CREATION ###### 
    #creating friendship - receiving_user_id or requesting_user_id belongs to user
    #login should be required so requesting user will always be current user
    #
    def post(self, id):
        data = request.get_json()
        requester = User.query.filter_by(id=id).first().serialize
        # friends = [user.serialize for user in User.query.filter_by(id=id, id=friend_id).all()]
        try: 
            if requester:
                new_friendship = Friendship(
                requesting_user_id = requester.id,
                receiving_user_id= data.get('receiving_user_id'),
                status ='PENDING')
                db.session.add(new_friendship)
                db.session.commit()
                return make_response(new_friendship, 201)
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
       
api.add_resource(UserFriendships, '/<int:id>/friendships')

# ****DONE*******
# RETRIEVE LIST OF FRIENDSHIPS BY STATUS TEST SUCCESSFUL ##########
# *******>>>status currently includes BOTH requests received AND requests sent<<<<******
@app.route('/<int:id>/<string:status>')
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



###### RETRIEVE ONE FRIENDSHIP:
# DELETE SUCCESSFUL, 
# GET SUCCESSFUL but not returning correct response if not exits
# PATCH TEST pending ########
#change status of single friendship = PATCH or DELETE
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





if __name__ == '__main__':
    app.run(port=5555)