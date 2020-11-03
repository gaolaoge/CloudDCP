<template>
  <div class="recharge-desc panel">
    <!--CPU-->
    <div class="t">
      <div class="card">{{ cpuCard }}</div>
      <div class="priceList cpuPriceList">
        <div class="item" v-for="(item,index) in cpuList" :key="index">
          <h6>{{ item.userLevel }}</h6>
          <p class="accumulative"> {{ item.total }} </p>
          <p class="price">{{ unit }}<span class="num">{{ item.price }}</span>{{ unitPrice }}</p>
          <p class="k">
            <span style="display: block" class="v">全新硬件</span>
            <span style="display: block" class="v">发烧级性能</span>
            <span style="display: block" class="v">限时<span style="color: #000">5折</span>巨惠</span>
          </p>
        </div>
      </div>
    </div>

    <!--GPU-->
    <div class="t">
      <div class="card">{{ gpuCrad }}</div>
      <div class="priceList gpuPriceList">
        <div class="item" v-for="(item,index) in gpuList" :key="index">
          <h6>{{ item.userLevel }}</h6>
          <p class="accumulative"> {{ item.total }} </p>
          <p class="price">{{ unit }}<span class="num">{{ item.price }}</span>{{ unitPrice2 }}</p>
          <p class="k">
            <span style="display: block" class="v"><span style="color: #000">RTX6000</span>显卡</span>
            <span style="display: block" class="v">光线追踪</span>
            <span style="display: block" class="v">性能怪兽</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'recharge-description',
    data() {
      return {
        cpuCard: 'CPU',
        gpuCrad: 'GPU',
        cpuList: [
          {
            userLevel: '普通用户',
            total: '累计充值0元',
            price: '0.200',
            unitPrice: '3.20',
            RAM: '10G',
            dir1: '相当于16核32线程节点机'
          },
          {
            userLevel: '璀璨白银',
            total: '累计充值2000元',
            price: '0.175',
            unitPrice: '2.80',
            RAM: '20G',
            dir1: '相当于16核32线程节点机'
          },
          {
            userLevel: '荣耀黄金',
            total: '累计充值12000元',
            price: '0.150',
            unitPrice: '2.40',
            RAM: '30G',
            dir1: '相当于16核32线程节点机'
          },
          {
            userLevel: '尊贵铂金',
            total: '累计充值30000元',
            price: '0.125',
            unitPrice: '2.00',
            RAM: '40G',
            dir1: '相当于16核32线程节点机'
          },
          {
            userLevel: '永恒钻石',
            total: '累计充值60000元',
            price: '0.100',
            unitPrice: '1.60',
            RAM: '50G',
            dir1: '相当于16核32线程节点机',
            dir4: '包含每小时收费'
          }
        ],
        gpuList: [
          {
            userLevel: '普通用户',
            total: '累计充值0元',
            price: '8',
            dir1: '相当于2张M10卡',
            RAM: '10G'
          },
          {
            userLevel: '璀璨白银',
            total: '累计充值2000元',
            price: '6.4',
            dir1: '相当于2张M10卡',
            RAM: '20G'
          },
          {
            userLevel: '荣耀黄金',
            total: '累计充值12000元',
            price: '5',
            dir1: '相当于2张M10卡',
            RAM: '30G'
          },
          {
            userLevel: '尊贵铂金',
            total: '累计充值30000元',
            price: '4',
            dir1: '相当于2张M10卡',
            RAM: '40G'
          },
          {
            userLevel: '永恒钻石',
            total: '累计充值60000元',
            price: '3.2',
            dir1: '相当于2张M10卡',
            RAM: '50G'
          }
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  .recharge-desc {
    padding: 30px;
    padding-left: 90px;

    .priceList {
      position: relative;
      /*z-index: ;*/
      width: 1316px;
      height: 313px;
      background-color: rgba(27, 83, 244, 0.05);
      border-radius: 0px 10px 10px 10px;
      border: 1px solid rgba(27, 83, 244, 0.1);
      margin-bottom: 30px;
      display: flex;
      justify-content: space-around;

      .item {
        position: relative;
        text-align: center;
        padding: 50px;

        &::after {
          position: absolute;
          right: 0px;
          top: 66px;
          content: '';
          width: 1px;
          height: 190px;
          background-color: rgba(255, 255, 255, 0.2);
        }

        &:nth-last-of-type(1) {
          &::after {
            display: none;
          }
        }

        h6 {
          font-size: 18px;
          font-weight: 600;
          color: rgba(22, 29, 37, 1);
          margin-bottom: 10px;
        }

        .price,
        .accumulative,
        .k {
          font-size: 14px;
          font-weight: 500;
          color: rgba(22, 29, 37, 0.6);
          line-height: 22px;
        }

        .price {
          margin: 30px 0px 20px;
          line-height: 42px;

          .num {
            font-size: 30px;
            font-weight: 900;
            color: rgba(39, 95, 239, 1);
            font-family: Arial-Black, Arial;
          }
        }

        .k {
          width: 158px;

          .v {
            color: rgba(22, 29, 37, 0.6);
            font-weight: 600;
          }
        }
      }
    }

    .t {
      position: relative;
    }

    .card {
      position: absolute;
      z-index: 0;
      left: -60px;
      content: 'CPU';
      width: 60px;
      height: 38px;
      background-color: rgba(243, 119, 109, 1);
      border-radius: 100px 0px 0px 100px;
      box-sizing: border-box;
      font-size: 16px;
      line-height: 38px;
      padding-left: 15px;
      color: rgba(255, 255, 255, 1);
    }

    .gpuPriceList {

    }
  }
</style>
