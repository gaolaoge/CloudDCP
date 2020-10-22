<template>
  <div class="login">
    <!--背景图-->
    <canvas ref="canvas" class="canvas" :width="screenWidth" :height="screenHeight"/>
    <section>
      <!--logo-->
      <img src="@/icons/login-logo.png" class="img_logo">
      <!--操作窗口-->
      <operation-win/>
      <!--备案-->
      <div class="record_">
        <span>{{ $t('login_page.record.text2') }}</span>
      </div>
    </section>
  </div>
</template>

<script>
  import operationWin from './operationWin'
  export default {
    name: 'loginM',
    data() {
      return {
        screenWidth: '',
        screenHeight: ''
      }
    },
    components: {
      operationWin
    },
    methods: {
      // 创建画布
      setCanvas() {
        let canvas = document.getElementsByClassName('canvas')[0]
        if (!canvas.getContext) return
        let ctx = canvas.getContext('2d')

        ctx.beginPath()
        let bgi = ctx.createLinearGradient(0, 0, this.screenWidth, this.screenHeight / 2)
        bgi.addColorStop(1, 'rgba(162, 203, 255, 1)')
        bgi.addColorStop(0, 'rgba(0, 75, 206, 1)')
        ctx.fillStyle = bgi
        ctx.moveTo(0, 0)
        ctx.lineTo(this.screenWidth, 0)
        ctx.lineTo(this.screenWidth, this.screenHeight / 3)
        ctx.lineTo(0, this.screenHeight / 2)
        ctx.closePath()
        ctx.fill()
      }
    },
    mounted() {
      this.screenWidth = document.body.clientWidth
      this.screenHeight = document.body.clientHeight

      window.addEventListener('resize', () => {
        this.screenWidth = document.body.clientWidth
        this.screenHeight = document.body.clientHeight
        setTimeout(() => this.setCanvas(), 0)
      })

      this.$nextTick(() => this.setCanvas())
    }
  }
</script>

<style lang="less" scoped>
  .login {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .canvas {
      position: fixed;
      z-index: 0;
      top: 0px;
      left: 0px;
    }

    section {
      position: relative;
      width: 480px;
      height: 612px;

      .img_logo {
        position: absolute;
        top: -40px;
        left: calc(50% - 40px);
        width: 80px;
        z-index: 9;
      }

      .record_ {
        position: absolute;
        width: 100%;
        display: flex;
        flex-direction: column;
        bottom: 17px;

        span {
          text-align: center;
          font-size: 12px;
          color: rgba(22, 29, 37, 0.4);
          line-height: 22px;
        }
      }
    }
  }
</style>
