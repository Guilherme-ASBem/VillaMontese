const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path')
const ipc = ipcMain

function createWindow () {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        minWidth: 1920,
        minHeight: 1080,
        frame: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            
            devTools: false,
            FullScreen: false,
            preload: path.join(__dirname, 'preload.js'),
        }
})

    win.loadFile('src/index.html')
    win.setBackgroundColor('#343B48')

    ///// MINIMIZE APP
    ipc.on('minimizeApp', ()=>{
        console.log('Clicked on Minimize Btn')
        win.minimize()
    })

    ///// MAXIMIZE APP
    ipc.on('maximizeRestoreApp', ()=>{
        if(win.isMaximized()){
            console.log('Clicked on Restore')
            win.restore()
        }else{
            console.log('Clicked on Maximize')
            win.maximize()
        }
    })
    /// Check if is maximized
    win.on('maximize', ()=>{
        win.webContents.send('isMaximized')
    })
    /// Check if is Restored
    win.on('unmaximize', ()=>{
        win.webContents.send('isRestored')
    })

    ///// CLOSE APP
    ipc.on('closeApp', ()=>{
        console.log('Clicked on Close Btn')
        win.close()
    })
}

app.whenReady().then(() =>{
    createWindow()


    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().lenght === 0){
            createWindow()
        }
    })
})




app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})