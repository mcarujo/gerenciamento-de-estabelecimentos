import random
import string


class User:
    def __init__(self, login, senha, token):
        self.login = login
        self.senha = senha
        self.token = token
