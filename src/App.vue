<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: rgb(215, 226, 244);
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* min-height: 100vh; */
  height: 100%;
  font-size: 80%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;      
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
