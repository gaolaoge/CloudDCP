<template>
  <div class="invoicing-wrapper">
    <!--table-->
    <div class="invoicing-table" ref="invoicingTable">
      <!--条件筛选-->
      <div class="filter">
        <!--发票抬头-->
        <div class="filter-item">
          <span class="filter-item-label">{{ filter.tradingtatusLabel }}：</span>
          <el-select v-model="filter.tradingtatusVal"
                     placeholder="-"
                     class="filter-item-i filter-item-select">
            <el-option
              v-for="item in filter.tradingtatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </div>
        <!--发票状态-->
        <div class="filter-item">
          <span class="filter-item-label">{{ filter.paymentMethodLabel }}：</span>
          <el-select v-model="filter.paymentMethodVal"
                     placeholder="-"
                     class="filter-item-i filter-item-select">
            <el-option
              v-for="item in filter.paymentMethodList"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </div>
        <!--开票时间-->
        <div class="filter-item f">
          <span class="filter-item-label">
            {{ filter.inquireLabel }}：
          </span>
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
        :data="table.invoicingData"
        @selection-change="handleSelectionChange"
        @filter-change="filterHandler"
        class="o"
        :border=true
        style="width: 100%">

        <el-table-column
          type="selection"
          align="right"
          show-overflow-tooltip
          min-width="58"
          width="58"/>
        <!--发票抬头-->
        <el-table-column
          prop="invoiceTitle"
          label="发票抬头"
          sortable
          show-overflow-tooltip
          min-width="200"/>
        <!--纳税人标识号-->
        <el-table-column
          prop="taxpayerId"
          label="纳税人标识号"
          sortable
          show-overflow-tooltip
          width="280">
        </el-table-column>
        <!--发票金额（元）-->
        <el-table-column
          prop="invoiceAmount"
          label="发票金额（元）"
          sortable
          show-overflow-tooltip
          width="180"/>
        <!--发票类型 -->
        <el-table-column
          prop="invoiceType"
          label="发票类型"
          sortable
          show-overflow-tooltip
          width="180"/>
        <!--发票状态-->
        <el-table-column
          prop="invoiceState"
          label="发票状态"
          show-overflow-tooltip
          width="150"/>
        <!--邮箱-->
        <el-table-column
          prop="email"
          label="邮箱"
          sortable
          show-overflow-tooltip
          width="240"/>
        <!--交易时间-->
        <el-table-column
          prop="date"
          label="交易时间"
          sortable
          show-overflow-tooltip
          width="240"/>

      </el-table>
    </div>
    <!--分页-->
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        @current-change="jump"
        :current-page.sync="table.currentPage"
        :total="table.total"/>
      <div class="farm-primary-form-btn btn" @click="getList">
        <span>{{ $t('public.refresh') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    createCalendar,
    exportDownloadFun,
    createTableIconList
  } from '@/assets/common.js'
  import {
    getInvoiceList,
    getHeadersList,
    exportInvoiceTable
  } from '@/api/bill-api'

  export default {
    name: 'invoicing',
    data() {
      return {
        table: {
          invoicingData: [
//             {
//               invoice: '',          // 发票抬头
//               invoiceNum: '',       // 纳税人标识号
//               invoiceAmount: '',    // 发票金额（元）
//               invoiceType: '',      // 发票类型
//               invoiceState: '',     // 发票状态
//               email: '',            // 邮箱
//               date: '',             // 开票时间
//             },
          ],
          total: 0,
          currentPage: 1,
          pageSize: 10,
          selectionList: []             // 渲染输出选中项
        },
        filter: {
          tradingtatusLabel: '发票抬头',
          tradingtatusVal: '',
          tradingtatusList: [],         // 发票抬头列表
          paymentMethodLabel: '发票状态',
          paymentMethodVal: '',
          paymentMethodList: [
            {
              label: '全部',
              value: ''
            },
            {
              label: '审核中',
              value: 0
            },
            {
              label: '审核不过',
              value: 2
            },
            {
              label: '审核通过',
              value: 1
            },
            {
              label: '已发送',
              value: 3
            }
          ],
          inquireLabel: '开票时间',
          // inquireValS: new Date(0),
          // inquireValV: new Date(),
          date: null,
          iquireBtn: '查询',
          resetBtn: '重置',
          exportBtn: '导出记录'
        },
        statusList: ['审核中', '审核通过', '审核不过', '已发送'],
        invoiceTypeList: ['增值税普票', '-']
      }
    },
    methods: {
      // 多选
      handleSelectionChange(val) {
        this.table.selectionList = val
      },
      // 筛选条件发生变化
      filterHandler(value, row, column) {
        console.log(value, row, column)
      },
      // 获取table数据
      async getList() {
        let {table, filter} = this,
          d = `pageSize=${table.pageSize}&pageIndex=${table.currentPage}&invoiceTitle=${filter.tradingtatusVal}&beginTime=${filter.date ? filter.date[0].getTime() : 0}&endTime=${filter.date ? filter.date[1].getTime() : new Date().getTime()}&invoiceStatus=${filter.paymentMethodVal}&sortColumn=0&sortBy=0`
        let {data} = await getInvoiceList(d)
        table.total = data.total
        table.invoicingData = data.data.map(curr => {
          let {year, month, day, hour, minutes, seconds} = createCalendar(new Date(curr.updateTime))
          return Object.assign(curr, {
            invoiceAmount: curr.invoiceAmount.toFixed(2),             // 发票金额（元）
            invoiceType: this.invoiceTypeList[curr.invoiceType - 1]  ,           // 发票类型
            invoiceState: this.statusList[curr.invoiceStatus],                   // 发票状态
            date: `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`        // 开票时间
          })
        })
      },
      // table 筛选条件重置
      reset() {
        Object.assign(this.filter, {
          tradingtatusVal: '',
          paymentMethodVal: '',
          date: null
        })
        this.getList()
      },
      // 翻页
      jump(val) {
        this.table.currentPage = val
        this.getList()
      },
      // 导出记录
      async exportTable() {
        // {
        //   invoiceTitle: 1,   // 支付方式 1支付宝
        //   invoiceStatus: 1,  // 开票标识:0不可开票,1未开票,2已开票
        //   beginTime: '',     // 查询起始时间,时间戳
        //   endTime: '',       // 查询结束时间,时间戳
        //   sortColumn: '',    // 排序字段:0:交易id, 1:交易状态,2:实际支付金额,3:充值到账金币,4:充值说明,5:支付方式,6:支付单号,7:修改时间
        //   sortBy: ''         // 排序方式:0降序,1升序
        // }
        let f = this.filter,
          t = `invoiceTitle=${f.tradingtatusVal}&invoiceStatus=${f.paymentMethodVal}&beginTime=${f.date ? f.date[0].getTime() : 0}&endTime=${f.date ? f.date[1].getTime() : new Date().getTime()}&sortColumn=2&sortBy=1`,
          data = await exportInvoiceTable(t)
        // 导出下载
        exportDownloadFun(data, '开票记录', 'xlsx')
      },
      // 获取发票抬头list
      async getHeadersListF() {
        let {data} = await getHeadersList()
        if (data.code == 200) this.filter.tradingtatusList = data.data.map(curr => {
          return {
            value: curr.value,
            label: curr.label
          }
        })
      }
    },
    mounted() {
      this.getList()
      createTableIconList()
      this.getHeadersListF()
    }
  }
</script>
