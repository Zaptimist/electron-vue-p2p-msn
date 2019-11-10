<template>
  <div>
    <div class="title">
      <img class="logoTitle" src="../assets/msnLogo.png" />
      <strong>Messenger</strong>
    </div>
    <div class="signInContent">
      <div class="avatar">
        <img src="../assets/profilepicture.png" />
      </div>
      <div class="signInForm">
        <div v-if="isLogginIn" id="animation">
          <p>Signing In...</p>
          <img id="signInAnimation" src="../assets/animation.gif" />
          <div class="btnCancel">
            <button @click="cancel" class="btn" id="cancelBtn">Cancel</button>
          </div>
        </div>
        <form v-if="!isLogginIn" id="form">
          <label for="email">E-mail address:</label>
          <input v-model="email" id="email" name="email" type="text" />
          <br />
          <label for="pwd">Password:</label>
          <input id="pwd" name="pwd" type="password" />
          <div class="statusjes">
            <p>Status:</p>
            <select id="status" name="status">
              <option>
                <p>Online</p>
              </option>
              <option>
                <p>Busy</p>
              </option>
              <option>
                <p>Be Right Back</p>
              </option>
              <option>
                <p>Away</p>
              </option>
              <option>
                <p>On The Phone</p>
              </option>
              <option>
                <p>Out To Lunch</p>
              </option>
              <option>
                <p>Offline</p>
              </option>
            </select>
          </div>
          <div>
            <input type="checkbox" id="remember" name="remember" />
            <label for="remember">Remember Me</label>
          </div>
          <div>
            <input type="checkbox" id="rememberpwd" name="rememberpwd" />
            <label for="rememberpwd">Remember my Password</label>
          </div>
          <div>
            <input type="checkbox" id="signauto" name="signauto" />
            <label for="signauto">Sign me in automatically</label>
          </div>
          <div class="btnSignIn">
            <button class="btn" id="signInBtn" @click="signIn">Sign In</button>
          </div>
        </form>
      </div>
    </div>
    <footer class="footer">
      <div class="forgotpwd">
        <label id="forgotpwd">
          <a href="#">Forgot your password?</a>
        </label>
      </div>
      <div class="statusnewaccount">
        <label id="status">
          <a href="#">Service Status</a>
        </label>
        <label id="newAcc">
          <a href="#">Get a new account</a>
        </label>
      </div>
    </footer>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  data() {
    return {
      isLogginIn: false,
      email: ""
    };
  },

  mounted() {
    ipcRenderer.on("fail:signalhub", () => {
      this.isLogginIn = false;
    });
  },

  methods: {
    signIn(e) {
      e.preventDefault();
      let email = this.email.trim();
      if (email.length === 0) return;

      this.isLogginIn = true;
      ipcRenderer.send("sign:in");
    },
    cancel(e) {
      e.preventDefault();
      this.isLogginIn = false;
    }
  }
};
</script>

<style lang="scss" scoped>
$white: #fbfefc;
$blue: #46bcee;
$font-color: #000075;

.title {
  // border: 1px solid red;
  font-family: "Segoe UI Light", Arial, Helvetica, sans-serif;
  font-size: 13px;
  height: 5%;
}

.logoTitle {
  width: 45px;
  height: auto;
}

.signInContent {
  margin: 0 auto;
  height: 85%;
  // border: 1px solid green;
}

.avatar {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 5%;
  img {
    width: 95px;
    height: 95px;
    border: 1px solid #4e6ba0;
    border-radius: 7%;
  }
}

.hideForm {
  display: none;
}

.signInForm {
  font-size: 11px;
  display: flex;
  justify-content: center;
  margin-top: 5%;
  color: $font-color;

  .animation {
    text-align: center;
    display: none;
  }
}

#email,
#pwd {
  display: block;
}

.btnSignIn {
  margin-top: 10%;
  text-align: center;
}

.footer {
  height: 15%;
  font-size: 11px;
  position: relative;
  width: 80%;
  margin: 0 auto;
  .statusnewaccount {
    display: flex;
    justify-content: space-between;
  }
}

.btnCancel {
  margin-top: 25%;
}

.btn {
  cursor: pointer;
  height: 25px;
  width: 85px;
  background: linear-gradient(0deg, #ccd8ef, #fefefe);
  border: solid 1px #064283;
  box-shadow: -2px -1px 1px 0px #7294bb;
  border-radius: 2px;
}
.btn:active {
  box-shadow: -3px -2px 1px 0px #7294bb;
  transform: translate(1px, 1px);
}

.statusjes {
  display: inline-block;
  color: $font-color;

  p {
    display: inline-block;
  }
  select {
    background-color: transparent;
    border: transparent;
    width: 70px;
    font-size: 11px;
    option {
      color: $font-color;
    }
  }
}
</style>