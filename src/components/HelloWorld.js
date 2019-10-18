const electron = require('electron');
const {
  ipcRenderer
} = electron;

// const {
//   dialog
// } = require('electron').remote;

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = document.querySelector('#message').value;
  if(message.length === 0) return;

  ipcRenderer.send('send:msg', message)

  const messages = document.querySelector('#ul_messages');
  const li = document.createElement('li');
  const itemText = document.createTextNode(`${message}`);

  li.style.cssText = `color: purple`;
  li.style.fontWeight = 'bold';
  li.className = 'own_msg';

  li.appendChild(itemText);
  messages.appendChild(li);
})

// ================== IpcRenderer ==================

// Sets the username on startup
// ipcRenderer.on('show:username', (e, username) => {
//   document.getElementById('username').innerHTML = username;
// });

// Send message
ipcRenderer.on('send:msg', (e, data) => {

  var type = data['type'];
  if (type === 'message')
    appendText(data, "blue");

  if (type === 'img') {
    appendImg(data)
  }

});


// Upload img
// function uploadFile() {

//   dialog.showOpenDialog((fileNames) => {
//     // fileNames is an array that contains all the selected
//     if (fileNames === undefined || fileNames.length === 0) {
//       return;
//     }

//     let firstFile = fileNames[0]
//     ipcRenderer.send('img:upload', firstFile);
//   });

// }

// CLIENT SIDE

// Get img data
ipcRenderer.on('show:png', (e, data) => {

  let base64 = data['file'];

  const messages = document.querySelector('#ul_messages');
  const li = document.createElement('li');

  const img = document.createElement('img');
  img.setAttribute('src', 'data:img/jpeg;base64, ' + base64);
  const itemText = document.createTextNode(`${data.username}`);

  li.className = 'own_msg'

  li.appendChild(itemText);
  li.appendChild(img);

  messages.appendChild(li);
});

// ================== Functions ==================

function appendText(data, color) {
  const messages = document.querySelector('#ul_messages');

  const li = document.createElement('li');
  const itemText = document.createTextNode(`${data.username}: ${data.message}`);

  li.style.cssText = `color: ${color}`;
  li.className = 'peer_msg'

  li.appendChild(itemText);
  messages.appendChild(li);
}

function appendImg(data) {

  let base64 = data['file'];

  const messages = document.querySelector('#ul_messages');
  const li = document.createElement('li');

  const img = document.createElement('img');
  img.setAttribute('src', 'data:img/jpeg;base64, ' + base64);
  const itemText = document.createTextNode(`${data.username}`);

  li.className = 'peer_msg'

  li.appendChild(itemText);
  li.appendChild(img);

  messages.appendChild(li);

}