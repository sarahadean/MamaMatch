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

class Users(Resource):
    def get(self):
        try:
            all_users = [user.to_dict() for user in User.query.all()]
            return make_response(all_users, 200)
        except Exception as e:
            traceback.print_exc()
            return {"error": "An error occurred while fetching the order history", "message": str(e)}, 500
    
api.add_resource(Users, '/users')

class UsersId(Resource):
    def get(id):
        user = User.query.filter_by(id=id).to_dict()
        if user:
            return make_response(user, 200)
        return {"User not found"}, 404
    
    def patch(id):
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
    
    def delete(id):
        user = User.query.filter_by(id=id)
        if user:
            user.session.delete()
            user.session.commit()
            return make_response(user, 204)
        return {"User not found"}, 404
    
api.add_resource(UsersId, '/users/<int:id>')

# class Category_Moms(Resource):
#     def get():
#         moms = [mom.to_dict() for mom in Category_Mom.query.all()]
#         return make_response(moms, 200)

# api.add_resource(Category_Moms, '/moms')

if __name__ == '__main__':
    app.run(port=5555)