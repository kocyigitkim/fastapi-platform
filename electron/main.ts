import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import { FastApiManager } from './core/FastApiManager';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (app.isPackaged) {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  } else {
    win.loadURL('http://localhost:3000/index.html');

    // win.webContents.openDevTools();

    // Hot Reloading on 'node_modules/.bin/electronPath'
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname,
        '..',
        '..',
        'node_modules',
        '.bin',
        'electron' + (process.platform === "win32" ? ".cmd" : "")),
      forceHardReset: false
    });
  }
}

app.whenReady().then(() => {
  // DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  appReady();

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
});


const manager = new FastApiManager();

function appReady() {
  ipcMain.handle('callManagerFunction', (...args) => {
    console.log(...args)
  });
  for (var field of Object.keys((manager as any).constructor.prototype)) {
    if (typeof manager[field] === 'function') {
      console.log('Registered: ' + field);
      ipcMain.handle("getManager." + field, (async (parent: any, fieldName: string,source: any, ...args) => {
        console.log(fieldName,args);
        var r = parent[fieldName](...args);
        if (r instanceof Promise) {
          r = r.catch(console.error);
        }
        return r;
      }).bind(null, manager, field));
    }
  }

  ipcMain.handle('getManager', (evt) => {
    console.log(manager);
    var cloned = { ...manager };

    for (var field of Object.keys((manager as any).constructor.prototype)) {
      if (typeof manager[field] === 'function') {
        cloned[field] = {
          '$$typeof': 'function',
          'name': field
        };
      }
    }
    return cloned;
  });
}