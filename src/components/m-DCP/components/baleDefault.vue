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
      <div class="showPicCompress"
           @click="showWin = 'compression'"
           v-show="String('34567').includes(baleStatus)">{{ showPicCompress }}
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
              <p class="status" v-show="baleStatus == 0">{{ baleUploading }}</p>
              <p class="status" v-show="baleStatus == 0">{{ baleUploadPause }}</p>
              <p class="status" v-show="baleStatus == 0">{{ baleUploadError }}</p>
              <p class="status" v-show="baleStatus == 0">{{ baleWait }}</p>
              <p class="status" v-show="baleStatus == 0">{{ baleIng }}</p>
              <p class="status" v-show="baleStatus == 0">{{ balePause }}</p>
              <p class="status" v-show="baleStatus == 0">{{ baleError[0] }}{{ baleError[1] }}</p>
              <p class="status" v-show="baleStatus == 0">{{ baleDone }}</p>
              <!--进度条-->
              <div class="progressItem"
                   v-for="(item, index) in compressList"
                   :key="'progressKey-' + index"
                   v-show="true">
                <div class="m">
                  <el-progress :percentage="item.percent"
                               :show-text="false"
                               :class="[setProgressColorF(item), 'progressColor']"/>
                  <span class="info">{{ item.info }}</span>
                  <div class="iconB" v-show="item.status == 0">
                    <img src="@/icons/check-circle.png">
                    <span class="iconText">{{ $t('public.consummation') }}</span>
                  </div>
                  <div class="iconB" v-show="item.status == 1">
                    <img src="@/icons/progressWarnIcon.png">
                    <span class="iconText">{{ $t('public.pause') }}</span>
                  </div>
                  <div class="iconB" v-show="item.status == 2">
                    <img src="@/icons/progressErrorIcon.png">
                    <span class="iconText">{{ $t('public.error') }}</span>
                  </div>
                  <span class="percent" v-show="item.status == 3">{{ item.percent }}%</span>
                </div>
                <span class="progressType">{{ item.type }}</span>
              </div>
              <!--报错信息-->
              <div class="progressWarnInfo">
                <el-collapse>
                  <el-collapse-item v-for="(item,index) in warnInfo" :key="'item_' + index">
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
                 v-model="tabSearchInput"
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
            prop="screenId"
            label="帧数"
            sortable
            show-overflow-tooltip
            width="100"/>

          <!--帧状态-->
          <el-table-column
            prop="screenStatus"
            label="帧状态"
            show-overflow-tooltip
            column-key="status"
            :filters="statusList"
            width="100"/>

          <!--压缩时长-->
          <el-table-column
            prop="certificateName"
            label="压缩时长"
            show-overflow-tooltip
            width="180"/>

          <!--压缩开始时间-->
          <el-table-column
            prop="updateName"
            label="压缩开始时间"
            sortable
            show-overflow-tooltip
            width="200"/>

          <!--压缩结束时间-->
          <el-table-column
            prop="updateTime"
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
    createTableIconList
  } from '@/assets/common'

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
        nameV: '0103S_FTR-2_F_EN-XX_INT_51_2K_NULL_20200801_NULL_SMPTE_OV',
        compressL: '打包进度',
        baleStatus: 3,  // 0上传中 1上传暂停 2 上传失败 3等待打包 4正在打包 5打包暂停 6打包失败 7打包完成
        baleUploading: '上传中，请稍后……',
        baleUploadPause: '上传暂停，您可点击下方【传输列表】，启动插件后，查看详情。',
        baleUploadError: '上传失败，您可点击下方【传输列表】，启动插件后，查看详情。',
        baleWait: '等待打包，请稍后……',
        baleIng: '打包进行中，请稍后……',
        balePause: '打包暂停，请点击【开始】继续打包。',
        baleError: ['打包失败，共发现', '处错误'],
        baleDone: '打包完成，请您下载DCP文件包。',
        compressList: [
          {
            type: '内容检查',
            percent: 100,
            status: 0,       // 完成
            info: '内容检查完成（共耗时：1分35秒）'
          },
          {
            type: '图像压缩',
            percent: 50,
            status: 1,       // 暂停
            info: '图像压缩完成（共耗时：1分35秒）'
          },
          {
            type: '图像MXF封装',
            percent: 50,
            status: 2,      // 失败
            info: '图像封装完成（共耗时：1分35秒）'
          },
          {
            type: '声音MXF封装',
            percent: 50,
            status: 3,
            info: '声音封装完成（共耗时：1分35秒）'
          },
          {
            type: 'DCP打包',
            percent: 50,
            status: 3,
            info: 'DCP打包完成（共耗时：1分35秒）'
          },
        ],
        warnInfo: [
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
        tabSearchInput: '',    // 结果 - Table - 搜索框
        tableData: [],
        total: 0,
        pageIndex: 1,
        statusList: []
      }
    },
    methods: {
      //
      handleCurrentChange(pageIndex) {

      },
      //
      filterChangeF() {

      },
      // 操作
      operating() {
      },
      // 样式 - 进度条颜色
      setProgressColorF({percent, status}) {
        if (status == 1) return 'statusPause'
        else if (status == 2) return 'statusError'
        else return 'statusDone'
      },
      async getTableList() {

      }
    },
    computed: {
      ...mapState([]),
      startBtn() {
        if (String('5').includes(this.baleStatus)) return true
        else return false
      },
      pauseBtn() {
        if (String('34').includes(this.baleStatus)) return true
        else return false
      },
      downloadBtn() {
        if (String('7').includes(this.baleStatus)) return true
        else return false
      },
      againBtn() {
        if (String('6').includes(this.baleStatus)) return true
        else return false
      }
    },
    mounted() {
      this.$nextTick(() => createTableIconList())
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

              .progressWarnInfo {
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
