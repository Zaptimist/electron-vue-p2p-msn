const notifyBtn = document.getElementById('signInBtn')
notifyBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var x = document.getElementById("animation");
    var y = document.getElementById('form');
    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.display = 'none';
    } else {
      x.style.display = "none";
      y.style.display = 'block';
    }
})

const cancelBtn = document.getElementById('cancelBtn')
cancelBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var x = document.getElementById("animation");
    var y = document.getElementById('form');
    if (x.style.display === "block") {
        x.style.display = "none";
        y.style.display = 'block';
    } else {
      x.style.display = "block";
      y.style.display = 'none';
    }
})

// function createBrowserWindow() {
//   const remote = require('electron').remote;
//   const url = require('url');
//   const path = require('path');
//   const BrowserWindow = remote.BrowserWindow;
//   const win = new BrowserWindow({
//     height: 600,
//     width: 800
//   });

//   win.loadURL(url.format({
//     pathname: path.join(__dirname, 'addWindow.html'),
//     protocol: 'file:',
//     slashes: true
//   }));
// }