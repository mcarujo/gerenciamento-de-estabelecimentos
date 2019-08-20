import React, { Component } from "react";

export class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" class="menu-link">
          <span />
        </a>

        <div id="main">
          <div class="content">
            <h2 class="content-subhead">O projeto foi dividido em 3 partes.</h2>
            <p>
              <a href="https://github.com/mcarujo/gerenciamento-de-estabelecimentos">
                Master(Docker)
              </a>
              é o branch responsável por iniciar os dois micro serviços,
              front-end e back-end. Dentro dele você vai encontrar dois
              'Dockerfile' nos diretórios 'back-end' e 'front-end'. Ambos criam
              o ambiente para execução dos seus respectivos serviços.
            </p>
            <p>
              <a href="https://github.com/mcarujo/gerenciamento-de-estabelecimentos/tree/back-end">
                Back-end
              </a>
              foi feito com o 'microframework'{" "}
              <a href="https://flask.palletsprojects.com/en/1.1.x/">flask</a>
              onde foi separado o 'model' do 'connector' utilizando os conceitos
              dos{" "}
              <a hred="https://www.eduardopires.net.br/2013/04/orientacao-a-objeto-solid/">
                SOLID
              </a>
              . A estrutura do banco de dados é feita pelo{" "}
              <a href="https://flask-migrate.readthedocs.io/en/latest/">
                flask-migrate
              </a>
              . Todas as rotas estão instanciadas no arquivo{" "}
              <a hred="https://github.com/mcarujo/gerenciamento-de-estabelecimentos/blob/back-end/my-apirest/views.py">
                views.py
              </a>
            </p>
            <p>
              <a href="https://github.com/mcarujo/gerenciamento-de-estabelecimentos/tree/front-end">
                Front-end
              </a>
              feito em <a hred="https://reactjs.org/">React JS</a> onde
              basicamente foi construída quatro telas: Home, Form, Table e
              Login. Estas estão no diretório
              <a hred="https://github.com/mcarujo/gerenciamento-de-estabelecimentos/tree/front-end/my-app/src/screen">
                screen
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    );
  }
}
