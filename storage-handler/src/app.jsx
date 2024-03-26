import * as React from 'react';
import slash from 'slash';
import "./style/Main.css"
import { createRoot } from 'react-dom/client';
import { useState } from 'react';

// Components:
import Header from "./components/Header.jsx";
import ShowProduct from './components/ShowProduct.jsx';
import Properties from "./components/Properties.jsx"

function Main () {
    async function getData(callback) {
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
            callback(rows);
        });
    
        db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Close database connection");
        });
    }
    
    function showData(data) {
        console.log(data);
        data.forEach((e) => {console.log(e)});
    }

    return (
        <div className="Main">
            <div className="Main_left">
                <Header/>
                <ShowProduct/>
            </div>
            <div className="Main_right">
                <Properties/>
            </div>
            <button onClick={() => {getData(showData)}}>Click</button>
        </div>
    )
}

// Renderizando Componente principal (Main) no div root no index.html
const root = createRoot(document.getElementById('root'));
root.render(<Main/>);