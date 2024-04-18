import * as React from "react";
import "../style/Header.css";

// Compoenentes:
import SearchBar from "./SearchBar.jsx";
import Add from "./Add.jsx";

export default function Header({ reLoad }) {
  return (
    <div className="Header">
      <div className="Header_content">
        <SearchBar />
        <Add reLoad={reLoad} />
      </div>
    </div>
  );
}
