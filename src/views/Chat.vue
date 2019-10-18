<template>
  <div class="home">
    <Header />
    <ChatBox />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../components/Chat/Header'
import ChatBox from '../components/Chat/ChatBox'

export default {
  name: 'home',
  components: {
    Header,
    ChatBox
  }
}

</script>

<style lang="scss" scoped>
.home{
  height: 100%;

}
</style>
