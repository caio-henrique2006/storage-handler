import * as React from 'react';
import { useState } from 'react';

// components:
import Historic from './Historic.jsx';
import EntryExit from './EntryExit.jsx';
import Delete from './Delete.jsx';

export default function Properties ({ name, storage, price, description, id, reLoad, loadValue}) {

    const [isOpen_Delete, setIsOpen_Delete] = useState(false);
    const [isOpen_entryExit, setIsOpen_entryExit] = useState(false);
    const [entryOrExit, setEntryOrExit] = useState("");

    // Function for opening, closing and changing the modal entry and exit:
    const changeToEntry = () => {
        setIsOpen_entryExit(!isOpen_entryExit);
        setEntryOrExit("Entrada");
    }
    const changeToExit = () => {
        setIsOpen_entryExit(!isOpen_entryExit);
        setEntryOrExit("Saída");
    }

    return(
        <div className="Properties">

            <div className="Delete_icon" onClick={() => {setIsOpen_Delete(!isOpen_Delete)}}></div>

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
                    isOpen_entryExit ? <EntryExit 
                    setIsOpen={setIsOpen_entryExit} 
                    entryOrExit={entryOrExit} 
                    storage={storage}
                    id={id}
                    reLoad={reLoad}
                    /> : null
                }
            </div>
            <div>
                {
                    isOpen_Delete ? <Delete 
                        id={id}
                        reLoad={reLoad}
                        setIsOpen_Delete={setIsOpen_Delete}
                    /> : null
                }
            </div>
            <p className="Properties_historic"><b>Histórico:</b> </p>
            <div className="Properties_historic_content">
                <Historic 
                    id={id}
                    loadValue={loadValue}
                />
            </div>
        </div>
    )
}