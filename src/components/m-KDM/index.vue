<template>
  <div class="kdm-wrapper panel">
    <div class="table-operate">
      <div class="btnGroup"
           :class="[
            {'cannotStart': !startBtn},
            {'cannotPause': !pauseBtn},
            {'cannotDelete': !deleteBtn},
            {'cannotDownload': !downloadBtn},
            {'cannotAgain': !againBtn},
            {'cannotCopy': !copyBtn},
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
               @keyup.enter="$refs.kdmtable.getList()"
               placeholder="输入场景名、任务ID">
        <!--搜索按钮-->
        <img src="@/icons/global-search-icon.png"
             class="searchIcon"
             @click="$refs.kdmtable.getList()">
      </div>
    </div>
    <hr>
    <div class="kdm-table">
      <Table ref="kdmtable"
             :keyword="searchInput"
             @tableRowClick="showDetails"
             @tableSelectionF="result => selectionList = result"/>
    </div>
    <!--详情窗口-->
    <Win ref="win" :class="['win', {showMe: showWin}]" @shutMe="showWin = false"/>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import Table from './table.vue'
  import Win from './components/detailsWin'

  export default {
    name: 'kdm',
    data() {
      return {
        showWin: false,
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
            action: '拷贝',
            class: 'copy',
            iconDefault: require('@/icons/btn_icon_copy_black.png'),
            iconHover: require('@/icons/btn_icon_copy_white.png'),
            state: true
          },
          {
            action: '重新制作',
            class: 'zipAgain',
            iconDefault: require('@/icons/btn_icon_again_black.png'),
            iconHover: require('@/icons/btn_icon_again_white.png'),
            state: true
          },
          {
            action: '下载KDM',
            class: 'download',
            iconDefault: require('@/icons/btn_icon_download_black.png'),
            iconHover: require('@/icons/btn_icon_download_white.png'),
            state: true
          }
        ],
        searchInput: '',
        selectionList: []     // 多选结果
      }
    },
    methods: {
      // 打开详情窗口
      showDetails(data) {
        this.showWin = true
        this.$refs.win.getData(data.kdmTaskUuid)
      },
      // 操作
      operating(action) {
        switch (action) {
          case '开始':
            // 所选记录都为"暂停"“暂停（欠费）且"未过期"才可以点击
            if (this.startBtn) this.$refs.kdmtable.startFun()
            break
          case '暂停':
            // 所选记录都为"进行中"且"未过期"才可以点击
            if (this.pauseBtn) this.$refs.kdmtable.pauseFun()
            break
          case '删除':
            // 当选中项中存在「进行中」状态时不可使用
            if (this.deleteBtn) this.$refs.kdmtable.deleteFun()
            break
          case '拷贝':
            // 单选，需在有效期内，状态在「进行中、暂停、暂停（欠费）、失败、已完成」内
            if (this.copyBtn) this.$refs.kdmtable.copyFun()
            break
          case '重新制作':
            // 状态为「失败」且未过期
            if (this.againBtn) this.$refs.kdmtable.againFun()
            break
          case '下载KDM':
            // 状态为「进行中、暂停、已完成」且未过期
            if (this.downloadBtn) this.$refs.kdmtable.downloadFun()
            break
        }
      }
    },
    computed: {
      ...mapState(['user', 'zone']),
      startBtn() {
        if (!this.selectionList.length) return false
        else if (this.selectionList.some(item => item.validPeriod == 0)) return false
        else if (this.selectionList.every(item => String('56').includes(item.taskStatus))) return true
        else return false
      },
      pauseBtn() {
        if (!this.selectionList.length) return false
        else if (this.selectionList.some(item => item.validPeriod == 0)) return false
        else if (this.selectionList.every(item => item.taskStatus == 4)) return true
        else return false
      },
      deleteBtn() {
        if (!this.selectionList.length) return false
        else if (this.selectionList.some(item => item.validPeriod == 4)) return false
        else return true
      },
      downloadBtn() {
        if (!this.selectionList.length) return false
        else if (this.selectionList.some(item => item.validPeriod == 0)) return false
        else if (this.selectionList.every(item => String('458').includes(item.taskStatus))) return true
        else return false
      },
      copyBtn() {
        if (this.selectionList.length != 1) return false
        else if (this.selectionList[0]['validPeriod'] == 0) return false
        else if (String('45678').includes(this.selectionList[0]['taskStatus'])) return true
        else return false
      },
      againBtn() {
        if (!this.selectionList.length) return false
        else if (this.selectionList.some(item => item.validPeriod == 0)) return false
        else if (this.selectionList.every(item => item.taskStatus == 7)) return true
        else return false
      }
    },
    components: {
      Table,
      Win
    }
  }
</script>

<style lang="less" scoped>
  .kdm-wrapper {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;

    .btnGroup {
      &.cannotStart .btn.start,
      &.cannotPause .btn.pause,
      &.cannotDelete .btn.delete,
      &.cannotDownload .btn.download,
      &.cannotAgain .btn.zipAgain,
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

    &.panel {
      height: calc(100vh - 80px - 20px);
    }
  }

  .win {
    position: absolute;
    bottom: -20px;
    right: -924px;
    transition: all 0.2s;
    border-radius: 8px;
    z-index: 1;

    &.showMe {
      right: -20px;
    }
  }
</style>
