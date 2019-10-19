<template>
  <div class="chatbox">
    <div class="chatbox__peer-chatbox">
      <div class="header">
        <span>To:</span>
      </div>

      <div class="box">
        <li>asdf</li>
        <li>asdf</li>
        <li>asdf</li>
        <li>asdf</li>
        <li>asdf</li>
        <li>asdf</li>
        <li>asdf</li>
        <li>asdf</li>
        <li>asdf</li>
        <li>asdf</li>
        <li>asdf</li>
        <li>asdf</li>
        <li>asdf</li>
        <li>asdf</li>
      </div>
    </div>

    <div class="chatbox__my-chatbox">
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
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.chatbox {
  padding: 12px 0 12px 12px;
  display: flex;
  flex-direction: column !important; // Used because it overwrites the parent class
  height: 100%;

  &__peer-chatbox {
    border: 1px solid rgb(88, 100, 114);
    border-radius: 10px 10px 0 0;

    background: rgb(251, 252, 255);
    margin-bottom: 9px;
    flex: auto;

    .header {
      border-bottom: 1px solid rgb(88, 100, 114);
      background-image: linear-gradient(#e4ebfe, #eef0ff, #e4ebfe);
      border-radius: 10px 10px 0 0;

      text-align: left;
      padding: 7px 0 10px 6px;
    }

    .box {
      background: rgb(251, 252, 255);
    }
  }

  &__my-chatbox {
    border: 1px solid rgb(88, 100, 114);
    border-radius: 10px 10px 10px 10px;

    .header {
      height: 22px;
      border-radius: 10px 10px 0 0;

      background-image: linear-gradient(#d4e1ff, #f0f0f8, #d4e1ff);
    }

    .box {
      display: flex;
      justify-content: space-between;
      padding: 6px 6px 6px 10px;

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
</style>