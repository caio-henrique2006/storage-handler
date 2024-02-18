import * as React from 'react';

export default function SearchBar () {
    return (
        <div className="SearchBar">
            <div className="SearchBar_container">
                <input className="SearchBar_container_input" type="text" placeholder="Procurar..." name="search" />
            </div>
        </div>
    )
}