import React, { Component } from "react";
import "./Table.scss";

export class Table extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, headers, lines } = this.props;
    return (
      <div className="table" id="content">
        <h4 className="titleTable">{title}</h4>
        <table className="pure-table pure-table-bordered">
          <thead>
            <tr>
              {headers.map(header => {
                return <th>{header}</th>;
              })}
              <th colSpan={2} />
            </tr>
          </thead>
          <tbody>
            {lines.length === 0 ? (
              <tr>
                <td
                  style={{ textAlign: "center" }}
                  colSpan={headers.length + 2}
                >
                  Sem registros
                </td>
              </tr>
            ) : (
              lines.map(line => {
                return (
                  <tr>
                    {line.map(field => {
                      return <td>{field}</td>;
                    })}
                    <td>
                      <a
                        class="pure-button pure-button-primary"
                        onClick={() => {
                          this.props.onClickButtonEdit({
                            id: line[0],
                            nome: line[1],
                            cnpj: line[2],
                            bairro: line[3],
                            cidade: line[4],
                            telefone: line[5]
                          });
                        }}
                      >
                        {" "}
                        Editar{" "}
                      </a>
                    </td>
                    <td>
                      <a
                        class="pure-button button-error"
                        onClick={() => {
                          this.props.onClickButtonDelete(line[0]);
                        }}
                      >
                        {" "}
                        Excluir{" "}
                      </a>
                    </td>{" "}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
