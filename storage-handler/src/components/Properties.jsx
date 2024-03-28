import * as React from 'react';
import { useState } from 'react';

// components:
import Historic from './Historic.jsx';
import EntryExit from './EntryExit.jsx';

export default function Properties ({ name, storage, price, description, id }) {

    const [isOpen, setIsOpen] = useState(false);
    const [entryOrExit, setEntryOrExit] = useState("");

    // Function for opening, closing and changing the modal entry and exit
    const changeToEntry = () => {
        setIsOpen(!isOpen);
        setEntryOrExit("Entrada");
    }
    const changeToExit = () => {
        setIsOpen(!isOpen);
        setEntryOrExit("Saída");
    }

    return(
        <div className="Properties">
            <p className="Properties_title">{name}</p>
            <p className="Properties_properties"><b>Total em estoque:</b> {storage}</p>
            <p className="Properties_properties"><b>Preço:</b> {price}</p>
            <p className="Properties_properties"><b>Descrição:</b> {description}</p>
            <div className="Properties_buttons">
                <div onClick={changeToEntry}>Entrada</div>
                <div onClick={changeToExit}>Saída</div>
            </div>
            <div>
                {/* Opens the modal */}
                {
                    isOpen ? <EntryExit setIsOpen={setIsOpen} entryOrExit={entryOrExit} id={id}/> : null
                }
            </div>
            <p className="Properties_historic"><b>Histórico:</b> </p>
            <div className="Properties_historic_content">
                <Historic 
                    id={id}
                />
            </div>
        </div>
    )
}