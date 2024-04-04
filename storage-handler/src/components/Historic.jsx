import * as React from 'react';
import slash from 'slash';
import {useState, useEffect} from 'react';

// components:
import Historic_Card from './Historic_Card.jsx';

export default function Historic ({id, loadValue}) {

    console.log("The id is: ", id);

    const [data, setData] = useState(null);

    // Executes after render:
    useEffect(() => {
    // Fetch historic of a product:
    async function fetchHistoric (setData) {
        const sqlite3 = require('sqlite3').verbose();
        const path = require('path');
        const dbPath = slash(path.resolve('src/database/dataBase.db'));
    
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
    fetchHistoric(setData);
    }, [loadValue])

    return(
        <div className="Historic">
            {
                console.log(data)
            }
            {
                // console.log(data, id)
                data &&
                data.map((item) => {
                    return(
                        <Historic_Card 
                            key={item.historic_id}
                            isEntry={item.isEntry ? "Entrada" : "Saída"}
                            quantity={item.quantity}
                            date={item.date}
                        />
                    )
                })
            }

        </div>
    )
}