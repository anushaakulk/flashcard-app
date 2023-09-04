from flask import Flask,render_template
from api.resource import api
from api.models import Deck,Relation,Card,User, db
from api.security import user_datastore,sec
from flask_security import hash_password,current_user
import random
import datetime

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SECRET_KEY'] = "thisissecret"
app.config['SECURITY_PASSWORD_SALT']='salt'
app.config['WTF_CSRF_ENABLED']=False
app.config['SECURITY_TOKEN_AUTHENTICATION_HEADER']="Authentication-Token"
app.config['SECURITY_PASSWORD_HASH']='bcrypt'

api.init_app(app)
db.init_app(app)
sec.init_app(app,user_datastore)

@app.before_first_request
def create_db():
    db.create_all()
    if not user_datastore.find_user(email = "20bd1a1234@gmail.com"):
        user_datastore.create_user(username="anushaa",email="20bd1a1234@gmail.com",password=hash_password("5678"))
        db.session.commit()
    if not user_datastore.find_role('Admin'):
        user_datastore.create_role(name='Admin',description='Admin related')
        db.session.commit()


@app.route("/")
def home():
    global opentime
    opentime = datetime.datetime.now()
    return render_template("firstpage.html")

@app.route("/database",methods=["GET","POST"])
def database():
  try:
    decks = Deck.query.all()
    time=datetime.datetime.now()
    presenttime=datetime.datetime.now()
    delta=presenttime-opentime
    logintime=User.query.filter_by(id=current_user.id).first()
    if logintime.time==None:
            current_user.time = time
            string=''
            db.session.commit()
            # for new user
    else:
            string="Last reviewed on "+logintime.time
    allpoints=Deck.query.all()
    totalpoints=0
    for i in allpoints:
            totalpoints+=int(i.points)
    return render_template("database.html",decks=decks,time=time,p=totalpoints,t=delta.seconds,str1=string)
  except:
       return '''<!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Dashboard Page</title>
                    </head>
                    <body style="background-color:rgb(240, 239, 216);text-align:center;">
                        <h2>You are not authenticated. Please Login</h2>
                    </body>
                    </html>'''

@app.route("/<path:dname>",methods=["GET","POST"])
def traversedeck(dname):
  tno=Deck.query.filter_by(dname=dname).first()
  try:
    i=Relation.query.filter_by(rdno=tno.dno).all()
    if i==[]:
            return '''<!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Deck Page</title>
                    </head>
                    <body style="background-color:rgb(240, 239, 216);text-align:center;">
                        <h2>Deck is Empty</h2>
                    </body>
                    </html>'''
    di={}
    for j in i:
        di[j.rcno]=j.rdno
    a=random.choice(list(di))
    front=Card.query.filter_by(cno=a).first().front
    return render_template("traverse.html",dname=dname,front=front)
  except:
      return '''<!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Deck Page</title>
                    </head>
                    <body style="background-color:rgb(240, 239, 216);text-align:center;">
                        <h2>Deck is Empty</h2>
                    </body>
                    </html>'''

if __name__=="__main__":
    app.run(host="0.0.0.0", debug=True)