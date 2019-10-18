'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Assigning args
const args = process.argv.slice(2);
const username = args[0].length === 1 ? 'test' : args[0];
console.log(username);
let x = parseInt(args[1]);
let y = parseInt(args[2]);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ x: x, y: y, width: 1500, height: 800, webPreferences: {
    nodeIntegration: true
  } })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL).then(() => {
      console.log('sending', username);
      win.webContents.send('get:username', username);
    })
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html').then(() => {
      console.log('sending', username);
      win.webContents.send('show:username', username);
    })
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
  await installVueDevtools()
} catch (e) {
  console.error('Vue Devtools failed to install:', e.toString())
}

  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

//  IPCRENDERER

// When the send button is pressed it sends the messages to all sockets
ipcMain.on('send:msg', (e, msg) => {

  let objectToSend = {
    type: 'message',
    username: username,
    message: msg
  }

  console.log('objectToSend', objectToSend);

  streams.forEach(peer => {
    peer.write(objectToSend)
  });

});

ipcMain.on('img:upload', (e, file) => {

  fs.readFile(file, function(err, buf){

    var base64 = buf.toString('base64');

    objectToSend = {
      type: 'img',
      username: username,
      file: base64
    }

    streams.forEach(peer => {
      peer.write(objectToSend)
    });

    win.webContents.send('show:png', objectToSend);

  });

});

// SOCKET CONNECTION

var swarm = require('webrtc-swarm')
var signalhub = require('signalhub')
var streamSet = require('stream-set');
var jsonStream = require('duplex-json-stream');

var streams = streamSet();

var hub = signalhub('swarm-example', ['http://localhost:8080'])
var sw = swarm(hub, {
  wrtc: require('wrtc'), // node-webrtc for node js native addons like electron
  utp: true, // use utp for discovery
  tcp: true, // use tcp for discovery
});

// When a peer disconnects
sw.on('disconnect', function (peer, id) {
  console.log('disconnected peer:', id)
  console.log('total peers:', sw.peers.length)
})

// Assign message when peer connects
sw.on('peer', function (peer, id) {
  console.log('Peer connected:', id)
  peer = jsonStream(peer);
  streams.add(peer);

  // When receiving data
  peer.on('data', data => {
    return win.webContents.send('send:msg', data);
  })
})