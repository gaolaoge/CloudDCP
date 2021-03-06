<template>
  <div class="table">
    <!--表格-->
    <el-table
      :data="tableData"
      @selection-change="selectionFun"
      @filter-change="filterChangeF"
      @row-click="j"
      :row-class-name="tableRowStyle"
      ref="dcp-table-real"
      style="width: 100%">

      <el-table-column
        type="selection"
        align="right"
        show-overflow-tooltip
        min-width="58"
        width="58"/>

      <!--任务ID-->
      <el-table-column
        prop="taskId"
        label="任务ID"
        sortable
        show-overflow-tooltip
        width="100"/>

      <!--场景名-->
      <el-table-column
        label="场景名"
        show-overflow-tooltip
        min-width="200">
        <template slot-scope="scope">
          <span v-show="scope.row.validPeriod == 0">(过期)</span>
          <span>{{ scope.row.taskName }}</span>
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
          <span v-if="[101, 201, 610, 620].some(item => item == scope.row.taskStatus)"
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

      <!--打包时长-->
      <el-table-column
        prop="useTime"
        label="打包时长"
        sortable
        show-overflow-tooltip
        width="160"/>

      <!--内容类型-->
      <el-table-column
        prop="film_category"
        label="内容类型"
        show-overflow-tooltip
        column-key="type"
        :filters="movieTypeList"
        width="200"/>

      <!--宽高比-->
      <el-table-column
        prop="aspect_ratio"
        label="宽高比"
        show-overflow-tooltip
        column-key="ratio"
        :filters="ratioList"
        width="224"/>

      <!--2D/3D-->
      <el-table-column
        prop="film_type"
        label="2D/3D"
        show-overflow-tooltip
        column-key="technology"
        :filters="technologyList"
        width="100"/>

      <!--分辨率-->
      <el-table-column
        prop="resolution"
        label="分辨率"
        show-overflow-tooltip
        column-key="resolution"
        :filters="resolutionList"
        width="100"/>

      <!--是否加密-->
      <el-table-column
        prop="is_encrypt"
        label="是否加密"
        show-overflow-tooltip
        column-key="encrypt"
        :filters="encryptList"
        width="100"/>

      <!--创建人-->
      <el-table-column
        prop="createName"
        label="创建人"
        sortable
        show-overflow-tooltip
        width="120"/>

      <!--创建时间-->
      <el-table-column
        prop="createTime"
        label="创建时间"
        sortable
        show-overflow-tooltip
        width="180"/>

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
    getDCPTableList
  } from '@/api/dcp-api'
  import {
    consum,
    createDateFun,
    createTableIconList,
    messageFun,
    movieTypeList,
    proportionList,
    DCPmainStatusList
  } from '@/assets/common'
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'DCPTable',
    data() {
      return {
        selectionList: [],     // 多选结果
        movieTypeList: [],
        proportionList: [],
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
          {text: '已完成', value: '已完成'}
        ],
        typeList: [
          {text: '广告片ADV', value: '广告片ADV'},
          {text: '正片FTR', value: '正片FTR'},
          {text: '政策相关POL', value: '政策相关POL'},
          {text: '推广片PRO', value: '推广片PRO'},
          {text: '广告PSA', value: '广告PSA'},
          {text: '短片SHR', value: '短片SHR'},
          {text: '预告片TLR', value: '预告片TLR'},
          {text: '样片TSR', value: '样片TSR'},
          {text: '测试片TST', value: '测试片TST'},
          {text: '过渡片XSN', value: '过渡片XSN'}
        ],
        ratioList: [
          {text: '全画幅C', value: '全画幅C'},
          {text: '遮幅F', value: '遮幅F'},
          {text: '宽银幕S', value: '宽银幕S'}
        ],
        technologyList: [
          {text: '2D', value: '2D'},
          {text: '3D', value: '3D'}
        ],
        resolutionList: [
          {text: '2K', value: '2K'},
          {text: '4K', value: '4K'}
        ],
        encryptList: [
          {text: '加密', value: '加密'},
          {text: '未加密', value: '未加密'}
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
      //
      j(row) {
        this.$emit('tableRowClick', row)
      },
      // 页码跳转
      handleCurrentChange() {
      },
      // 获取表格数据
      async getList() {
        let {zoneUuid, DCPmainStatusList, movieTypeList, proportionList} = this,
          {data} = await getDCPTableList({
            pageIndex: this.pageIndex,
            pageSize: this.setting.pageSize,
            keyword: this.keyword,
            projectUuidList: [],
            aspectRatioList: [],     // 宽高比
            filmTypeList: [],        // 2d/3d 1:2d, 2:3d
            resolutionList: [],      // 分辨率 1:2k, 2:4k
            isEncryptList: [],       // 是否加密 0不加密,1加密
            sortBy: null,            // 排序字段
            sortType: 0,             // 0降序,1升序
            zoneUuid: 'zone001'
          })
        this.total = data.total
        this.tableData = data.data.map(item => Object.assign(item, {
          'taskStatusText': DCPmainStatusList.find(curr => curr.code == item.taskStatus)['status'],
          'film_category': movieTypeList.find(curr => curr.value == item.filmCategory)['label'],
          'useTime': consum(item.useTime),
          'aspect_ratio': proportionList.find(curr => curr.value == item.aspectRatio)['label'],
          'film_type': this.technologyList[item.filmType - 1]['text'],
          'resolution': this.resolutionList[item.resolution]['text'],
          'is_encrypt': item.is_encrypt ? '加密' : '未加密',
          'createTime': createDateFun(new Date(item.createTime)),
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
      // table 行样式
      tableRowStyle({row}) {
        switch (row.taskStatus) {
          case 301:
          case 302:
          case 630:
            return 'warning-row style-row'
          case 400:
          case 640:
            return 'error-row style-row'
          case 500:
          case 650:
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
        createTableIconList()
        this.getList()
      })
      Object.assign(this, {
        movieTypeList,
        proportionList,
        DCPmainStatusList
      })
    },
    computed: {
      ...mapState(['setting', 'zoneUuid'])
    },
    watch: {
      'selectionList': {
        handler: function (list) {

        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .table {

  }
</style>
