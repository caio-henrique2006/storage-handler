import * as React from 'react';
import { useState } from 'react';

// components:
import Historic from './Historic.jsx';

export default function Properties ({ name, storage, price, description }) {

    const [isOpen, setIsOpen] = useState(false);
    const [entryOrExit, setEntryOrExit] = useState("");

    const openClose = () => {
        setIsOpen(!isOpen);
    }
    const changeToEntry = () => {
        setIsOpen(!isOpen);
        setEntryOrExit("Entrada");
    }
    const changeToExit = () => {
        setIsOpen(!isOpen);
        setEntryOrExit("Saída");
    }

    function EntryExit () {
        return (
            <div className="EntryExit_Modal">
                <h1 className="Modal_h1">{entryOrExit}</h1>
                <p className="Modal_p">Quantidade:</p>
                <input type="number" className="Modal_input"/>
                <p className="Modal_p">Data:</p>
                <input type="date" className="Modal_input"/>
                <div className="Modal_ok">Ok</div>
                <div className="Modal_close" onClick={openClose}/>
            </div>
        )
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
                {
                    isOpen ? <EntryExit isOpen={isOpen}/> : null
                }
            </div>
            <p className="Properties_historic"><b>Histórico:</b> </p>
            <div className="Properties_historic_content">
                <Historic />
            </div>
        </div>
    )
}