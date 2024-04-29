import slash from "slash";

export default async function deleteHistoric(storage, id, reLoad) {
  const sqlite3 = require("sqlite3").verbose();
  const path = require("path");
  const dbPath = slash(path.resolve("src/database/dataBase.db"));

  let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("Connected to the sqlite data");
  });

  // Querying last historic:
  db.all(
    `SELECT * FROM historic WHERE product_id = ? ORDER BY date ASC`,
    [id],
    (err, rows) => {
      if (err) {
        throw err;
      }
      // calc update storage:
      console.log("rows: ", rows[rows.length - 1]);
      if (!(rows[rows.length - 1] == undefined)) {
        const newerStorage =
          rows[rows.length - 1].isEntry == 1
            ? storage - rows[rows.length - 1].quantity
            : storage + rows[rows.length - 1].quantity;
        const newStorage = newerStorage < 0 ? 0 : newerStorage;
        console.log(rows, newStorage);

        // Updating storage:
        db.run(
          `UPDATE product SET storage = ? WHERE product_id = ?`,
          [newStorage, id],
          function (err) {
            if (err) {
              return console.log(err.message);
            }
            // Deleting historic:
            db.run(
              `DELETE FROM historic WHERE historic_id = ?`,
              [rows[rows.length - 1].historic_id],
              function (err) {
                if (err) {
                  return console.log(err.message);
                }
                reLoad((b) => !b); // Provoca a re-renderização
              }
            );
          }
        );
      }
    }
  );

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close database connection");
  });
}
