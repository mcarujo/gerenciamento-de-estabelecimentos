from models import User


class UserConn:
    def __init__(self, db):
        self.__db = db

    def buscar_por_login_senha(self, login, senha):
        cursor = self.__db.connection.cursor()
        sql = 'SELECT id, login, senha, token, validade from user where login = %s and senha = %s'
        cursor.execute(sql, (login, senha,))
        tupla = cursor.fetchone()
        return (cria_user_com_tupla(tupla) if tupla else False)

    def busca_por_token(self, token):
        cursor = self.__db.connection.cursor()
        sql = 'SELECT id, login, senha, token, validade from user where token = %s'
        cursor.execute(sql, (token,))
        tupla = cursor.fetchone()
        return (cria_user_com_tupla(tupla) if tupla else False)

    def salvar(self, user):  # ou atualizar, depende se passar o id
        cursor = self.__db.connection.cursor()
        if (user['id']):
            sql = 'UPDATE user SET login=%s, senha=%s, token=%s, validade=%s where id = %s'
            cursor.execute(sql, (user['login'],
                                 user['senha'],
                                 user['token'],
                                 user['validade'],
                                 user['id']))
        else:
            sql = 'INSERT into user (login, senha, token, validade) values (%s, %s, %s, %s, %s)'
            cursor.execute(sql, (user['login'],
                                 user['senha'],
                                 user['token'],
                                 user['validade'],
                                 user['id']))
            user.id = cursor.lastrowid
        self.__db.connection.commit()
        return user

    def deletar(self, id):
        sql = 'delete from user where id = %s'
        self.__db.connection.cursor().execute(sql, (id, ))
        self.__db.connection.commit()


def cria_user_com_tupla(tupla):
    aux = User(tupla[1], tupla[2], tupla[3], tupla[4])
    aux.id = tupla[0]
    return aux.__dict__


def to_dict(objs):
    return list(map(cria_user_com_tupla, objs))
