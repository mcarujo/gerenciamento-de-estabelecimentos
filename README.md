# Gerencimento de estabelecimentos (CRUD)

Este projeto visa demonstrar um sistema web simples utilizando ReactJS para front-end e Flask microframework para o back-end.

- Para executar o prejeto basta apenas no diretorio raiz do branch master o comando abaixo. Ao finalizar o comendo você terá três containers rodando, que são: front-end, back-end e banco de dados.

  ```bash
  docker-compose -d --build
  ```

  Ao executar o mando, você pode acessar o projeto pelo `localhost` na porta padrão 80 do seu navegador.
  Para visualizar o projeto sendo executado, você pode ver este [video](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/blob/master/video.mov).

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

## Front-end

Para visualizar o código clique [aqui](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/tree/front-end).

O front-end é uma camada de visualização feita com [ReactJS](reactjs.org), onde sua única responsabilidade é visualização de dados e comunicação com uma APIRest (back-end).
dentro do front-end temos basicamente 4 telas:

- Principal (com rota '/'), é onde nela temos um texto descritivo do projeto sendo apresentado ao usuário.
- Estabelecimentos (com rota '/table') é a tela onde se encontra uma tabela de Estabelecimentos que é uma visualização dos dados presentes no banco de dados que são retornados pela APIRest.
- Adicionar (com rota '/form') é um formulário onde se é possível adicionar e editar um estabelecimento.
- Login (com rota '/login') é um pequeno formulário onde o usuário deve se autenticar para poder utilizar as telas 'Estabelecimentos' e 'Adicionar'.

Breve descrição e divisão de responsabilidade do front-end:

- [App.js](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/blob/front-end/my-app/src/App.js) contem o layout da página web, onde é reaproveitado para criação das telas 'Principal', 'Estabelecimentos' e 'Adicionar'.
- [index.js](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/blob/front-end/my-app/src/index.js) contém a configuração de rotas e navegações dentro do front-end.
- [service.js](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/blob/front-end/my-app/src/services/service.js) é responsavel por as requisições HTTP com o back-end e tratar as respostas das mesmas.
- [screen](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/tree/front-end/my-app/src/screen) Nesse diretório é colocado todas as telas do front-end para serem navegadas pelo usuário.
- [css](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/tree/front-end/my-app/src/css) este diretório tem os arquivos css da biblioteca [PureCSS](https://purecss.io/) que é importado para o ReactJS deste projeto.
- [connectors](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/tree/back-end/my-apirest/connectors) é o diretorio onde está presente as conexões com o banco de dados e suas lógicas de funcionamento.
- [components](https://github.com/mcarujo/gerenciamento-de-estabelecimentos/tree/front-end/my-app/src/components) aqui neste diretório deve ser colocando os componentes minimos para serem importados pelas telas e assim sendo reaproveitado.
