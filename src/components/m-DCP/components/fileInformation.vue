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
        <label>{{ taskNameL }}:</label>
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
    versionList,
    mp3LanguageList,
    textLanguageList,
    areaList,
    DCPmainStatusList,
    normList,
    speedList
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
    methods: {
      // 数据复位
      reset() {

      }
    },
    props: {
      infoData: Object
    },
    watch: {
      'infoData': function (data) {
        if (data) Object.assign(this, data, {
          'packageDate': createDateFun(data.packageDate),
          'codingRule': normList.find(item => item.val == data.codingRule)['label'],                 // 打包标准
          'resolution': resolutionList.find(curr => curr.value == data.resolution)['label'],
          'sourceColor': colorTypeList.find(curr => curr.value == data.sourceColor)['label'],
          'aspectRatio': proportionList.find(curr => curr.value == data.aspectRatio)['label'],
          'captionLanguage': textLanguageList.find(curr => curr.val == data.captionLanguage)['label'],
          'filmCategory': movieTypeList.find(curr => curr.value == data.filmCategory)['label'],
          'filmType': modeList.find(item => item.value == data.filmType)['label'],
          'soundtrack': channelTypeList.find(curr => curr.value == data.soundtrack)['label'],
          'captionType': APList.find(curr => curr.val == data.captionType)['label'],
          'taskStatus': DCPmainStatusList.find(item => item.code == data.taskStatus)['status'],
          'region': areaList.find(item => item.val == data.region)['label'],
          'frameRate': speedList.find(curr => curr.val == data.frameRate)['label'],
          // 'frameRate': data.frameRate + 'FPS',
          'codingRate': data.codingRate + 'Mb/s',
          'filmVersion': versionList.find(item => item.val == data.filmVersion)['label'],            // 类型版本
          'soundLanguage': mp3LanguageList.find(item => item.val == data.soundLanguage)['label'],    // 声音语言
          'packageType': DCPTypeList.find(item => item.val == data.packageType)['label'],            // DCP类型
          'createTime': createDateFun(data.createTime)                       // 创建时间
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
        versionList,
        mp3LanguageList,
        textLanguageList,
        areaList,
        DCPmainStatusList,
        normList,
        speedList
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
