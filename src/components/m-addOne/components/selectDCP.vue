<template>
  <div class="selectDCP">
    <header class="header">
      <span class="title">{{ title }}</span>
      <img src="@/icons/shutDialogIcon.png"
           @click="$emit('closeDialogFun', 'selectDCODialog')"
           class="closeBtn">
    </header>
    <div class="wrapper">
      <div class="table-operate">
        <div class="searchInput">
          <input type="text"
                 class="input"
                 v-model="keyword"
                 @keyup.enter="getList"
                 placeholder="输入场景名、任务ID">
          <!--搜索按钮-->
          <img src="@/icons/global-search-icon.png"
               class="searchIcon"
               @click="getList">
        </div>
      </div>
      <!--表格-->
      <el-table
        :data="tableData"
        @filter-change="filterChangeF"
        @row-click="rowClick"
        :row-class-name="tableRowStyle"
        ref="dcp-table-real"
        style="width: 100%">

        <el-table-column
          align="center"
          show-overflow-tooltip
          width="38">
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.$index" />
          </template>
        </el-table-column>

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
          min-width="180">
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
          <span v-if="String('37').includes(scope.row.taskStatus)"
                style="color: rgba(255, 62, 77, 1)">
            {{ scope.row.taskStatusText }}
          </span>
            <span v-if="String('8').includes(scope.row.taskStatus)" style="color: rgba(70, 203, 93, 1)">
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

        <!--打包时长-->
        <el-table-column
          prop="useTime"
          label="打包时长"
          sortable
          show-overflow-tooltip
          width="120"/>

        <!--内容类型-->
        <el-table-column
          prop="film_category"
          label="内容类型"
          show-overflow-tooltip
          column-key="type"
          :filters="typeList"
          width="140"/>

        <!--宽高比-->
        <el-table-column
          prop="aspect_ratio"
          label="宽高比"
          show-overflow-tooltip
          column-key="ratio"
          :filters="ratioList"
          width="100"/>

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
      <!--按钮-->
      <div class="farm-btnGroup">
        <div :class="[{'disable-self': null}, 'btnGroup-btn', 'confirm']"
             @click="selected">
          <span>{{ $t('public.save') }}</span>
        </div>
        <div class="btnGroup-btn previous"
             @click="$emit('closeDialogFun', 'selectDCODialog')">
          <span>{{ $t('public.cancel') }}</span>
        </div>
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
    createTableIconList
  } from '@/assets/common'
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'selectDCP',
    data() {
      return {
        title: '选择DCP文件',
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
        pageIndex: 0,
        keyword: '',
        radio: 0
      }
    },
    methods: {
      // 页码跳转
      handleCurrentChange() {
      },
      // 获取表格数据
      async getList() {
        let {zoneUuid} = this,
          {data} = await getDCPTableList({
          pageIndex: this.pageIndex,
          pageSize: this.setting.pageSize,
          keyword: this.keyword,
          statusList: [],
          projectUuidList: [],
          aspectRatioList: [],     // 宽高比
          filmTypeList: [],        // 2d/3d 1:2d, 2:3d
          resolutionList: [],      // 分辨率 1:2k, 2:4k
          isEncryptList: [],       // 是否加密 0不加密,1加密
          sortBy: null,            // 排序字段
          sortType: 0,             // 0降序,1升序
          zoneUuid
        })
        this.total = data.total
        this.tableData = data.data.map(item => Object.assign(item, {
          'taskStatusText': this.statusList[item.taskStatus - 1]['text'],
          'film_category': this.typeList[item.film_category - 1]['text'],
          'useTime': consum(item.useTime),
          'aspect_ratio': this.ratioList[item.aspect_ratio - 1]['text'],
          'film_type': this.technologyList[item.film_type - 1]['text'],
          'resolution': this.resolutionList[item.resolution - 1]['text'],
          'is_encrypt': item.is_encrypt ? '加密' : '未加密',
          'createTime': createDateFun(new Date(item.createTime)),
          'validPeriod': new Date().getTime() >= item.expireTime ? 0 : 1
        }))
      },
      // table 行样式
      tableRowStyle({row, rowIndex}) {
        row.index = rowIndex
        switch (row.taskStatusText) {
          case '暂停':
          case '暂停（欠费）':
          case '上传暂停':
            return 'warning-row style-row'
          case '上传失败':
          case '失败':
            return 'error-row style-row'
          case '已完成':
            return 'wait-row style-row'
        }
      },
      //
      filterChangeF() {

      },
      rowClick(row){
        this.radio = row.index
      },
      selected() {
        this.$emit('didSelected', this.tableData[this.radio]['taskUuid'])
      }
    },
    mounted() {
      this.getList()
      this.$nextTick(() => createTableIconList())
    },
    computed: {
      ...mapState(['setting', 'zoneUuid'])
    }
  }
</script>

<style lang="less" scoped>
  .selectDCP {
    user-select: none;
    height: 80vh;
    position: relative;

    .wrapper {
      position: relative;
      height: calc(100% - 35px);
      padding: 10px 20px;
      box-sizing: border-box;

      .table-operate {
        float: right;
        margin: 10px 0px;
      }

      /deep/ .el-table__body-wrapper {
        height: calc(80vh - 28px - 20px - 28px - 35px - 47px - 14px - 32px - 40px);
      }

      /deep/.el-radio__label {
        display: none;
      }
    }

    .farm-btnGroup {
      position: absolute;
      bottom: 20px;
      right: 20px;
      height: 34px;

      .btnGroup-btn:nth-of-type(1) {
        margin-right: 0px;
      }
    }
  }
</style>
