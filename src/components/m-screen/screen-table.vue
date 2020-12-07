<template>
  <div class="screen-table">
    <div class="table-operate">
      <div class="btnGroup"
           :class="[
            {'cannotAdd': !addBtn},
            {'cannotEdit': !editBtn},
            {'cannotDelete': !deleteBtn},
            {'cannotDownload': !downloadBtn}
           ]">
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
      <div class="searchInput">
        <input type="text"
               class="input"
               v-model="searchInput"
               @keyup.enter="$refs.screenTableReal.getList(searchInput)"
               placeholder="输入场景名、任务ID">
        <!--搜索按钮-->
        <img src="@/icons/global-search-icon.png"
             class="searchIcon"
             @click="$refs.screenTableReal.getList(searchInput)">
      </div>
    </div>
    <div class="hr" />
    <Table ref="screenTableReal"
           :keyword="searchInput"
           @tableSelectionF="result => selectionList = result"/>
    <!--添加银幕-->
    <el-dialog
      top="0px"
      :visible.sync="addSDialogVisible"
      :destroy-on-close="true"
      :show-close="false"
      width="860px">
      <AddScreen :nowSite="nowSite"
                 @addSuc="addScreenS"
                 @shutMe="shutAddDialog"/>
    </el-dialog>
  </div>
</template>

<script>
  import Table from './components/table.vue'
  import AddScreen from './components/add-screen'
  import {mapState} from 'vuex'

  export default {
    name: 'screenTable',
    data() {
      return {
        addSDialogVisible: false,
        btnGroup: [
          {
            action: '添加',
            class: 'add',
            iconDefault: require('@/icons/btn_icon_add_black.png'),
            iconHover: require('@/icons/btn_icon_add_white.png'),
            state: true
          },
          {
            action: '编辑',
            class: 'edit',
            iconDefault: require('@/icons/btn_icon_edit_black.png'),
            iconHover: require('@/icons/btn_icon_edit_white.png'),
            state: true
          },
          {
            action: '删除',
            class: 'delete',
            iconDefault: require('@/icons/btn_icon_delete_black.png'),
            iconHover: require('@/icons/btn_icon_delete_white.png'),
            state: true
          },
          {
            action: '下载',
            class: 'download',
            iconDefault: require('@/icons/btn_icon_download_black.png'),
            iconHover: require('@/icons/btn_icon_download_white.png'),
            state: true
          }
        ],
        searchInput: '',
        nowSite: {
          type: 'mineScreen',
          data: {
            theatreUuid: null
          }
        },                    // 给【添加银幕】模块指定Tab当前位置
        selectionList: []     // 多选结果
      }
    },
    methods: {
      // 添加银幕成功 刷新tree
      addScreenS(type) {
        this.$emit('addScreenSuc', type)
      },
      // 关闭添加银幕窗口
      shutAddDialog(boolean) {
        this.addSDialogVisible = false
        if (boolean) this.getTableList()
      },
      // 操作
      operating(action) {
        switch (action) {
          case '添加':
            // 所选记录都为"暂停"“暂停（欠费）且"未过期"才可以点击
            if (this.addBtn) this.addSDialogVisible = true
            if (!this.socket_plugin) this.$store.commit('WEBSOCKET_PLUGIN_INIT', true)
            break
          case '编辑':
            // 所选记录都为"进行中"且"未过期"才可以点击
            if (this.editBtn) this.$refs.screenTableReal.editScreen()
            break
          case '删除':
            // 当选中项中存在「进行中」状态时不可使用
            if (this.deleteBtn) this.$refs.screenTableReal.deleteFun()
            break
          case '下载':
            // 单选，需在有效期内，状态在「进行中、暂停、暂停（欠费）、失败、已完成」内
            if (this.downloadBtn) this.$refs.screenTableReal.downloadFun()
            break
        }
      },
      // 关闭【添加银幕】
      addSClose() {

      },
      // 获取Table列表
      getTableList() {
        this.$refs.screenTableReal.getList()
      }
    },
    mounted() {
      this.$nextTick(() => this.$refs.screenTableReal.getList())
    },
    computed: {
      ...mapState(['user', 'zone']),
      addBtn() {
        return true
      },
      editBtn() {
        if (this.selectionList.length != 1) return false
        else return true
      },
      deleteBtn() {
        if (!this.selectionList.length) return false
        else return true
      },
      downloadBtn() {
        if (!this.selectionList.length) return false
        else return true
      }
    },
    components: {
      Table,
      AddScreen
    }
  }
</script>

<style lang="less" scoped>
  .screen-table {
    width: 100%;
    padding: 0px 10px;
    box-sizing: border-box;

    .table-operate {
      box-sizing: border-box;
      padding: 10px 0px 0px 20px;
      margin-bottom: 10px;
    }

    .btnGroup {
      &.cannotAdd .btn.add,
      &.cannotEdit .btn.edit,
      &.cannotDelete .btn.delete,
      &.cannotDownload .btn.download {
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
  }

  .hr {
    height: 2px;
    background-color: #E4E7ED;
  }
</style>
