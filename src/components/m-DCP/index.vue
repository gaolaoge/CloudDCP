<template>
  <div class="dcp">
    <div class="operate">
      <div class="btnGroup"
           :class="[
            // {'cannotState': !btnGroup.downloadTableBtnStart},
            // {'cannotPause': !btnGroup.downloadTableBtnPause},
            // {'cannotDelete': !btnGroup.downloadTableBtnDelete},
            // {'cannotDownload': !btnGroup.downloadTableBtnDownload},
            // {'cannotRenderAll': !btnGroup.downloadTableBtnRenderAll},
            // {'cannotRenderAgain': !btnGroup.downloadTableBtnRenderAgain},
            // {'cannotArchive': !btnGroup.downloadTableBtnArchive},
            // {'cannotCopy': !btnGroup.downloadTableBtnCopy}
           ]">
        <div :class="[item.class, 'farm-primary-form-btn']"
             @click="operating(item['action'])"
             v-for="(item,index) in btnGroup.renderBtnGroup"
             :key="'renderBtn-' + index">
          <img :src="item.initialIcon" v-if="item.initialIcon" class="btnIcon default">
          <img :src="item.selectedIcon" v-if="item.selectedIcon" class="btnIcon hover">
          <span>
            {{ item['text'] }}
          </span>
        </div>
      </div>
      <div class="searchInput">
        <input type="text"
               class="farm-form-input"
               v-model="btnGroup.searchInputDownload"
               @keyup.enter="searchRenderInput"
               placeholder="输入场景名、任务ID">
        <!--搜索按钮-->
        <img src="@/icons/global-search-icon.png"
             alt=""
             class="searchIcon"
             @click="searchRenderInput">
      </div>
    </div>
    <div class="dcp-table">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'dcp',
    data() {
      return {
        btnGroup: [
          {
            action: '开始',
            class: 'start',
            iconDefault: '',
            iconHover: '',
            state: true
          },
          {
            action: '暂停',
            class: 'pause',
            iconDefault: '',
            iconHover: '',
            state: true
          },
          {
            action: '开始',
            class: 'start',
            iconDefault: '',
            iconHover: '',
            state: true
          },
          {
            action: '开始',
            class: 'start',
            iconDefault: '',
            iconHover: '',
            state: true
          },
          {
            action: '开始',
            class: 'start',
            iconDefault: '',
            iconHover: '',
            state: true
          },
          {
            action: '开始',
            class: 'start',
            iconDefault: '',
            iconHover: '',
            state: true
          }
        ]
      }
    },
    methods: {
      // 操作
      operating(action) {

      }
    }
  }
</script>

<style lang="less" scoped>
  .dcp {

  }
</style>
