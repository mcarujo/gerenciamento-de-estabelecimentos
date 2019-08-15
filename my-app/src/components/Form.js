import React, { Component } from "react";
import "./Form.scss";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      inputs: this.props.inputs
    };
  }

  changeForm(index, value) {
    let inputs = this.state.inputs;
    inputs[index].valueInput = value;
    this.setState({ inputs });
  }
  render() {
    const { onClickButton, label } = this.props;
    const { title, inputs } = this.state;
    return (
      <div className="content" id="content">
        <h4 className="titleForm">{title}</h4>
        <div className="pure-form pure-form-aligned">
          <form className="pure-form pure-form-aligned">
            <div className="pure-control-group">
              <label />
              <div className="form-possition">
                {inputs.map((input, key) => {
                  const { nameInput, typeInput, valueInput } = input;
                  return (
                    <div className="pure-control-group">
                      <label htmlFor={typeInput}>{nameInput}</label>
                      <input
                        type={typeInput}
                        name={nameInput}
                        value={valueInput}
                        onChange={e => this.changeForm(key, e.target.value)}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="button-possition">
                <button
                  className="pure-button pure-button-primary"
                  onClick={event => {
                    event.preventDefault();
                    onClickButton(inputs);
                  }}
                >
                  {label}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export { Form };
