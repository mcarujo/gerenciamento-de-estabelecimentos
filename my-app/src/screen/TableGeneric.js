import React, { Component } from "react";
import { Table } from "../components";
import request from "../services/service";

export class TableGeneric extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Estabelecimentos",
      headers: ["#", "Nome", "CNPJ", "Bairro", "Cidade", "Telefone"],
      lines: []
    };
    this.loadData = this.loadData.bind(this);
  }
  loadData() {
    let response = request({
      method: "GET",
      uri: "/estabelecimento",
      data: null
    });
    response.then(values => {
      var aux = values.map(value => {
        return [
          value.id,
          value.nome,
          value.cnpj,
          value.bairro,
          value.cidade,
          value.telefone
        ];
      });
      this.setState({ lines: aux });
    });
  }
  componentDidMount() {
    this.loadData();
  }
  render() {
    const { title, headers, lines } = this.state;
    console.log(this.state);
    return (
      <div>
        <Table title={title} headers={headers} lines={lines} />
      </div>
    );
  }
}
