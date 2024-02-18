import * as React from 'react';

// Compoenentes:
import SearchBar from "./SearchBar.jsx"
import Add from "./Add.jsx"

export default function Header () {
    return (
        <div className="Header">
            <div className="Header_content">
                <SearchBar/>
                <Add/>
            </div>
        </div>
    )
}