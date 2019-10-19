<template>
  <div class="my-chatbox">
    <div class="chat">
      <div class="header">
        <div class="a"></div>
      </div>

      <div class="box">
        <div class="text-input">
          <li>asdf</li>
        </div>

        <div class="buttons">
          <div class="send">Send</div>
          <div class="search">Search</div>
        </div>
      </div>

      <div class="footer"></div>
    </div>

    <Avatar :img="img"/>

  </div>
</template>

<script>
import Avatar from './Avatar';
import img from '../../assets/chat/dog.png'

export default {
  data(){
    return{
      img: img
    }
  },
  components: {
    Avatar
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
      padding: 6px 6px 6px 10px;
      height: 148px;

      background: rgb(251, 252, 255);
      border-top: 1px solid rgb(88, 100, 114);
      border-bottom: 1px solid rgb(88, 100, 114);

      .text-input {
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