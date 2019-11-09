<template>
  <div class="home">
    <Header />

    <div class="chatbox">
      <ChatBox />
    </div>

    <Online />
  </div>
</template>

<script>

import Header from "../components/Chat/Header";
import ChatBox from "../components/Chat/ChatBox";
import Online from "../components/Chat/Online";

export default {
  name: "home",

  components: {
    Header,
    ChatBox,
    Online
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}

.chatbox {
  height: calc(100vh - 90px);
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>
