<template>
  <div class="addScreen">
    <div class="dialog-header">
      <span class="title">{{ title }}</span>
      <img src="@/icons/shutDialogIcon.png"
           @click="shutDialog(false)"
           class="closeBtn">
    </div>
    <div class="dialog-body">
      <div class="table">
        <div class="table-operate">
          <div class="btnGroup"
               :class="[{'cannotDelete': !selectionList.length}]">
            <div :class="[item.class, 'btn']"
                 @click="operating(item['action'])"
                 v-for="(item,index) in btnGroup"
                 :key="'renderBtn-' + index">
              <img :src="item.iconDefault" v-if="item.iconDefault" class="btnIcon default">
              <img :src="item.iconHover" v-if="item.iconHover" class="btnIcon hover">
              <span>
            {{ item['action'] }}
          </span>
            </div>
          </div>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="selection => selectionList = selection">

          <el-table-column
            type="selection"
            align="right"
            width="45"/>

          <!--银幕名称-->
          <el-table-column
            label="银幕名称"
            sortable
            width="320">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>

          <!--银幕证书-->
          <el-table-column
            label="银幕证书">
            <template slot-scope="scope">{{ scope.row.localPath }}</template>
          </el-table-column>
        </el-table>
        <!--暂无数据-->
        <div class="nullTableData" v-show="!tableData.length">
          <img src="@/icons/tableDataNull.png">
          <span>{{ $t('public.unData') }}</span>
        </div>
      </div>
      <div class="dialog-btn-group">
        <div class="dialog-btn cancel" @click="$emit('shutMe')">
          <span>{{ $t('public.cancel') }}</span>
        </div>
        <div class="dialog-btn save"
             :class="[{'cannotBeGo': !tableData.length}]"
             @click="saveF">
          <span>{{ $t('public.save') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import {
    addMineScreen,
    addCinemaScreen
  } from '@/api/screen-api'
  import {messageFun} from '../../../assets/common'

  export default {
    name: 'addScreen',
    data() {
      return {
        title: '添加银幕',
        btnGroup: [
          {
            action: '添加',
            class: 'add',
            iconDefault: require('@/icons/btn_icon_add_black.png'),
            iconHover: require('@/icons/btn_icon_add_white.png'),
            state: true
          },
          {
            action: '删除',
            class: 'delete',
            iconDefault: require('@/icons/btn_icon_delete_black.png'),
            iconHover: require('@/icons/btn_icon_delete_white.png'),
            state: true
          }
        ],
        tableData: [
          // {
          //   name: 'name',
          //   certificate: 'certificate'
          // }
        ],
        selectionList: []
      }
    },
    watch: {
      'socket_plugin_msg': {
        handler: function (e) {
          let data = JSON.parse(e.data)
          if (data.code == 220) {
            if (data.result == 0) {
              data.files.forEach(item => {
                this.tableData.push({
                  name: item.name,
                  localPath: item.localPath
                })
              })
            }
          } else if (data.code == 221) {
            if (data.result == 0) {
              // 银幕添加成功
              messageFun('success', '银幕添加成功')
              this.shutDialog(true)
            }
          }
        }
      }
    },
    props: {
      'nowSite': Object
    },
    methods: {
      //
      shutDialog(boolean) {
        this.$emit('shutMe', boolean)
      },
      // 操作
      operating(action) {
        switch (action) {
          case '添加':
            this.addScreenFun()
            break
          case '删除':
            this.deleteScreenFun()
        }
      },
      // 添加银幕
      addScreenFun() {
        this.$store.commit('WEBSOCKET_PLUGIN_SEND', {
          code: 220,
          type: ['pem']
        })
      },
      //
      deleteScreenFun() {

      },
      // 确定
      async saveF() {
        let {type, data: site} = this.nowSite
        if (!this.tableData.length) return false
        let {tableData, user} = this,
          {data} = type == 'mineScreen' ? await addMineScreen({
            theatreUuid: site.theatreUuid,
            screenList: tableData.map(item => {
              return {
                screenName: item.name,
                filePath: item.localPath
              }
            })
          }) : await addCinemaScreen({
            theatreUuid: site.theatreUuid,
            screenList: tableData.map(item => {
              return {
                screenName: item.name,
                filePath: item.localPath
              }
            })
          })
        if (data.code == 201) {
          this.$store.commit('WEBSOCKET_PLUGIN_SEND', {
            code: 221,
            userID: user.id,
            files: data.data.map((item, index) => {
              return {
                taskUuid: item['screenUuid'],
                taskName: item.screenName.split('.')[0],
                ID: item['screenId'],
                localPath: tableData[index]['localPath'],
                networkPath: {
                  front: item['pathPrefix'],
                  back: item['certificatePath']
                }
              }
            })
          })
          this.$emit('addSuc', type)
        }
      }
    },
    mounted() {

    },
    computed: {
      ...mapState(['socket_plugin', 'socket_plugin_msg', 'user'])
    }
  }
</script>

<style lang="less" scoped>
  .addScreen {
    .dialog-body {
      position: relative;
      height: 470px;

      .table {
        width: calc(100% - 40px);
        padding-left: 10px;
        height: 420px;
      }
    }
  }

  .table-operate {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 2;
  }

  .btnGroup {
    &.cannotDelete .btn.delete {
      cursor: no-drop;
      color: rgba(22, 29, 37, 0.29);
      background-color: rgba(255, 255, 255, 1);

      .default {
        display: inline-block;
        opacity: 0.29;
      }

      .hover {
        display: none;
      }
    }
  }

  /deep/ .el-table__body-wrapper {
    height: 360px;
  }

</style>
