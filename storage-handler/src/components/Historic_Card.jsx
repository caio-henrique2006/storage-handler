import * as React from "react";
import "../style/Historic.css";

export default function Historic_Card({ isEntry, quantity, date }) {
  return (
    <div className="Historic_Card">
      <p>{isEntry}</p>
      <p>{quantity}</p>
      <p>{date}</p>
    </div>
  );
}
