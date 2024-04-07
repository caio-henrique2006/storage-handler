import * as React from 'react';
import slash from 'slash';
import { useState, useEffect } from 'react';

// Components:
import Card from "./Card.jsx";

export default function ShowProduct ({setId, reLoad, loadValue}) {

    // States:
    const [data, setData] = useState(null);

    // Execute after render:
    useEffect(() => {
        // Data fetching function:
        async function fetchData(setData) {
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
                product
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
        fetchData(setData);
        console.log(data);
    }, [loadValue]); // Load is used to make the useEffect only render when he changes. 

    return(
        <div className="ShowProduct_Card">
            {
                // Check if the value of data is null and render the cards
                data == null ? null : 
                data.map((item) => {
                    return(
                        <Card 
                            key={item.product_id}
                            name={item.name}
                            storage={item.storage}
                            price={item.price}
                            id={item.product_id}
                            setId={setId}
                            reLoad = {reLoad}
                        />
                    )
                })
            }
        </div>
    )
}