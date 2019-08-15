import React, { Component } from "react";
import { Form } from "../components";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      title: "Login",
      name: "",
      email: "",
      password: ""
    };
  }
  onClickButton(dataForm) {
    // What you should do with the form datas...
    console.log(dataForm);
  }

  render() {
    const { title, name, password } = this.state;
    return (
      <div className="content" id="content">
        <div>
          <Form
            title={title}
            inputs={[
              {
                nameInput: "Login",
                typeInput: "text",
                valueInput: name
              },
              {
                nameInput: "Password",
                typeInput: "password",
                valueInput: password
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
