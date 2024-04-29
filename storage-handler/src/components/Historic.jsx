import * as React from "react";
import "../style/Historic.css";
import { useState, useEffect } from "react";

// hooks:
import fetchHistoric from "../hooks/fetchHistoric.jsx";

// components:
import Historic_Card from "./Historic_Card.jsx";

export default function Historic({ id, loadValue }) {
  const [data, setData] = useState(null);

  // Executes after render:
  useEffect(() => {
    console.log("The id is: ", id);
    fetchHistoric(id, setData); // Fetch historic of a product;
  }, [loadValue]);

  return (
    <div className="Historic">
      {
        // console.log(data, id)
        data &&
          data.toReversed().map((item) => {
            return (
              <Historic_Card
                key={item.historic_id}
                isEntry={item.isEntry ? "Entrada" : "Saída"}
                quantity={item.quantity}
                date={item.date}
              />
            );
          })
      }
    </div>
  );
}
