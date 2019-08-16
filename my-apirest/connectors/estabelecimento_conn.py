from models import Estabelecimento


class EstabelecimentoConn:
    def __init__(self, db):
        self.__db = db

    def listar(self):
        cursor = self.__db.connection.cursor()
        sql = 'SELECT id, nome, cnpj, bairro, cidade, telefone from estabelecimento'
        cursor.execute(sql)
        tuplas = cursor.fetchall()
        return to_dict(tuplas)

    def busca_por_id(self, id):
        cursor = self.__db.connection.cursor()
        sql = 'SELECT id, nome, cnpj, bairro, cidade, telefone from estabelecimento where id = %s'
        cursor.execute(sql, (id,))
        tupla = cursor.fetchone()
        return cria_estabelecimento_com_tupla(tupla) if tupla else False

    def salvar(self, estabelecimento):  # ou atualizar, depende se passar o id
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
            sql = 'INSERT into estabelecimento (nome, cnpj, bairro, cidade, telefone) values (%s, %s, %s, %s, %s)'
            cursor.execute(sql, (estabelecimento.nome,
                                 estabelecimento.cnpj,
                                 estabelecimento.bairro,
                                 estabelecimento.cidade,
                                 estabelecimento.telefone))
            estabelecimento.id = cursor.lastrowid
        self.__db.connection.commit()
        return estabelecimento

    def deletar(self, id):
        sql = 'delete from estabelecimento where id = %s'
        self.__db.connection.cursor().execute(sql, (id, ))
        self.__db.connection.commit()


def cria_estabelecimento_com_tupla(tupla):
    aux = Estabelecimento(tupla[1], tupla[2], tupla[3], tupla[4], tupla[5])
    aux.id = tupla[0]
    return aux.__dict__


def to_dict(objs):
    return list(map(cria_estabelecimento_com_tupla, objs))
