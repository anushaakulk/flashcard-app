from flask import Flask
from flask_celery import make_celery

app = Flask(__name__)
app.config.update(
    CELERY_BROKER_URL='redis://localhost:6379',
    CELERY_RESULT_BACKEND='redis://localhost:6379'
)
celery = make_celery(app)

@app.route('/')
def home():
    return 'Hi Flask'

@app.route('/display')
def displayName():
    res = display.delay(23,42)
    res.wait()
    return "async"

@celery.task(name = 'app.display')
def display(a, b):
    return a + b

if __name__=="__main__":
    app.run(debug=True)