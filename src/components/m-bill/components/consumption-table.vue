<template>
  <div class="consumption-wrapper">
    <!--table-->
    <div class="recharge-table" ref="rechargeTable">
      <!--条件筛选-->
      <div class="filter">
        <!--任务ID-->
        <div class="filter-item">
          <span class="filter-item-label">
            {{ filter.taskIdLabel }}：
          </span>
          <input type="text"
                 class="filter-item-i filter-item-input"
                 placeholder="请输入"
                 @keyup.enter="getList"
                 v-model="filter.taskIdVal">
        </div>
        <!--场景名-->
        <div class="filter-item">
          <span class="filter-item-label">
            {{ filter.scenesLabel }}：
          </span>
          <input type="text"
                 class="filter-item-i t"
                 @keyup.enter="getList"
                 v-model="filter.scenesVal">
        </div>
        <!--所属项目-->
        <div class="filter-item">
          <span class="filter-item-label">
            {{ filter.projectLabel }}：
          </span>
          <el-select v-model="filter.projectVal"
                     placeholder="-"
                     class="filter-item-i filter-item-select">
            <el-option label="全部" value="-1"/>
            <el-option
              v-for="item in filter.projectList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--查询时间-->
        <div class="filter-item f">
          <span class="filter-item-label">{{ filter.inquireLabel }}：</span>
          <el-date-picker
            v-model="filter.date"
            type="daterange"
            :clearable="false"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <!--查询-->
        <div class="filter-btn primary" @click="getList">
          {{ filter.iquireBtn }}
        </div>
        <!--重置-->
        <div class="filter-btn" @click="reset">
          {{ filter.resetBtn }}
        </div>
        <!--导出记录-->
        <div class="filter-btn r" @click="exportTable">
          {{ filter.exportBtn }}
        </div>
      </div>
      <div class="l"/>

      <!--table-->
      <el-table
        :data="table.rechargeData"
        @selection-change="handleSelectionChange"
        @filter-change="filterHandler"
        class="k"
        :border=true
        style="width: 100%">

        <el-table-column
          type="selection"
          align="right"
          show-overflow-tooltip
          min-width="58"
          width="58"/>
        <!--任务ID-->
        <el-table-column
          prop="id"
          label="任务ID"
          show-overflow-tooltip
          width="160"/>
        <!--场景名-->
        <el-table-column
          prop="scenesName"
          label="场景名"
          show-overflow-tooltip
          min-width="200"/>
        <!--状态-->
        <el-table-column
          prop="status"
          label="状态"
          show-overflow-tooltip
          width="120"/>
        <!--所属项目-->
        <el-table-column
          prop="object"
          label="所属项目"
          show-overflow-tooltip
          width="146"/>
        <!--渲染时长 -->
        <!--<el-table-column-->
        <!--prop="time"-->
        <!--label="渲染时长"-->
        <!--show-overflow-tooltip-->
        <!--width="160" />-->
        <!--总帧数-->
        <el-table-column
          prop="total"
          label="总帧数"
          show-overflow-tooltip
          width="100"/>
        <!--消费类型-->
        <el-table-column
          prop="type"
          label="消费类型"
          show-overflow-tooltip
          width="120"/>
        <!--费用（金币）-->
        <el-table-column
          prop="pay"
          label="费用（金币）"
          show-overflow-tooltip
          width="120"/>
        <!--实付金币-->
        <!--<el-table-column-->
        <!--prop="actualPay"-->
        <!--label="实付金币"-->
        <!--show-overflow-tooltip-->
        <!--width="120" />-->
        <!--创建人-->
        <el-table-column
          prop="user"
          label="创建人"
          show-overflow-tooltip
          width="100"/>
        <!--更新时间-->
        <el-table-column
          prop="upDate"
          label="更新时间"
          show-overflow-tooltip
          width="200"/>
        <!--查看-->
        <el-table-column
          label="操作"
          show-overflow-tooltip
          width="100">
          <template slot-scope="scope">
            <div class="operateBtn" @click="seeMore(scope.row)">
              查看
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        @current-change="jump"
        :current-page.sync="table.currentPage"
        :total="table.outPutTableTotal">
      </el-pagination>
      <div class="farm-primary-form-btn btn" @click="getList">
        <span>{{ refresh }}</span>
      </div>
    </div>
    <!--详情-->
    <el-dialog :visible.sync="dialogVisible"
               :modal-append-to-body="false"
               :show-close=false>
      <more-dialog @closeDialog="closeDialog"
                   width="80vw"
                   :dialogTableType="dialogTableType"
                   :renderDialogTableData="renderDialogTableData"
                   :downloadDialogTableData="downloadDialogTableData"/>
    </el-dialog>
  </div>
</template>

<script>
  import moreDialog from './more-dialog'
  import {
    getConsumptionTable,
    getConsumptionSelectList,
    exportConsumptionTable,
    consumptionSeeMore,
    upTopSeeMore
  } from '@/api/bill-api'
  import {
    createCalendar,
    // getDate,
    exportDownloadFun,
    consum,
    createDateFun
  } from '@/assets/common.js'

  export default {
    name: 'consumption',
    data() {
      return {
        table: {
          rechargeData: [
            // {
            //   id: '',               //任务ID
            //   scenesName: '',       //场景名
            //   status: '',           //状态
            //   object: '',           //所属项目
            //   time: '',             //渲染时长
            //   total: '',            //总帧数
            //   type: '',             //消费类型
            //   shouldPay: '',        //应付金币
            //   actualPay: '',        //实付金币
            //   user: '',             //创建人
            //   upDate: '',           //更新时间
            // },
          ],
          outPutTableTotal: 82,
          pageSize: 10,
          currentPage: 1,
          selectionList: []           // 渲染输出选中项
        },
        filter: {
          taskIdLabel: '查询ID',
          taskIdVal: '',
          scenesLabel: '场景名',
          scenesVal: '',
          projectLabel: '所属项目',
          projectVal: '-1',
          projectList: [],
          inquireLabel: '查询时间',
          // inquireValS: 0,
          // inquireValV: new Date(),
          date: null,
          iquireBtn: '查询',
          resetBtn: '重置',
          exportBtn: '导出记录'
        },
        dialogVisible: false,
        dialogTableType: '',
        renderDialogTableData: [],
        downloadDialogTableData: [],
        // pageInfo: {}
        refresh: '刷新',
        statusList: ['等待', '渲染中', '渲染完成', '渲染暂停', '渲染放弃']
      }
    },
    components: {
      moreDialog
    },
    methods: {
      // 翻页
      jump(val) {
        this.table.currentPage = val
        this.getList()
      },
      // 充值中心多选
      handleSelectionChange(val) {
        this.table.selectionList = val
      },
      // 筛选条件发生变化
      filterHandler(value, row, column) {
        console.log(value, row, column)
      },
      // 查看按钮
      async seeMore(item) {
        this.dialogTableType = item.type
        let uuId = item.layerTaskUuid,
          data

        if (item.type == '渲染消费') {
          data = await consumptionSeeMore(uuId)
          // this.renderDialogTableData = data.data.data
          this.renderDialogTableData = data.data.data.map(curr => {
            return {
              frameNo: curr.frameNo,
              actualPayment: curr.actualPayment,
              useTime: consum(curr.useTime),
              startTime: createDateFun(new Date(curr.startTime)),
              endTime: createDateFun(new Date(curr.endTime)),
              unitPrice: curr.unitPrice,
              cpuRate: curr.cpuRate,
              memoryPeak: curr.memoryPeak
            }
          })
          this.dialogVisible = true
        }
        if (item.type == '下载消费') {
          data = await upTopSeeMore(uuId)
          this.downloadDialogTableData = data.data.data
          this.dialogVisible = true
        }
        // this.pageInfo = {
        //   total: data.data.data,
        //   pageIndex: data.data.data
        // }
      },
      // 获取 table 数据
      async getList() {
        let f = this.filter,
          t = `pageSize=${this.table.pageSize}&pageIndex=${this.table.currentPage}&layerNo=${f.taskIdVal}&fileName=${f.scenesVal}&projectUuid=${f.projectVal}&beginTime=${f.date ? f.date[0].getTime() : 0}&endTime=${f.date ? f.date[1].getTime() : new Date().getTime()}`
        let data = await getConsumptionTable(t)
        this.table.rechargeData = data.data.data.map(curr => {
          let tableType = ''
          switch (curr.patternOfConsumption) {
            case 1:
              tableType = '渲染消费'
              break
            case 2:
              tableType = '下载消费'
              break
          }
          let {year, month, day, hour, minutes, seconds} = createCalendar(new Date(curr.updateTime))
          return {
            id: curr.layerNo,                     // 任务ID
            scenesName: curr.fileName,            // 场景名
            status: this.statusList[curr.layerTaskStatus - 1],        // 状态
            statusDefault: curr.layerTaskStatus,
            object: curr.projectName,             // 所属项目
            // time: '',                          // 渲染时长
            total: curr.totalFrame,               // 总帧数
            type: tableType,                      // 消费类型
            typeDefault: curr.patternOfConsumption,
            pay: curr.totalCost,                  // 费用（金币）
            // actualPay: '',                     // 实付金币
            user: curr.account,                   // 创建人
            upDate: `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`,    // 更新时间
            dateDefault: curr.updateTime,         // 时间戳记录
            layerTaskUuid: curr.layerTaskUuid
          }
        })
        this.table.outPutTableTotal = data.data.total
      },
      // 重置
      reset() {
        Object.assign(this.filter, {
          taskIdVal: '',
          scenesVal: '',
          projectVal: '-1',
          // inquireValS: 0,
          // inquireValV: new Date(),
          date: null
        })
        this.getList()
      },
      // 导出记录
      async exportTable() {
        let f = this.filter,
          t = `layerNo=${f.taskIdVal}&fileName=${f.scenesVal}&projectUuid=${f.projectVal}&beginTime=${f.date ? f.date[0].getTime() : 0}&endTime=${f.date ? f.date[1].getTime() : new Date().getTime()}`,
          data = await exportConsumptionTable(t)
        // 导出下载
        exportDownloadFun(data, '消费记录', 'xlsx')
      },
      // 关闭消费详情
      closeDialog() {
        this.dialogVisible = false
      }
    },
    mounted() {
      this.getList()
      getConsumptionSelectList()
        .then(data => {
          this.filter.projectList = data.data.data.map(curr => {
            return {
              value: curr.taskProjectUuid,
              label: curr.projectName
            }
          })
        })
    }
  }
</script>

<style lang="less" scoped>
  .consumption-wrapper {
    /deep/ .el-dialog {
      width: 80vw;
      margin-top: 5vh !important;
    }

    /deep/ .el-dialog__body {
      padding: 0px;
    }
  }
</style>
