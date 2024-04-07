import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import slash from 'slash';

// const { ipcRenderer } = window.require('electron');

export default function Add ({ reLoad }) {

    const productName = useRef();
    const productStorage = useRef();
    const productPrice = useRef();
    const productDescription = useRef();
    const [isOpen, setIsOpen] = useState(false);

    function addProduct() {
        setIsOpen(!isOpen);
        async function addProductDatabase(name, storage, price, description) {
            const sqlite3 = require('sqlite3').verbose();
            const path = require('path');
            const dbPath = slash(path.resolve('src/database/dataBase.db'));
        
            let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log("Connected to the sqlite data");
            });
        
            db.run(`INSERT INTO product(name,storage,price,description) VALUES(?, ?, ?, ?)`, [name, storage, price, description], function(err) {
                if (err) {
                  return console.log(err.message);
                }
                // get the last insert id
                reLoad((b) => !b); // Provoca a re-renderização do app;
            });
        
            db.close((err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log("Close database connection");
            });
        }
        addProductDatabase(productName.current.value, productStorage.current.value, productPrice.current.value, productDescription.current.value)
    }

    function Modal () {
        return (
            <div className="Modal">
                <h1 className="Modal_h1">Novo Produto</h1>
                <div className="Modal_grid">
                    <div className="Modal_left">
                        <p className="Modal_p">Nome do produto:</p>
                        <input className="Modal_input" ref={productName}/>
                        <p className="Modal_p">Estoque:</p>
                        <input type="number" className="Modal_input" ref={productStorage}/>
                        <p className="Modal_p">Preço:</p>
                        <input type="number" className="Modal_input" ref={productPrice}/>
                    </div>
                    <div className="Modal_right">
                        <p className="Modal_p">Descrição</p>
                        <textarea className="Modal_textarea" ref={productDescription}/>
                    </div>
                </div>
                <div className="Modal_close" onClick={() => {setIsOpen(!isOpen)}}/>
                <div className="Modal_ok" onClick={addProduct}>Criar</div>
            </div>
        )
    }

    return (
        <div className="Add">
            <div className="Add_icon" onClick={() => {setIsOpen(!isOpen)}}>
            </div>
            <div className="Add_Modal">
                {
                    isOpen ? <Modal isOpen={isOpen}/> : null
                }
            </div>
        </div>
    ) 
}

// function openModal() {
//     console.log("Clicked")
//     ipcRenderer.send('open-add-modal');
// }