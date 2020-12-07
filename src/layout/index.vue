<template>
  <div class="layout-wrapper">
    <Navbar v-show="!login"
            class="navbar"
            @createDCP="createDCPDialog = true"
            @createKDM="selectDCODialog = true"/>
    <div class="main">
      <Header v-show="!login"/>
      <AppMain/>
    </div>
    <!--右下角【传输插件】按钮-->
    <div class="gz" v-show="showGZ" @click="openPlugin">
      <img src="@/icons/gz-black.png" class="d">
      <img src="@/icons/gz-blue.png" class="h">
      <span>{{ $t('transportBtn') }}</span>
    </div>
    <!--启动/下载 插件窗口-->
    <el-dialog :visible.sync="pluginDialog"
               :show-close="false"
               top="34vh"
               width="360px">
      <header class="dl_header">
        <span>{{ pluginDialog_.title }}</span>
        <img src="@/icons/shutDialogIcon.png" class="closeIcon" @click="$store.commit('openPluginDialog', false)">
      </header>
      <div class="dl_wrapper">
        <span class="main">
          {{ pluginDialog_.dialogMainText }}
          <p>
            <span>{{ pluginDialog_.dialogMainText2 }}</span>
            <span class="blue" @click="triggerPlugin">{{ pluginDialog_.triggerText }}</span>
          </p>
        </span>
        <div class="download_btn" @click="w"><span>{{ pluginDialog_.downloadText }}</span></div>
        <div class="warnInfo">
          <p>{{ pluginDialog_.warnInfo }}</p>
          <p>{{ pluginDialog_.warnInfo2 }}</p>
        </div>
      </div>
    </el-dialog>
    <!--打开异地登录窗口-->
    <el-dialog :visible.sync="remoteLoginDialog.show"
               :show-close="false"
               top="30vh"
               width="520px">
      <header class="dl_header">
        <span>{{ remoteLoginDialog.title }}</span>
        <img src="@/icons/shutDialogIcon.png" class="closeIcon" @click="shutRemoteLogin(false)">
      </header>
      <div class="dl_wrapper">
        <div class="body">
          <p class="header">
            {{ remoteLoginDialog.header1 }}{{ user.account }}{{ remoteLoginDialog.header2 }}
          </p>
          <p class="contant">
            {{ remoteLoginDialog.contant1 }}{{ remoteLoginDialog.date }}{{ remoteLoginDialog.contant2 }}
          </p>
          <p class="contant">
            {{ remoteLoginDialog.contant3 }}
            <span class="editPS" @click="shutRemoteLogin(true)">{{ remoteLoginDialog.contant4 }}</span>
            {{ remoteLoginDialog.contant5 }}
          </p>
          <div class="download_btn z" @click="shutRemoteLogin(false)"><span>{{ remoteLoginDialog.btn }}</span></div>
        </div>
      </div>
    </el-dialog>
    <!--新建DCP-->
    <el-dialog :visible.sync="createDCPDialog"
               :show-close="false"
               :destroy-on-close="true"
               :close-on-press-escape="false"
               :close-on-click-modal="false"
               top="8vh"
               width="862px">
      <addDCP @closeDialogFun="closeDialogFun"/>
    </el-dialog>
    <!--新建KDM-->
    <el-dialog :visible.sync="createKDMDialog"
               :show-close="false"
               :destroy-on-close="true"
               :close-on-press-escape="false"
               :close-on-click-modal="false"
               width="862px">
      <addKDM @closeDialogFun="closeDialogFun"
              :selectedDCPUTask="selectedDCPUTask"/>
    </el-dialog>
    <!--新建KDM前选择DCP-->
    <el-dialog :visible.sync="selectDCODialog"
               :show-close="false"
               :destroy-on-close="true"
               :close-on-press-escape="false"
               :close-on-click-modal="false"
               top="8vh"
               width="80%"
               style="maxWidth: 1412px; margin: 0px auto">
      <selectDCP @closeDialogFun="closeDialogFun" @didSelected="didSelected"/>
    </el-dialog>
  </div>
</template>

<script>
  import {
    Header,
    Navbar,
    AppMain
  } from './components'
  import {
    createDateFun,
    getUserInfoF,
    throwInfoFun
  } from '@/assets/common'
  import addDCP from '@/components/m-addOne/addDCP.vue'
  import addKDM from '@/components/m-addOne/addKDM.vue'
  import selectDCP from "../components/m-addOne/components/selectDCP"

  import {
    mapState
  } from 'vuex'

  export default {
    name: 'layout-wrapper',
    data() {
      return {
        inHome: false,
        showGZ: true,
        pluginDialog_: {
          title: '提示信息',
          dialogMainText: '需要安装传输插件才能进行文件传输',
          dialogMainText2: '若已安装过插件，请点此',
          triggerText: '启动传输插件',
          downloadText: '下载传输插件',
          warnInfo: '若已启用，依然无法传输',
          warnInfo2: '请联系24小时在线客服18560651927'
        },
        remoteLoginDialog: {
          show: false,
          title: '下线通知',
          header1: '亲爱的',
          header2: '，您好！',
          contant1: '您的账号于',
          date: null,
          contant2: '在另一地点登录了CloudRender，为了您得账号安全，您当前登录已被迫下线。',
          contant3: '如果这不是您本人得操作，那么您的密码很可能已经泄露，建议您点击',
          contant4: '修改密码',
          contant5: '。',
          btn: '重新登录'
        },
        createDCPDialog: false,
        createKDMDialog: false,
        selectDCODialog: false,
        selectedDCPUTask: {
          'packageTaskUuid': null,
          'packageName': null,
          'projectUuid': null
        }
      }
    },
    components: {
      Header,
      Navbar,
      AppMain,
      addDCP,
      addKDM,
      selectDCP
    },
    computed: {
      ...mapState(['login', 'user', 'thumb', 'socket_plugin', 'pluginDialog', 'remoteLoginDate', 'socket_backS_msg'])
    },
    watch: {
      'remoteLoginDate': function (date) {
        if (!date) return false
        this.remoteLoginDialog.date = createDateFun(new Date(date), null, true)
        this.remoteLoginDialog.show = true
      }
    },
    methods: {
      // 已选择DCP文件，打开新建KDM窗口
      didSelected(obj) {
        this.closeDialogFun('selectDCODialog')
        this.selectedDCPUTask = obj
        this.createKDMDialog = true
      },
      // 关闭新建项目窗口
      closeDialogFun(win) {
        this[win] = false
      },
      shutRemoteLogin(editPS) {
        this.remoteLoginDialog.show = false
        editPS ? this.$router.push({name: 'login', params: {modify: true}}) : this.$router.push({
          name: 'login',
          params: {modify: false}
        })
      },
      // 跳转到下载
      w() {
        window.open('http://www.chinamoviecloud.cn:8085/CloudTransfer.exe', '_blank')
      },
      // 触发插件
      triggerPlugin() {
        let son = document.createElement('IFRAME')
        document.body.appendChild(son)
        son.src = 'cloudtransfer://'
        son.contentDocument.open()
      },
      // 打开【传输列表】
      openPlugin() {
        if (this.socket_plugin) this.$store.commit('WEBSOCKET_PLUGIN_SEND', 'open')
        else this.$store.dispatch('WEBSOCKET_PLUGIN_INIT', true).then(() => this.$store.commit('WEBSOCKET_PLUGIN_SEND', 'open'))
      }
    },
    mounted() {
      getUserInfoF()
    }
  }
</script>

<style lang="less" scoped>
  .layout-wrapper {
    position: relative;
    background-color: rgba(241, 244, 249, 1);
    display: flex;
    flex-wrap: nowrap;
    height: 100vh;
    min-height: 810px;
    width: 100vw;
    overflow: hidden;

    .navbar {
      flex-shrink: 0;
    }

    .main {
      flex-grow: 1;
      flex-shrink: 1;
      width: calc(100vw - 120px);
    }

    .gz {
      position: fixed;
      bottom: 34px;
      right: 34px;
      width: 86px;
      height: 24px;
      border-radius: 2px;
      border: 1px solid rgba(22, 29, 37, 0.19);
      background-color: rgba(255, 255, 255, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      span {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: rgba(22, 29, 37, 0.8);
      }

      .h {
        display: none;
      }

      &:hover {
        border: 1px solid rgba(27, 83, 244, 0.19);

        span {
          color: rgba(27, 83, 244, 1);
        }

        .d {
          display: none;
        }

        .h {
          display: inline-block;
        }
      }
    }
  }

  .thumb {
    position: fixed;
    z-index: 10;
    top: 0vh;
    left: 0vw;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    img {
      max-width: 80vw;
      max-height: 80vh;
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
    align-items: center;
    padding-bottom: 30px;

    .main {
      text-align: center;
      margin: 30px 0px;
      flex-grow: 0;
      width: 250px;
      font-size: 14px;
      color: rgba(22, 29, 37, 1);
      line-height: 26px;

      .blue {
        color: #1b53f4;
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .download_btn {
      width: 144px;
      height: 36px;
      background-color: rgba(53, 130, 254, 1);
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-bottom: 26px;

      span {
        font-size: 14px;
        color: rgba(255, 255, 255, 1);
      }

      &.z {
        float: right;
        margin-top: 20px;
        width: 90px;
      }
    }

    .warnInfo {
      width: 200px;
      text-align: center;

      p {
        font-size: 11px;
        color: rgba(22, 29, 37, 0.6);
        line-height: 16px;
      }
    }

    .body {
      padding: 0px 30px;
    }

    .header {
      margin: 44px 0px 30px;
      width: 100%;
      font-size: 14px;
      font-weight: 500;
      text-align: left;
      color: #000;
    }

    .contant {
      width: 100%;
      font-size: 14px;
      line-height: 2.0em;
      margin-bottom: 10px;

      .editPS {
        color: #0061ff;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }

  /deep/ .el-dialog__body {
    padding: 0px 0px 20px 0px;
    background-color: rgba(255, 255, 255, 1);
  }

  /deep/ .el-dialog {
    border-radius: 8px;
    overflow: hidden;
  }

  /*@media screen and (orientation: portrait) {*/
  /*  .layout-wrapper {*/
  /*    height: 100vw;*/
  /*    width: 100vh;*/
  /*  }*/
  /*}*/
</style>

<style lang="less">
  .header {
    background-color: rgba(241, 244, 249, 1);
    box-shadow: 0px 1px 6px 0px rgba(27, 83, 244, 0.3);
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 30px;

    .title {
      font-size: 14px;
      font-weight: 600;
      color: rgba(22, 29, 37, 1);
      line-height: 25px;
    }

    .closeBtn {
      width: 12px;
      cursor: pointer;
      opacity: 0.8;
    }
  }

  .fileItem {
    display: flex;
    align-items: center;
    margin-bottom: 15px!important;

    label {
      color: rgba(22, 29, 37, 0.6);
      font-size: 14px;
      margin-right: 60px;
      display: inline-block;
      width: 96px!important;
      text-align: right;
    }

    input {
      flex-grow: 1;
      border-radius: 6px;
      border: 1px solid rgba(22, 29, 37, 0.15);
      background-color: rgba(255, 255, 255, 1);
      height: 36px;
      outline: none;
      padding-left: 17px;
    }

    .btn {
      height: 32px;
      border-radius: 6px;
      border: 1px solid rgba(27, 83, 244, 0.3);
      text-align: center;
      cursor: pointer;
      flex-shrink: 0;
      margin-left: 23px;
      padding: 0px 12px;

      span {
        line-height: 32px;
        color: rgba(27, 83, 244, 1);
        font-size: 12px;
      }
    }
  }
</style>
