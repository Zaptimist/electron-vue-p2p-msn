<template>
  <div class="hello">

    <Chat/>

    <h1>{{ msg }}</h1>
    <!-- <button @click="clicked">Ha goeie</button> -->

    <h1>MSN</h1>
    <h2>
      Username:
      {{username}}
      <!-- <span id="username"></span> -->
    </h2>

    <form @submit="submitMessage">
      <div>
        <label>Send message</label>
        <input type="text" ref="input_message" id="message" autofocus />
      </div>
    </form>

    <hr />

    <h1 id="demo"></h1>
    <button onclick="uploadFile()">Upload</button>

    <hr />

    <h2>Messages</h2>
    <ul id="ul_messages"></ul>
  </div>
</template>

<script>
import electron from "electron";

import Chat from './Chat'

const { ipcRenderer } = electron;

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },

  components:{
    Chat
  },

  data() {
    return {
      username: ""
    };
  },

  mounted() {
    ipcRenderer.on("get:username", (event, username) => {
      this.username = username;
    });

    ipcRenderer.on("send:msg", (e, data) => {
      var type = data["type"];
      if (type === "message") 
        debugger;
        // appendText(data, "blue");

      if (type === "img") {
        debugger;
        // appendImg(data);
      }
    });
  },

  methods: {
    submitMessage(e) {
      e.preventDefault();
      let msg = this.$refs.input_message.value;
      ipcRenderer.send("send:msg", msg);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
