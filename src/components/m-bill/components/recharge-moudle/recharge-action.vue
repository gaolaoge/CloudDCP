<template>
  <div class="recharge-action">
    <!--充值-->
    <div class="panel form_">
      <!--金币余额-->
      <div class="form-item">
        <div class="form-item-label">{{ balanceLabel }}:</div>
        <div class="form-item-val"><span class="text">{{ user.balance }}</span></div>
      </div>
      <!--充值金额-->
      <div class="form-item">
        <div class="form-item-label">{{ upTopLabel }}:</div>
        <div class="form-item-val">
          <div class="g">
            <div :class="[{'active': ChineseYuan == item.ChineseYuan}, 'up-top-item']"
                 v-for="(item,index) in list"
                 :key="index"
                 @click="ChineseYuan = item.ChineseYuan">
              <div class="gold">
                <span class="unit">￥</span>
                <span class="num">{{ item.ChineseYuan }}</span>
              </div>
              <div class="t">
                <p class="remark">{{ item.remark1 }}</p>
                <p class="remark">{{ item.remark2 }}</p>
              </div>
              <div class="selected" :style="{backgroundImage: 'url(' + require('../../../../icons/x.png') + ')'}">
                <span>{{ item.ChineseYuan }}</span>
                <img src="@/icons/check-circle.png">
              </div>
            </div>
          </div>
          <input type="text"
                 :class="[{'error': ChineseYuanVerif === false}, 'form-item-input', 'in']"
                 :placeholder="placeholder"
                 v-model="ChineseYuan">
        </div>
      </div>
      <!--充值到账金币-->
      <div class="form-item">
        <div class="form-item-label">{{ realLabel }}:</div>
        <div class="form-item-val">
          <span class="text">{{ realVal }}</span>
        </div>
      </div>
      <!--充值方式-->
      <div class="form-item">
        <div class="form-item-label">{{ modeLabel }}:</div>
        <div class="form-item-val">
          <div @click="payMethods = 'zfb'" :class="[{'active': payMethods == 'zfb'}, 'pay-base']">
            <img src="@/icons/no-select.png" v-show="payMethods != 'zfb'" class="s">
            <img src="@/icons/yes-select.png" v-show="payMethods == 'zfb'" class="s">
            <img src="@/icons/zhifubao-icon.png" v-show="payMethods != 'zfb'">
            <img src="@/icons/zhifubao-icon-a.png" v-show="payMethods == 'zfb'">
          </div>
          <div @click="payMethods = 'wx'" :class="[{'active': payMethods == 'wx'}, 'pay-base']">
            <img src="@/icons/no-select.png" v-show="payMethods != 'wx'" class="s">
            <img src="@/icons/yes-select.png" v-show="payMethods == 'wx'" class="s">
            <img src="@/icons/weixin-icon.png" v-show="payMethods != 'wx'">
            <img src="@/icons/weixin-icon-a.png" v-show="payMethods == 'wx'">
          </div>
        </div>
      </div>
      <!--btn-->
      <div class="form-item">
        <div class="form-item-label"></div>
        <div class="form-item-val">
          <div :class="[{'cannotBeGo': !ChineseYuanVerif}, 'btn']" @click="payFun">{{ upTopBtn }}</div>
        </div>
      </div>
    </div>
    <!--充值说明-->
    <div class="panel form_">
      <div class="farm-form">
        <div class="farm-form-item">
          <div class="farm-form-item-label">{{ directions }}:</div>
          <div class="farm-form-item-val">
            <ol class="ll">
              <li v-for="(item,index) in directionsList" :key="index" class="l">{{ item }}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <!--充值-->
    <el-dialog top="0px" :visible.sync="rechargeIframe">
      <div ref="dom"></div>
    </el-dialog>
    <!--充值窗口-->
    <el-dialog top="0px" width="600px" :visible.sync="dialogNode">
      <header class="dl_header">
        <span>{{ dialogNodeText.title }}</span>
        <img src="@/icons/shutDialogIcon.png" class="closeIcon" @click="dialogNode = false">
      </header>
      <div class="dl_wrapper">
        <p class="f">亲爱的 {{ user.account }} ，您好！</p>
        <p class="f s">因服务更新原因，烦请您联系客服进行线下充值～</p>
        <div class="e">
          <p>24小时客服电话：18560651927</p>
          <p>QQ客服：2860177580</p>
          <p>售后邮箱：ENJINECG@163.com</p>
        </div>
        <div class="k">
          <div class="c">
            <img src="@/assets/w.png">
            <p>CloudRender客服</p>
          </div>
          <div class="c">
            <img src="@/assets/e.png">
            <p>已臻化境企业号</p>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {
    computeGold,
    ALiPay,
    upTopDefault
  } from '@/api/bill-api'

  export default {
    name: 'recharge-recharge-action',
    data() {
      return {
        balanceLabel: '金币余额',
        balanceVal: '0.000',
        upTopLabel: '充值金额',
        upTopVal: '',
        realLabel: '充值到账金币',
        realVal: '160.000',
        modeLabel: '充值方式',
        modeVal: '',
        listActive: 0,
        list: [
          {
            ChineseYuan: '100',
            remark1: '充值100元送60金币',
            remark2: '实际到账160金币',
            gold: 160
          },
          {
            ChineseYuan: '500',
            remark1: '充值500元送400金币',
            remark2: '实际到账900金币',
            gold: 900
          },
          {
            ChineseYuan: '2000',
            remark1: '充值2000元送1800金币',
            remark2: '实际到账3800金币',
            gold: 3800
          },
          {
            ChineseYuan: '5000',
            remark1: '充值5000元送5000金币',
            remark2: '实际到账10000金币',
            gold: 10000
          }
        ],
        placeholder: '输入其他金额',
        directions: '充值说明',
        directionsList: [
          '充值金额将以金币的形式发送到充值账户，只能按照实际充值金额开具发票，赠送金币不开具发票',
          '充值后不支持退款。',
          '充值其他问题，请联系客服：18560651927'
        ],
        ChineseYuan: 100,
        ChineseYuanVerif: true,
        upTopBtn: '立即充值',
        payMethods: 'zfb',
        dialogNode: false,
        rechargeIframe: false,
        dialogNodeText: {
          title: '充值提示'
        }
      }
    },
    computed: {
      ...mapState(['user'])
    },
    watch: {
      'ChineseYuan': function (val) {
        let reg = /^\d+$/,
          {ChineseYuan} = this
        if (!ChineseYuan) this.ChineseYuanVerif = null
        else this.ChineseYuanVerif = reg.test(ChineseYuan)
        if (val == 100) this.realVal = '160.000'
        else if (val == 500) this.realVal = '900.000'
        else if (val == 2000) this.realVal = '3800.000'
        else if (val == 5000) this.realVal = '10000.000'
        else this.computeFun()
      }
    },
    methods: {
      // 计算金币
      async computeFun() {
        if (!this.ChineseYuan) this.form.realVal = '0.000'
        else {
          let {data} = await computeGold(this.ChineseYuan)
          this.realVal = data.data.toFixed(3)
        }
      },
      // 立即充值
      payFun() {
        if (!this.ChineseYuanVerif) return false
        // this.dialogNode = true
        // return false
        if (this.payMethods == 'zfb') this.aLiPayFun()
        if (this.payMethods == 'wx') this.wxPayFun()
      },
      // 支付宝充值
      async aLiPayFun() {
        let {data} = await ALiPay(this.ChineseYuan)
        sessionStorage.setItem('aliPay', data.data)
        let routerData = this.$router.resolve({name: 'rechargePage'})
        window.open(routerData.href, '_blank')
      },
      // 微信充值
      wxPayFun() {

      }
    },
    mounted() {
      if (/\?/.test(this.$route.fullPath))
        upTopDefault(this.$route.fullPath.split('?')[1])
    }
  }
</script>

<style lang="less" scoped>
  .recharge-action {

    .form_ {
      width: 100%;
      padding: 30px;
      box-sizing: border-box;

      &:nth-of-type(1) {
        margin-bottom: 20px;
        border-top-left-radius: 0px;
      }

      &:nth-of-type(2) {
        height: calc(100vh - 723px);
        min-height: 132px;
      }
    }

    .g {
      display: flex;
    }

    .up-top-item {
      position: relative;
      width: 260px;
      height: 174px;
      background-color: rgba(27, 83, 244, 0.05);
      border: 1px solid rgba(27, 83, 244, 1);
      border-radius: 8px;
      margin-right: 30px;
      overflow: hidden;
      user-select: none;
      cursor: pointer;

      .gold {
        width: 260px;
        height: 100px;
        border-bottom: 1px solid rgba(27, 83, 244, 1);

        .unit {
          display: inline-block;
          font-size: 16px;
          font-weight: 600;
          color: rgba(255, 187, 0, 1);
          margin-left: 20px;
          margin-right: 5px;
        }

        .num {
          display: inline-block;
          margin-top: 11px;
          font-size: 60px;
          font-weight: 600;
          line-height: 84px;
          color: rgba(255, 187, 0, 1);
        }
      }

      .t {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 73px;

        .remark {
          padding-left: 20px;
          font-size: 13px;
          font-weight: 400;
          color: rgba(27, 83, 244, 0.6);
          line-height: 1.6em;
        }
      }

      &.active {
        border: 1px solid rgba(0, 0, 0, 0);

        .selected {
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          span {
            font-size: 60px;
            font-family: MontserratAlternates-BlackItalic, MontserratAlternates;
            font-weight: normal;
            color: rgba(255, 255, 255, 1);
            line-height: 73px;
            margin: 18px 0px 15px;
          }
        }
      }
    }

    .in {
      width: 460px;
      margin-top: 30px;

      &.error {
        color: rgba(255, 62, 77, 1);
      }
    }

    .pay-base {
      position: relative;
      border-radius: 4px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin-right: 60px;
      cursor: pointer;

      .s {
        margin-right: 10px;
      }

      &.active {

      }
    }

    .btn {
      margin-top: 10px;
      cursor: pointer;
      display: inline-block;
      background-color: rgba(0, 97, 255, 1);
      box-shadow: 0px 1px 10px 0px rgba(22, 29, 37, 0.2);
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      padding: 6px 30px;
      line-height: 20px;

      &:hover {
        background-color: rgba(53, 130, 254, 1);
      }
    }

    .ll {
      padding-left: 16px;

      .l {
        font-size: 14px;
        font-weight: 400;
        color: rgba(22, 29, 37, 0.8);
        line-height: 24px;
      }
    }

    .dl_header {
      height: 36px;
      text-align: center;
      background-color: rgba(241, 244, 249, 1);
      box-shadow: 0px 1px 6px 0px rgba(27, 83, 244, 0.3);
      padding: 0px 30px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        font-size: 14px;
        font-weight: 600;
        color: rgba(22, 29, 37, 1);
      }

      img {
        cursor: pointer;
      }
    }

    .dl_wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .f {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(22, 29, 37, 1);
        margin-left: 59px;
        margin-top: 32px;

        .s {
          font-weight: 400;
        }
      }

      .e {
        margin-left: 59px;
        margin-top: 42px;

        p {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(27, 83, 244, 1);
          line-height: 27px;
        }
      }

      .k {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 34px;
        margin-bottom: 20px;

        .c {
          background-color: rgba(27, 83, 244, 0.1);
          padding: 15px;
          border-radius: 8px;
          text-align: center;

          p {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(22, 29, 37, 1);
            margin-top: 12px;
          }
        }
      }
    }
  }
</style>
