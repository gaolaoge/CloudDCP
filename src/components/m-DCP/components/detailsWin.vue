<template>
  <div class="details">
    <img src="@/icons/shutDialogIcon.png" class="shutWin" @click="shutWin">
    <div class="tableGroup">
      <div class="navList">
        <span class="navBtn"
              :class="[{'active': index == activeIndex}]"
              @click="activeIndex = index"
              v-for="(item,index) in navList"
              :key="index">{{ item }}</span>
      </div>
      <!--table-->
      <div class="tableList">
        <!--DCP打包结果-->
        <bale-default v-show="activeIndex == 0"/>
        <!--DCP文件信息-->
        <file-information v-show="activeIndex == 1" :infoData="infoData"/>
      </div>
    </div>
  </div>
</template>

<script>
  import baleDefault from './baleDefault'
  import fileInformation from './fileInformation'
  import {
    getDCPTableDefault
  } from '@/api/dcp-api'

  export default {
    name: 'DCPDetailsWin',
    data() {
      return {
        infoData: null,
        navList: ['DCP打包结果', 'DCP文件信息'],
        activeIndex: 0
      }
    },
    methods: {
      //
      shutWin() {
        this.$emit('shutMe')
        this.reset()
      },
      // 复位
      reset() {

      },
      // 获取数据
      async getData(taskUuid) {
        let {data} = await getDCPTableDefault(taskUuid)
        if(data.code == 200) this.infoData = data.data
      }
    },
    components: {
      baleDefault,
      fileInformation
    }
  }
</script>

<style lang="less">
  .fileInfo,
  .bale-default {
    background-color: rgba(255, 255, 255, 1);
    height: 100%;
    border-radius: 8px;
  }
</style>

<style lang="less" scoped>
  .details {
    height: calc(100vh - 73px);
    width: 904px;
    background-color: rgba(241, 244, 249, 1);
    box-shadow: 0px 1px 20px 0px rgba(22, 29, 37, 0.3);
    padding: 15px;
    box-sizing: border-box;

    .shutWin {
      position: absolute;
      right: 15px;
      z-index: 2;
      cursor: pointer;
      margin-right: 4px;
    }

    .tableGroup {
      height: 100%;
    }
    .tableList {
      height: calc(100% - 42px);
    }
  }
</style>
