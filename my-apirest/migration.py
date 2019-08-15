from faker import Faker
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:flask123456@database/flask'

db = SQLAlchemy(app)
migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)

# Tables


class Estabelecimento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50))
    cnpj = db.Column(db.String(20))
    bairro = db.Column(db.String(64))
    cidade = db.Column(db.String(64))
    telefone = db.Column(db.String(13))


if __name__ == '__main__':
    manager.run()
