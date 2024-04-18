import * as React from "react";
import "../style/Card.css";

export default function Card({ name, storage, price, id, setId, reLoad }) {
  // Função de renderizar propriedades:
  function set() {
    setId(id);
    reLoad((b) => !b);
  }

  return (
    <div onClick={set} className="Card">
      <div className="Card_left_flex">
        <div className="Card_storage">
          <p>{storage}</p>
        </div>
        <div className="Card_name">
          <p>{name}</p>
        </div>
      </div>
      <div className="Card_price">
        <p>R$ {price}</p>
      </div>
    </div>
  );
}
