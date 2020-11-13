<template>
  <div class="table">
    <!--表格-->
    <el-table
      :data="tableData"
      @selection-change="selectionFun"
      @filter-change="filterChangeF"
      @row-click="showDetails"
      ref="dcp-table-real"
      style="width: 100%">

      <el-table-column
        type="selection"
        align="right"
        show-overflow-tooltip
        min-width="58"
        width="58"/>

      <!--银幕ID-->
      <el-table-column
        prop="screenId"
        label="银幕ID"
        sortable
        show-overflow-tooltip
        width="100"/>

      <!--银幕名称-->
      <el-table-column
        prop="screenName"
        label="银幕名称"
        show-overflow-tooltip
        min-width="180"/>

      <!--状态-->
      <el-table-column
        prop="screenStatus"
        label="状态"
        show-overflow-tooltip
        column-key="status"
        :filters="statusList"
        width="100"/>

      <!--银幕证书-->
      <el-table-column
        prop="certificateName"
        label="银幕证书"
        show-overflow-tooltip
        width="220"/>

      <!--更新人-->
      <el-table-column
        prop="updateName"
        label="更新人"
        sortable
        show-overflow-tooltip
        width="100"/>

      <!--创建时间-->
      <el-table-column
        prop="updateTime"
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
    <!--编辑银幕-->
    <el-dialog
      :visible.sync="editSDialog.visible"
      :destroy-on-close="true"
      :show-close="false"
      width="648px">
      <div class="dialog-header">
        <span class="title">{{ editSDialog.title }}</span>
        <img src="@/icons/shutDialogIcon.png"
             @click="editSDialog.visible = false"
             class="closeBtn">
      </div>
      <div class="dialog-body">
        <div class="form_">
          <!--银幕名称-->
          <div class="form-item">
            <label class="form-item-label">{{ editSDialog.nameL }}</label>
            <input type="text"
                   :class="[{'errorVal': null}, 'form-item-input']"
                   v-model="editSDialog.nameV">
          </div>
          <!--银幕证书-->
          <div class="form-item">
            <label class="form-item-label">{{ editSDialog.certificateL }}</label>
            <input type="text"
                   disabled
                   :class="[{'errorVal': null}, 'form-item-input', 'file-input']"
                   v-model="editSDialog.certificateV">
            <div class="file-btn">
              <span>{{ $t('public.preview') }}</span>
            </div>
          </div>
          <!--银幕状态-->
          <div class="form-item">
            <label class="form-item-label">{{ editSDialog.statusL }}</label>
            <el-select v-model="editSDialog.statusV">
              <el-option label="启用" value="1"></el-option>
              <el-option label="停用" value="0"></el-option>
            </el-select>
          </div>
        </div>
        <div class="dialog-btn-group">
          <div class="dialog-btn cancel" @click="editSDialog.visible = false">
            <span>{{ $t('public.cancel') }}</span>
          </div>
          <div :class="[{'cannotBeGo': !editSDialog.nameV.trim()}, 'dialog-btn', 'save']"
               @click="editScreen">
            <span>{{ $t('public.save') }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getScreenList
  } from '@/api/screen-api'
  import {
    // consum,
    createDateFun,
    createTableIconList
    // messageFun
  } from '@/assets/common'
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'screenTable',
    data() {
      return {
        editSDialog: {
          visible: false,
          title: '编辑银幕',
          nameL: '银幕名称',
          nameV: '',
          certificateL: '银幕证书',
          certificateV: '/',
          statusL: '银幕状态',
          statusV: '1'
        },
        selectionList: [],     // 多选结果
        tableData: [
          // {
          //   // validPeriod,   1有效 0过期
          // }
        ],
        statusList: [
          {text: '启用', value: '启用'},
          {text: '停用', value: '停用'}
        ],
        projectList: [],
        total: 0,
        pageIndex: 0
      }
    },
    props: {
      'keyword': {
        type: String,
        default: ''
      }
    },
    methods: {
      // 页码跳转
      handleCurrentChange() {
      },
      // 获取表格数据
      async getList(obj) {
        // if (obj.theatreUuid)
        let {data} = await getScreenList({
          pageIndex: this.pageIndex,
          pageSize: this.setting.pageSize,
          screenStatusList: [],    // 银幕状态
          cinemaUuid: [],          // 院线uuid
          theatreUuid: [],         // 影院uuid
          sortBy: null,            // 排序字段
          sortType: 0,             // 0降序,1升序
          keyword: this.keyword
        })
        this.total = data.total
        this.tableData = data.data.map(item => Object.assign(item, {
          'updateTime': createDateFun(new Date(item.updateTime)),
          'screenStatus': item.screenStatus == 0 ? '停用' : '启用'
        }))
      },
      // 操作 - 编辑
      editScreen() {

      },
      // 操作 - 删除
      deleteFun() {
        let text = this.selectionList.length == 1 ? `银幕删除后将无法找回，确认删除“${this.selectionList[0]['screenName']}”吗？` : `银幕删除后将无法找回，确认删除这${this.selectionList.length}个银幕吗？`

        this.$confirm(text, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(() => null)
          .catch(() => null)
      },
      // 操作 - 下载
      downloadFun() {

      },
      //
      filterChangeF() {

      },
      //
      showDetails() {

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
    width: 100%;

    /deep/ .el-table__body-wrapper {
      height: calc(100vh - 80px - 52px - 20px - 47px - 20px - 40px - 20px - 10px);
    }

    .dialog-body {
      height: 220px;

      .form-item-input,
      /deep/ .el-input__inner {
        width: 510px;
      }
    }

    .form-item-input.file-input {
      width: 437px;
    }

    .file-btn {
      width: 55px;
      height: 34px;
      border-radius: 6px;
      border: 1px solid rgba(22, 29, 37, 0.2);
      text-align: center;
      margin-left: 16px;
      cursor: pointer;

      span {

        font-size: 14px;
        color: rgba(27, 83, 244, 1);
        line-height: 34px;
      }
    }
  }
</style>
