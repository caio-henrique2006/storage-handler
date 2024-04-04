import * as React from 'react';

// Compoenentes:
import SearchBar from "./SearchBar.jsx"
import Add from "./Add.jsx"

export default function Header ({reLoad, loadValue}) {
    return (
        <div className="Header">
            <div className="Header_content">
                <SearchBar/>
                <Add
                    reLoad={reLoad}
                    loadValue={loadValue}
                />
            </div>
        </div>
    )
}