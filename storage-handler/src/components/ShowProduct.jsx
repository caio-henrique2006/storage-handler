import * as React from 'react';
import slash from 'slash';
import { useState } from 'react';

// Components:
import Card from "./Card.jsx";

export default function ShowProduct () {

    const [products, setProducts] = useState({});

    async function getProduct(showData) {
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
            showData(rows);
        });
    
        db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Close database connection");
        });
    }   

    function ShowData(data) {
        const UI = data.forEach(
            (item) => {
                <Card 
                    name={item.name}
                    storage={item.storage}
                    price={item.price}
                    id={item.product_id}
                />
            })
        console.log(data);
        setProducts(UI);
    }

    // Execute in time:
    getProduct(ShowData)

    return(
        <div>
            {products}
        </div>

        // <Card
        //     name="Blusa"
        //     storage={20}
        //     price={20.5}
        //     id={20}
        // /> 
    )
}