from flask_restful import Api,Resource,fields,marshal,abort
from flask_security import auth_required,current_user
from models import db,User as users_model

api = Api(prefix="/api")


user_resource_fields = {
    'username': fields.String,
    'email': fields.String
}


#user = {
#    "username":"Narendra",
#    "email":"narendra@gmail.com"
#}

class User(Resource):
    @auth_required('token')
    def get(self,id=None):
        if id==current_user.id:
            return marshal(current_user,user_resource_fields)
        else:
          abort(400,message = 'You are not authorized to get the resource')

api.add_resource(User,'/users/<int:id>','/user')
