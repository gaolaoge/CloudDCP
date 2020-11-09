<template>
  <div class="set">
    <div class="tableGroup">
      <div class="navList">
        <span class="navBtn"
              :class="[{'active': index == navListActiveIndex}]"
              @click="navListActiveIndex = index"
              v-for="(item,index) in navList"
              :key="index">
          {{ item }}
        </span>
      </div>
      <div class="tableList">
        <!--系统设置-->
        <m-system v-show="navListActiveIndex == 0" />
        <!--项目设置-->
        <m-project v-show="navListActiveIndex == 1" />
        <!--消息设置-->
        <m-message v-show="navListActiveIndex == 2" />
      </div>
    </div>
  </div>
</template>

<script>
  import mSystem from './components/set-system'
  import mProject from './components/set-project'
  import mMessage from './components/set-message'

  export default {
    name: 'set',
    data() {
      return {
        navListActiveIndex: 0,
        navList: ['系统设置', '项目设置', '消息设置']
      }
    },
    components: {
      mSystem,
      mProject,
      mMessage
    }
  }
</script>

<style lang="less" scoped>
  .set {
    width: 100%;
  }

  .tableList {
    height: calc(100vh - 80px - 42px - 20px);
  }

</style>
