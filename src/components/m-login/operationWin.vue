<template>
  <div class="loginWin">
    <login-action @changeShowModule="changeShowModule" v-show="showModule == 'login'"/>
    <register-action @changeShowModule="changeShowModule" v-show="showModule == 'register'"/>
    <findps-action @changeShowModule="changeShowModule" v-show="showModule == 'findPS'"/>
  </div>
</template>

<script>
  import loginAction from './components/login-action.vue'
  import registerAction from './components/register-action.vue'
  import findpsAction from './components/findPS-action.vue'

  export default {
    name: 'loginWin',
    data() {
      return {
        showModule: 'login'
      }
    },
    methods: {
      changeShowModule(module) {
        this.showModule = module
      }
    },
    components: {
      loginAction,
      registerAction,
      findpsAction
    }
  }
</script>

<style lang="less" scoped>
  .loginWin {
    position: relative;
    width: 480px;
    height: 533px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 40px 0px rgba(22, 29, 37, 0.15);
    border-radius: 12px;
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    user-select: none;
  }
</style>

<style lang="less">
  @import '../../assets/common.less';

  .base {
    width: 100%;
    padding: 105px 80px 60px;
    box-sizing: border-box;
    box-shadow: 0px 2px 40px 0px rgba(22, 29, 37, 0.15);

    .nav {
      margin-bottom: 60px;
      display: flex;
      justify-content: space-around;

      .options {
        font-size: 18px;
        color: rgba(22, 29, 37, 0.5);
        cursor: pointer;
        text-shadow: 0px 0px 4px rgba(256, 256, 256, 0.2);

        &.active {
          color: rgba(27, 83, 244, 1);
        }
      }
    }

    .form {
      .toRegister {
        float: right;
        font-size: 12px;
        color: rgba(22, 29, 37, 1);
        line-height: 22px;
        cursor: pointer;
      }
    }
  }
</style>
