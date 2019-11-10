'use strict';

import {
  app,
  protocol,
  BrowserWindow,
  ipcMain
} from 'electron';

import {
  createProtocol,
} from 'vue-cli-plugin-electron-builder/lib';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}]);

// Windows
let loginWindow;
let lobbyWindow;
let chatWindow;

app.on('ready', main);

async function main() {

  // Exit cleanly on request from parent process in development mode.
  if (isDevelopment) {
    if (process.platform === 'win32') {
      process.on('message', data => {
        if (data === 'graceful-exit') {
          app.quit();
        }
      });
    } else {
      process.on('SIGTERM', () => {
        app.quit();
      });
    }
  }

  loginWindow = new BrowserWindow({
    width: 350,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  loginWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL);

  loginWindow.on('closed', () => {
    loginWindow = null;
  });


}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


// SOCKET CONNECTION
var swarm = require('webrtc-swarm')
var signalhub = require('signalhub');
var streamSet = require('stream-set');
var jsonStream = require('duplex-json-stream');

var streams = streamSet();
let userList = [];

// IpcMain

// When users shows
ipcMain.on('sign:in', (async (e, args) => {

  await tryToConnect()
    .then((connectionState) => {

      // If not connected go back to login state
      if(!connectionState){
        return loginWindow.webContents.send('fail:signalhub');
      }


      // Go to lobby screen
      createLobbyWindow();


    });
}));

function initializeSwarm(hub){
  var sw = swarm(hub, {
    wrtc: require('wrtc'),  // node-webrtc for node js native addons like electron
    utp: false,             // disable utp for discovery
    tcp: true,              // use tcp for discovery
  });

  // Assign message when peer connects
  sw.on('peer', function (peer, id) {

    // Peer connected
    peer = jsonStream(peer);
    streams.add(peer);

    // console.log('🍅 peer', peer);
    console.log('🎂 id', id);

    userList.push({
      id: id,
      // username: username
    });

    var user = {
      type: 'user_online',
      // username: username,
    }

    streams.forEach(peer => {
      peer.write(user);
    })

    // Sends to other peers someone is online
    lobbyWindow.webContents.send('user:online', userList)

    // Eventhandling when receiving data
    peer.on('data', data => {

      // if (data.type === 'user_online') {
      //   return win.webContents.send('gets:online', data)
      // }

      // if (data.type === 'img')
      //   return win.webContents.send('show:png', data);

      // return win.webContents.send('send:msg', data);
    });

  });

  // When a peer disconnects
  sw.on('disconnect', function (peer, id) {

    streams.remove(peer);

    // FIXME: what does this do?
    const index = userList.findIndex(u => u.id === id);
    if (index !== undefined) userList.splice(index, 1);

    console.log('disconnected peer:', id)
    console.log('total peers:', sw.peers.length)

  });
}


async function tryToConnect() {

  return new Promise((resolve, reject) => {

    // Try to connect
    var hub = signalhub('swarm-collection', ['http://localhost:8080']);

    // Subscribing to hub
    hub.subscribe('is-alive')
      .on('data', () => {
        initializeSwarm(hub);
        resolve(true);
      })

    // Sends a message to the hub to tell its alive
    hub.broadcast('is-alive');

    // Timeout after 1 second
    setTimeout(() => {
      resolve(false);
    }, 1000)

  });


}

function createLobbyWindow() {
  lobbyWindow = new BrowserWindow({
    width: 800,
    height: 500,
    webPreferences: {
      nodeIntegration: true
    }
  });

  lobbyWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL + 'users').then(_ => {
    // start connect
    // Close the loginWindow
    loginWindow.close();
  });

  lobbyWindow.on('closed', () => {
    lobbyWindow = null;
  });
}


function connectToSwarm() {
  var hub = signalhub('swarm-collection', ['http://localhost:8080'])

  var sw = swarm(hub, {
    wrtc: require('wrtc'), // node-webrtc for node js native addons like electron
    utp: true, // use utp for discovery
    tcp: true, // use tcp for discovery
  });

  console.log('sw', sw);


  // Assign message when peer connects
  sw.on('peer', function (peer, id) {

    peer = jsonStream(peer);
    streams.add(peer);

    userList.push({
      id: id,
      username: username
    })

    var user = {
      type: 'user_online',
      username: username,
    }

    streams.forEach(peer => {
      peer.write(user);
    })

    // Use chat or users window to show who's online
    lobbyWindow.webContents.send('user:online', userList)

    // When receiving data
    peer.on('data', data => {

      // if (data.type === 'user_online') {
      //   return win.webContents.send('gets:online', data)
      // }

      // if (data.type === 'img')
      //   return win.webContents.send('show:png', data);

      // return win.webContents.send('send:msg', data);
    });

  });

  // When a peer disconnects
  sw.on('disconnect', function (peer, id) {

    streams.remove(peer);

    // FIXME: what does this do?
    const index = userList.findIndex(u => u.id === id);
    if (index !== undefined) userList.splice(index, 1);

    console.log('disconnected peer:', id)
    console.log('total peers:', sw.peers.length)

  });

}


// app.on('ready', async () => {

//       // SOCKET CONNECTION
//     var swarm = require('webrtc-swarm')
//     var signalhub = require('signalhub');
//     var streamSet = require('stream-set');
//     var jsonStream = require('duplex-json-stream');
//     import fs from 'fs';

//     var streams = streamSet();
//     let userList = [];


//     function connectToSwarm() {
//       var hub = signalhub('swarm-collection', ['http://localhost:8080'])

//       var sw = swarm(hub, {
//         wrtc: require('wrtc'), // node-webrtc for node js native addons like electron
//         utp: true, // use utp for discovery
//         tcp: true, // use tcp for discovery
//       });

//       // Assign message when peer connects
//       sw.on('peer', function (peer, id) {

//         peer = jsonStream(peer);
//         streams.add(peer);

//         userList.push({
//           id: id,
//           username: username
//         })

//         var user = {
//           type: 'user_online',
//           username: username,
//         }

//         streams.forEach(peer => {
//           peer.write(user);
//         })

//         // Use chat or users window to show who's online
//         lobbyWindow.webContents.send('user:online', userList)

//         // When receiving data
//         peer.on('data', data => {

//           // if (data.type === 'user_online') {
//           //   return win.webContents.send('gets:online', data)
//           // }

//           // if (data.type === 'img')
//           //   return win.webContents.send('show:png', data);

//           // return win.webContents.send('send:msg', data);
//         });

//       });

//       // When a peer disconnects
//       sw.on('disconnect', function (peer, id) {

//         streams.remove(peer);

//         // FIXME: what does this do?
//         const index = userList.findIndex(u => u.id === id);
//         if (index !== undefined) userList.splice(index, 1);

//         console.log('disconnected peer:', id)
//         console.log('total peers:', sw.peers.length)

//       });

//     }


//     //  IPCRENDERER

//     // UI

//     // When users shows
//     ipcMain.on('sign:in', ((e, args) => {
//       createLobbyWindow()
//     }));

//     ipcMain.on('show:chat', ((e, args) => {
//       createChatWindow()
//     }))



//     // P2P Connection

//     // When the send button is pressed it sends the messages to all sockets
//     ipcMain.on('send:msg', (e, _msgObject) => {

//       streams.forEach(peer => {
//         peer.write(_msgObject)
//       });

//       // win.webContents.send('send:msg', _msgObject);

//     });

//     ipcMain.on('img:upload', (e, file) => {

//       fs.readFile(file, function (err, buf) {

//         var base64 = buf.toString('base64');

//         let objectToSend = {
//           type: 'img',
//           username: username,
//           file: base64
//         }

//         streams.forEach(peer => {
//           peer.write(objectToSend)
//         });

//         // win.webContents.send('show:png', objectToSend);

//       });

//     });

//   }
// }