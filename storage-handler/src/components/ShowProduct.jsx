import * as React from "react";
import "../style/ShowProduct.css";
import { useState, useEffect } from "react";
import fetchProduct from "../hooks/fetchProducts.jsx";

// Components:
import Card from "./Card.jsx";

export default function ShowProduct({ setId, id, reLoad, loadValue, searchValue }) {
  // States:
  const [data, setData] = useState(null);

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
              if (
                searchValue === "" ||
                searchValue.toLowerCase() ===
                  item.name.slice(0, searchValue.length).toLowerCase()
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
