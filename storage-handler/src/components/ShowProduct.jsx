import * as React from "react";
import "../style/ShowProduct.css";
import { useState, useEffect } from "react";
import fetchProduct from "../hooks/fetchProducts.jsx";

// Components:
import Card from "./Card.jsx";

export default function ShowProduct({ setId, reLoad, loadValue }) {
  // States:
  const [data, setData] = useState(null);

  // Execute after render:
  useEffect(() => {
    fetchProduct(setData);
    console.log(data);
  }, [loadValue]); // Load is used to make the useEffect only render when he changes.

  return (
    <div className="ShowProduct_Card">
      {
        // Check if the value of data is null and render the cards
        data == null
          ? null
          : data.map((item) => {
              return (
                <Card
                  key={item.product_id}
                  name={item.name}
                  storage={item.storage}
                  price={item.price}
                  id={item.product_id}
                  setId={setId}
                  reLoad={reLoad}
                />
              );
            })
      }
    </div>
  );
}
