import React, { Component } from "react";
import { Form } from "../components";
import request from "../services/service";

export class FormGeneric extends Component {
  constructor() {
    super();
    this.state = {
      title: "Novo Estabelecimento",
      nome: "",
      cnpj: "",
      bairro: "",
      cidade: "",
      telefone: ""
    };
  }
  onClickButton(dataForm) {
    let response = request({
      method: "POST",
      uri: "/estabelecimento",
      data: {
        nome: dataForm[0].valueInput,
        cnpj: dataForm[1].valueInput,
        bairro: dataForm[2].valueInput,
        cidade: dataForm[3].valueInput,
        telefone: dataForm[4].valueInput
      }
    });
    response.then(value => {
      if (value) {
        console.log("Adicionado");
      } else {
        console.log("Não adicionado");
      }
    });
  }

  render() {
    const { title, nome, cnpj, bairro, cidade, telefone } = this.state;
    return (
      <div>
        <Form
          title={title}
          //["Nome", "CNPJ", "Bairro", "Cidade", "Telefone"]
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
          label={"Adicionar"}
        />
      </div>
    );
  }
}
