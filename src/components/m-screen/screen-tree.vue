<template>
  <div class="screen-tree">
    <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
      <el-tab-pane v-for="(item, index) in card" :key="index"
                   :label="item"/>
    </el-tabs>
    <!--内部银幕-->
    <div class="screenW internal" v-show="activeName == 0">
      <!--搜索框-->
      <div class="search">
        <input type="text" class="input"
               :placeholder="mineScreenPlaceholder"
               v-model="mineScreenKeyword"
               @keyup.enter="getMineScreenListNode">
        <img src="@/icons/search.png" class="icon search" @click="getMineScreenListNode">
        <div class="addBase" @click="addMineScreen.visible = true">
          <img src="@/icons/add.png" class="icon add default">
          <el-tooltip content="添加分组"
                      popper-class="default"
                      effect="dark"
                      placement="top">
            <img src="@/icons/add-hover.png" class="icon add hover">
          </el-tooltip>
        </div>
      </div>
      <!--树形结构-->
      <el-tree
        :props="props"
        :data="mineScreenListNode"
        :allow-drop="allowDrop"
        draggable>
        <span class="custom-tree-node" slot-scope="{ node, data }"
              @click="">
          <div class="l">
            <img src="@/icons/filer.png" class="filer default">
            <img src="@/icons/filer-hover.png" class="filer hover">
            <span class="tree-node-span">{{ data.theatreName }}</span>
          </div>
          <div class="r">
            <span class="total">{{ data.total }}</span>
            <img src="@/icons/operate-icon-white.png" class="operate-icon hover">
          </div>
        </span>
      </el-tree>
    </div>
    <!--院线银幕-->
    <div class="screenW" v-show="activeName == 1">
      <el-tree
        :props="props"
        :load="loadNode"
        draggable
        lazy>
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <img src="@/icons/filer.png">
          <span class="tree-node-span">{{ data.theatreName }}</span>
        </span>
      </el-tree>
    </div>
    <!--添加分组-->
    <el-dialog
      :visible.sync="addMineScreen.visible"
      :destroy-on-close="true"
      top="30vh"
      width="380px">
      <div class="dialog-header">
        <span class="title">{{ addMineScreen.title }}</span>
        <img src="@/icons/shutDialogIcon.png"
             @click="addMineScreen.visible = false"
             class="closeBtn">
      </div>
      <div class="dialog-body form">
        <div class="item">
          <input type="text"
                 class="farm-input addMineScreenInput"
                 :placeholder="addMineScreen.placeholder"
                 v-model="addMineScreen.input"
                 @input="verifAddMineScreenName(true)"
                 @blur="verifAddMineScreenName(false)"
                 @focus="addMineScreen.status = null">
          <span class="warnInfo" v-show="addMineScreen.status === false">
            {{ addMineScreen.warnInfo }}
          </span>
        </div>
        <div class="dialog-btn-group">
          <div class="dialog-btn cancel" @click="addMineScreen.visible = false">
            <span>{{ $t('public.cancel') }}</span>
          </div>
          <div class="dialog-btn save"
               :class="[{'cannotBeGo': !addMineScreen.input.trim()}]"
               @click="addMineScreenGroupFun">
            <span>{{ $t('public.save') }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getMineScreenList,
    addNewScreenGroup
  } from '@/api/screen-api'
  import {messageFun} from '../../assets/common'

  export default {
    name: 'screenTree',
    data() {
      return {
        addMineScreen: {
          visible: false,
          title: '添加分组',
          placeholder: '请输入分组名称',
          input: '',
          status: null,
          warnInfo: ''
        },
        mineScreenListNode: [],
        mineScreenPlaceholder: '输入分组名称',
        mineScreenKeyword: '',
        props: {
          label: 'theatreName',
          children: 'zones',
          isLeaf: 'leaf'
        },
        card: ['内部银幕', '院线银幕'],
        activeName: '0'
      }
    },
    methods: {
      // 拖拽事件预判
      allowDrop(draggingNode, dropNode, type) {
        return type !== 'inner'
      },
      //
      handleClick() {

      },
      // 获取【内部银幕】结构
      async getMineScreenListNode() {
        let {data} = await getMineScreenList(this.mineScreenKeyword)
        if (data.code == 200) this.mineScreenListNode = data.data
        else this.mineScreenListNode = []
      },
      // 获取【院线银幕】结构
      loadNode(node, resolve) {
        if (node.level === 0) return resolve([{theatreName: 'region'}])
        else if (node.level > 1) return resolve([])
        else setTimeout(() => {
            const data = [
              {
                theatreName: 'leaf',
                leaf: true
              },
              {
                theatreName: 'zone'
              }
            ]
            resolve(data)
          }, 500)
      },
      // 验证【添加分组】name 格式
      async verifAddMineScreenName(ing) {
        let {input} = this.addMineScreen,
          {addMineScreen} = this
        console.log(input)
        if (!input.trim()) return false
        else if (input.trim().length > 5) {
          addMineScreen.status = false
          addMineScreen.warnInfo = '最多输入50个字符'
        } else {

        }
      },
      // 【内部银幕】【添加分组】 - 确定
      async addMineScreenGroupFun() {
        let {status} = this.addMineScreen
        if (!status) return false
        let {data} = await addNewScreenGroup(this.addMineScreen.input)
        if (data.code == 200) {
          messageFun('success', '操作成功！')
          this.addMineScreen.visible = false
          this.mineScreenKeyword = ''
          this.getMineScreenListNode()
        }
      }
    },
    mounted() {
      this.$nextTick(() => this.getMineScreenListNode())
    }
  }
</script>

<style lang="less" scoped>
  .screen-tree {
    width: 212px;
    box-sizing: border-box;

    .screenW {
      font-size: 14px;

      .search {
        position: relative;
        border-bottom: 1px solid rgba(22, 29, 37, 0.11);

        .input {
          height: 34px;
          border: 0px;
          outline: none;
          width: 100%;
          padding-left: 36px;
        }

        .addBase {
          .add.hover {
            display: none;
          }

          &:hover {
            .add.hover {
              display: inline-block;
            }

            .add.default {
              display: none;
            }
          }
        }

        .icon {
          position: absolute;
          cursor: pointer;

          &.add {
            top: 10px;
            right: 16px;
          }

          &.search {
            top: 10px;
            left: 16px;
          }
        }
      }

      .custom-tree-node {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-radius: 4px;
        padding: 0px 16px;

        .r {
          display: inline-flex;
          align-items: center;

          .total {
            font-size: 14px;
            display: inline-flex;
            margin-right: 4px;
          }

          img.operate-icon {
            cursor: pointer !important;
            margin-right: 10px;
            margin-left: 4px;
          }
        }

        .l {
          .filer {
            margin-right: 8px;
          }
        }

        img.hover {
          display: none;
        }

        &:hover {
          background-color: rgba(27, 83, 244, 0.8);

          .total,
          .tree-node-span {
            color: rgba(255, 255, 255, 1);
          }

          .default {
            display: none;
          }

          .hover {
            display: inline-block;
          }
        }
      }

      &.internal {
        /deep/ .is-leaf {
          display: none;
        }
      }
    }

    .dialog-body {
      display: flex;
      justify-content: center;
      height: 128px;

      .addMineScreenInput {
        margin-top: 10px;
        width: 320px;
        height: 36px;
        border-radius: 6px;
        border: 1px solid rgba(22, 29, 37, 0.2);
        outline: none;
        padding-left: 16px;
      }
    }
  }
</style>
