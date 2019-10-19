<template>
  <div class="avatar-panel">
    <div class="avatar">
      <img :src="img" alt="avatar" />
      <div class="arrow">▼</div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    img: String
  }
};
</script>

<style lang="scss" scoped>
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