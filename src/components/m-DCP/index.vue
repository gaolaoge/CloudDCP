<template>
  <div class="dcp">
    <div class="table-operate">
      <div class="btnGroup"
           :class="[
            {'cannotStart': !startBtn},
            // {'cannotPause': !btnGroup.downloadTableBtnPause},
            // {'cannotDelete': !btnGroup.downloadTableBtnDelete},
            // {'cannotDownload': !btnGroup.downloadTableBtnDownload},
            // {'cannotRenderAll': !btnGroup.downloadTableBtnRenderAll},
            // {'cannotRenderAgain': !btnGroup.downloadTableBtnRenderAgain},
            // {'cannotArchive': !btnGroup.downloadTableBtnArchive},
            // {'cannotCopy': !btnGroup.downloadTableBtnCopy}
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
               @keyup.enter="searchRenderInput"
               placeholder="输入场景名、任务ID">
        <!--搜索按钮-->
        <img src="@/icons/global-search-icon.png"
             class="searchIcon"
             @click="searchRenderInput">
      </div>
    </div>
    <div class="dcp-table panel">
      <Table ref="table"
             :keyword="searchInput"
             @tableSelectionF="result => selectionList = result"/>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import Table from './table.vue'

  export default {
    name: 'dcp',
    data() {
      return {
        btnGroup: [
          {
            action: '开始',
            class: 'start',
            iconDefault: require('@/icons/btn_icon_start_black.png'),
            iconHover: require('@/icons/btn_icon_start_white.png'),
            state: true
          },
          {
            action: '暂停',
            class: 'pause',
            iconDefault: require('@/icons/btn_icon_pause_black.png'),
            iconHover: require('@/icons/btn_icon_pause_white.png'),
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
          },
          {
            action: '拷贝',
            class: 'copy',
            iconDefault: require('@/icons/btn_icon_copy_black.png'),
            iconHover: require('@/icons/btn_icon_copy_white.png'),
            state: true
          },
          {
            action: '重新打包',
            class: 'zipAgain',
            iconDefault: require('@/icons/btn_icon_again_black.png'),
            iconHover: require('@/icons/btn_icon_again_white.png'),
            state: true
          },
          {
            action: '创建KDM',
            class: 'createKDM',
            iconDefault: require('@/icons/btn_icon_add_black.png'),
            iconHover: require('@/icons/btn_icon_add_white.png'),
            state: true
          }
        ],
        searchInput: '',
        selectionList: []     // 多选结果
      }
    },
    methods: {
      // 操作
      operating(action) {
        switch (action) {
          case '开始':
            if (this.startBtn) this.$refs.table.startFun()
            break
          case '暂停':
            this.$refs.table.pauseFun()
            break
          case '删除':
            this.$refs.table.deleteFun()
            break
          case '拷贝':
            this.$refs.table.copyFun()
            break
          case '重新打包':
            this.$refs.table.againFun()
            break
          case '下载DCP':
            this.$refs.table.downloadFun()
            break
          case '创建KDM':
            this.$refs.table.createKDMFun()
            break
        }
      },
      searchRenderInput() {

      }
    },
    mounted() {
      this.$refs.table.getList()
    },
    computed: {
      ...mapState(['user', 'zone']),
      startBtn() {
        if (!this.selectionList.length) return false
        else if (this.selectionList.some(item => item.validPeriod == 0)) return false
        else if (this.selectionList.every(item => String('56').includes(item.taskStatus))) return true
        else return false
      }
    },
    components: {
      Table
    }
  }
</script>

<style lang="less" scoped>
  .dcp {
    width: 100%;

    .btnGroup {
      &.cannotStart .btn.start,
      &.cannotPause .btn.pause,
      &.cannotDelete .btn.delete,
      &.cannotDownload .btn.download,
      &.cannotRenderAll .btn.renderAll,
      &.cannotRenderAgain .btn.renderAgain,
      &.cannotArchive .btn.archive,
      &.cannotCopy .btn.copy {
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
</style>
