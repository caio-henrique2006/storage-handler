import * as React from 'react';

import deleteProduct from '../hooks/deleteProduct.jsx';
import "../style/Delete.css";

export default function Delete ({ id, reLoad, setIsOpen_Delete}) {

    function deleteProductClick () {
        setIsOpen_Delete((b) => !b);
        deleteProduct(id, reLoad);
    }

    return (
        <div className="Delete">
            <h1>Deletar produto?</h1>
            <div className="Delete_flex">
                <div className="Delete_false" onClick={() => {setIsOpen_Delete((b) => !b)}}></div>
                <div className="Delete_true" onClick={deleteProductClick}></div>
            </div>
        </div>
    )
}