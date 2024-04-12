import slash from 'slash';

export default async function deleteHistoric(storage, id, reLoad) {
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
        if (!(rows[0] == undefined)) {
            const newerStorage = rows[0].isEntry == 1 ? storage - rows[0].quantity : storage + rows[0].quantity;
            const newStorage = newerStorage < 0 ? 0 : newerStorage;
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
        }
    });

    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Close database connection");
    });
}