import * as React from "react";
import "../style/SearchBar.css";

import { useRef } from "react";

export default function SearchBar({ setSearchValue }) {
  const searchValue = useRef();

  function updateValue() {
    setSearchValue(searchValue.current.value);
  }

  return (
    <div className="SearchBar">
        <input
          ref={searchValue}
          onChange={updateValue}
          className="SearchBar_container_input"
          type="text"
          placeholder="Procurar..."
          name="search"
        />
    </div>
  );
}
