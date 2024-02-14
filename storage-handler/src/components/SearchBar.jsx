import * as React from 'react';

export default function SearchBar () {
    return (
        <div class="SearchBar">
            <div class="SearchBar_container">
                <input type="text" placeholder="Search.." name="search" />
                <button type="submit"><i class="fa fa-search"></i></button>
            </div>
        </div>
    )
}