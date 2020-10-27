<template>
  <div class="screenM panel">
    <ScreenTree />
    <Table class="table" />
  </div>
</template>

<script>
  import Table from './table.vue'
  import ScreenTree from './screen-tree.vue'

  export default {
    name: 'scrrenM',
    data() {
      return {}
    },
    components: {
      Table,
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

    .table {
      flex-grow: 1;
    }
  }
</style>
