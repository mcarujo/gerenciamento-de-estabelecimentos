import React, { Component } from "react";
import { Table } from "../components";

export class TableGeneric extends Component {
  constructor() {
    super();
    this.state = {
      title: "Estabelecimentos",
      headers: ["Nome", "CNPJ", "Bairro", "Cidade", "Telefone"],
      lines: [
        [
          "J&M Plásticos",
          "78.112.472/0001-23",
          "Messejana",
          "Fortaleza",
          "558532258997"
        ],
        [
          "G5 Belezaria e Perfumes",
          "22.141.543/0001-61",
          "Aldeota",
          "Fortaleza",
          "558522268192"
        ],
        [
          "Supermercado Avelino",
          "88.671.450/0001-57",
          "Meireles",
          "Fortaleza",
          "558522259997"
        ],
        [
          "Academia Fique Fino",
          "93.066.399/0001-94",
          "Romeirao",
          "Juazeiro do Norte",
          "558532258997"
        ]
      ]
    };
  }

  render() {
    const { title, headers, lines } = this.state;
    return (
      <div>
        <Table title={title} headers={headers} lines={lines} />
      </div>
    );
  }
}
