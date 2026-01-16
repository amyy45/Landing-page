from flask import Flask,request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Item(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(100), nullable=False)
    email=db.Column(db.String(120), nullable=False)
    phone =db.Column(db.String(20), nullable=False)

@app.route('/', methods=['POST'])
def create_item():
    data = request.json
    item = Item(
        name=data['name'],
        email=data['email'],
        phone=data['phone']
    )
    db.session.add(item)
    db.session.commit()
    return jsonify({'message': 'Item created Successfully'}), 201

@app.route('/')
def home():
    return "API is running!"