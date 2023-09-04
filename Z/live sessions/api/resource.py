from flask_restful import Api,Resource,fields,marshal,abort
from flask_security import auth_required,current_user

api = Api(prefix="/api")

user_resource_fields = {
    'username': fields.String,
    'email': fields.String,
    'webhook':fields.String
}
class User(Resource):
   def get(self):
        return marshal(current_user, user_resource_fields)

api.add_resource(User,'/webhookurl')