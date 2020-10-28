<template>
  <div class="addScreen">
    <div class="dialog-header">
      <span class="title">
        {{ title }}
      </span>
      <img src="@/icons/shutDialogIcon.png"
           @click="$emit('shutMe')"
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
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
        </el-table>
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
        tableData: [],
        selectionList: []
      }
    },
    methods: {
      // 操作
      operating(action) {

      },
      // 确定
      saveF() {
        if (!this.tableData.length) return false
      }
    },
    computed: {}
  }
</script>

<style lang="less" scoped>
  .addScreen {
    .dialog-body {
      position: relative;
      height: 490px;
      padding-top: 40px;

      .table {
        width: calc(100% - 40px);
        padding-left: 10px;
        height: 420px;
      }
    }
  }

  .table-operate {
    position: absolute;
    right: 0px;
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
