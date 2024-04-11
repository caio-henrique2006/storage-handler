import * as React from 'react';
import slash from 'slash';
import "../style/Add.css";
import "../style/Modal.css";

// Hooks:
import { useState, useRef } from 'react';
import insertProduct from '../hooks/insertProduct.jsx';

// const { ipcRenderer } = window.require('electron');

export default function Add ({ reLoad }) {

    const productName = useRef();
    const productStorage = useRef();
    const productPrice = useRef();
    const productDescription = useRef();
    const [isOpen, setIsOpen] = useState(false);

    function addProduct() {
        setIsOpen(!isOpen);
        insertProduct(productName.current.value, productStorage.current.value, productPrice.current.value, productDescription.current.value, reLoad);
    }

    function Modal () {
        return (
            <div className="Modal">
                <h1 className="Modal_h1">Novo Produto</h1>
                <div className="Modal_grid">
                    <div className="Modal_left">
                        <p className="Modal_p">Nome do produto:</p>
                        <input className="Modal_input" ref={productName}/>
                        <p className="Modal_p">Estoque:</p>
                        <input type="number" className="Modal_input" ref={productStorage}/>
                        <p className="Modal_p">Preço:</p>
                        <input type="number" className="Modal_input" ref={productPrice}/>
                    </div>
                    <div className="Modal_right">
                        <p className="Modal_p">Descrição</p>
                        <textarea className="Modal_textarea" ref={productDescription}/>
                    </div>
                </div>
                <div className="Modal_close" onClick={() => {setIsOpen(!isOpen)}}/>
                <div className="Modal_ok" onClick={addProduct}>Criar</div>
            </div>
        )
    }

    return (
        <div className="Add">
            <div className="Add_icon" onClick={() => {setIsOpen(!isOpen)}}>
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