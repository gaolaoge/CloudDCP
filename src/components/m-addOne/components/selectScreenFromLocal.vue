<template>
  <div class="selectScreenFromLocal">
    <div class="win wrapper-border setScollBarStyle">
      <div class="stepOne" v-show="step == 1">
        <div class="fileTitle">{{ inputName.title }}</div>
        <div class="fileItem">
          <label>{{ inputName.cinemaNameLabel }}：</label>
          <input type="text" v-model="inputName.cinenaNameValue">
        </div>
        <div class="fileItem">
          <label>{{ inputName.theatreNameLabel }}：</label>
          <input type="text" v-model="inputName.theatreNameValue">
        </div>
      </div>
      <div class="stepTwo" v-show="step == 2">
        <div class="localFileTab">
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
                  <span>{{ item['action'] }}</span>
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
        </div>
      </div>
    </div>
    <div class="bottomOperate">
      <div class="back" @click="backToSA">
        <img src="@/icons/toUploadTab.png" class="icon">
        <span class="text">{{ fromNetdisc }}</span>
      </div>
        <div class="totalText dialog-btn-group rightOperate" v-show="step == 1">
          <!--下一步-->
          <div class="dialog-btn save"
               @click="step = 2">
            <span>{{ btn }}</span>
          </div>
        </div>
        <div class="totalText dialog-btn-group rightOperate" v-show="step == 2">
          <!--已选择n个场景-->
          <span class="internalScrSelText">
            {{ bottomOperate.selectedText1 }}
            <span class="internalScrSelTotal">{{ tableData.length }}</span>
            {{ bottomOperate.selectedText2 }}
          </span>
          <!--下一步-->
          <div :class="[{'cannotBeGo': !tableData.length}, 'dialog-btn', 'save']"
               @click="nextFun">
            <span>{{ $t('public.nextStop') }}</span>
          </div>
        </div>
    </div>

  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import {messageFun} from "../../../assets/common"

  export default {
    name: 'selectScreenFromLocal',
    data() {
      return {
        inputName: {
          title: '请先输入院线/影院信息',
          cinemaNameLabel: '院线名称',
          cinenaNameValue: '',
          theatreNameLabel: '影院名称',
          theatreNameValue: ''
        },
        btn: '去选择',
        tableData: [],
        fromNetdisc: '从银幕管理选择',
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
        bottomOperate: {
          selectedText1: '已选择',
          selectedText2: '个银幕'
        },
        selectionList: [],
        step: 1
      }
    },
    props: {
      'chooseSelf': Boolean
    },
    watch: {
      'socket_plugin_msg': {
        handler: function (e) {
          let data = JSON.parse(e.data)
          if (data.code == 210) {
            if (data.result == 0) {
              data.files.forEach(item => {
                this.tableData.push({
                  name: item.name,
                  localPath: item.localPath
                })
              })
            }
          } else if (data.code == 211) {
            if (data.result == 0) {
              // 银幕添加成功
              messageFun('success', '银幕添加成功')
              this.shutDialog(true)
            }
          }
        }
      },
      'step': function (num) {
        if (num == 2) this.$emit('localWinStatus', 'selectFile')
        if (num == 2 && !this.socket_plugin) this.$store.commit('WEBSOCKET_PLUGIN_INIT', true)
      },
      'chooseSelf': {
        handler: function (boolean) {
          if (boolean) this.$emit('localWinStatus', 'inputName')
        },
        immediate: true
      }
    },
    methods: {
      //
      backToSA() {
        this.$emit('selectByNetdisc')
        this.step = 1
        this.$emit('localWinStatus', 'inputName')
      },
      operating(action) {
        switch (action) {
          case '添加':
            this.addScreenFile()
            break
          case '删除':
            this.deleteScreenFile()
            break
        }
      },
      //
      addScreenFile() {
        this.$store.commit('WEBSOCKET_PLUGIN_SEND', {
          code: 210,
          type: ['pem']
        })
      },
      //
      deleteScreenFile() {

      },
      // 下一步
      nextFun() {
        if (!this.tableData.length) return false
        this.$emit('selectedAndNext', {
          'cinemaName': this.cinenaNameValue,
          'theatreName': this.theatreNameValue,
          'screenList': this.tableData,
          'certificateSource': 1
        })
      }
    },
    computed: {
      ...mapState(['socket_plugin', 'socket_plugin_msg', 'user'])
    }
  }
</script>

<style lang="less" scoped>
  .selectScreenFromLocal {
    width: 100%;

    .win {
      height: calc(100% - 50px);

      &.wrapper-border {
        padding: 10px;
        overflow: hidden;
      }
    }

    .bottomOperate {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .back {
        cursor: pointer;

        .icon {
          transform: rotate(180deg);
        }

        .text {
          font-size: 14px;
          color: rgba(27, 83, 244, 1);
        }
      }

      .rightOperate {

        .filter-btn {
          margin-right: 0px;
          margin-left: 25px;
        }

        .totalText {
          display: flex;
          flex-direction: row;

          .internalScrSelText {
            color: rgba(22, 29, 37, 1);
            font-size: 14px;

            .internalScrSelTotal {
              color: rgba(27, 83, 244, 1);
              font-weight: 500;
              font-size: 21px;
            }
          }
        }

      }
    }

    .dialog-btn-group {
      position: relative;
      right: 0px;
      bottom: 2px;
    }

    .table {
      position: relative;

      .table-operate {
        position: absolute;
        right: 0px;
        z-index: 2;
      }
    }

    /deep/ .el-table__body-wrapper {
      height: 454px !important;
    }

    .fileTitle {
      font-size: 16px;
      font-weight: 600;
      color: rgba(22, 29, 37, 1);
      margin-left: 32px;
      margin-bottom: 26px;
      margin-top: 12px;
    }

    .fileItem {
      padding-right: 46px;

      label {
        width: 104px!important;
      }
    }
  }
</style>
