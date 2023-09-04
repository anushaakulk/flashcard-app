from flask_restful import Api,Resource,fields,marshal,abort
from api.models import db,User as users_model
from api.models import Deck as deck,Relation as relation,Card as card
from flask_security import auth_required,current_user,hash_password
from api.security import user_datastore
import datetime

api = Api(prefix="/api")


user_resource_fields = {
    'username': fields.String,
    'email': fields.String
}

deck_resource_fields = {
    'dname': fields.String,
    'points': fields.Integer
}

front_resource_fields = {
    'front':fields.String,
    'back':fields.String
}
newuser_resource_fields = {
    'email': fields.String,
    'password': fields.String
}
#user = {
#    "username":"Narendra",
#    "email":"narendra@gmail.com"
#}

class adddeck(Resource):
    @auth_required('token')
    def get(self,dname=None):
        d = deck.query.filter_by(dname=dname).first()
        if d:
            abort(400,message="This deck already exists")
        new_deck = deck(dname=dname,points=0)
        db.session.add(new_deck)
        db.session.commit()
        return marshal(new_deck,deck_resource_fields)

class deletedeck(Resource):
    @auth_required('token')
    def get(self,dname=None):
        dname1 = deck.query.filter_by(dname=dname).first()
        if dname1:
            dno = dname1.dno
            r = relation.query.filter_by(rdno=dno).all()
            l=[]
            for i in r:
                l.append(i.rcno)
            relation.query.filter_by(rdno=dno).delete()
            deck.query.filter_by(dname=dname).delete()
            for j in l:
                card.query.filter_by(cno=j).delete()
            db.session.commit()
            return "Deleted"
        else:
            abort(400,message="Deck does not exist")

class addcard(Resource):
    def get(self,dname=None,front=None,back=None):
        if front=='':
            abort(404,message="Card with no name")
        c=card(front=front,back=back)
        db.session.add(c)
        acno=card.query.filter_by(front=front,back=back).first().cno
        tno=deck.query.filter_by(dname=dname).first()
        d=relation(rdno=tno.dno,rcno=acno)
        db.session.add(d)
        db.session.commit()
        return "Card added successfully"

class deletecard(Resource):
    @auth_required('token')
    def get(self,dname=None,front=None,back=None):
        cname1 = card.query.filter_by(front=front).first()
        if cname1:
            cno = cname1.cno
            relation.query.filter_by(rcno=cno).delete()
            card.query.filter_by(front=front).delete()
            db.session.commit()
            return "Deleted"
        else:
            abort(400,message="Card does not exist")


class User(Resource):
   @auth_required('token')
   def get(self, id=None):
        if id!=0:
            return marshal(current_user, user_resource_fields)
        else:
            abort(400, message='You are not authorized to get the resource')
class logouttime(Resource):
    def get(self):
        time = users_model.query.all()
        for i in time:
            if i.id==current_user.id:
             i.time = str(datetime.datetime.now())
        db.session.commit()
        return "Logged out"

class points(Resource):
    def get(self,front=None,level=None):
        cno = card.query.filter_by(front=front).first().cno
        dno = relation.query.filter_by(rcno=cno).first().rdno
        userpoints=0
        if level=="Easy":
            userpoints+=2
        if level=="Good":
            userpoints+=1
        if level=="Hard":
            userpoints+=0
        points=deck.query.filter_by(dno=dno).first()
        points.points+=userpoints
        db.session.commit()
        return "Points added"

class Back(Resource):
    def get(self,front):
        c=card.query.filter_by(front=front).first()
        if c:
            return marshal(c,front_resource_fields)
        else:
            abort(404,message="card not found")
        
class register(Resource):
    def get(self,email=None,password=None):
        try:
            index=email.find('@')
            name=email[:index]
            user_datastore.create_user(username= name,email=email,password=hash_password(password))
            db.session.commit()
            newuser = users_model.query.filter_by(email=email).first()
            return marshal(newuser,newuser_resource_fields)
        except:
            return abort(400,message="User already exists")

api.add_resource(User,'/users/<int:id>','/users')
api.add_resource(adddeck,'/deck/<dname>')
api.add_resource(deletedeck,'/deletedeck/<dname>')
api.add_resource(addcard,'/addcard/<dname>/<front>/<back>')
api.add_resource(deletecard,'/deletecard/<dname>/<front>')
api.add_resource(Back,'/review/<front>')
api.add_resource(points,'/points/<front>/<level>')
api.add_resource(register,'/register/<email>/<password>')
api.add_resource(logouttime,'/logout')