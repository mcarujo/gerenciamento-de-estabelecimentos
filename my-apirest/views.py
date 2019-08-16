from flask import render_template, request, redirect, session, flash, url_for, Response
import json
from models import Estabelecimento
from validations import RegistrationForm
from connectors import EstabelecimentoConn
from app import db, app


@app.route('/')
def home():
    return Response(json.dumps("apirest funcionando!"), status=200, mimetype='application/json')


# @app.route('/login')
# def login():
#     next = request.args.get('next')
#     return render_template('login.html', next=next)


# @app.route('/logout')
# def logout():
#     session['usuer'] = None
#     session['usuername'] = None
#     session.clear()
#     flash('No user logged')
#     return redirect(url_for('index'))


# @app.route('/autenticar', methods=['POST', ])
# def autenticar():

#     usuario_conn = UsuarioConn(db)
#     usuario = usuario_conn.buscar_por_login_senha(
#         request.form['usuario'], request.form['senha'])
#     if usuario:
#         session['user'] = usuario.id
#         session['username'] = usuario.nome
#         flash(usuario.nome + ' logou com sucesso!')
#         mext = request.form['next']
#         return redirect(mext)

#     else:
#         flash('Não logado, tente de novo!')
#         return redirect(url_for('login'))


@app.route('/estabelecimento', methods=['GET', ])
def listar():
    estabelecimento_conn = EstabelecimentoConn(db)
    estabelecimentos = estabelecimento_conn.listar()
    return Response(json.dumps(estabelecimentos), status=200, mimetype='application/json')


@app.route('/estabelecimento/<int:id>', methods=['GET', ])
def mostrar(id):
    estabelecimento_conn = EstabelecimentoConn(db)
    estabelecimento = estabelecimento_conn.busca_por_id(id)
    return Response(json.dumps(estabelecimento), status=200, mimetype='application/json')


@app.route('/estabelecimento', methods=['POST', ])
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
        return_data = json.dumps(estabelecimento.__dict__)
    else: 
        return_data = json.dumps(False)
    return Response(return_data, status=200, mimetype='application/json')



@app.route('/estabelecimento', methods=['PUT', ])
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
        return_data = json.dumps(estabelecimento.__dict__)
    else: 
        return_data = json.dumps(False)
    return Response(return_data, status=200, mimetype='application/json')


@app.route('/estabelecimento/<int:id>', methods=['DELETE', ])
def deletar(id):
    if not id:
        return_data = False 
    else:
        estabelecimentoo_conn = EstabelecimentoConn(db)
        estabelecimentoo_conn.deletar(id)
        return_data = json.dumps(id) 
    return Response(return_data, status=200, mimetype='application/json')
