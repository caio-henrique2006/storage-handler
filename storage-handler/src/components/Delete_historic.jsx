import * as React from 'react';
import deleteHistoric from '../hooks/deleteHistoric.jsx';
import "../style/Delete.css";

export default function Delete_historic ({ id, reLoad, storage, setIsOpen_delete_historic}) {

    function deleteProduct () {
        setIsOpen_delete_historic((b) => !b);
        deleteHistoric(storage, id, reLoad)
    }

    return (
        <div className="Delete">
            <h1>Deletar último histórico?</h1>
            <div className="Delete_flex">
                <div className="Delete_false" onClick={() => {setIsOpen_delete_historic((b) => !b)}}></div>
                <div className="Delete_true" onClick={deleteProduct}></div>
            </div>
        </div>
    )
}