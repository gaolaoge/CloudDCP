<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

  import '@/assets/font.css'

  export default {
    name: 'App',
    components: {
      // Win
    }
  }
</script>

<style lang="less">
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
