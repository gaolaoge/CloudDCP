<template>
  <div class="wallet-wrapper">
    <div class="info">
      <img :src="user.avatar ? user.avatar : require('@/assets/userImg.png')" alt="" class="avatar">
      <div class="name">{{ user.name }}</div>
      <div class="level">
        <img :src="info.levelIcon" class="i">
        <span>{{ user.level }}</span>
      </div>
    </div>
    <div class="data">
      <div class="a">
        <div class="label">{{ info.balanceLabel }}</div>
        <div class="balance">{{ user.balance }}</div>
      </div>
      <div class="l"></div>
      <div class="b">
        <!--立即充值-->
        <div class="btn" @click="$router.push('/upTop')"><span>{{ info.btn }}</span></div>
        <!--立即开票-->
        <div class="btn n" @click="$router.push('/invoice')"><span>{{ info.btnn }}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'wallet',
    data() {
      return {
        info: {
          levelIcon: require('@/icons/vipIcon.png'),
          balanceLabel: '账户余额(金币)：',
          balanceVal: 'null',
          btn: '立即充值',
          btnn: '立即开票'
        }
      }
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style lang="less" scoped>
  .wallet-wrapper {
    margin-bottom: 20px;
    height: 174px;
    width: 100%;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 20px 0px rgba(27, 83, 244, 0.05);
    border-radius: 14px;
    display: flex;
    align-items: center;
    overflow: hidden;
    flex-shrink: 0;

    .info {
      width: 240px;
      height: 100%;
      background-color: RGBA(250, 251, 253, 1);
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      box-shadow: inset -15px 0px  10px -15px rgba(0, 0, 0, 0.11);

      .avatar {
        margin-bottom: 10px;
        width: 60px;
        border-radius: 16px;
        padding: 5px;
        border: 1px solid rgba(22, 29, 37, 0.09);
      }

      .name {
        font-size: 14px;
        font-weight: 600;
        color: rgba(22, 29, 37, 1);
        font-family: NexaBold;
      }

      .level {
        margin-top: 5px;

        .i {
          width: 12px;
          margin-right: 3px;
        }

        span {
          font-size: 12px;
          color: rgba(22, 29, 37, 0.3);
        }
      }
    }

    .data {
      display: flex;

      .a {
        padding-left: 60px;
        box-sizing: border-box;
        width: 400px;

        .label {
          font-size: 14px;
          font-weight: 500;
          color: rgba(27, 83, 244, 1);
          margin-bottom: 4px;
        }

        .balance {
          font-size: 30px;
          font-weight: 600;
          color: rgba(27, 83, 244, 1);
          line-height: 37px;
          font-family: Cabin-Bold;
        }
      }

      .l {
        width: 1px;
        height: 80px;
        background-color: rgba(22, 29, 37, 0.09);
        user-select: none;
      }

      .b {
        width: 216px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .btn {
        width: 114px;
        height: 30px;
        background-color: rgba(0, 97, 255, 1);
        border: 1px solid rgba(0, 97, 255, 1);
        text-align: center;
        border-radius: 6px;
        cursor: pointer;
        margin-bottom: 10px;

        span {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 30px;
        }

        &.n {
          border: 1px solid rgba(22, 29, 37, 0.2);
          background-color: rgba(248, 248, 248, 1);

          span {
            color: rgba(22, 29, 37, 1);
          }
        }
      }
    }
  }
</style>
