<template>
  <div class="action" @click="$emit('clickAction')">
    <img :src="img" alt="image"/>
    <span>{{text}}</span>
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
  justify-content: center;
  align-items: center;
  padding: 5px;

  img{
    max-width: 32px;
    height: auto;
  }

  span{
    font-size:80%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif

  }
}
</style>