from flask import Flask
from flask_mysqldb import MySQL
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app)
app.config.from_pyfile('config.py')


db = MySQL(app)
from views import *

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=3000)