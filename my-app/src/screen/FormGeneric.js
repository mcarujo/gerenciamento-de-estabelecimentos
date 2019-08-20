import React, { Component } from "react";
import { Form } from "../components";
import request from "../services/service";
import { browserHistory } from "react-router";

export class FormGeneric extends Component {
  constructor(props) {
    super(props);
    const edit = this.props.location.state;
    this.state = {
      edit: edit ? true : false,
      title: edit
        ? `Editando Estabelecimento - ${edit.id}`
        : "Novo Estabelecimento",
      label: edit ? "Editar" : "Adicionar",
      id: edit ? edit.id : "",
      nome: edit ? edit.nome : "",
      cnpj: edit ? edit.cnpj : "",
      bairro: edit ? edit.bairro : "",
      cidade: edit ? edit.cidade : "",
      telefone: edit ? edit.telefone : ""
    };
    this.onClickButton = this.onClickButton.bind(this);
  }
  onClickButton(dataForm) {
    let response = request({
      method: this.state.edit ? "PUT" : "POST",
      uri: "/estabelecimento",
      data: {
        id: this.state.id,
        nome: dataForm[0].valueInput,
        cnpj: dataForm[1].valueInput,
        bairro: dataForm[2].valueInput,
        cidade: dataForm[3].valueInput,
        telefone: dataForm[4].valueInput
      }
    });
    response.then(value => {
      if (value) {
        this.setState({
          nome: "",
          cnpj: "",
          bairro: "",
          cidade: "",
          telefone: ""
        });
        browserHistory.push("/table");
      } else {
      }
    });
  }

  render() {
    const { title, nome, cnpj, bairro, cidade, telefone, label } = this.state;
    return (
      <div>
        <Form
          title={title}
          inputs={[
            {
              nameInput: "Nome",
              typeInput: "text",
              valueInput: nome
            },
            {
              nameInput: "CNPJ",
              typeInput: "text",
              valueInput: cnpj
            },
            {
              nameInput: "Bairro",
              typeInput: "text",
              valueInput: bairro
            },
            {
              nameInput: "Cidade",
              typeInput: "text",
              valueInput: cidade
            },
            {
              nameInput: "Telefone",
              typeInput: "text",
              valueInput: telefone
            }
          ]}
          onClickButton={this.onClickButton}
          label={label}
        />
      </div>
    );
  }
}
