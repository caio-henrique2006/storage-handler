import slash from "slash";

export default async function fetchHistoric(id, setData) {
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
        historic
    WHERE
        product_id = ?
    ORDER BY
        date ASC
    `;

  db.all(sql, [id], (err, rows) => {
    if (err) {
      throw err;
    }
    // Callback directly to set the state "data"
    console.log(rows);
    setData(rows);
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close database connection");
  });
}
