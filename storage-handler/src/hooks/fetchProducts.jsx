import slash from "slash";

export default async function fetchProduct(setData) {
  const sqlite3 = require("sqlite3").verbose();
  const path = require("path");
  const dbPath = slash(path.resolve("src/database/dataBase.db"));

  let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("Connected to the sqlite data");
  });

  // sql command
  let sql = `
    SELECT 
        *
    FROM
        product
    ORDER BY
        name ASC
    `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    // Callback directly to set the state "data"
    setData(rows);
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close database connection");
  });
}
