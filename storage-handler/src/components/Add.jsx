import * as React from 'react';

const { ipcRenderer } = window.require('electron');

export default function Add () {
    return (
        <div className="Add" onClick={openModal}>
            <div className="Add_icon">
            </div>
        </div>
    ) 
}

function openModal() {
    console.log("Clicked")
    ipcRenderer.send('open-add-modal');
}