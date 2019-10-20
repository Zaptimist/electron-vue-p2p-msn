<template>
  <div class="my-chatbox">
    <div class="chat">
      <div class="header">
        <div class="a"></div>
      </div>

      <div class="box">
        <textarea
          onkeydown="if(event.keyCode == 13) return false;"
          v-on:keyup.enter="submit"
          ref="message"
          class="text-input"
          type="text"
        />

        <div class="buttons">
          <div class="send">Send</div>
        </div>
      </div>

      <div class="footer">Last message received at .... on 1/1/1970</div>
    </div>

    <Avatar :img="img" />
  </div>
</template>

<script>
import { ipcRenderer } from "electron";

import Avatar from "./Avatar";
import img from "../../assets/chat/dog.png";


export default {
  data() {
    return {
      img: img
    };
  },

  props: {
    username: String,
    chatList: Array
  },

  components: {
    Avatar
  },

  methods: {
    submit() {
      // Send value
      let value = this.$refs.message.value;

      if(value.length === 0) return;

      let _msgObject = {
        type: "message",
        username: this.username,
        message: value
      };

      ipcRenderer.send("send:msg", _msgObject);
      // this.chatList.push(_msgObject);

      // Reset value
      this.$refs.message.value = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.my-chatbox {
  display: flex;
  flex-direction: row;
  // height: 100%;

  .chat {
    border: 1px solid rgb(88, 100, 114);
    border-radius: 10px 10px 10px 10px;
    flex: auto;

    .header {
      height: 22px;
      border-radius: 10px 10px 0 0;

      background-image: linear-gradient(#d4e1ff, #f0f0f8, #d4e1ff);
    }

    .box {
      display: flex;
      justify-content: space-between;
      height: 148px;

      background: rgb(251, 252, 255);
      border-top: 1px solid rgb(88, 100, 114);
      border-bottom: 1px solid rgb(88, 100, 114);

      .text-input {
        background-color: #FBFCFF;
        padding-top: 10px;
        padding-left: 10px;
        border: none;
        resize: none;
        outline: none;
        width: 100%;
        margin-right: 10px;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      }

      .text-input::active{
        border: none;
      }

      .buttons {
        .send {
          height: 34px;
        }

        .search {
          height: 24px;
        }

        div {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 8px;
          margin: 6px 0;

          border: 1px solid rgb(88, 100, 114);
          border-radius: 5px;
        }
      }
    }

    .footer {
      height: 20px;
      border-radius: 0 0 10px 10px;
      padding-left: 10px;
      text-align: left;

      background-image: linear-gradient(#d4e1ff, #f0f0f8, #d4e1ff);
    }
  }
}

.avatar-panel {
  width: 180px;
  margin: 0 10px;

  .avatar {
    border: 1px solid #5e6871;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;

    img {
      background: white;
      border: 1px solid #5e6871;
      border-radius: 10px;
      width: 160px;
      height: 160px;
    }

    .arrow {
      text-align: right;
      padding-top: 5px;
      width: 80%;
    }

    .last {
      margin-top: auto;
    }
  }
}
</style>