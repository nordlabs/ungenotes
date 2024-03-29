import { app, BrowserWindow, ipcMain, Menu, dialog } from 'electron';
import {Store} from './util/Store';
import * as path from 'path';
// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let saved = false;

app.on('before-quit', (e) => {
  if (saved) {
    return;
  }

  // prevent quit for now
  e.preventDefault();

  // trigger save
  Store.saveAll();
  saved = true;

  // now re-trigger quit
  app.quit();
});

let mainWindow: BrowserWindow;

const createWindow = (): void => {
  const store = Store.getInstance<{width: number, height: number, asd: string}>('settings');

  ipcMain.on('getHomeDir', (event) => {
    event.returnValue = app.getPath('userData');
  });

  ipcMain.on('getLanguage', (event) => {
    event.returnValue = app.getLocale();
  });


  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: store.get<number>('height') ?? 700,
    width: store.get<number>('width') ?? 1400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.on('will-resize', (evt, newBounds) => {
    store.set('width', newBounds.width);
    store.set('height', newBounds.height);

  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  if (process.env.DEBUG === '1') {
    mainWindow.webContents.openDevTools();
  }
};

// only allow one application window
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }

      mainWindow.focus();
    }
  });

  // Create myWindow, load the rest of the app, etc...
  app.whenReady().then(() => {
    createWindow();
  });
}

// create and set application menu
const menu = Menu.buildFromTemplate([
  {
    label: 'Datei',
    submenu: [
      {
        label: 'Exportieren',
        click: async () => {
          console.log('export');
          const filePath = (await dialog.showSaveDialog(mainWindow, {buttonLabel: 'Exportieren', defaultPath: `${app.getPath('documents')}/ungenotes-export.json`})).filePath;

          if (filePath) {
            Store.getInstance('data').saveTo(filePath);

            mainWindow.webContents.send('openToast', 'Daten wurden erfolgreich exportiert');
          }
        },
        accelerator: 'Ctrl+E',
      },
      {label: 'Beenden', role: 'quit'},
    ]
  },
  {
    label: 'Bearbeiten',
    submenu: [
      { label: 'Kopieren', role: 'copy',},
      { label: 'Einfügen', role: 'paste',},
    ],
  },
  {
    label: 'Ansicht',
    submenu: [
      {label: 'Zoom zurücksetzen', role: 'resetZoom',},
      {label: 'Heranzoomen', role: 'zoomIn',},
      {label: 'Herauszoomen', role: 'zoomOut',},
      {type: 'separator',},
      {label: 'Vollbild', role: 'togglefullscreen',},
      {type: 'separator',},
      {label: 'Zeige Ladebildschirm', type: 'checkbox', click: (i) => mainWindow.webContents.send(i.checked ? 'showLoadingScreen' : 'hideLoadingScreen')},
      {label: 'Minimieren', role: 'minimize',},
    ],
  },
  {
    label: 'Hilfe',
    role: 'help',
    submenu: [
      {label: 'Kontakt', click: () => mainWindow.webContents.send('navigateContact')},
      {label: 'Tastenkombinationen', click: () => mainWindow.webContents.send('openShortcutOverview')},
    ]
  }
]);

Menu.setApplicationMenu(menu);

app.commandLine.appendSwitch('trace-warnings');


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
