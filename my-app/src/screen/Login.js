import React, { Component } from "react";
import { Form } from "../components";
import request from "../services/service";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      title: "Login",
      login: "",
      senha: ""
    };
  }
  onClickButton(dataForm) {
    let response = request({
      method: "LOGIN",
      uri: "/estabelecimento",
      data: { login: dataForm.login, senha: dataForm.senha }
    });
    response.then(value => {
      console.log(value);
    });
  }

  render() {
    const { title, login, senha } = this.state;
    return (
      <div className="content" id="content">
        <div>
          <Form
            title={title}
            inputs={[
              {
                nameInput: "Login",
                typeInput: "text",
                valueInput: login
              },
              {
                nameInput: "Password",
                typeInput: "password",
                valueInput: senha
              }
            ]}
            onClickButton={this.onClickButton}
            label={"Login"}
          />
        </div>
      </div>
    );
  }
}
