import * as React from 'react';

export default function SearchBar () {
    return (
        <div className="SearchBar">
            <div className="SearchBar_container">
                <input className="SearchBar_container_input" type="text" placeholder="Search.." name="search" />
            </div>
        </div>
    )
}