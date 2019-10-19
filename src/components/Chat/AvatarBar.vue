<template>
  <div class="avatar-panel">
    <div class="avatar">
      <img src="../../assets/chat/avatar.png" alt="avatar" />
      <div class="arrow">▼</div>
    </div>

    <div class="avatar last">
      <img src="../../assets/chat/avatar.png" alt="avatar" />
      <div class="arrow">▼</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.avatar-panel {
  width: 200px;
  padding: 12px;
}
.avatar {
  border: 1px solid #5e6871;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;

  img {
    background: white;
    border: 1px solid #5e6871;
    border-radius: 10px;
    width: auto;
    height: 140px;
  }

  .arrow {
    text-align: right;
    padding-top: 5px;
    width: 80%;
  }

  .last{
    margin-top: auto;
  }
}
</style>