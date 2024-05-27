import * as React from "react";
import "../style/Header.css";

// Compoenentes:
import SearchBar from "./SearchBar.jsx";
import Add from "./Add.jsx";
import SideMenu from "./SideMenu.jsx";

export default function Header({ reLoad, setSearchValue }) {
  return (
    <div className="Header">
      <div className="Header_content">
        <SideMenu />
        <SearchBar setSearchValue={setSearchValue} />
        <Add reLoad={reLoad} />
      </div>
    </div>
  );
}
