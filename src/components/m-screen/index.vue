<template>
  <div class="screenM panel">
    <ScreenTree class="screen-tree" />
    <ScreenTable ref="screenTable"
                 class="screen-table" />
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
    components: {
      ScreenTable,
      ScreenTree
    }
  }
</script>

<style lang="less" scoped>
  .screenM {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;

    &.panel {
      height: calc(100vh - 80px - 20px);
    }

    .screen-tree {
      flex-shrink: 0;
    }

    .screen-table {
      width: calc(100% - 212px);
      box-sizing: border-box;
    }
  }
</style>
