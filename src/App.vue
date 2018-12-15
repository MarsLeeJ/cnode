<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <router-view name="aside"></router-view>
      <router-view name='main'></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
*{
  margin:0;
  padding: 0;
}
#app {
  background-color: rgb(225, 225, 225);
  width: 100vw;
  height: 100vh;
  overflow-y:scroll;
}
#app .main {
  padding-top: 15px;
  width: 90%;
  margin: 0 auto;
}
</style>
