from models import Jogo


class EstabelecimentoConn:
    def __init__(self, db):
        self.__db = db

    def salvar(self, estabelecimento):
        cursor = self.__db.connection.cursor()
        if (estabelecimento.id):
            sql = 'UPDATE estabelecimento SET nome=%s, cnpj=%s, bairro=%s, cidade=%s, telefone=%s where id = %s'
            cursor.execute(sql, (estabelecimento.nome,
                                 estabelecimento.cnpj,
                                 estabelecimento.bairro,
                                 estabelecimento.cidade,
                                 estabelecimento.telefone,
                                 estabelecimento.id))
        else:
            sql = 'INSERT into jogo (nome, cnpj, bairro, cidade, telefone) values (%s, %s, %s, %s, %s)'
            cursor.execute(sql, (estabelecimento.nome,
                                 estabelecimento.cnpj,
                                 estabelecimento.bairro,
                                 estabelecimento.cidade,
                                 estabelecimento.telefone))
            estabelecimento.id = cursor.lastrowid
        self.__db.connection.commit()
        return estabelecimento

    def listar(self):
        cursor = self.__db.connection.cursor()
        sql = 'SELECT nome, cnpj, bairro, cidade, telefone from estabelecimento'
        cursor.execute(sql)
        return cursor.fetchall()

    def busca_por_id(self, id):
        cursor = self.__db.connection.cursor()
        sql = 'SELECT nome, cnpj, bairro, cidade, telefone from jogo where id = %s'
        cursor.execute(sql, (id,))
        tupla = cursor.fetchone()
        return tupla

    def deletar(self, id):
        sql = 'delete from estabelecimento where id = %s'
        self.__db.connection.cursor().execute(sql, (id, ))
        self.__db.connection.commit()
