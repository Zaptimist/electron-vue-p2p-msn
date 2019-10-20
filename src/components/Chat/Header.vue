<template>
  <div class="header">
    <div class="header__part1">
      <div class="header__arrow-button">
        <img src="../../assets/chat/arrows.png" alt />
      </div>
      <div class="header__actions">
        <Action class="click-style" text="<u>I</u>nvite" :img="ImgInvite" />
        <Action
          @clickAction="sendFiles"
          class="click-style"
          text="Send Fi<u>l</u>es"
          :img="ImgSendFiles"
        />
        <Action text="Invite" :img="ImgSendFiles" />
        <Action text="Invite" :img="ImgSendFiles" />
        <Action text="Invite" :img="ImgSendFiles" />
        <Action text="Invite" :img="ImgSendFiles" />
      </div>
    </div>

    <div class="header__part2">asdf</div>

    <div class="header__part3">asdf</div>
  </div>
</template>

<script>
import Action from "./Action";
import ImgInvite from "~/assets/chat/invite.png";
import ImgSendFiles from "~/assets/chat/send_files.png";
import { ipcRenderer } from "electron";

const { dialog } = require("electron").remote;

export default {
  data() {
    return {
      ImgInvite: ImgInvite,
      ImgSendFiles: ImgSendFiles
    };
  },

  components: {
    Action
  },

  methods: {
    sendFiles() {
      dialog.showOpenDialog(fileNames => {
        // fileNames is an array that contains all the selected
        if (fileNames === undefined || fileNames.length === 0) {
          return;
        }
        let firstFile = fileNames[0];
        ipcRenderer.send("img:upload", firstFile);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.click-style:hover {
  transition-duration: 250ms;
  cursor: pointer;
  border-radius: 5px;
  -webkit-box-shadow: inset 0px 0px 0px 1px grey;
  -moz-box-shadow: inset 0px 0px 0px 1px grey;
  box-shadow: inset 0px 0px 0px 1px grey;
  background-color: rgba(255, 255, 255, 0.7);
}

.click-style {
  transition-duration: 250ms;
}

.header {
  height: 54px; // Original height from the internettos
  width: 100%;
  display: flex;

  &__part1 {
    display: flex;

    background-image: linear-gradient(#f6f8fd, #bbcdeb, #f6f8fd);

    border: 1px solid rgb(179, 186, 202);
    height: 100%;
    width: 450px;
  }

  &__arrow-button {
    width: 30px;
    height: 100%;

    img {
      width: 16px;
      padding: 4px;
      border: 1px solid black;
      border-radius: 100%;
    }
  }

  &__actions {
    display: flex;
  }

  &__part2 {
    border: 1px solid rgb(179, 186, 202);
    height: 100%;
    flex: 1;
  }

  &__part3 {
    border: 1px solid rgb(179, 186, 202);
    height: 100%;
    flex: 3;
  }
}
</style>