import slash from 'slash';

export default async function updateProduct(name, storage, price, description, id, reLoad) {
    const sqlite3 = require('sqlite3').verbose();
    const path = require('path');
    const dbPath = slash(path.resolve('src/database/dataBase.db'));

    let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log("Connected to the sqlite data");
    });

    const sql = `
        UPDATE product
        SET
            name = ?,
            storage = ?,
            price = ?,
            description = ?
        WHERE
            product_id = ?
    `

    // Updating storage:
    db.run(sql, [name, storage, price, description, id], function(err) {
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