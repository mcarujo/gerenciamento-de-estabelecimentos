import React, { Component } from "react";
import { Table } from "../components";
import request from "../services/service";

export class TableGeneric extends Component {
  constructor() {
    super();
    this.state = {
      title: "Estabelecimentos",
      headers: ["#", "Nome", "CNPJ", "Bairro", "Cidade", "Telefone"],
      lines: []
    };
  }

  loadData() {
    let response = request({
      method: "GET",
      uri: "/estabelecimento",
      data: null
    });
    response.then(value => {
      console.log(value);
    });
  }

  render() {
    const { title, headers, lines } = this.state;
    return (
      <div>
        <Table title={title} headers={headers} lines={lines} />
      </div>
    );
  }
}
