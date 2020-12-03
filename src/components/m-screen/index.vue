<template>
  <div class="screenM panel">
    <ScreenTree class="screen-tree"
                ref="screenTree"
                @selectMineScreen="selectMineScreen" />
    <ScreenTable ref="screenTable"
                 class="screen-table"
                 @addScreenSuc="addScreenSuc" />
  </div>
</template>

<script>
  import ScreenTable from './screen-table.vue'
  import ScreenTree from './screen-tree.vue'

  export default {
    name: 'scrrenM',
    data() {
      return {}
    },
    methods: {
      // screen-tree 转 screen-table 银幕分组选中事件
      selectMineScreen(data) {
        this.$refs.screenTable.$refs.screenTableReal.getList(data)
        this.$refs.screenTable.nowSite = data
      },
      // 添加银幕成功 刷新tree
      addScreenSuc(type) {
        this.$refs.screenTree.refreshTree(type)
      }
    },
    components: {
      ScreenTable,
      ScreenTree
    }
  }
</script>

<style lang="less" scoped>
  .screenM {
    width: 100%;
    /*padding: 10px;*/
    box-sizing: border-box;
    display: flex;
    flex-direction: row;

    &.panel {
      height: calc(100vh - 80px - 20px);
    }

    .screen-tree {
      flex-shrink: 0;
      margin-right: 10px;
    }

    .screen-table {
      width: calc(100% - 222px);
      box-sizing: border-box;
    }
  }
</style>
