import * as React from 'react';

// components:
import Historic from './Historic.jsx';

export default function Properties () {
    return(
        <div className="Properties">
            <p className="Properties_title">Nome do produto</p>
            <p className="Properties_properties"><b>Total em estoque:</b> 65</p>
            <p className="Properties_properties"><b>Preço:</b> 20$</p>
            <p className="Properties_properties"><b>Descrição:</b> Um produto muito legal</p>
            <div className="Properties_buttons">
                <div>Entrada</div>
                <div>Saída</div>
            </div>
            <p className="Properties_historic"><b>Histórico:</b> </p>
            <div className="Properties_historic_content">
                <Historic />
            </div>
        </div>
    )
}