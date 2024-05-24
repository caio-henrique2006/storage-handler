import * as React from "react";
import "../style/ShowProduct.css";
import { useState, useEffect } from "react";
import fetchProduct from "../hooks/fetchProducts.jsx";

// Components:
import Card from "./Card.jsx";

export default function ShowProduct({ setId, id, reLoad, loadValue, searchValue }) {
  // States:
  const [data, setData] = useState(null);

  // Auxilia o search:
  function auxiliaSearch (lista, procurado) {
    let isTrue = false
    lista.forEach(element => {
      // console.log(element, element.slice(0, procurado.length), procurado);
      if (element.slice(0, procurado.length).toLowerCase() === procurado) {
        // console.log("true")
        isTrue = true
      }
    });
    return isTrue
  }

  // Execute after render:
  useEffect(() => {
    fetchProduct(setData);
    console.log(data);
  }, [loadValue]); // Load is used to make the useEffect only render when he changes.

  return (
    <div className="ShowProduct_Card">
      {console.log("Search Value: ", searchValue)}
      {
        // Check if the value of data is null and render the cards
        data == null
          ? null
          : data.map((item) => {
              console.log(auxiliaSearch(item.name.split(" "), searchValue.toLowerCase()))
              // Procura os produtos que correspondem a busca do usuário:
              if (
                // Checa se a barra de pesquisa está vazia:
                searchValue === "" ||
                // Checa se o valor procurado é igual ao produto com o mesmo número de caracteres:
                searchValue.toLowerCase() ===
                item.name.slice(0, searchValue.length).toLowerCase() ||
                // Checa se o valor procurado é igual a alguma palavra do produto:
                auxiliaSearch(item.name.split(" "), searchValue.toLowerCase())
              ) {
                return (
                  <Card
                    key={item.product_id}
                    name={item.name}
                    storage={item.storage}
                    price={item.price}
                    id={item.product_id}
                    setId={setId}
                    reLoad={reLoad}
                    isSelected={item.product_id == id ? true : false}
                  />
                );
              }
            })
      }
    </div>
  );
}
