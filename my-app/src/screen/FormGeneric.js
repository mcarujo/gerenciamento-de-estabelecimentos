import React, { Component } from "react";
import { Form } from "../components";

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
    // What you should do with the form datas...
    console.log(dataForm);
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
