<template>
  <div class="header">
    <div class="header__part1">

      <div class="header__arrow-button">
        <img src="../../assets/chat/arrows.png" alt />
      </div>
      <div class="header__actions">
        <Action  text="Invite" :img="ImgInvite"/>
        <Action text="Invite" :img="ImgSendFiles"/>
        <Action text="Invite" :img="img"/>
        <Action text="Invite" :img="img"/>
        <Action text="Invite" :img="img"/>
        <Action text="Invite" :img="img"/>
      </div>
    </div>

    <div class="header__part2">
      asdf
    </div>

    <div class="header__part3">
      asdf
    </div>


  </div>
</template>

<script>
import Action from "./Action";
import ImgInvite from "~/assets/chat/invite.png";
import ImgSendFiles from "~/assets/chat/send_files.png";

export default {
  data() {
    return {
      ImgInvite: ImgInvite,
      ImgSendFiles: ImgSendFiles
    };
  },

  components: {
    Action
  }
};
</script>

<style lang="scss" scoped>

.test:hover{
  border: 1px solid black;
}

.header {
  height: 54px; // Original height from the internettos
  width: 100%;
  display: flex;

  &__part1 {
    display: flex;

    border: 1px solid rgb(179, 186, 202);
    height: 100%;
    width: 300px;
  }

  &__arrow-button {
    width: 30px;
    height: 100%;

    img{
      width: 16px;
      padding: 4px;
      border: 1px solid black;
      border-radius: 100%;
    }
  }

  &__actions{
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