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
      <div className="form" id="content">
        <h4 className="titleForm">{title}</h4>
        <div className="pure-form pure-form-aligned">
          <form class="pure-form pure-form-aligned">
            <fieldset>
              {inputs.map((input, key) => {
                const { nameInput, typeInput, valueInput } = input;
                return (
                  <div class="pure-control-group">
                    <label htmlFor={typeInput}>{nameInput}</label>
                    <input
                      class="pure-input-1-3"
                      type={typeInput}
                      name={nameInput}
                      value={valueInput}
                      onChange={e => this.changeForm(key, e.target.value)}
                    />
                    <span class="margin-span">This is a required field.</span>
                  </div>
                );
              })}
            </fieldset>

            <button
              className="pure-button pure-button-primary margin-button"
              onClick={event => {
                event.preventDefault();
                onClickButton(inputs);
              }}
            >
              {label}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export { Form };
