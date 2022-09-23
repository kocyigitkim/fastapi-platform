const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    call: (name, ...args) => ipcRenderer.invoke(name, ...args) 
})