import * as React from 'react';
import { useState } from 'react';

// components:
import Modal from "./Modal.jsx";

// const { ipcRenderer } = window.require('electron');

export default function Add () {

    const [isOpen, setIsOpen] = useState(false);

    const openClose = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="Add" onClick={openClose}>
            <div className="Add_icon">
            </div>
            <div className="Add_Modal">
                {
                    isOpen ? <Modal/> : null
                }
            </div>
        </div>
    ) 
}

// function openModal() {
//     console.log("Clicked")
//     ipcRenderer.send('open-add-modal');
// }