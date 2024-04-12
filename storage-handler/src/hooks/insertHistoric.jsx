import slash from 'slash';

export default async function insertHistoric(isEntry, quantity, date, newStorage, product_id, reLoad) {
    const sqlite3 = require('sqlite3').verbose();
    const path = require('path');
    const dbPath = slash(path.resolve('src/database/dataBase.db'));

    const storage = newStorage == null || newStorage == undefined || newStorage == "" ? 0 : newStorage;

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

    db.run(`UPDATE product SET storage = ? WHERE product_id = ?`, [storage, product_id], function(err) {
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