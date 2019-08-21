# Gerencimento de estabelecimentos (CRUD)

Este projeto visa demonstrar um sistema web simples utilizando ReactJS para front-end e Flask microframework para o back-end.

- Para executar o prejeto basta apenas no diretorio raiz do branch master o comando abaixo. Ao finalizar o comendo você terá três containers rodando, que são: front-end, back-end e banco de dados.

  ```bash
  docker-compose -d --build
  ```

## Back-end

Para visualizar o código clique [aqui](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/tree/back-end/my-apirest).

O back-end é uma APIRest utilizando a linguagem de programação Python e seu framework Flask.
Ela é responsável pela autenticação do front-end e manipulação de dados da classe
[Estabelecimento](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/blob/back-end/my-apirest/models/estabelecimento.py).

A autenticação foi feita manualmente mas inspirada no modelo de autenticação
[JWT](https://jwt.io), onde um usuário ao logar recebe um token e este é verificado a cada request na API.

A abstração do que representa um usuário do sistema é a classe
[User](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/blob/back-end/my-apirest/models/user.py), onde possui 3 propriedades básicas (Login, Senha e Token).
E sua conexão com o banco de dados e o controle de login, logoff e autenticação está apresentado na classe
[UserConn](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/blob/back-end/my-apirest/connectors/user_conn.py).

Algo semelhante acontece com a classe [Estabelecimento](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/blob/back-end/my-apirest/models/estabelecimento.py),
a qual representa um estabelecimento de maneira bem básico apenas com 5 propriedades (Nome, CNPJ, Bairro, Cidade, Telefone). E sua conexão com o banco de dados e ações de criar, editar, consultar e deletar (CRUD) estão representadas na classe [EstabelecimentoConn](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/blob/back-end/my-apirest/connectors/estabelecimento_conn.py).

Breve descrição e divisão de responsabilidade do back-end:

- [config.py](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/blob/back-end/my-apirest/config.py) contem as variaveis de configuração para a execução da APIRest.
- [migration.py](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/blob/back-end/my-apirest/migration.py) represeta a estrutura do banco de dados utilizando o [Flask-Migrate](https://flask-migrate.readthedocs.io/en/latest/).
- [seed.py](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/blob/back-end/my-apirest/seed.py) é responsavel por fazer a primeira população do banco de dados, onde ele irá inserir no banco o usuario com login 'flask' e senha 'flask' para que o projeto possa ser utilizado.
- [app.py](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/blob/back-end/my-apirest/app.py) aqui está o Core do Flask, este arquivo é o responsavél pela execução da APIRest.
- [views.py](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/blob/back-end/my-apirest/views.py) é onde está sendo instanciado e descrito cada rota da APIRest.
- [connectors](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/tree/back-end/my-apirest/connectors) é o diretorio onde está presente as conexões com o banco de dados e suas lógicas de funcionamento.
- [models](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/tree/back-end/my-apirest/models) é o diretorio onde está presente todos os modelos da APIRest.
- [validations](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/tree/back-end/my-apirest/validations) é o diretorio onde se encontra a válidação dos dados que vem do request feito pelo usuario.
