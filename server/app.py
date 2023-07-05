from flask import Flask, request, jsonify, make_response, abort, session
from flask_cors import CORS
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt

app = Flask(__name__)

from models import db

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
# app.secret_key = b'\xb8j\x8c\\\xea\xfdZr$\xf7\xa7\xec\xdc\x90\xcdd'
migrate = Migrate(app, db)
db.init_app(app)
bcrypt = Bcrypt(app)
# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)
