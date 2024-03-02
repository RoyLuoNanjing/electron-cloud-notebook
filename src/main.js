const { app, BrowserWindow } = require('electron')


function createWindow () {
  const win = new BrowserWindow({
    width: 850,
    height: 600
  })
  win.loadFile('src/index.html')
  win.webContents.openDevTools()

  return win
}

function createAnotherWindow (parent) {
  const win = new BrowserWindow({
    width: 600,
    height: 300,
    parent
  })
  win.loadFile('src/index.html')
  win.webContents.openDevTools()
}
app.on('ready', () => {
  const parent = createWindow()
  createAnotherWindow(parent)
})