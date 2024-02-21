import * as React from 'react';
import "./style/Main.css"
import { createRoot } from 'react-dom/client';

// Components:
import Header from "./components/Header.jsx";
import Card from "./components/Card.jsx";
import Properties from "./components/Properties.jsx"

function Main () {
    return (
        <div className="Main">
            <div className="Main_left">
                <Header/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
            <div className="Main_right">
                <Properties/>
            </div>
        </div>
    )
}

// Renderizando Componente principal (Main) no div root no index.html
const root = createRoot(document.getElementById('root'));
root.render(<Main/>);