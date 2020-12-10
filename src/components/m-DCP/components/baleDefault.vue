<template>
  <div class="bale-default">
    <!--主体状态-->
    <div class="main-wrapper" v-show="showWin == 'main'">
      <div class="table-operate">
        <div :class="[
              {'cannotStart': !startBtn},
              {'cannotPause': !pauseBtn},
              {'cannotDownload': !downloadBtn},
              {'cannotAgain': !againBtn},
              'btnGroup'
             ]">
          <div :class="[item.class, 'btn']"
               @click="operating(item['action'])"
               v-for="(item,index) in btnGroup"
               :key="'renderBtn-' + index">
            <img :src="item.iconDefault" v-if="item.iconDefault" class="btnIcon default">
            <img :src="item.iconHover" v-if="item.iconHover" class="btnIcon hover">
            <span>
            {{ item['action'] }}
          </span>
          </div>
        </div>
      </div>
      <!--查看图像压缩-->
      <div class="showPicCompress"
           @click="showWin = 'compression'"
           v-show="[101, 201, 900, 301, 302, 400, 500].find(item => item == processTextStatus)">
        {{ showPicCompress }}
      </div>
      <div class="wrapper-border setScollBarStyle">
        <div class="form">
          <!--DCP文件名-->
          <div class="item">
            <label>{{ nameL }}：</label>
            <p class="name">{{ nameV }}</p>
          </div>
          <!--打包进度-->
          <div class="item">
            <label>{{ compressL }}：</label>
            <div class="main">
              <!--当前状态-->
              <p class="status" v-show="processTextStatus == 620">{{ statusTitText.baleUploading }}</p>
              <p class="status" v-show="processTextStatus == 630">{{ statusTitText.baleUploadPause }}</p>
              <p class="status" v-show="processTextStatus == 640">{{ statusTitText.baleUploadError }}</p>
              <p class="status" v-show="processTextStatus == 101">{{ statusTitText.baleWait }}</p>
              <p class="status" v-show="processTextStatus == 201 || processTextStatus == 900">
                {{ statusTitText.baleIng }}
              </p>
              <p class="status" v-show="processTextStatus == 301 || processTextStatus == 302">
                {{ statusTitText.balePause }}
              </p>
              <p class="status" v-show="processTextStatus == 400">
                {{ statusTitText.baleError[0] }}{{ statusTitText.baleError[1] }}
              </p>
              <p class="status" v-show="processTextStatus == 500">{{ statusTitText.baleDone }}</p>
              <!--进度条-->
              <div class="progressItem"
                   v-for="(item, index) in compressList"
                   :key="'progressKey-' + index"
                   v-if="baleStatus >= index && item.status">
                <div class="m">
                  <el-progress :percentage="item.percent"
                               :show-text="false"
                               :class="[setProgressColorF(item), 'progressColor']"/>
                  <span class="info">
                    {{ item.type }}{{ item.info }}{{ item.time }}
                    <!--总帧数-->
                    <span class="x" v-show="item.processType == 2">总帧数：{{ total }}</span>
                    <!--平均耗时-->
                    <span class="x" v-show="item.processType == 2">{{ item.average }}</span>
                    <!--总个数-->
                    <span class="x" v-show="[3, 4, 5].some(curr => curr == item.processType)">总个数：1</span>
                    <span v-show="[2, 3, 4, 5].some(curr => curr == item.processStatus)">)</span>
                  </span>
                  <div class="iconB" v-show="item.status == 5">
                    <img src="@/icons/check-circle.png">
                    <span class="iconText">{{ $t('public.consummation') }}</span>
                  </div>
                  <div class="iconB" v-show="item.status == 3">
                    <img src="@/icons/progressWarnIcon.png">
                    <span class="iconText">{{ $t('public.pause') }}</span>
                  </div>
                  <div class="iconB" v-show="item.status == 4">
                    <img src="@/icons/progressErrorIcon.png">
                    <span class="iconText">{{ $t('public.error') }}</span>
                  </div>
                  <span class="percent" v-show="item.status == 2">{{ item.percent }}%</span>
                </div>
                <span class="progressType">{{ item.type }}</span>
              </div>
              <!--报错信息-->
              <div class="progressErrorInfo" v-show="showErrorInfo">
                <el-collapse>
                  <el-collapse-item v-for="(item,index) in errorInfo" :key="'item_' + index">
                    <template slot="title">
                      <span class="title">{{ $t('public.error') }}{{ index ++ }}：{{ item.title }}</span>
                    </template>
                    <div class="content">
                      <div class="frames">
                        <p v-for="(frame,in_) in item.framesList" :key="'framesKey-' + in_" class="frame">{{ frame
                          }}；</p>
                      </div>
                      <span class="suggest">{{ $t('public.suggest') }}：{{ item.content }}</span>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--图像压缩-->
    <div class="compression-wrapper" v-show="showWin == 'compression'">
      <div class="table-operate">
        <div class="btnGroup">
          <div class="btn" @click="showWin = 'main'">
            <img src="@/icons/back_icon-black.png" class="btnIcon default">
            <img src="@/icons/back_icon-white.png" class="btnIcon hover">
            <span>{{ $t('public.back') }}</span>
          </div>
        </div>
        <div class="searchInput">
          <input type="text"
                 class="input"
                 v-model="keyword"
                 @keyup.enter="getTableList"
                 placeholder="搜索帧">
          <!--搜索按钮-->
          <img src="@/icons/global-search-icon.png"
               class="searchIcon"
               @click="getTableList">
        </div>
      </div>
      <div class="table wrapper-border setScollBarStyle">
        <!--表格-->
        <el-table
          :data="tableData"
          @filter-change="filterChangeF"
          style="width: 100%">

          <!--帧数-->
          <el-table-column
            prop="frameNo"
            label="帧数"
            sortable
            show-overflow-tooltip
            width="80"/>

          <!--帧状态-->
          <el-table-column
            prop="frameTaskStatus"
            label="帧状态"
            show-overflow-tooltip
            column-key="status"
            :filters="statusList"
            width="134"/>

          <!--压缩时长-->
          <el-table-column
            prop="compressUseTime"
            label="压缩时长"
            show-overflow-tooltip/>

          <!--压缩开始时间-->
          <el-table-column
            prop="compressStartTime"
            label="压缩开始时间"
            sortable
            show-overflow-tooltip
            width="200"/>

          <!--压缩结束时间-->
          <el-table-column
            prop="compressEndTime"
            label="压缩结束时间"
            sortable
            show-overflow-tooltip
            width="200"/>

        </el-table>
        <!--暂无数据-->
        <div class="nullTableData" v-if="total == 0">
          <img src="@/icons/tableDataNull.png">
          <span>{{ $t('public.unData') }}</span>
        </div>
        <!--分页-->
        <div class="page">
          <el-pagination
            background
            :current-page.sync="pageIndex"
            @current-change="handleCurrentChange"
            layout="prev, pager, next, jumper"
            :total="total">
          </el-pagination>
          <div class="refresh-btn" @click="getTableList">
            <span>{{ $t('public.refresh') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {
    createTableIconList,
    consum,
    createDateFun,
    DCFrameStatusList,
    messageFun
  } from '@/assets/common'
  import {
    getDCPPackTheResultFForTab,
    downloadDCPFile
  } from '@/api/dcp-api'

  export default {
    name: 'bale-default',
    data() {
      return {
        showWin: 'main',   // main or compression
        showPicCompress: '查看图像压缩',
        btnGroup: [
          {
            action: '下载',
            class: 'download',
            iconDefault: require('@/icons/btn_icon_download_black.png'),
            iconHover: require('@/icons/btn_icon_download_white.png'),
            state: true
          },
          {
            action: '开始',
            class: 'start',
            iconDefault: require('@/icons/btn_icon_start_black.png'),
            iconHover: require('@/icons/btn_icon_start_white.png'),
            state: true
          },
          {
            action: '暂停',
            class: 'pause',
            iconDefault: require('@/icons/btn_icon_pause_black.png'),
            iconHover: require('@/icons/btn_icon_pause_white.png'),
            state: true
          },
          {
            action: '重新打包',
            class: 'zipAgain',
            iconDefault: require('@/icons/btn_icon_again_black.png'),
            iconHover: require('@/icons/btn_icon_again_white.png'),
            state: true
          }
        ],
        selectionList: [],
        nameL: 'DCP文件名',
        nameV: null,
        packageTaskUuid: '',    // Uuid
        compressL: '打包进度',
        baleStatus: 0,     // 打包所在进程 -1上传中 0内容检查 1图像压缩 2图像MXF封装 3声音MXF封装 4DCP打包 5打包结束
        processTextStatus: 101,  // 620上传中 630上传暂停 640上传失败 101等待打包 201/900进行打包 301/302打包暂停 400打包失败 500打包成功
        statusTitText: {
          baleUploading: '上传中，请稍后……',
          baleUploadPause: '上传暂停，您可点击下方【传输列表】，启动插件后，查看详情。',
          baleUploadError: '上传失败，您可点击下方【传输列表】，启动插件后，查看详情。',
          baleWait: '等待打包，请稍后……',
          baleIng: '打包进行中，请稍后……',
          balePause: '打包暂停，请点击【开始】继续打包。',
          baleError: ['打包失败，共发现', '处错误'],
          baleDone: '打包完成，请您下载DCP文件包。'
        },
        titleText: ['内容检查', '图像压缩', '图像MXF封装', '声音MXF封装', '字幕MXF封装', 'DCP打包'],
        titleText2: ['内容检查', '图像压缩', '图像MXF封装', '声音MXF封装', 'DCP打包'],
        statusText: [null, '等待开始', '进行中（已耗时：', '暂停（已耗时：', '失败（已耗时：', '完成（共耗时：', null, null, null, '进行中（已耗时：'],
        compressList: [
          // {
          //   type: '内容检查',
          //   percent: 100,
          //   status: 0,       // 完成
          //   time: '0',
          //   info1: '内容检查完成（共耗时：'
          // }
        ],
        errorInfo: [
          {
            title: '导入图片设置的源色彩格式不符',
            content: '请检查导入图片的色彩空间，确认无误后请重新创建DCP打包任务；',
            framesList: ['第32帧', '第45帧']
          },
          {
            title: '2导入图片设置的源色彩格式不符',
            content: '2请检查导入图片的色彩空间，确认无误后请重新创建DCP打包任务；',
            framesList: null
          }
        ],
        showErrorInfo: false,
        keyword: '',    // 结果 - Table - 搜索框
        tableData: [],
        total: 0,
        pageIndex: 1,
        statusList: []
      }
    },
    props: {
      'packTheResult': Object,
      'infoData': Object
    },
    methods: {
      // 复位
      reset() {
        Object.assign(this, {
          'showWin': 'main',
          'total': 0,
          'pageIndex': 1,
          'keyword': ''
        })
      },
      // 构建【打包进度】
      buildProcessList() {
        let {packTheResult: PTR, titleText, titleText2, statusText} = this,
          realTitleText = PTR.processList.length == 5 ? titleText2 : titleText,
          compressList = PTR.processList.map((item, index) => {
            return {
              'processStatus': item.processStatus,
              'processType': item.processType,
              'type': realTitleText[index],
              'percent': Number((item.percent * 100).toFixed(2)),
              'status': item.processStatus,
              'time': item.processStatus > 1 ? consum(item.useTime) : null,
              'info': statusText[item.processStatus],
              'average': '平均耗时：' + consum(item.averageUseTime)
            }
          })
        // processType 1内容检查 2图像压缩 3图像MXF封装 4声音MXF封装 5字幕MXF封装 6DCP打包
        Object.assign(this, {
          'nameV': PTR.dcpPackageName,
          'baleStatus': PTR.currentProcessType,
          'packageTaskUuid': PTR.dcpPackageTaskUuid,
          'processTextStatus': PTR.taskStatus,
          compressList
        })
        this.getTableList()
      },
      //
      handleCurrentChange(pageIndex) {
        this.pageIndex = pageIndex
        this.getTableList()
      },
      //
      filterChangeF() {

      },
      // 操作
      operating(action) {
        switch (action) {
          case '下载':
            this.downloadFun()
            break
        }
      },
      // 操作 - 下载
      async downloadFun() {
        let {data} = await downloadDCPFile({'packageTaskUuid': [this.packageTaskUuid]})
        if (data.code != 200) {
          messageFun('error', '操作失败')
          return false
        }
        let cb = () => {
          this.$store.commit('WEBSOCKET_PLUGIN_SEND', {
            'code': 300,
            'userID': this.user.id,
            'ID': this.infoData['taskId'],
            'filmName': this.infoData['filmName'],
            'taskName': this.infoData['taskName'],
            'path': [{'front': data.data[0]['pathPrefix'], 'back': data.data[0]['relativePath']}]
          })
        }
        if (this.socket_plugin) cb()
        else this.$store.dispatch('WEBSOCKET_PLUGIN_INIT', true).then(() => cb())
      },
      // 样式 - 进度条颜色
      setProgressColorF({percent, status}) {
        if (status == 301 || status == 302) return 'statusPause'
        else if (status == 400) return 'statusError'
        else return 'statusDone'
      },
      // 获取【打包结果】Tab
      async getTableList() {
        let {pageIndex, keyword, packTheResult} = this,
          {data} = await getDCPPackTheResultFForTab({
            'taskUuid': packTheResult.dcpPackageTaskUuid,
            pageIndex,
            'pageSize': 10,
            frameTaskStatusList: [],
            keyword,
            sortBy: null,
            sortType: 0
          })
        if (data.code == 200) this.tableData = data.data.map(item => Object.assign(item, {
          'frameTaskStatus': DCFrameStatusList.find(curr => curr.code == item.frameTaskStatus)['status'],
          'compressEndTime': createDateFun(item.compressEndTime),
          'compressStartTime': createDateFun(item.compressStartTime),
          'compressUseTime': consum(item.compressUseTime, true)
        }))
        this.total = data.total
      }
    },
    computed: {
      ...mapState(['user', 'socket_backS_msg', 'socket_plugin']),
      startBtn() {
        if ([301, 302].find(item => item == this.processTextStatus)) return true
        else return false
      },
      pauseBtn() {
        if ([201, 900].find(item => item == this.processTextStatus)) return true
        else return false
      },
      downloadBtn() {
        if ([500].find(item => item == this.processTextStatus)) return true
        else return false
      },
      againBtn() {
        if ([400].find(item => item == this.processTextStatus)) return true
        else return false
      }
    },
    mounted() {
      this.$nextTick(() => {
        createTableIconList()
        Object.assign(this, {
          DCFrameStatusList
        })
      })
    },
    watch: {
      'packTheResult': {
        handler: function (obj) {
          if ('dcpPackageTaskUuid' in obj) {
            this.packageTaskUuid = obj.dcpPackageTaskUuid
            this.buildProcessList()
            if (this.packageTaskUuid != obj.dcpPackageTaskUuid) this.getTableList()
          }
        },
        deep: true
      },
      'socket_backS_msg': {
        handler: function (e) {
          let data = JSON.parse(e.data)
          if (data.code == '103' && data.packageTaskUuid == this.packageTaskUuid && this.showWin == 'compression')
            this.getTableList()
        }
      },
      'showWin': function (val) {
        if (val == 'compression' && this.total == 0) this.getTableList()
      }
    }
  }
</script>

<style lang="less" scoped>
  .bale-default {
    padding: 20px;
    box-sizing: border-box;

    .main-wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;

      .btnGroup {
        flex-grow: 0;
        height: 26px;

        &.cannotStart .btn.start,
        &.cannotPause .btn.pause,
        &.cannotDownload .btn.download,
        &.cannotAgain .btn.zipAgain {
          display: none;
        }
      }

      .showPicCompress {
        position: absolute;
        font-size: 14px;
        color: rgba(27, 83, 244, 1);
        cursor: pointer;
        right: 0px;
      }

      .wrapper-border {
        height: 1px;
        flex-grow: 1;
        padding: 20px 30px;

        .form {
          height: 100%;

          .item {
            display: flex;
            align-items: flex-start;

            label {
              font-size: 14px;
              color: rgba(22, 29, 37, 0.6);
              width: 86px;
              text-align: right;
              margin-right: 10px;
            }

            .name {
              font-size: 14px;
              color: rgba(22, 29, 37, 1);
            }

            .main {
              height: 100%;

              .status {
                font-size: 14px;
                color: rgba(22, 29, 37, 1);
                margin-bottom: 30px;
              }

              .progressItem {
                width: 600px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 34px;

                .progressColor.statusDone {
                  /deep/ .el-progress-bar__inner {
                    background-color: rgba(27, 83, 244, 0.8);
                  }
                }

                .progressColor.statusPause {
                  /deep/ .el-progress-bar__inner {
                    background-color: rgba(255, 191, 0, 1);
                  }
                }

                .progressColor.statusError {
                  /deep/ .el-progress-bar__inner {
                    background-color: rgba(255, 62, 77, 1);
                  }
                }

                .m {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                  align-items: center;
                  flex-grow: 1;

                  /deep/ .el-progress {
                    width: 100%;
                    flex-grow: 1;
                    margin-bottom: 6px;
                  }

                  .info {
                    display: flex;
                    justify-content: space-between;
                    color: rgba(22, 29, 37, 0.6);
                    font-size: 12px;

                    .x {
                      margin-left: 14px;
                    }
                  }

                  .iconB {
                    display: flex;
                    align-items: center;

                    img {
                      width: 14px;
                      margin-right: 4px;
                    }
                  }

                  .percent,
                  .iconText {
                    color: rgba(22, 29, 37, 0.6);
                    font-size: 12px;
                  }
                }

                .progressType {
                  color: rgba(22, 29, 37, 0.6);
                  font-size: 14px;
                  margin-left: 40px;
                  width: 90px;
                }

              }

              .progressErrorInfo {
                /deep/ .el-collapse,
                /deep/ .el-collapse-item__wrap,
                /deep/ .el-collapse-item__header {
                  border-color: rgba(0, 0, 0, 0);
                }

                .title {
                  font-size: 12px;
                  color: rgba(252, 98, 110, 1);
                }

                .content {
                  .frames {
                    margin-left: 42px;
                    margin-bottom: 10px;

                    .frame {
                      font-size: 12px;
                      color: rgba(252, 98, 110, 1);
                    }
                  }

                  .suggest {
                    font-size: 12px;
                    color: rgba(22, 29, 37, 1);
                  }
                }
              }
            }
          }

        }
      }
    }

    .wrapper-border {
      padding: 6px;
    }

    /deep/ .el-table__body-wrapper {
      height: calc(100vh - 73px - 30px - 42px - 40px - 48px - 12px - 47px - 47px);
    }

    .table {
      position: relative;
    }
  }
</style>
