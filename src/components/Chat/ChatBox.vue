<template>
  <div class="chatbox">
    <PeerChatBox :userList="userList" :chatList="chatList" :username="username" />
    <MyChatBox :chatList="chatList" :username="username" />
  </div>
</template>

<script>
import { ipcRenderer } from "electron";

import PeerChatBox from "./PeerChatBox";
import MyChatBox from "./MyChatBox";

export default {
  data() {
    return {
      username: "",
      userList: [],
      chatList: []
    };
  },

  components: {
    PeerChatBox,
    MyChatBox
  },

  mounted() {
    ipcRenderer.on("get:username", (event, username) => {
      this.username = username;
    });

    // FIXME: Show which user joins the chat
    // ipcRenderer.on("user:online", (event, users) => {
    //   console.log('user logged in', users);
    //   this.userList = users;
    // });

    ipcRenderer.on("show:png", (e, _object) => {
      this.chatList.push(_object);
    });
    
  }
};
</script>

<style lang="scss" scoped>
.chatbox {
  padding: 12px 0 12px 12px;
  display: flex;
  flex-direction: column !important; // Used because it overwrites the parent class
  height: 100%;

  width: 100%;
}
</style>