<template>
  <div class="action" @click="$emit('clickAction')">
    <img :src="img" alt="image"/>
    <span v-html="text"></span>
  </div>
</template>

<script>
  export default {
    props: {
      img: String,
      text: String
    }
  }
</script>

<style lang="scss" scoped>
.action{
  display:flex;
  flex-direction: column;
  height: 100%;
  width: 60px;
  justify-content: center;
  align-items: center;
  padding: 0 5px;

  img{
    // width: 32px;
    // max-height: 32px;
  }

  span{
    word-wrap: inherit;
    // height: 20px;
    // width: 100%;
  }

}
</style>