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
      position: relative;

      .switchLabel {
        font-size: 12px;
        color: rgba(22, 29, 37, 1);
        vertical-align: middle;
        margin-left: 8px;
      }

      .toRegister {
        float: right;
        font-size: 12px;
        color: rgba(22, 29, 37, 1);
        line-height: 22px;
        cursor: pointer;
      }

      .item {
        position: relative;

        .farm-input {
          margin-bottom: 30px;
          border: 1px solid rgba(22, 29, 37, 0.2);
          border-radius: 6px;
          padding-left: 20px;
          color: rgba(22, 29, 37, 1);
          box-sizing: border-box;

          &.farm-cord-input {
            width: 220px;
          }

          &::-webkit-input-placeholder {
            color: rgba(22, 29, 37, 0.4);
          }
        }

        .verif {
          position: absolute;
          right: 0px;
          top: 0px;
          height: 38px;
          width: 90px;
          border-radius: 8px;
          border: 1px solid rgba(22, 29, 37, 0.19);
          display: flex;
          justify-content: center;
          align-items: center;

          &.register {
            height: 34px;
          }

          .btn {
            font-size: 14px;
            font-weight: 500;
            color: rgba(22, 29, 37, 0.4);

            &.canClick,
            &.suc {
              cursor: pointer;
              color: rgba(27, 83, 244, 0.8);
            }
          }

          .delayDate {
            font-size: 14px;
            color: rgba(27, 83, 244, 1);

          }
        }

        .warnInfo {
          user-select: none;
          position: absolute;
          left: 20px;
          bottom: 9px;
          font-size: 11px;
          color: rgba(255, 62, 77, 0.79);
          line-height: 16px;
          width: 300px;
        }

        .swicthPWI {
          position: absolute;
          top: 0px;
          right: 10px;
          height: 40px;
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .i {
          position: absolute;
          width: 14px;
          right: -20px;
          top: 14px;
          cursor: pointer;
        }
      }

      .bigBtn {
        margin-top: 54px;
        width: 320px;
        height: 36px;
        background-color: rgba(240, 240, 240, 1);
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          font-size: 16px;
          color: rgba(22, 29, 37, 0.39);
        }

        &.canClick {
          cursor: pointer;
          background-color: rgba(22, 113, 255, 0.8);

          span {
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
  }
</style>
