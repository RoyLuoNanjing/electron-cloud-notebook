const { app, BrowserWindow, ipcMain } = require('electron')
const remote = require('@electron/remote/main')

const path = require('path')
const fs = require('fs')
remote.initialize()

function createWindow () {
  const win = new BrowserWindow({
    width: 850,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('src/index.html')
  //win.webContents.openDevTools()

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


function handleSetTitle (event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}

async function handleWriteFile (event, content) {
  console.log('the content', content)
  await fs.promises.writeFile('test.txt', content)
  const stats = await fs.promises.stat('test.txt')
  return stats.size
}


app.on('ready', () => {
  ipcMain.on('set-title', handleSetTitle)
  ipcMain.handle('write-file', handleWriteFile)
  let counter = 1
  const win = createWindow()
  remote.enable(win.webContents)

  setInterval(() => {
    counter += 3
    win.webContents.send('update-counter', counter)
  }, 3000)

})