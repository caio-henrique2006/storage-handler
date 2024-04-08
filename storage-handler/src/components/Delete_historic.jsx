import * as React from 'react';
import slash from 'slash';

export default function Delete_historic ({ id, reLoad, storage, setIsOpen_delete_historic}) {

    function deleteProduct () {
        setIsOpen_delete_historic((b) => !b);
        async function deleteHistoricDatabase(id) {
            const sqlite3 = require('sqlite3').verbose();
            const path = require('path');
            const dbPath = slash(path.resolve('src/database/dataBase.db'));
        
            let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log("Connected to the sqlite data");
            });
        
            // Querying last historic:
            db.all(`SELECT * FROM historic WHERE product_id = ? ORDER BY date DESC`, [id], (err, rows) => {
                if (err) {
                    throw err;
                }
                const newStorage = rows[0].isEntry == 1 ? storage - rows[0].quantity : storage + rows[0].quantity;
                console.log(rows, newStorage);
                // Updating storage:
                db.run(`UPDATE product SET storage = ? WHERE product_id = ?`, [newStorage, id], function(err) {
                    if (err) {
                        return console.log(err.message);
                    }
                    // Deleting historic:
                    db.run(`DELETE FROM historic WHERE historic_id = ?`, [rows[0].historic_id], function(err) {
                        if (err) {
                          return console.log(err.message);
                        }
                        reLoad((b) => !b); // Provoca a re-renderização
                    });
                });
            });

            db.close((err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log("Close database connection");
            });
        }
        deleteHistoricDatabase(id);
    }

    return (
        <div className="Delete">
            <h1>Deletar último histórico?</h1>
            <div className="Delete_flex">
                <div className="Delete_true" onClick={deleteProduct}></div>
                <div className="Delete_false" onClick={() => {setIsOpen_Delete((b) => !b)}}></div>
            </div>
        </div>
    )
}