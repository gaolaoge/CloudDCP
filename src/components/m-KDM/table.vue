<template>
  <div class="table">
    <!--表格-->
    <el-table
      :data="tableData"
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
        sortable
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
        column-key="status"
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
        sortable
        show-overflow-tooltip
        width="120"/>

      <!--KDM个数-->
      <el-table-column
        prop="kdmCount"
        label="KDM个数"
        sortable
        show-overflow-tooltip
        width="120"/>

      <!--播放起始时间-->
      <el-table-column
        prop="movieStartTime"
        label="播放起始时间"
        show-overflow-tooltip
        sortable
        width="200"/>

      <!--播放结束时间-->
      <el-table-column
        prop="movieEndTime"
        label="播放结束时间"
        show-overflow-tooltip
        sortable
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
        selectionList: [],     // 多选结果
        tableData: [
          // {
          //   // validPeriod,   1有效 0过期
          // }
        ],
        statusList: [
          {text: '上传中', value: '上传中...'},
          {text: '上传暂停', value: '上传暂停'},
          {text: '上传失败', value: '上传失败'},
          {text: '进行中', value: '进行中'},
          {text: '暂停', value: '暂停'},
          {text: '暂停（欠费）', value: '暂停（欠费）'},
          {text: '失败', value: '失败'},
          {text: '已完成', value: '已完成'},
          {text: '待打包完成', value: '待打包完成'}
        ],
        total: 0,
        pageIndex: 0
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
      // 页码跳转
      handleCurrentChange(index) {
        this.pageIndex = index
        this.getList()
      },
      // 获取表格数据
      async getList() {
        let {zoneUuid} = this,
          {data} = await getKDMTableList({
            pageIndex: this.pageIndex,
            pageSize: this.setting.pageSize,
            keyword: this.keyword,
            kdmTaskStatusList: [],
            projectUuidList: [],
            sortBy: null,            // 排序字段
            sortType: 0,             // 0降序,1升序
            zoneUuid
          })
        this.total = data.total
        this.tableData = data.data.map(item => Object.assign(item, {
          'taskStatusText': KDMmainStatusList.find(statusI => statusI.code == item.taskStatus)['status'],
          'movieStartTime': createDateFun(new Date(item.movieStartTime)),
          'movieEndTime': createDateFun(new Date(item.movieEndTime)),
          'validPeriod': new Date().getTime() >= item.expireTime ? 0 : 1
        }))
      },
      // 操作 - 开始
      async startFun() {
        // 所选记录都为"暂停"“暂停（欠费）且"未过期"才可以点击
        let {data} = await KDMTabOperating({
          'taskUuidList': this.selectionList.map(item => item.kdmTaskUuid),
          'operateType': 1
        })
        if(data.code == 200) {
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
        if(data.code == 200) {
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
        if(data.code == 200) {
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
          // data.data.forEach((item, index) => {
          //   item.kdmDetailList.forEach((mini, in_) => {
          //     this.$store.commit('WEBSOCKET_PLUGIN_SEND', {
          //       'code': 301,
          //       'userID': this.user.id,
          //       'ID': item.taskId,
          //       'filmName': this.selectionList[index]['filmName'],
          //       'taskName': this.selectionList[index]['kdmTaskName'],
          //       'path': [{'front': item.pathPrefix, 'back': mini.certificatePath}]
          //     })
          //   })
          // })
          this.$store.commit('WEBSOCKET_PLUGIN_SEND', {
            'code': 301,
            'userID': this.user.id,
            'tasks': data.data.map((item, index) => {
              return {
                'ID': item.taskId,
                'filmName': this.selectionList[index]['filmName'],
                'taskName': this.selectionList[index]['kdmTaskName'],
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
      //
      filterChangeF() {

      },
      //
      showDetails(row) {
        this.$emit('tableRowClick', row)
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
      },
      // 多选
      selectionFun(list) {
        this.selectionList = list
        this.$emit('tableSelectionF', list)
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
      // 'selectionList': {
      //   handler: function (list) {
      //
      //   }
      // },
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
