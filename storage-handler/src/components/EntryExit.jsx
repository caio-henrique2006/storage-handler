import * as React from 'react';
import {useRef} from 'react';
import slash from 'slash';
import swal from "sweetalert"; 

// Entry and exit modal
export default function EntryExit ({setIsOpen, entryOrExit, storage, id, reLoad}) {

    const quantity = useRef();
    const date = useRef();

    function addHistoric () {
        const isEntry = entryOrExit == "Entrada" ? true : false;
        if (!isEntry && parseInt(storage)-parseInt(quantity.current.value) < 0) {
            swal(`Você possui apenas ${storage} em estoque, por isso você não pode retirar a quantidade: ${quantity.current.value}`);
        } else {
            setIsOpen(false);
            const newStorage = isEntry ? parseInt(storage)+parseInt(quantity.current.value) : parseInt(storage)-parseInt(quantity.current.value); // Calcula a nova quantidade armazenada;
            async function addProductDatabase(isEntry, quantity, date, newStorage, product_id) {
                const sqlite3 = require('sqlite3').verbose();
                const path = require('path');
                const dbPath = slash(path.resolve('src/database/dataBase.db'));
            
                let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log("Connected to the sqlite data");
                });
            
                db.run(`INSERT INTO historic(isEntry, quantity, date, product_id) VALUES(?, ?, ?, ?)`, [isEntry, quantity, date, product_id], function(err) {
                    if (err) {
                    return console.log(err.message);
                    }
                });

                db.run(`UPDATE product SET storage = ? WHERE product_id = ?`, [newStorage, product_id], function(err) {
                    if (err) {
                    return console.log(err.message);
                    }
                    // get the last insert id
                    reLoad((b) => !b); // Provoca a re-renderização
                });
            
                db.close((err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    console.log("Close database connection");
                });
            }
            addProductDatabase(isEntry, quantity.current.value, date.current.value, newStorage, id); // Adicionando produto ao banco de dados
        }
    }

    return (
        <div className="EntryExit_Modal">
            <h1 className="Modal_h1">{entryOrExit}</h1>
            <p className="Modal_p">Quantidade:</p>
            <input type="number" className="Modal_input" ref={quantity} />
            <p className="Modal_p">Data:</p>
            <input type="date" className="Modal_input" ref={date} />
            <div className="Modal_ok" onClick={addHistoric}>Ok</div>
            <div className="Modal_close" onClick={() => {setIsOpen(false)}}/>
        </div>
    )
}       