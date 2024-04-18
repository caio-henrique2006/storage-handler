import * as React from "react";
import "../style/Modal.css";
import "../style/Edit.css";

// Hooks:
import { useRef } from "react";
import updateProduct from "../hooks/updateProduct.jsx";

// const { ipcRenderer } = window.require('electron');

export default function Edit({
  name,
  storage,
  price,
  description,
  id,
  setIsOpen,
  reLoad,
}) {
  const productName = useRef();
  const productStorage = useRef();
  const productPrice = useRef();
  const productDescription = useRef();

  function editProduct() {
    setIsOpen((b) => !b);
    updateProduct(
      productName.current.value,
      productStorage.current.value,
      productPrice.current.value,
      productDescription.current.value,
      id,
      reLoad
    );
  }

  return (
    <div className="Modal">
      <form onSubmit={editProduct}>
        <h1 className="Modal_h1">Editar {name}</h1>
        <div className="Modal_grid">
          <div className="Modal_left">
            <p className="Modal_p">Nome do produto:</p>
            <input
              className="Modal_input"
              ref={productName}
              defaultValue={name}
              required
            />
            <p className="Modal_p">Estoque:</p>
            <input
              type="number"
              className="Modal_input"
              ref={productStorage}
              defaultValue={storage}
              required
            />
            <p className="Modal_p">Preço:</p>
            <input
              type="number"
              className="Modal_input"
              defaultValue={price}
              ref={productPrice}
            />
          </div>
          <div className="Modal_right">
            <p className="Modal_p">Descrição:</p>
            <textarea
              className="Modal_textarea"
              defaultValue={description}
              ref={productDescription}
            />
          </div>
        </div>
        <div
          className="Modal_close"
          onClick={() => {
            setIsOpen((b) => !b);
          }}
        />
        <input type="submit" className="Modal_ok" value="Editar" />
      </form>
    </div>
  );
}
