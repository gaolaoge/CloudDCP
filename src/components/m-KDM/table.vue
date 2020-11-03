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
          <span v-if="String('37').includes(scope.row.taskStatus)"
                style="color: rgba(255, 62, 77, 1)">
            {{ scope.row.taskStatusText }}
          </span>
          <span v-if="String('89').includes(scope.row.taskStatus)" style="color: rgba(70, 203, 93, 1)">
            {{ scope.row.taskStatusText }}
          </span>
          <span v-if="String('256').includes(scope.row.taskStatus)"
                style="color: rgba(255, 191, 0, 1)">
            {{ scope.row.taskStatusText }}
          </span>
          <span
            v-if="String('14').includes(scope.row.taskStatus)">
            {{ scope.row.taskStatusText }}
          </span>
        </template>
      </el-table-column>

      <!--所属项目-->
      <el-table-column
        prop="projectName"
        label="所属项目"
        show-overflow-tooltip
        :filters="projectList"
        width="200"/>

      <!--电影名称-->
      <el-table-column
        prop="filmName"
        label="电影名称"
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
    getKDMTableList
  } from '@/api/kdm-api'
  import {
    createDateFun,
    createTableIconList,
    messageFun
  } from '@/assets/common'
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'DCPTable',
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
        projectList: [],
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
      handleCurrentChange() {
      },
      // 获取表格数据
      async getList() {
        let {data} = await getKDMTableList({
          pageIndex: this.pageIndex,
          pageSize: this.setting.pageSize,
          keyword: this.keyword,
          kdmTaskStatusList: [],
          projectUuidList: [],
          sortBy: null,            // 排序字段
          sortType: 0,             // 0降序,1升序
          zoneUuid: this.zoneId
        })
        this.total = data.total
        this.tableData = data.data.map(item => Object.assign(item, {
          'taskStatusText': this.statusList[item.taskStatus - 1]['text'],
          'movieStartTime': createDateFun(new Date(item.movieStartTime)),
          'movieEndTime': createDateFun(new Date(item.movieEndTime)),
          'validPeriod': new Date().getTime() >= item.expireTime ? 0 : 1
        }))
      },
      // 操作 - 开始
      startFun() {
        // 所选记录都为"暂停"“暂停（欠费）且"未过期"才可以点击

      },
      // 操作 - 暂停
      pauseFun() {
        // 所选记录都为"进行中"且"未过期"才可以点击
        messageFun('success', '暂停')
      },
      // 操作 - 删除
      deleteFun() {
        // 当选中项中存在「进行中」状态时不可使用

      },
      // 操作 - 拷贝
      copyFun() {
        // 单选，需在有效期内，状态在「进行中、暂停、暂停（欠费）、失败、已完成」内

      },
      // 操作 - 重新打包
      againFun() {
        // 状态为「失败」且未过期

      },
      // 操作 - 下载DCP
      downloadFun() {
        // 状态为「已完成」且未过期

      },
      // 操作 - 创建KDM
      createKDMFun() {
        // 单选，状态为「已完成」且未过期

      },
      //
      filterChangeF() {

      },
      //
      showDetails() {

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
      this.$nextTick(() => createTableIconList())
    },
    computed: {
      ...mapState(['setting', 'zoneId'])
    },
    watch: {
      'selectionList': {
        handler: function(list) {

        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .table {

  }
</style>
