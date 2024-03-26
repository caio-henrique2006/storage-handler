import * as React from 'react';

export default function Card ({name, storage, price, id}) {
    return(
        <div onClick={() => {console.log(id)}} className="Card">
            <div className="Card_left">
                <p className="Card_left_storage">{storage}</p>
                <p>{name}</p>
            </div>
            <p>{price}</p>
        </div>
    )
}