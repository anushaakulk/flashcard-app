from flask import Flask,render_template
from api.resource import api
from api.models import db
from api.security import user_datastore,sec
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
        user_datastore.create_user(username="anushaa",email="20bd1a1234@gmail.com",password="5678")
        db.session.commit()
    if not user_datastore.find_role('Admin'):
        user_datastore.create_role(name='Admin',description='Admin related')
        db.session.commit()

@app.route("/")
def home():
    return render_template("index.html")

if __name__=="__main__":
    app.run(debug=True)