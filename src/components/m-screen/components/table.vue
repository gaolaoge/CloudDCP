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
        min-width="48"
        width="48"/>

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
        prop="updateBy"
        label="更新人"
        sortable
        show-overflow-tooltip
        width="100"/>

      <!--创建时间-->
      <el-table-column
        prop="longUpdateTime"
        label="更新时间"
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
            <div class="file-btn" @click="selectLocalScreen">
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
               @click="realEditScreen">
            <span>{{ $t('public.save') }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getScreenList,
    getMineScreenTabList,
    deleteScreen,
    editScreen,
    downloadScreen
  } from '@/api/screen-api'
  import {
    // consum,
    createDateFun
    , createTableIconList
    , messageFun
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
          statusV: '1',
          screenUuid: null,
          editPath: false
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
        pageIndex: 0,
        tableFilerCondition: null      // tab筛选条件 用于刷新
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
      handleCurrentChange(pageIndex) {
        Object.assign(this, pageIndex)
        this.getList(this.tableFilerCondition)
      },
      // 获取表格数据
      async getList(obj, keyword) {
        if (obj) this.tableFilerCondition = obj
        // else {
        //   return false
        // }
        new Promise(resolve => obj.type == 'mineScreen' ? resolve(this.getMineTab(obj)) : resolve(this.getTab(obj)))
          .then(({data}) => {
            this.total = data.total
            this.tableData = data.data.map(item => Object.assign(item, {
              'longUpdateTime': createDateFun(new Date(item.longUpdateTime)),
              'screenStatus': item.screenStatus == 0 ? '停用' : '启用'
            }))
          })
      },
      // 获取内部银幕Tab
      getMineTab({data}) {
        let {keyword, pageIndex, setting} = this
        return getMineScreenTabList({
          pageIndex,
          pageSize: setting.pageSize,
          screenStatusList: [],             // 银幕状态
          theatreUuid: data.theatreUuid,    // 影院uuid
          sortBy: null,                     // 排序字段
          sortType: 0,                      // 0降序,1升序
          keyword
        })
      },
      // 获取院线银幕Tab
      getTab({data}) {
        let {keyword, pageIndex, setting} = this,
          {cinemaUuid, theatreUuid} = data
        return getScreenList({
          pageIndex,
          'pageSize': setting.pageSize,
          'screenStatusList': [],    // 银幕状态
          cinemaUuid,                // 院线uuid
          theatreUuid,               // 影院uuid
          'sortBy': null,            // 排序字段
          'sortType': 0,             // 0降序,1升序
          keyword
        })
      },
      // 操作 - 编辑 - 预览
      selectLocalScreen() {
        let cb = () => {
          this.$store.commit('WEBSOCKET_PLUGIN_SEND', {
            code: 210,
            type: ['pem']
          })
        }
        if (this.socket_plugin) cb()
        else this.$store.dispatch('WEBSOCKET_PLUGIN_INIT', true).then(() => cb())
      },
      // 操作 - 确认编辑
      async realEditScreen() {
        let {nameV: screenName, filePath, statusV: screenStatus, screenUuid, editPath} = this.editSDialog,
          {data} = await editScreen({
            screenUuid,
            screenName,
            screenStatus,
            'filePath': editPath ? filePath : null
          })
        if (data.code == 201) {
          messageFun('success', '操作成功')
          this.getList(this.tableFilerCondition)
          this.editSDialog.visible = false
          if (editPath) this.$store.commit('WEBSOCKET_PLUGIN_SEND', {
            code: 211,
            userID: this.user.id,
            files: [data.data].map((item, index) => {
              return {
                taskUuid: item['screenUuid'],
                ID: item['screenId'],
                localPath: filePath,
                networkPath: {
                  front: item['pathPrefix'],
                  back: item['certificatePath']
                }
              }
            })
          })
        }
      },
      // 操作 - 编辑
      editScreen() {
        this.editSDialog.visible = true
        let {screenName, certificateName, screenStatus, screenUuid} = this.selectionList[0]
        Object.assign(this.editSDialog, {
          'nameV': screenName,
          'certificateV': certificateName,
          'statusV': screenStatus == '启用' ? '1' : '0',
          screenUuid
        })
      },
      // 操作 - 删除
      deleteFun() {
        let text = this.selectionList.length == 1 ? `银幕删除后将无法找回，确认删除“${this.selectionList[0]['screenName']}”吗？` : `银幕删除后将无法找回，确认删除这${this.selectionList.length}个银幕吗？`,
          screenUuidList = this.selectionList.map(item => item.screenUuid)
        this.$confirm(text, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
          .then(
            () => Promise.resolve(deleteScreen({screenUuidList})),
            () => null
          )
          .then(({data}) => {
            if (data.code == 204) {
              messageFun('success', '删除成功')
              this.getList(this.tableFilerCondition)
            }
          })
          .catch(() => null)
      },
      // 操作 - 下载
      downloadFun() {
        let cb = async () => {
          let screenUuidList = this.selectionList.map(item => item.screenUuid),
            {data} = await downloadScreen({screenUuidList})
          // if (data.code == 200) data.data.forEach(item => this.$store.commit('WEBSOCKET_PLUGIN_SEND', {
          //   code: 302,
          //   userID: this.user.id,
          //   ID: item.screenId,
          //   path: [{'front': item.pathPrefix, 'back': item.certificatePath}]
          // }))
          if (data.code == 200) this.$store.commit('WEBSOCKET_PLUGIN_SEND', {
            code: 302,
            userID: this.user.id,
            ID: data.data[0]['screenId'],
            path: data.data.map(item => {
              return {
                'front': item.pathPrefix,
                'back': item.certificatePath
              }
            })
          })

        }
        if (this.socket_plugin) cb()
        else this.$store.dispatch('WEBSOCKET_PLUGIN_INIT', true).then(() => cb())
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
      this.getList({
        type: 'mineScreen',
        data: {
          theatreUuid: ''
        }
      })
    },
    computed: {
      ...mapState(['setting', 'zoneUuid', 'socket_plugin', 'socket_plugin_msg', 'user'])
    },
    watch: {
      'selectionList': {
        handler: function (list) {

        }
      },
      'socket_plugin_msg': {
        handler: function (e) {
          if (!e) return false
          let data = JSON.parse(e.data)
          if (data.code == 210) {
            if (data.result == 0) {
              console.log(data)
              this.editSDialog.editPath = true
              this.editSDialog.certificateV = data.files[0]['name']
              this.editSDialog.filePath = data.files[0]['localPath']
            }
          }
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
