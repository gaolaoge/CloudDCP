<template>
  <div class="fileInfo">
    <div class="list wrapper-border">
      <!--任务ID-->
      <div class="infoItem">
        <label>{{ taskIdL }}:</label>
        <span>{{ taskId }}</span>
      </div>
      <!--任务名称-->
      <div class="infoItem">
        <label>{{ taskStatusL }}:</label>
        <span>{{ taskName }}</span>
      </div>
      <!--状态-->
      <div class="infoItem">
        <label>{{ taskStatusL }}:</label>
        <span>{{ taskStatus }}</span>
      </div>
      <!--KDM个数-->
      <div class="infoItem">
        <label>{{ kdmCountL }}:</label>
        <span>{{ kdmCount }}</span>
      </div>
      <!--影片名称-->
      <div class="infoItem">
        <label>{{ filmNameL }}:</label>
        <span>{{ filmName }}</span>
      </div>
      <!--所属项目-->
      <div class="infoItem">
        <label>{{ projectNameL }}:</label>
        <span>{{ projectName }}</span>
      </div>
      <!--影院时区-->
      <div class="infoItem">
        <label>{{ theatreTimeZoneL }}:</label>
        <span>{{ theatreTimeZone }}</span>
      </div>
      <!--制作日期-->
      <div class="infoItem">
        <label>{{ kdmCreateDateL }}:</label>
        <span>{{ kdmCreateDate }}</span>
      </div>
      <!--播放起始时间-->
      <div class="infoItem">
        <label>{{ movieStartTimeL }}:</label>
        <span>{{ movieStartTime }}</span>
      </div>
      <!--播放结束时间-->
      <div class="infoItem">
        <label>{{ movieEndTimeL }}:</label>
        <span>{{ movieEndTime }}</span>
      </div>
      <!--创建人-->
      <div class="infoItem">
        <label>{{ createNameL }}:</label>
        <span>{{ createName }}</span>
      </div>
      <!--创建时间-->
      <div class="infoItem">
        <label>{{ createTimeL }}:</label>
        <span>{{ createTime }}</span>
      </div>
      <!--文件名格式-->
      <div class="infoItem">
        <label>{{ fileNameTemplateL }}:</label>
        <span>{{ fileNameTemplate }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    createDateFun,
    movieTypeList,
    proportionList,
    resolutionList,
    colorTypeList,
    modeList,
    channelTypeList,
    APList,
    DCPTypeList,
    soundtrackList,
    versionList,
    mp3LanguageList,
    textLanguageList,
    areaList,
    DCPmainStatusList
  } from '@/assets/common'
  export default {
    name: 'fileInfo',
    data() {
      return {
        taskUuid: null,
        taskIdL: '任务ID',
        taskId: null,
        taskNameL: '任务名称',
        taskName: null,
        taskStatusL: '状态',
        taskStatus: null,
        kdmCountL: 'KDM个数',
        kdmCount: null,
        projectNameL: '所属项目',
        projectName: '',
        filmNameL: '影片名称',
        filmName: null,
        createNameL: '创建人',
        createName: null,
        createTimeL: '创建时间',
        createTime: null,
        theatreTimeZoneL: '影院时区',
        theatreTimeZone: '',
        kdmCreateDateL: '制作日期',
        kdmCreateDate: '',
        movieStartTimeL: '播放起始时间',
        movieStartTime: '',
        movieEndTimeL: '播放结束时间',
        movieEndTime: '',
        fileNameTemplateL: '文件名格式',
        fileNameTemplate: '',

      }
    },
    methods: {},
    props: {
      infoData: Object
    },
    watch: {
      'infoData': function(data) {
        if(data) Object.assign(this, data, {
          'packageDate': createDateFun(data.packageDate),
          // 'codingRule': ,
          'resolution': resolutionList[data.resolution]['label'],
          'sourceColor': colorTypeList[data.sourceColor]['label'],
          'aspectRatio': proportionList[data.aspectRatio]['label'],
          'captionLanguage': textLanguageList[data.captionLanguage]['label'],
          'filmCategory': movieTypeList[data.filmCategory]['label'],
          'filmType': modeList[data.filmType]['label'],
          'soundtrack': channelTypeList[data.soundtrack]['label'],
          'captionType': APList[data.captionType]['label'],
          'taskStatus': DCPmainStatusList.find(item => item.code == data.taskStatus)['status'],
          'region': areaList[data.region]['label'],
          'frameRate': data.frameRate + 'fps',
          'codingRate': data.codingRate + 'Mb/s'
        })
      }
    },
    mounted() {
      this.$nextTick(() => Object.assign(this, {
        movieTypeList,
        proportionList,
        resolutionList,
        colorTypeList,
        modeList,
        channelTypeList,
        APList,
        DCPTypeList,
        soundtrackList,
        versionList,
        mp3LanguageList,
        textLanguageList,
        areaList,
        DCPmainStatusList
      }))
    }
  }
</script>

<style lang="less" scoped>
  .fileInfo {
    padding: 20px;
    box-sizing: border-box;

    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: flex-start;
      overflow: hidden;
      height: 100%;

      .infoItem {
        width: 50%;
        display: flex;
        margin-bottom: 12px;

        label {
          width: 50%;
          font-size: 14px;
          color: rgba(22, 29, 37, 0.6);
          margin-right: 12px;
          text-align: right;
        }

        span {
          width: 50%;
          font-size: 14px;
          color: rgba(22, 29, 37, 1);
        }
      }
    }
  }
</style>
