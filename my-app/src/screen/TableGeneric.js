import React, { Component } from "react";
import { Table } from "../components";
import { browserHistory } from "react-router";
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

  onClickButtonEdit(dataForm) {
    browserHistory.push({
      pathname: "/form",
      state: {
        edit: true,
        id: dataForm.id,
        nome: dataForm.nome,
        cnpj: dataForm.cnpj,
        bairro: dataForm.bairro,
        cidade: dataForm.cidade,
        telefone: dataForm.telefone
      }
    });
  }

  onClickButtonDelete(id) {
    let response = request({
      method: "DELETE",
      uri: `/estabelecimento/${id}`,
      data: null
    });
    response.then(value => {
      if (value) {
        this.loadData();
      } else {
        console.log("Erro")
      }
    });
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
    const { title, headers, lines, formEdit } = this.state;
    return (
      <div>
        <Table
          title={title}
          headers={headers}
          lines={lines}
          onClickButtonEdit={this.onClickButtonEdit}
          onClickButtonDelete={this.onClickButtonDelete}
        />
      </div>
    );
  }
}
