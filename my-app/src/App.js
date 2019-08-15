import React, { Component } from "react";
import "./css/pure-min.scss";
import "./css/side-menu.scss";
import { Link } from "react-router";

class App extends Component {
  constructor() {
    super();
    this.state = {
      SystemTitle: "Carujo's System",
      SystemSubTitle: "Apenas um exemplo de front-end para CRUD",
      menuTitle: "Principal",
      menuItems: [
        { name: "Estabelecimentos", link: "/table" },
        { name: "Adicionar", link: "/form" }
      ]
    };
  }
  render() {
    const { SystemTitle, SystemSubTitle, menuTitle, menuItems } = this.state;
    return (
      <div id="layout">
        <div className="header">
          <h1>{SystemTitle}</h1>
          <h2>{SystemSubTitle}</h2>
        </div>

        <div id="menu">
          <div className="pure-menu">
            <Link to="/" className="pure-menu-link">
              {menuTitle}
            </Link>

            <ul className="pure-menu-list">
              {menuItems.map(item => {
                const { name, link } = item;
                return (
                  <li className="pure-menu-item">
                    <Link to={link} className="pure-menu-link">
                      {name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div id="main">{this.props.children}</div>
      </div>
    );
  }
}

export default App;
