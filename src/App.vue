<template>
  <div id="app">
<!--        <Win />-->
    <router-view />
  </div>
</template>

<script>

  import '@/assets/font.css'
  // import Win from './layout/index.vue'

  export default {
    name: 'App',
    components: {
      // Win
    }
  }
</script>

<style>
  @import './assets/common.less';

  * {
    margin: 0px;
    padding: 0px;
  }

  #app {
    min-height: 810px;
    min-width: 900px;
  }
</style>
