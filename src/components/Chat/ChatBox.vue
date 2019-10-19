<template>
  <div class="chatbox">

    <PeerChatBox/>
    <MyChatBox/>

  </div>

</template>

<script>

import PeerChatBox from './PeerChatBox';
import MyChatBox from './MyChatBox';

export default {
  components: {
    PeerChatBox,
    MyChatBox
  }
};
</script>

<style lang="scss" scoped>
.chatbox {
  padding: 12px 0 12px 12px;
  display: flex;
  flex-direction: column !important; // Used because it overwrites the parent class
  height: 100%;


  
}
</style>