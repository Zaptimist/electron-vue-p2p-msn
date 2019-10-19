<template>
  <div class="peer-chatbox">
    <div class="chat">
      <div class="header">
        <span>
          To:
          <b>{{username}}</b>
          &lt;{{username}}@hotmail.com&gt;
        </span>
      </div>

      <div class="box">
        <img src="../../assets/chat/password_message.png" alt />
        Never give out your password or credit card number in an instant message conversation
        <br />
        <span>__________</span>

        <div class="message-list"></div>
      </div>
    </div>

    <Avatar :img="img" />
  </div>
</template>

<script>
import { ipcRenderer } from "electron";

import Avatar from "./Avatar";
import img from "../../assets/chat/avatar.png";
const audio = new Audio(process.env.BASE_URL + "sound.mp3");

function appendText(data) {
  const messages = document.querySelector(".message-list");

  const spanAuthor = document.createElement("span");
  const spanMessage = document.createElement("span");

  spanAuthor.appendChild(document.createTextNode(`${data.username} says:`));
  spanMessage.appendChild(document.createTextNode(`${data.message}`));

  spanAuthor.style.cssText = `color: #7b7b7b; `;
  spanMessage.style.cssText = `color: black; margin-left: 10px;`;

  spanAuthor.className = "author";
  spanMessage.className = "message";

  messages.appendChild(spanAuthor);
  messages.appendChild(spanMessage);
}

export default {
  data() {
    return {
      img: img
    };
  },

  props: {
    username: String
  },

  mounted() {
    ipcRenderer.on("send:msg", (e, data) => {
      var type = data["type"];
      if (type === "message") {
        appendText(data);
        new Notification("Message", {
          body: data.message
        });
        audio.play();
      }

      if (type === "img") {
        debugger;
        // appendImg(data);
      }
    });
  },

  components: {
    Avatar
  }
};
</script>

<style lang="scss" scoped>
.peer-chatbox {
  display: flex;
  flex-direction: row;
  height: 100%;

  .chat {
    border: 1px solid rgb(88, 100, 114);
    border-radius: 10px 10px 0 0;

    background: rgb(251, 252, 255);
    margin-bottom: 9px;
    flex: auto;

    .header {
      border-bottom: 1px solid rgb(88, 100, 114);
      background-image: linear-gradient(#e4ebfe, #eef0ff, #e4ebfe);
      border-radius: 10px 10px 0 0;

      text-align: left;
      padding: 7px 0 10px 6px;
    }

    .box {
      padding: 5px;
      background: rgb(251, 252, 255);
      text-align: left;
    }
  }
}

.message-list {
  display: flex;
  flex-direction: column;

  .author {
    color: #7b7b7b;
    width: 100%;
  }
  .message {
    color: black;
    margin-left: 10px;
  }
}
</style>