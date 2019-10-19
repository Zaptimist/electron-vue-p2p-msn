<template>
  <div class="peer-chatbox">
    <div class="chat">
      <div class="header">
        <span>
          To:
          <b>Gurbe</b> &lt;gurbe@hotmail.com&gt;
        </span>
      </div>

      <div class="box">
        <img src="../../assets/chat/password_message.png" alt="">
        Never give out your password or credit card number in an instant message conversation
      </div>
    </div>

    <Avatar :img="img" />
  </div>
</template>

<script>
import Avatar from "./Avatar";
import img from "../../assets/chat/avatar.png";

export default {
  data() {
    return {
      img: img
    };
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
</style>