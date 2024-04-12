import * as React from 'react';
import "../style/Properties.css";
import { useState } from 'react';

// Components:
import Historic from './Historic.jsx';
import EntryExit from './EntryExit.jsx';
import Edit from './Edit.jsx';
import Delete from './Delete.jsx';
import Delete_historic from './Delete_historic.jsx';

export default function Properties ({ name, storage, price, description, id, reLoad, loadValue}) {

    const [isOpen_Edit, setIsOpen_Edit] = useState(false);
    const [isOpen_delete_historic, setIsOpen_delete_historic] = useState(false);
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
            {/* Open Modals */}
            <div>
                {
                    isOpen_Edit ? <Edit
                        name={name}
                        storage={storage}
                        price={price}
                        description={description}
                        id={id}
                        setIsOpen={setIsOpen_Edit}
                        reLoad={reLoad}
                    /> : null
                }
            </div>
            <div>
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
            <div>
                {
                    isOpen_delete_historic ? <Delete_historic
                        id={id}
                        reLoad={reLoad}
                        storage={storage}
                        setIsOpen_delete_historic={setIsOpen_delete_historic}
                    /> : null
                }
            </div>

            {/* Properties component */}
            <div className="Delete_icon" onClick={() => {setIsOpen_Delete(!isOpen_Delete)}}></div>
            <div className= "Edit_icon" onClick={() => setIsOpen_Edit((b) => !b)}></div>
            <p className="Properties_title">{name}</p>

            <p className="Properties_properties"><b>Total em estoque:</b> {storage}</p>
            <p className="Properties_properties"><b>Preço:</b> {price}</p>
            <p className="Properties_properties"><b>Descrição:</b> {description}</p>
            <div className="Properties_buttons">
                <div onClick={changeToEntry}>Entrada</div>
                <div onClick={changeToExit}>Saída</div>
            </div>
            <div>
                <p className="Properties_historic"><b>Histórico:</b> </p>
                <div className="Delete_false" style={{width: 28, height: 28, float: 'right'}} onClick={() => {setIsOpen_delete_historic((b) => !b)}}></div>
            </div>
            <div className="Properties_historic_content">
                <Historic 
                    id={id}
                    loadValue={loadValue}
                />
            </div>
        </div>
    )
}