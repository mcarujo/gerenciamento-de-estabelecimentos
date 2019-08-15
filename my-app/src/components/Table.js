import React, { Component } from "react";
import "./Table.scss";

export class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      headers: this.props.headers,
      lines: this.props.lines
    };
  }

  render() {
    const { title, headers, lines } = this.state;
    console.log(this.state);
    return (
      <div className="content" id="content">
        <h4 className="titleTable">{title}</h4>
        <table className="pure-table pure-table-bordered">
          <thead>
            <tr>
              {headers.map(header => {
                return <th>{header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {lines.map(line => {
              return (
                <tr>
                  {line.map(field => {
                    return <td>{field}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
