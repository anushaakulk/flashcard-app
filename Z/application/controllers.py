from flask import Flask, request
from flask import render_template
from flask import current_app as app
'''from application.models import Article
from flask_security import login_required, roles_accepted, roles_required
'''
@app.route("/",methods=["GET","POST"])
def basic():
    app.logger.info("Inside get all articles using info")
    app.logger.debug("Inside get all articles using debug")
    return render_template("login.html")

