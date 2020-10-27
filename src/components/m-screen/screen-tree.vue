<template>
  <div class="screen-tree">
    <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
      <el-tab-pane v-for="(item, index) in card" :key="index"
                   :label="item"/>
    </el-tabs>
    <!--内部银幕-->
    <div class="screenW" v-show="activeName == 0">
      <el-tree
        :props="props"
        :load="loadNode"
        lazy>
      </el-tree>
    </div>
    <!--院线银幕-->
    <div class="screenW" v-show="activeName == 1">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'screenTree',
    data() {
      return {
        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
        card: ['内部银幕', '院线银幕'],
        activeName: '0'
      }
    },
    methods: {
      handleClick() {

      },
      loadNode(node, resolve) {
        if (node.level === 0) return resolve([{name: 'region'}])
        else if (node.level > 1) return resolve([])
        else setTimeout(() => {
          const data = [
            {
              name: 'leaf',
              leaf: true
            },
            {
              name: 'zone'
            }
          ]
          resolve(data)
        }, 500)
      }
    }
  }
</script>

<style lang="less" scoped>
  .screen-tree {
    width: 212px;

    .screenW {
      font-size: 14px;
    }
  }
</style>
