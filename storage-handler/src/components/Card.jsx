import * as React from 'react';
import "../style/Card.css";

export default function Card ({name, storage, price, id, setId, reLoad}) {

    // Função de renderizar propriedades:
    function set () {
        setId(id);
        reLoad((b) => !b);
    }

    return(
        <div onClick={set} className="Card">
            <div className="Card_left">
                <p className="Card_left_storage">{storage}</p>
                <p>{name}</p>
            </div>
            <p>{price}</p>
        </div>
    )
}