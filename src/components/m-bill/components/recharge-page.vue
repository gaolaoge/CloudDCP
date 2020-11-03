<template>
  <div class="recharge-page">
    <div class="tableGroup">
      <!--导航-->
      <div class="navList">
        <span :class="[{'active': index == navListActiveIndex}, 'navBtn']"
              @click="navListActiveIndex = index"
              v-for="(item,index) in navList"
              :key="index">
          {{ item }}
        </span>
      </div>
      <!--内容-->
      <div>
        <!--充值-->
        <recharge-action v-show="navListActiveIndex == 0" />
        <!--充值说明-->
        <recharge-desc v-show="navListActiveIndex == 1" />
      </div>
    </div>
  </div>
</template>

<script>
  import rechargeAction from './recharge-moudle/recharge-action'
  import rechargeDesc from './recharge-moudle/recharge-desc'

  export default {
    name: 'rechargePage',
    data() {
      return {
        navListActiveIndex: 0,
        navList: ['充值', '计费说明']
      }
    },
    components: {
      rechargeAction,
      rechargeDesc
    }
  }
</script>

<style lang="less" scoped>
  .recharge-page {
    width: 100%;
    .tableList {
      padding: 30px;
      margin-bottom: 20px;
      box-sizing: border-box;
      min-width: 1440px;
      width: 100%;
    }
  }
</style>
