<template>
  <div class="bill-wrapper">
    <!--公共部分-->
    <user-wallet/>
    <!--账本-->
    <div class="ledger tableGroup">
      <div class="navList">
        <span class="navBtn"
              :class="[{'active': index == table.navListActiveIndex}]"
              @click="table.navListActiveIndex = index"
              v-for="(item,index) in table.navList"
              :key="index">
          {{ item.text }}
        </span>
      </div>
      <!--统计-->
      <div class="remind">
        <!--充值记录统计-->
        <span v-show="table.navListActiveIndex == 0" class="t">
          <span class="it">
            <span class="label">
              {{ remind.payLabel }}：
            </span>
            <span class="val">
              {{ user.payAmount }}
            </span>
          </span>
          <span class="it">
            <span class="label">
              {{ remind.gainLabel }}：
            </span>
            <span class="val">
              {{ user.goldCoins }}
            </span>
          </span>
        </span>
        <!--消费记录统计-->
        <span v-show="table.navListActiveIndex == 1" class="t">
          <span class="it">
            <span class="label">
              {{ remind.consumptionLabel }}：
            </span>
            <span class="val">
              {{ user.consumption }}
            </span>
          </span>
        </span>
        <!--开票记录统计-->
        <span v-show="table.navListActiveIndex == 2" class="t">
          <span class="it">
            <span class="label">
              {{ remind.cumulativeBillingAmount }}：
            </span>
            <span class="val">
              {{ user.totalInvoiceAmount }}
            </span>
          </span>
          <span class="it">
            <span class="label">
              {{ remind.invoicableAmount }}：
            </span>
            <span class="val">
              {{ user.totalInvoiceAble }}
            </span>
          </span>
        </span>
      </div>
      <!--table-->
      <div class="tableList">
        <!--充值中心-->
        <recharge-centre v-show="table.navListActiveIndex == 0"/>
        <!--消费记录-->
        <consumption v-show="table.navListActiveIndex == 1"/>
        <!--开票记录-->
        <invoicing v-show="table.navListActiveIndex == 2"/>
      </div>
    </div>
  </div>
</template>

<script>
  import userWallet from './components/userWallet.vue'
  import rechargeCentre from './components/rechargeCentre-table'
  import consumption from './components/consumption-table'
  import invoicing from './components/invoicing-table'
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'bill',
    data() {
      return {
        remind: {
          payLabel: '累计支付金额',
          gainLabel: '累计到账金币',
          consumptionLabel: '累计消费金币',
          cumulativeBillingAmount: '累计开票金额',
          invoicableAmount: '可开票金额'
        },
        table: {
          navListActiveIndex: 0,
          navList: [
            {
              text: '充值记录'
            },
            {
              text: '消费记录'
            },
            {
              text: '开票记录'
            }
          ]
        }
      }
    },
    components: {
      userWallet,
      rechargeCentre,
      consumption,
      invoicing
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style lang="less" scoped>
  .bill-wrapper {
    width: 100%;

    .ledger {
      position: relative;
      flex-grow: 1;

      .remind {
        position: absolute;
        top: 0px;
        right: 0px;

        .t {
          .it {
            font-size: 13px;
            font-weight: 400;
            color: rgba(22, 29, 37, 1);
            margin-right: 30px;
            line-height: 36px;
          }
        }
      }
    }
  }
</style>

<style lang="less">
  .rechargeCentre-wrapper,
  .invoicing-wrapper,
  .consumption-wrapper {
    overflow: hidden;

    /deep/ .el-table__body-wrapper {
      height: calc(100vh - 514px);
    }

    /deep/ .el-date-editor {
      .el-range__icon,
      .el-range-separator,
      .el-input__icon.el-range__close-icon {
        line-height: 22px;
      }
    }

    .recharge-table,
    .invoicing-table,
    .recharge-table {
      overflow: hidden;

      .filter {
        position: relative;
        height: 50px;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 4px;
        margin: 20px 10px 0px;
        width: calc(100% - 20px);
        padding: 0px 20px;
        box-sizing: border-box;

        .t {
          width: 200px;
        }

        .r {
          position: absolute;
          right: 0px;
        }
      }

      .l {
        margin-top: 8px;
        background-color: rgba(22, 29, 37, 0.1);
        height: 1px;
      }
    }

    .operateBtn,
    .download-tab {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 97, 255, 1);
      text-decoration: underline;
      cursor: pointer;
    }

    .filter-item {
      display: flex;
      align-items: center;

      &.f {
        margin-right: 20px;
      }
    }

    .page {
      margin: 10px;
      display: inline-flex;

      .btn {
        margin-left: 20px;
      }
    }

    .nullTableData {
      top: 200px;
    }
  }
</style>
