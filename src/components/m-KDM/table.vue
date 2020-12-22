<template>
  <div class="table">
    <!--表格-->
    <el-table
      :data="tableData"
      @sort-change="changeSort"
      @selection-change="selectionFun"
      @filter-change="filterChangeF"
      @row-click="showDetails"
      :row-class-name="tableRowStyle"
      ref="kdm-table-real"
      style="width: 100%">

      <el-table-column
        type="selection"
        align="right"
        show-overflow-tooltip
        min-width="58"
        width="58"/>

      <!--任务ID-->
      <el-table-column
        prop="kdmTaskId"
        label="任务ID"
        sortable="custom"
        show-overflow-tooltip
        width="100"/>

      <!--任务名称-->
      <el-table-column
        label="任务名称"
        show-overflow-tooltip
        min-width="180">
        <template slot-scope="scope">
          <span v-show="scope.row.validPeriod == 0">(过期)</span>
          <span>{{ scope.row.kdmTaskName }}</span>
        </template>
      </el-table-column>

      <!--状态-->
      <el-table-column
        label="状态"
        show-overflow-tooltip
        column-key="kdmTaskStatusList"
        :filters="statusList"
        width="120">
        <template slot-scope="scope">
          <span v-if="[101, 103, 201, 610, 620].some(item => item == scope.row.taskStatus)"
                style="color: rgba(22, 29, 37, 0.8)">{{ scope.row.taskStatusText }}
          </span>
          <span v-if="[301, 302, 630].some(item => item == scope.row.taskStatus)"
                style="color: rgba(255, 191, 0, 1)">{{ scope.row.taskStatusText }}
          </span>
          <span v-if="[400, 640].some(item => item == scope.row.taskStatus)"
                style="color: rgba(255, 62, 77, 1)">{{ scope.row.taskStatusText }}
          </span>
          <span v-if="[500, 650].some(item => item == scope.row.taskStatus)"
                style="color: rgba(70, 203, 93, 1)">{{ scope.row.taskStatusText }}
          </span>
        </template>
      </el-table-column>

      <!--所属项目-->
      <el-table-column
        prop="projectName"
        label="所属项目"
        show-overflow-tooltip
        column-key="projectUuidList"
        :filters="tabProjectList"
        width="200"/>

      <!--影片名称-->
      <el-table-column
        prop="filmName"
        label="影片名称"
        show-overflow-tooltip
        width="200"/>

      <!--费用-->
      <el-table-column
        prop="cost"
        label="费用（金币）"
        sortable="custom"
        show-overflow-tooltip
        width="120"/>

      <!--KDM个数-->
      <el-table-column
        prop="kdmCount"
        label="KDM个数"
        sortable="custom"
        show-overflow-tooltip
        width="120"/>

      <!--播放起始时间-->
      <el-table-column
        prop="movieStartTime"
        label="播放起始时间"
        show-overflow-tooltip
        sortable="custom"
        width="200"/>

      <!--播放结束时间-->
      <el-table-column
        prop="movieEndTime"
        label="播放结束时间"
        show-overflow-tooltip
        sortable="custom"
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
      <div class="refresh-btn" @click="getList(null, true)">
        <span>{{ $t('public.refresh') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getKDMTableList,
    downLoadKDM,
    KDMTabOperating
  } from '@/api/kdm-api'
  import {
    KDMmainStatusList,
    createDateFun,
    createTableIconList,
    messageFun
  } from '@/assets/common'
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'KDMTable',
    data() {
      return {
        rowIndex: null,
        selectionList: [],     // 多选结果
        tableData: [
          // { validPeriod,   1有效 0过期 }
        ],
        statusList: [
          {text: '等待上传', value: 610},
          {text: '上传中', value: 620},
          {text: '上传暂停', value: 630},
          {text: '上传失败', value: 640},
          {text: '待打包完成', value: 103},
          {text: '进行中', value: 201},
          {text: '暂停', value: 301},
          {text: '暂停（欠费）', value: 302},
          {text: '失败', value: 400},
          {text: '已完成', value: 500}
        ],
        kdmTaskStatusList: [],
        projectUuidList: [],
        total: 0,
        pageIndex: 0,
        sortBy: 'kdmTaskId',   // 排序字段 默认为【任务ID】
        sortType: 0            // 0降序,1升序
      }
    },
    props: {
      'keyword': {
        type: String,
        required: true,
        default: ''
      }
    },
    methods: {
      // 关闭详情窗口回调
      shutDetailsWCB() {
        this.rowIndex = null
      },
      // 页码跳转
      handleCurrentChange(index) {
        this.pageIndex = index
        this.getList()
      },
      // 获取表格数据
      async getList() {
        let {zoneUuid, sortBy, sortType, kdmTaskStatusList, projectUuidList} = this,
          {data} = await getKDMTableList({
            pageIndex: this.pageIndex,
            pageSize: this.setting.pageSize,
            keyword: this.keyword,
            kdmTaskStatusList,
            projectUuidList,
            sortBy,
            sortType,
            zoneUuid
          })
        this.total = data.total
        this.tableData = data.data.map((item, index_) => Object.assign(item, {
          'taskStatusText': KDMmainStatusList.find(statusI => statusI.code == item.taskStatus)['status'],
          'movieStartTime': createDateFun(new Date(item.movieStartTime)),
          'movieEndTime': createDateFun(new Date(item.movieEndTime)),
          'validPeriod': new Date().getTime() >= item.expireTime ? 0 : 1,
          index_
        }))
      },
      // 操作 - 开始
      async startFun() {
        // 所选记录都为"暂停"“暂停（欠费）且"未过期"才可以点击
        let {data} = await KDMTabOperating({
          'taskUuidList': this.selectionList.map(item => item.kdmTaskUuid),
          'operateType': 1
        })
        if (data.code == 200) {
          messageFun('success', '操作成功')
          this.getList()
        }
      },
      // 操作 - 暂停
      async pauseFun() {
        // 所选记录都为"进行中"且"未过期"才可以点击
        let {data} = await KDMTabOperating({
          'taskUuidList': this.selectionList.map(item => item.kdmTaskUuid),
          'operateType': 2
        })
        if (data.code == 200) {
          messageFun('success', '操作成功')
          this.getList()
        }
      },
      // 操作 - 删除
      async deleteFun() {
        // 当选中项中存在「进行中」状态时不可使用
        let {data} = await KDMTabOperating({
          'taskUuidList': this.selectionList.map(item => item.kdmTaskUuid),
          'operateType': 3
        })
        if (data.code == 200) {
          messageFun('success', '操作成功')
          this.getList()
        }
      },
      // 操作 - 拷贝
      copyFun() {
        // 单选，需在有效期内，状态在「进行中、暂停、暂停（欠费）、失败、已完成」内

      },
      // 操作 - 重新打包
      againFun() {
        // 状态为「失败」且未过期

      },
      // 操作 - 下载KDM
      async downloadFun() {
        // 状态为「已完成」且未过期
        let kdmTaskUuidList = this.selectionList.map(item => item.kdmTaskUuid),
          {data} = await downLoadKDM({kdmTaskUuidList})
        if (data.code != 200) {
          messageFun('info', '下载失败')
          return false
        }
        let cb = () => {
          this.$store.commit('WEBSOCKET_PLUGIN_SEND', {
            'code': 301,
            'userID': this.user.id,
            'tasks': data.data.map((item, index) => {
              return {
                'ID': item.taskId,
                'filmName': this.selectionList[index]['filmName'],
                'taskName': this.selectionList[index]['kdmTaskName'],
                'DCPFileName': this.selectionList[index]['packageName'],
                'path': item.kdmDetailList.map(curr => {
                  return {'front': item.pathPrefix, 'back': curr.certificatePath}
                })
              }
            })
          })
        }
        if (this.socket_plugin) cb()
        else this.$store.dispatch('WEBSOCKET_PLUGIN_INIT', true).then(() => cb())
      },
      // 操作 - 创建KDM
      createKDMFun() {
        // 单选，状态为「已完成」且未过期

      },
      // 筛选
      filterChangeF(obj) {
        Object.assign(this, obj)
        this.getList()
      },
      // 展开详情
      showDetails(row) {
        this.rowIndex = row.index_
        this.$emit('tableRowClick', row)
      },
      // table 行样式
      tableRowStyle({row, rowIndex}) {
        let select = ''
        if(this.rowIndex == rowIndex) select = ' farmTableSelected'
        switch (row.taskStatusText) {
          case '暂停':
          case '暂停（欠费）':
          case '上传暂停':
            return 'warning-row style-row' + select
          case '上传失败':
          case '失败':
            return 'error-row style-row' + select
          case '已完成':
          case '待打包完成':
            return 'wait-row style-row' + select
          default:
            return select
        }
      },
      // 多选
      selectionFun(list) {
        this.selectionList = list
        this.$emit('tableSelectionF', list)
      },
      // 排序
      changeSort({prop, order}) {
        if (!order) {
          this.sortBy = 'kdmTaskId'
          this.sortType = 0
        } else {
          this.sortBy = prop
          this.sortType = order == 'ascending' ? 1 : 0
        }
        this.getList()
      }
    },
    mounted() {
      this.$nextTick(() => {
        Object.assign(this, {
          KDMmainStatusList
        })
        createTableIconList()
        this.getList()
      })
    },
    computed: {
      ...mapState(['setting', 'zoneUuid', 'projectList', 'socket_plugin', 'user']),
      'tabProjectList': function () {
        return this.projectList.map(project => {
          return {
            text: project.projectName,
            value: project.projectUuid
          }
        })
      }
    },
    watch: {
      'zoneUuid': {
        handler: function (id) {
          if (id) this.getList()
        }
      },
      'projectList': {
        handler: function (list) {
          if (!list.length) this.$store.dispatch('getProjectList')
        },
        immediate: true
      }
    }
  }
</script>

<style lang="less" scoped>
  .table {

  }
</style>
