import * as React from "react";
import insertHistoric from "../hooks/insertHistoric.jsx";

import "../style/EntryExit.css";
import "../style/Modal.css";

import { useRef } from "react";
import swal from "sweetalert";

// Entry and exit modal
export default function EntryExit({
  setIsOpen,
  entryOrExit,
  storage,
  id,
  reLoad,
}) {
  const quantity = useRef();
  const date = useRef();

  function addHistoric() {
    console.log(date.current.value);
    const isEntry = entryOrExit == "Entrada" ? true : false;
    if (!isEntry && parseInt(storage) - parseInt(quantity.current.value) < 0) {
      swal(
        `Você possui apenas ${storage} em estoque, por isso você não pode retirar a quantidade: ${quantity.current.value}`
      );
    } else {
      setIsOpen(false);
      const newStorage = isEntry
        ? parseInt(storage) + parseInt(quantity.current.value)
        : parseInt(storage) - parseInt(quantity.current.value); // Calcula a nova quantidade armazenada;
      insertHistoric(
        isEntry,
        quantity.current.value,
        date.current.value,
        newStorage,
        id,
        reLoad
      ); // Adicionando produto ao banco de dados
    }
  }

  return (
    <div className="EntryExit_Modal">
      <form onSubmit={addHistoric}>
        <h1 className="Modal_h1">{entryOrExit}</h1>
        <p className="Modal_p">Quantidade:</p>
        <input type="number" className="Modal_input" ref={quantity} required />
        <p className="Modal_p">Data:</p>
        <input type="date" className="Modal_input" ref={date} required />
        <input type="submit" className="Modal_ok" value="ok" />
        <div
          className="Modal_close"
          onClick={() => {
            setIsOpen(false);
          }}
        />
      </form>
    </div>
  );
}
