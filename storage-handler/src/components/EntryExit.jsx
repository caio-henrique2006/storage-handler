import * as React from 'react';
import {useRef} from 'react';
import slash from 'slash';

// Entry and exit modal
export default function EntryExit ({setIsOpen, entryOrExit, id, reLoad, loadValue}) {

    const quantity = useRef();
    const date = useRef();

    function addHistoric () {
        setIsOpen(false);
        async function addProductDatabase(isEntry, quantity, date, product_id) {
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
                // get the last insert id
                reLoad(!loadValue); // Provoca a re-renderização
            });
        
            db.close((err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log("Close database connection");
            });
        }
        const isEntry = entryOrExit == "Entrada" ? true : false;
        addProductDatabase(isEntry, quantity.current.value, date.current.value, id); // Adicionando produto ao banco de dados
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