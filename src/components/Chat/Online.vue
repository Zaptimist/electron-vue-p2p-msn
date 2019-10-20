<template>
  <div :class="{ 'bottomright-show':isOnline }" class="peer-connected bottomright-hidden">
    <div class="header">
      <img :src="msnLogo" alt />
      <span>MSN Messenger</span>
      <div class="exit">
        <button @click="isOnline = !isOnline">X</button>
      </div>
    </div>
    <div class="line-box">
      <div class="box">
        <img :src="avatarLogo" alt />
        <span>
          {{user}}
          <br />has just signed in.
        </span>
      </div>
      <div class="msn-logo">
        <img :src="msnLogo2" alt />
      </div>
    </div>
  </div>
</template>

<script>
import msnLogo from "~/assets/chat/avatar.png";
import avatarLogo from "~/assets/chat/dog.png";
import msnLogo2 from "~/assets/chat/msn_logo.png";
import { ipcRenderer } from "electron";

const audio = new Audio(process.env.BASE_URL + "online_sound.mp3");

export default {
  name: "home",

  data() {
    return {
      isOnline: false,
      msnLogo: msnLogo,
      avatarLogo: avatarLogo,
      msnLogo2: msnLogo2,

      user: ""
    };
  },

  components: {
  },

  mounted() {
    

    ipcRenderer.on("gets:online", (e, data) => {
      this.user = data.username;
      this.isOnline = true;

      audio.play();

      setTimeout(() => {
        this.isOnline = false;
      }, 8000);

    });
  }

};
</script>

<style lang="scss" scoped>

.bottomright-hidden {
  transition-duration: 1000ms;
  position: fixed;
  bottom: -150px;
  right: 0px;
}

.bottomright-show {
  transition-duration: 1000ms;
  position: fixed;
  bottom: 0px;
  right: 0px;
}

.peer-connected {
  background: white;
  background-image: linear-gradient(#d7e4da, #fefefe, #aeb2ae);
  width: 200px;

  .header {
    display: flex;
    align-content: center;
    justify-content: center;

    height: 20px;
    padding: 5px 5px 0 5px;

    img {
      max-width: auto;
      height: 20px;
    }
    span {
      margin-left: 5px;
      display: flex;
      align-items: center;
    }

    .exit {
      margin-left: auto;

      button {
        background-image: linear-gradient(#d38975 40%, #952404);
        border: none;
        color: white;
      }
    }
  }

  .line-box {
    border: 1px solid #a4b9a9;
    margin: 2px;

    .box {
      display: flex;
      height: 75px;
      padding-left: 10px;
      align-items: center;

      img {
        height: 60px;
        width: auto;
        border-radius: 15px;
      }

      span {
        text-align: left;
        padding-left: 10px;
      }
    }

    .msn-logo {
      height: 25px;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      padding: 5px;
      margin-right: auto;

      img {
        height: 15px;
        width: auto;
      }
    }
  }
}
</style>