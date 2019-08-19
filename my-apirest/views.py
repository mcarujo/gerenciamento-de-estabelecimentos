import json
import random
import string
from app import db, app
from models import Estabelecimento, User
from validations import RegistrationForm
from connectors import EstabelecimentoConn, UserConn
from flask import render_template, jsonify, request, redirect, session, flash, url_for, Response
from functools import wraps


def autenticar(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'token' in request.headers:
            token = request.headers['token']

        if not token:
            return jsonify({'mensagem': 'Token está ausente!'}), 401

        try:
            user_conn = UserConn(db)
            user = user_conn.busca_por_token(request.headers['token'])
            if not user:
                return jsonify({'mensagem': 'Token está errado!'}), 401
        except:
            return jsonify({'mensagem': 'Token está errado!'}), 401
        return f(*args, **kwargs)
    return decorated


@app.route('/')
def home():
    return jsonify("Apirest funcionando!"), 200


@app.route('/login', methods=['POST'])
def login():
    if 'login' in request.json and 'senha' in request.json:
        user_conn = UserConn(db)
        user = user_conn.buscar_por_login_senha(
            request.json['login'], request.json['senha'])
        if user:
            user['token'] = randomString()
            user_conn.salvar(user)
            return_data = jsonify({'token': user['token']})
        else:
            return_data = jsonify(False)
    else:
        return_data = jsonify(request.json)
    return return_data, 200


@app.route('/logout', methods=['POST', ])
def logout():
    if 'token' in request.json:
        user_conn = UserConn(db)
        user = user_conn.busca_por_token(request.json['token'])
        if user:
            user['token'] = ""
            user_conn.salvar(user)
            return_data = jsonify(True)
        else:
            return_data = jsonify(False)
    else:
        return_data = jsonify(False)
    return return_data, 200


@app.route('/estabelecimento', methods=['GET', ])
@autenticar
def listar():
    estabelecimento_conn = EstabelecimentoConn(db)
    estabelecimentos = estabelecimento_conn.listar()
    return jsonify(estabelecimentos), 200


@app.route('/estabelecimento/<int:id>', methods=['GET', ])
@autenticar
def mostrar(id):
    estabelecimento_conn = EstabelecimentoConn(db)
    estabelecimento = estabelecimento_conn.busca_por_id(id)
    return jsonify(estabelecimento), 200


@app.route('/estabelecimento', methods=['POST', ])
@autenticar
def criar():
    form = RegistrationForm.from_json(request.json)
    if request.method == 'POST' and form.validate():
        estabelecimento_conn = EstabelecimentoConn(db)
        estabelecimento = Estabelecimento(request.json['nome'],
                                          request.json['cnpj'],
                                          request.json['bairro'],
                                          request.json['cidade'],
                                          request.json['telefone'])
        estabelecimento.id = None
        estabelecimento_conn.salvar(estabelecimento)
        return_data = jsonify(estabelecimento.__dict__)
    else:
        return_data = jsonify(False)
    return return_data, 200


@app.route('/estabelecimento', methods=['PUT', ])
@autenticar
def atualizar():
    form = RegistrationForm.from_json(request.json)
    if request.method == 'PUT' and form.validate() and 'id' in request.json:
        estabelecimento_conn = EstabelecimentoConn(db)
        estabelecimento = Estabelecimento(request.json['nome'],
                                          request.json['cnpj'],
                                          request.json['bairro'],
                                          request.json['cidade'],
                                          request.json['telefone'])
        estabelecimento.id = request.json['id']
        estabelecimento_conn.salvar(estabelecimento)
        return_data = jsonify(estabelecimento.__dict__)
    else:
        return_data = jsonify(False)
    return return_data, 200


@app.route('/estabelecimento/<int:id>', methods=['DELETE', ])
@autenticar
def deletar(id):
    if not id:
        return_data = False
    else:
        estabelecimentoo_conn = EstabelecimentoConn(db)
        estabelecimentoo_conn.deletar(id)
        return_data = jsonify(id)
    return return_data, 200


def randomString():
    return ''.join(random.choice(string.ascii_letters) for i in range(16))
