import slash from 'slash';

export default async function insertProduct(name, storage, price, description, reLoad) {
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