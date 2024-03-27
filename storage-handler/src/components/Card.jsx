import * as React from 'react';

export default function Card ({name, storage, price, id, setId, rerender}) {

    function set () {
        setId(id);
        rerender(id);
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