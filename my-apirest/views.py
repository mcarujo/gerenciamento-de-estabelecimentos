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
            user = user_conn.busca_por_token(request.form['token'])
            if not user:
                return jsonify({'mensagem': 'Token está errado!'}), 401
        except:
            return jsonify({'mensagem': 'Token está errado!'}), 401
        return f(*args, **kwargs)
    return decorated


@app.route('/')
def home():
    return Response(jsonify("Apirest funcionando!"), status=200, mimetype='application/json')


@app.route('/login', methods=['POST'])
def login():
    if 'login' in request.form and 'senha' in request.form:
        user_conn = UserConn(db)
        user = user_conn.buscar_por_login_senha(
            request.form['login'], request.form['senha'])
        if user:
            user['token'] = randomString()
            user_conn.salvar(user)
            return_data = jsonify({'token': user['token']})
        else:
            return_data = jsonify(False)
    else:
        return_data = jsonify(False)
    return Response(return_data, status=200, mimetype='application/json')


@app.route('/logout', methods=['POST', ])
def logout():
    if 'token' in request.form:
        user_conn = UserConn(db)
        user = user_conn.busca_por_token(request.form['token'])
        if user:
            user['token'] = ""
            user_conn.salvar(user)
            return_data = jsonify(True)
        else:
            return_data = jsonify(False)
    else:
        return_data = jsonify(False)
    return Response(return_data, status=200, mimetype='application/json')


@app.route('/estabelecimento', methods=['GET', ])
@autenticar
def listar():
    estabelecimento_conn = EstabelecimentoConn(db)
    estabelecimentos = estabelecimento_conn.listar()
    return Response(jsonify(estabelecimentos), status=200, mimetype='application/json')


@app.route('/estabelecimento/<int:id>', methods=['GET', ])
@autenticar
def mostrar(id):
    estabelecimento_conn = EstabelecimentoConn(db)
    estabelecimento = estabelecimento_conn.busca_por_id(id)
    return Response(jsonify(estabelecimento), status=200, mimetype='application/json')


@app.route('/estabelecimento', methods=['POST', ])
@autenticar
def criar():
    form = RegistrationForm(request.form)
    if request.method == 'POST' and form.validate():
        estabelecimento_conn = EstabelecimentoConn(db)
        estabelecimento = Estabelecimento(request.form['nome'],
                                          request.form['cnpj'],
                                          request.form['bairro'],
                                          request.form['cidade'],
                                          request.form['telefone'])
        estabelecimento.id = None
        estabelecimento_conn.salvar(estabelecimento)
        return_data = jsonify(estabelecimento.__dict__)
    else:
        return_data = jsonify(False)
    return Response(return_data, status=200, mimetype='application/json')


@app.route('/estabelecimento', methods=['PUT', ])
@autenticar
def atualizar():
    form = RegistrationForm(request.form)
    if request.method == 'PUT' and form.validate() and 'id' in request.form:
        estabelecimento_conn = EstabelecimentoConn(db)
        estabelecimento = Estabelecimento(request.form['nome'],
                                          request.form['cnpj'],
                                          request.form['bairro'],
                                          request.form['cidade'],
                                          request.form['telefone'])
        estabelecimento.id = request.form['id']
        estabelecimento_conn.salvar(estabelecimento)
        return_data = jsonify(estabelecimento.__dict__)
    else:
        return_data = jsonify(False)
    return Response(return_data, status=200, mimetype='application/json')


@app.route('/estabelecimento/<int:id>', methods=['DELETE', ])
@autenticar
def deletar(id):
    if not id:
        return_data = False
    else:
        estabelecimentoo_conn = EstabelecimentoConn(db)
        estabelecimentoo_conn.deletar(id)
        return_data = jsonify(id)
    return Response(return_data, status=200, mimetype='application/json')


def randomString():
    return ''.join(random.choice(string.ascii_letters) for i in range(16))
