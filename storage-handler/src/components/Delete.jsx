import * as React from 'react';
import slash from 'slash';

export default function Delete ({ id, reLoad, setIsOpen_Delete}) {

    function deleteProduct () {
        setIsOpen_Delete((b) => !b);
        async function deleteProductDatabase(id) {
            const sqlite3 = require('sqlite3').verbose();
            const path = require('path');
            const dbPath = slash(path.resolve('src/database/dataBase.db'));
        
            let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log("Connected to the sqlite data");
            });

            db.run(`DELETE FROM historic WHERE product_id = ?`, [id], function(err) {
                if (err) {
                  return console.log(err.message);
                }
            });
        
            db.run(`DELETE FROM product WHERE product_id = ?`, [id], function(err) {
                if (err) {
                  return console.log(err.message);
                }
                reLoad((b) => !b);
            });
        
            db.close((err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log("Close database connection");
            });
        }
        deleteProductDatabase(id);
    }

    return (
        <div className="Delete">
            <h1>Deletar produto?</h1>
            <div className="Delete_flex">
                <div className="Delete_true" onClick={deleteProduct}></div>
                <div className="Delete_false" onClick={() => {setIsOpen_Delete((b) => !b)}}></div>
            </div>
        </div>
    )
}