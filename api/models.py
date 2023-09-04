from flask_sqlalchemy import SQLAlchemy
from flask_security import UserMixin, RoleMixin

db = SQLAlchemy()

roles_users = db.Table('roles_users',
        db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
        db.Column('role_id', db.Integer(), db.ForeignKey('role.id')))    

class User(db.Model, UserMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    username = db.Column(db.String, unique=False)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    time = db.Column(db.String)
    fs_uniquifier = db.Column(db.String(255), unique=True, nullable=False) 
    roles = db.relationship('Role', secondary=roles_users,backref=db.backref('users', lazy='dynamic'))

class Role(db.Model, RoleMixin):
    __tablename__ = 'role'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

class Deck(db.Model):
    __tablename__='deck'
    dno=db.Column(db.Integer,primary_key=True,nullable=False,autoincrement=True)
    dname=db.Column(db.String,nullable=False)
    cards=db.relationship('Relation',backref='card')
    points=db.Column(db.Integer)

class Card(db.Model):
    __tablename__='card'
    cno=db.Column(db.Integer,primary_key=True,nullable=False,autoincrement=True)
    front=db.Column(db.String,nullable=False)
    back=db.Column(db.String)
    decks=db.relationship('Relation',backref='deck')

class Relation(db.Model):
    __tablename__='relation'
    sno=db.Column(db.Integer,nullable=False,primary_key=True,autoincrement=True)
    rdno=db.Column(db.Integer,db.ForeignKey("deck.dno"))
    rcno=db.Column(db.Integer,db.ForeignKey("card.cno"),unique=True)