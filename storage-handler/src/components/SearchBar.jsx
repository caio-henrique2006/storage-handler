import * as React from "react";
import "../style/SearchBar.css";

export default function SearchBar() {
  return (
    <div className="SearchBar">
      <div className="SearchBar_container">
        <input
          className="SearchBar_container_input"
          type="text"
          placeholder="Procurar..."
          name="search"
        />
      </div>
    </div>
  );
}
