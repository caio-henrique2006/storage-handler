import * as React from "react";
import "../style/Historic.css";

export default function Historic_Card({ isEntry, quantity, date }) {
  return (
    <div className="Historic_Card">
      <p className="Historic_Card_EntryExit" style={{width: '50px'}}>{isEntry}</p>
      <p className="Historic_Card_EntryExit">{quantity}</p>
      <p className="Historic_Card_EntryExit">{date.split("-").reverse().join("/")}</p>
    </div>
  );
}
