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
      <!--所属项目-->
      <div class="infoItem">
        <label>{{ projectNameL }}:</label>
        <span>{{ projectName }}</span>
      </div>
      <!--影片名称-->
      <div class="infoItem">
        <label>{{ filmNameL }}:</label>
        <span>{{ filmName }}</span>
      </div>
      <!--打包标准-->
      <div class="infoItem">
        <label>{{ codingRuleL }}:</label>
        <span>{{ codingRule }}</span>
      </div>
      <!--内容类型-->
      <div class="infoItem">
        <label>{{ filmCategoryL }}:</label>
        <span>{{ filmCategory }}</span>
      </div>
      <!--类型版本-->
      <div class="infoItem">
        <label>{{ filmVersionL }}:</label>
        <span>{{ filmVersion }}</span>
      </div>
      <!--宽高比-->
      <div class="infoItem">
        <label>{{ aspectRatioL }}:</label>
        <span>{{ aspectRatio }}</span>
      </div>
      <!--分辨率-->
      <div class="infoItem">
        <label>{{ resolutionL }}:</label>
        <span>{{ resolution }}</span>
      </div>
      <!--2D/3D-->
      <div class="infoItem">
        <label>{{ filmTypeL }}:</label>
        <span>{{ filmType }}</span>
      </div>
      <!--源色彩-->
      <div class="infoItem">
        <label>{{ sourceColorL }}:</label>
        <span>{{ sourceColor }}</span>
      </div>
      <!--帧速率-->
      <div class="infoItem">
        <label>{{ frameRateL }}:</label>
        <span>{{ frameRate }}</span>
      </div>
      <!--码率-->
      <div class="infoItem">
        <label>{{ codingRateL }}:</label>
        <span>{{ codingRate }}</span>
      </div>
      <!--声音语言-->
      <div class="infoItem">
        <label>{{ soundLanguageL }}:</label>
        <span>{{ soundLanguage }}</span>
      </div>
      <!--字幕语言-->
      <div class="infoItem">
        <label>{{ captionLanguageL }}:</label>
        <span>{{ captionLanguage }}</span>
      </div>
      <!--声道类型-->
      <div class="infoItem">
        <label>{{ soundtrackL }}:</label>
        <span>{{ soundtrack }}</span>
      </div>
      <!--OCAP/CCAP-->
      <div class="infoItem">
        <label>{{ captionTypeL }}:</label>
        <span>{{ captionType }}</span>
      </div>
      <!--地区-->
      <div class="infoItem">
        <label>{{ regionL }}:</label>
        <span>{{ region }}</span>
      </div>
      <!--DCP类型-->
      <div class="infoItem">
        <label>{{ packageTypeL }}:</label>
        <span>{{ packageType }}</span>
      </div>
      <!--出品方-->
      <div class="infoItem">
        <label>{{ presenterL }}:</label>
        <span>{{ presenter }}</span>
      </div>
      <!--制作方-->
      <div class="infoItem">
        <label>{{ productorL }}:</label>
        <span>{{ productor }}</span>
      </div>
      <!--打包日期-->
      <div class="infoItem">
        <label>{{ packageDateL }}:</label>
        <span>{{ packageDate }}</span>
      </div>
      <!--任务模式-->
      <div class="infoItem">
        <label>{{ patternNameL }}:</label>
        <span>{{ patternName }}</span>
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
        projectNameL: '所属项目',
        projectName: '',
        filmNameL: '影片名称',
        filmName: null,
        codingRuleL: '打包标准',
        codingRule: null,
        filmCategoryL: '内容类型',
        filmCategory: null,
        filmVersionL: '类型版本',
        filmVersion: null,
        aspectRatioL: '宽高比',
        aspectRatio: null,
        resolutionL: '分辨率',
        resolution: null,
        filmTypeL: '2D/3D',
        filmType: null,
        sourceColorL: '源色彩',
        sourceColor: null,
        frameRateL: '帧速率',
        frameRate: null,
        codingRateL: '码率',
        codingRate: null,
        soundLanguageL: '声音语言',
        soundLanguage: null,
        captionLanguageL: '字幕语言',
        captionLanguage: null,
        soundtrackL: '声道类型',
        soundtrack: null,
        captionTypeL: 'OCAP/CCAP',
        captionType: null,
        regionL: '地区',
        region: null,
        packageTypeL: 'DCP类型',
        packageType: null,
        presenterL: '出品方',
        presenter: null,
        productorL: '制作方',
        productor: null,
        packageDateL: '打包日期',
        packageDate: null,
        patternNameL: '任务模式',
        patternName: null,
        createNameL: '创建人',
        createName: null,
        createTimeL: '创建时间',
        createTime: null
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
