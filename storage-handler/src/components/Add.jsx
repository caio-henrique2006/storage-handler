import * as React from 'react';
import { useState } from 'react';

// const { ipcRenderer } = window.require('electron');

export default function Add () {

    const [isOpen, setIsOpen] = useState(false);

    const openClose = () => {
        setIsOpen(!isOpen)
    }

    function Modal () {
        return (
            <div className="Modal">
                <h1 className="Modal_h1">Novo Produto</h1>
                <div className="Modal_grid">
                    <div className="Modal_left">
                        <p className="Modal_p">Nome do produto:</p>
                        <input className="Modal_input" />
                        <p className="Modal_p">Estoque:</p>
                        <input className="Modal_input" />
                        <p className="Modal_p">Preço:</p>
                        <input className="Modal_input" />
                    </div>
                    <div className="Modal_right">
                        <p className="Modal_p">Descrição</p>
                        <textarea className="Modal_textarea" />
                    </div>
                </div>
                <div className="Modal_close" onClick={openClose}/>
                <div className="Modal_ok">Criar</div>
            </div>
        )
    }

    return (
        <div className="Add">
            <div className="Add_icon" onClick={openClose}>
            </div>
            <div className="Add_Modal">
                {
                    isOpen ? <Modal isOpen={isOpen}/> : null
                }
            </div>
        </div>
    ) 
}

// function openModal() {
//     console.log("Clicked")
//     ipcRenderer.send('open-add-modal');
// }