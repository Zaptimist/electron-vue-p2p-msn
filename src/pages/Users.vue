<template>
  <div id="users">
    <div class="upper">
      <div class="msnTitle">
        <img class="toggleShizzle" src="../assets/toggleding.png" />
        <img class="msnLogo" src="../assets/msnLogo.png" />
        <p>Messenger</p>
      </div>
      <div class="personalContent">
        <div class="profilePic">
          <img class="avatar" src="../assets/avatar.png" />
        </div>
        <div class="personalizeForm">
          <form>
            <input type="text" placeholder="Dan (Online)" />
            <input type="text" placeholder="<Type a personal message>" />
          </form>
          <div class="mailMsn">
            <ul>
              <li>
                <img src="../assets/mail.png" />(0)
              </li>
              <li>
                <img src="../assets/smallmsn.png" />MSN Today
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="contentDing">
      <div class="sidebar"></div>
      <div class="mainContent">
        <div class="informatics">
          <div class="thingie">
            <img class="infoLogo" src="../assets/info.png" />
            <p>
              <a href="#">Click here to learn about the Customer Experience Improvement Program</a>
            </p>
          </div>
        </div>
        <div class="addContact">
          <img class="addImage" src="../assets/addContact.png" />
          <p>Add a contact</p>
        </div>
        <div class="contactList">
          <input type="checkbox" id="title1" />
          <label for="title1">
            <p>Online (1)</p>
          </label>

          <div class="content">
            <ul>
              <li >
                <button @click="openConnection">Test</button>
                <img src="../assets/addContact.png" />P2P Lobby 1
              </li>
            </ul>
          </div>
          <input type="checkbox" id="title2" />
          <label for="title2">
            <p>Offline (2)</p>
          </label>

          <div class="content">
            <ul>
              <li>
                <img src="../assets/offlineContact.png" />Turbo Driesel
              </li>
              <li>
                <img src="../assets/offlineContact.png" />Hoptimist
              </li>
            </ul>
          </div>
        </div>
        <div class="ad">
          <img src="../assets/ad.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';
export default {
  methods: {
    openConnection(e) {
      e.preventDefault();

      ipcRenderer.send('show:chat')
      
    //   alert('asdf');
    //   // Open chat screen
    //   var window = new BrowserWindow({
    //     width: 295, // 500
    //     height: 558,
    //     webPreferences: {
    //       nodeIntegration: true
    //     }
    //   });

    //   window.loadURL("http://localhost:8080/Chat").then(() => {});

    //   window.on("closed", () => {
    //     window = null;
    //   });
    }
  }
};
</script>

<style lang="scss" scoped>
#users {
  height: 100%;
}
.upper {
  // border: 1px solid red;
  height: 17%;

  .msnTitle {
    // border: 1px solid blue;
    background: linear-gradient(to bottom, #c0d0f0 0%, #f8f8f8 100%);
    font-size: 11px;
    font-family: "Arial Black";
    margin-top: 3px;
    display: flex;
    align-items: flex-end;
    color: #153290;
    p {
      margin: 0;
    }
    .msnLogo {
      height: 17px;
      width: auto;
      margin-left: 5px;
    }
  }
  .personalContent {
    // border: 1px solid green;
    height: 80%;
    display: flex;
    background: linear-gradient(to bottom, #f7f7f8 0%, #e2e9f2 100%);
  }
  .profilePic {
    border: 1px solid black;
    border-radius: 5px;
    width: 23%;
    height: 71%;
    margin-left: 7px;
    margin-top: 5px;
    .avatar {
      height: 100%;
      width: 100%;
    }
  }
  .personalizeForm {
    // border: 1px dashed yellow;
    margin-left: 5px;
    height: 100%;
    font-size: 10px;

    form {
      input {
        border: none;
        background-color: transparent;
        font-size: 11px;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        width: 100%;
        margin-top: 5px;
      }
    }
  }
  .mailMsn {
    border-radius: 10px;
    font-family: Arial;
    font-size: 13px;
    margin-top: 10px;
    background: linear-gradient(to bottom, #cdd9ee 0%, #eef2f9 100%);
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      margin-left: 5px;

      li {
        display: inline-flex;
      }
    }
  }
}

ul {
  margin: 0;
}

.contentDing {
  // border: 1px solid blue;
  height: 80%;
  background-color: white;
}

.sidebar {
  // border: 1px dashed green;
  width: 10%;
  height: 100%;
  float: left;
}

.mainContent {
  width: 88%; //needs to get 90% when borders are gone
  height: 100%;
  float: right;
  font-family: Arial, Helvetica, sans-serif;

  p {
    margin: 0;
  }

  .informatics {
    // border: 1px dashed purple;
    height: 7%;
    font-size: 12px;

    .thingie {
      width: 98%;
      height: 92%;
      // border: 1px solid blue;
      margin-top: 5px;
      background-color: #ffffe1;
      display: flex;
      border: 1px solid black;
    }
  }
  .infoLogo {
    height: 15px;
    padding-right: 5px;
    margin-left: 5px;
  }

  .addContact {
    // border: 1px dashed green;
    height: 5%;
    display: flex;
    align-items: center;
    font-size: 12px;
    background: linear-gradient(to bottom, #cdd9ee 0%, #fcfdfe 100%);

    .addImage {
      height: 20px;
      padding-right: 5px;
    }
  }

  .contactList {
    border: 1px solid red;
    height: 70%;
  }

  .ad {
    border: 1px solid fuchsia;
    height: 16%;
  }
}

.contentDing {
  background-color: white;
  input {
    display: none;
  }

  label {
    display: block;

    margin: 0 0 1px 0;
    cursor: pointer;

    border-radius: 3px;

    transition: ease 0.5s;
    position: relative; /* ADDING THIS IS REQUIRED */

    p {
      margin: 0;
      display: inline;
      font-size: 12px;
    }
  }

  label::before {
    content: "+";
  }

  input:checked + label::before {
    content: "-";
  }

  input + label + .content {
    display: none;
  }

  input:checked + label + .content {
    display: block;
  }

  ul {
    list-style-type: none;
    font-size: 12px;
    font-family: Arial;
    padding-inline-start: 20px;

    li {
      display: flex;
      align-items: center;
    }
  }
}
</style>