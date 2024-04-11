import slash from 'slash';

export default async function fetchProperties(id, setData) {
    const sqlite3 = require('sqlite3').verbose();
    const path = require('path');
    const dbPath = slash(path.resolve('src/database/dataBase.db'));

    let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log("Connected to the sqlite data");
    });

    let sql = `
    SELECT 
        *
    FROM
        product
    WHERE
        product_id = ?
    `;

    db.get(sql, [id], (err, row) => {
        if (err) {
          return console.error(err.message);
        }
        console.log(row);
        setData(row);
    });

    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Close database connection");
    });
}