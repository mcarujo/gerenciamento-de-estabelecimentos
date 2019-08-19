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
            <a href="https://github.com/mcarujo/gerenciamento-de-estabelecimentos/tree/front-end">Master(Docker)</a>
            </p>
            <p>
            <a href="https://github.com/mcarujo/gerenciamento-de-estabelecimentos/tree/front-end">Back-end</a>
            </p>
            <p>
            <a href="https://github.com/mcarujo/gerenciamento-de-estabelecimentos/tree/front-end">Front-end</a>
            </p>

          </div>
        </div>
      </div>
    );
  }
}
