<template>
  <div class="peer-chatbox">
    <div class="chat">
      <div class="header">
        <span>
          To:
          <div v-for="(u, i) in userList" :key="i">
            <b>{{u.username}}</b>
            &lt;{{u.username}}@hotmail.com&gt;
          </div>
        </span>
      </div>

      <div class="box" ref="okref">
        <img src="../../assets/chat/password_message.png" alt />
        Never give out your password or credit card number in an instant message conversation
        <br />
        <span>__________</span>

        <div class="message-list" v-for="(c, i) in chatList" :key="i">
          <span class="author">{{c.username}} says:</span>
          <br />
          <img v-if="c.type === 'img'" :src="'data:img/jpeg;base64,' + c.file" class="message" />
          <span class="message" v-if="c.type === 'message'">{{c.message}}</span>
        </div>
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

export default {
  data() {
    return {
      img: img
    };
  },

  props: {
    username: String,
    chatList: Array,
    userList: Array
  },

  mounted() {
    ipcRenderer.on("send:msg", (e, data) => {
      var type = data["type"];

      if (type === "message") {
        this.chatList.push(data);

        if (data.username !== this.username) audio.play();
      }

      if (type === "img") {
        // this.chatList.push(data);
        debugger;
      }

      var container = this.$el.querySelector(".box");
      console.log(container);
      container.scrollTop = container.scrollHeight;
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

    width: 100%;
    height: 98%;
    display: flex;

    flex-flow: column nowrap;

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
      overflow-y: auto;
    }
  }
}

.message-list {
  // display: flex;
  // flex-direction: column;

  .author {
    color: #7b7b7b;
    width: 100%;
  }
  .message {
    color: black;
    margin-left: 10px;
    height: auto;
    max-width: 100px;
  }
}
</style>