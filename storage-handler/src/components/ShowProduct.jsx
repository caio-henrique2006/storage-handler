import * as React from 'react';
import slash from 'slash';
import { useState, useEffect } from 'react';

// Components:
import Card from "./Card.jsx";

export default function ShowProduct () {

    const [data, setData] = useState(null);
    const [load, setLoad] = useState(false);

    async function fetchData(setData) {
        const sqlite3 = require('sqlite3').verbose();
        const path = require('path');
        const dbPath = slash(path.resolve('src/database/dataBase.db'));
        console.log(dbPath);
    
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
        `;
    
        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            setData(rows);
        });
    
        db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Close database connection");
        });
    }   
    // Execute after render:
    useEffect(() => {
        fetchData(setData);
        console.log(data);
    }, [load]);

    return(
        <div>
            {
                data == null ? null : 
                data.map((item) => {
                    return(
                        <Card 
                            key={item.product_id}
                            name={item.name}
                            storage={item.storage}
                            price={item.price}
                            id={item.product_id}
                        />
                    )
                })
            }
        </div>

        // <Card
        //     name="Blusa"
        //     storage={20}
        //     price={20.5}
        //     id={20}
        // /> 
    )
}

/*https://www.youtube.com/watch?v=bP61ICOgQzY&ab_channel=RogerMelo*/