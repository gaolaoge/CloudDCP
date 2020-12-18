<template>
  <div class="make-default">
    <!--主体状态-->
    <div class="main-wrapper">
      <!--DCP文件简介-->
      <div class="wrapper-border info">
        <div class="showPicCompress"
             @click="$router.push({'name': 'dcp'})">{{ showPicCompress }}
        </div>
        <!--DCP文件名-->
        <div class="infoItem">
          <label>{{ info.nameL }}:</label>
          <span class="DCPFileName" :title="info.nameV">{{ info.nameV }}</span>
        </div>
        <!--打包进度-->
        <div class="infoItem">
          <label>{{ info.progressL }}:</label>
          <span>{{ info.progressV }}</span>
        </div>
      </div>
      <!--table-->
      <div class="wrapper-border tab">
        <div class="table-operate">
          <div :class="[
              {'cannotStart': !startBtn},
              {'cannotPause': !pauseBtn},
              {'cannotDownload': !downloadBtn},
              {'cannotAgain': !againBtn},
              {'cannotSend': !sendBtn},
              'btnGroup'
             ]">
            <div :class="[item.class, 'btn']"
                 @click="operating(item['action'])"
                 v-for="(item,index) in btnGroup"
                 :key="'renderBtn-' + index">
              <img :src="item.iconDefault" class="btnIcon default">
              <img :src="item.iconHover" class="btnIcon hover">
              <span>{{ item['action'] }}</span>
            </div>
          </div>
          <div class="searchInput">
            <input type="text"
                   class="input"
                   v-model="tab.keyword"
                   @keyup.enter="getTabList(KDMUuid)"
                   placeholder="检索KDM文件名">
            <!--搜索按钮-->
            <img src="@/icons/global-search-icon.png"
                 class="searchIcon"
                 @click="getTabList(KDMUuid)">
          </div>
        </div>
        <div class="table">
          <!--表格-->
          <el-table
            :data="tab.tableData"
            @sort-change="changeSort"
            @selection-change="selectionFun"
            @filter-change="filterChangeF"
            :row-class-name="tableRowStyle"
            ref="dcp-table-real"
            style="width: 100%">

            <el-table-column
              type="selection"
              align="right"
              show-overflow-tooltip
              min-width="58"
              width="58"/>

            <!--序号-->
            <el-table-column
              prop="taskDetailNo"
              label="序号"
              sortable="custom"
              width="60"/>

            <!--KDM文件名-->
            <el-table-column
              show-overflow-tooltip
              prop="kdmFileName"
              label="KDM文件名"
              sortable/>

            <!--KDM状态-->
            <el-table-column
              label="KDM状态"
              show-overflow-tooltip
              column-key="kdmStatusList"
              :filters="statusList"
              width="120">
              <template slot-scope="scope">
                <span v-if="[101, 102, 201].some(item => item == scope.row.kdmStatus)"
                      style="color: rgba(22, 29, 37, 0.8)">{{ scope.row.taskStatusText }}</span>
                <span v-if="[301, 302].some(item => item == scope.row.kdmStatus)"
                      style="color: rgba(255, 191, 0, 1)">{{ scope.row.taskStatusText }}</span>
                <span v-if="[400].some(item => item == scope.row.kdmStatus)"
                      style="color: rgba(255, 62, 77, 1)">{{ scope.row.taskStatusText }}</span>
                <span v-if="[500].some(item => item == scope.row.kdmStatus)"
                      style="color: rgba(70, 203, 93, 1)">{{ scope.row.taskStatusText }}</span>
                <span v-if="[610, 620, 630, 640, 650].some(item => item == scope.row.kdmStatus)">
                  {{ scope.row.taskStatusText }}</span>
              </template>
            </el-table-column>

            <!--费用（金币）-->
            <el-table-column
              prop="cost"
              label="费用（金币）"
              sortable="custom"
              width="120"/>

          </el-table>
          <!--暂无数据-->
          <div class="nullTableData" v-if="!tab.tableData.length">
            <img src="@/icons/tableDataNull.png">
            <span>{{ $t('public.unData') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getKDMSonTableList
  } from '@/api/kdm-api'
  import {mapState} from 'vuex'
  import {
    KDMmainStatusList,
    KDMFrameStatusList
  } from '@/assets/common'
  import {messageFun} from "../../../assets/common";

  export default {
    name: 'make-default',
    data() {
      return {
        showPicCompress: '查看DCP文件',
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
            action: '重新制作',
            class: 'makeAgain',
            iconDefault: require('@/icons/btn_icon_again_black.png'),
            iconHover: require('@/icons/btn_icon_again_white.png'),
            state: true
          },
          {
            action: '发送KDM',
            class: 'send',
            iconDefault: require('@/icons/btn_icon_again_black.png'),
            iconHover: require('@/icons/btn_icon_again_white.png'),
            state: true
          }
        ],
        info: {
          nameL: 'DCP文件名',
          nameV: '',
          progressL: '打包进度',
          progressV: ''
        },
        tab: {
          keyword: '',
          tableData: [],
          kdmStatusList: [],
          sortBy: 'taskDetailNo',
          sortType: 0
        },
        selectionList: [],
        statusList: [
          {text: '等待上传', value: 610},
          {text: '上传中', value: 620},
          {text: '上传暂停', value: 630},
          {text: '上传失败', value: 640},
          {text: '上传成功', value: 650},
          {text: '等待', value: 101},
          {text: '制作中', value: 201},
          {text: '暂停', value: 301},
          {text: '暂停（欠费）', value: 302},
          {text: '失败', value: 400},
          {text: '完成', value: 500}
        ],
        KDMUuid: null
      }
    },
    props: {
      'topWinInfo': Object,
      'effective': Boolean
    },
    methods: {
      // 多选
      selectionFun(list) {
        this.selectionList = list
      },
      //
      operating(action) {
        switch (action) {
          case '下载':
            if (!this.downloadBtn) return false
            else if (!this.effective) messageFun('info', '选中任务已过期，无法开始')
            else this.downloadFun()
            break
          case '开始':
            if (!this.startBtn) return false

            break
          case '暂停':
            if (!this.pauseBtn) return false

            break
          case '重新制作':
            if (!this.againBtn) return false

            break
          case '发送KDM':
            if (!this.sendBtn) return false

            break
        }
      },
      // 下载
      downloadFun() {

      },
      // 排序
      changeSort({prop, order}) {
        let {tab} = this
        if (!order) {
          tab.sortBy = 'taskDetailNo'
          tab.sortType = 0
        } else {
          tab.sortBy = prop
          tab.sortType = order == 'ascending' ? 1 : 0
        }
        this.getTabList(this.KDMUuid)
      },
      //
      filterChangeF(obj) {
        Object.assign(this.tab, obj)
        this.getTabList(this.KDMUuid)
      },
      // 获取tab
      async getTabList(kdmTaskUuid) {
        this.KDMUuid = kdmTaskUuid
        let {tab} = this,
          {keyword, sortBy, sortType, kdmStatusList} = tab,
          {data} = await getKDMSonTableList({
            kdmTaskUuid,
            'kdmStatusList': kdmStatusList.find(curr => curr == 101) ? [102, ...kdmStatusList] : kdmStatusList,
            keyword,
            sortBy,
            sortType,
            pageIndex: 1,
            pageSize: 999
          })
        if (data.code == 200) tab.tableData = data.data.map(item => Object.assign(item, {
          'taskStatusText': KDMFrameStatusList.find(curr => curr.code == item['kdmStatus'])['status']
        }))
      },
      // table 行样式
      tableRowStyle({row}) {
        switch (row.taskStatusText) {
          case '暂停':
          case '暂停（欠费）':
          case '上传暂停':
            return 'warning-row style-row'
          case '上传失败':
          case '失败':
            return 'error-row style-row'
          case '已完成':
          case '待打包完成':
            return 'wait-row style-row'
        }
      }
    },
    computed: {
      ...mapState([]),
      // 选中项的状态集合
      sSList() {
        return this.selectionList.map(item => item['kdmStatus'])
      },
      startBtn() {
        if (!this.sSList.length) return false
        else if (this.sSList.every(status => [301, 302].some(item => item == status))) return true
        else return false
      },
      pauseBtn() {
        if (!this.sSList.length) return false
        else if (this.sSList.every(status => [101, 102, 201, 900].some(item => item == status))) return true
        else return false
      },
      downloadBtn() {
        if (!this.sSList.length) return false
        else if (this.sSList.every(status => [500].some(item => item == status))) return true
        else return false
      },
      againBtn() {
        if (!this.sSList.length) return false
        else if (this.sSList.every(status => [400, 500].some(item => item == status))) return true
        else return false
      },
      sendBtn() {
        if (!this.sSList.length) return false
        else if (this.sSList.every(status => [500].some(item => item == status))) return true
        else return false
      }
    },
    watch: {
      'topWinInfo': {
        handler: function (obj) {
          this.info.nameV = obj.packageName
          this.info.progressV = KDMmainStatusList.find(item => item.code == obj.taskStatus)['status']
        },
        immediate: true,
        deep: true
      }
    },
    mounted() {
      this.$nextTick(() => Object.assign(this, {
        KDMmainStatusList,
        KDMFrameStatusList
      }))
    }
  }
</script>

<style lang="less" scoped>
  .make-default {
    height: 100%;
    padding: 20px;
    box-sizing: border-box;

    .main-wrapper {
      height: 100%;
      display: flex;
      flex-direction: column;

      .info {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 16px;
        overflow: hidden;

        .showPicCompress {
          position: absolute;
          font-size: 14px;
          color: rgba(27, 83, 244, 1);
          cursor: pointer;
          right: 20px;
        }

        .infoItem {
          display: flex;
          margin: 8px 0px;

          label {
            width: 120px;
            font-size: 14px;
            color: rgba(22, 29, 37, 0.6);
            margin-right: 12px;
            text-align: right;
          }

          span {
            width: 50%;
            font-size: 14px;
            color: rgba(22, 29, 37, 1);
          }
        }
      }

      .tab {
        flex-grow: 1;
        overflow: hidden;
        position: relative;

        .btnGroup {
          flex-grow: 0;
          height: 26px;

          &.cannotStart .btn.start,
          &.cannotPause .btn.pause,
          &.cannotDownload .btn.download,
          &.cannotAgain .btn.makeAgain,
          &.cannotSend .btn.send {
            cursor: no-drop;
            border: 1px solid rgba(22, 29, 37, 0.19);
            background-color: rgba(255, 255, 255, 1);
            line-height: 30px;

            .btnIcon.default {
              opacity: 0.19;
            }

            span {
              color: rgba(22, 29, 37, 0.19);
            }

            &:hover {
              .btnIcon {
                &.default {
                  display: inline-block;
                }

                &.hover {
                  display: none;
                }
              }
            }
          }
        }

        /deep/ .el-table__body-wrapper {
          height: calc(100vh - 490px);
        }

        .table {
          position: relative;
        }
      }
    }

    .DCPFile-wrapper {

    }
  }

  .DCPFileName {
    width: 70% !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
