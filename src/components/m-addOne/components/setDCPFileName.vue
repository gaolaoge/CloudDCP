<template>
  <div class="setName">
    <div class="dialog-header">
      <span class="title">{{ title }}</span>
      <img src="@/icons/shutDialogIcon.png"
           @click="shutMe"
           class="closeBtn">
    </div>
    <div class="dialog-body">
      <div class="wrapper-border form setFileNameForm setScollBarStyle">
        <!--DCP文件名-->
        <div class="item mini">
          <label class="farm-label">{{ label.fileName }}</label>
          <p class="farm-span no-font-size">
            <!--影片名称-->
            <span class="fns" style="color: #E02020">{{ form.filmName }}</span>
            <span class="fns">_</span>
            <!--影片类型-类型版本-->
            <span class="fns" style="color: #FA6400">
              {{ movieTypeList ? movieTypeList.find(curr => curr.value == form.filmCategory)['tag'] + '-' + versionList.find(curr => curr.val == form.filmVersion)['val'] : null }}
            </span>
            <span class="fns">_</span>
            <!--宽高比-->
            <span class="fns" style="color: #F7B500">
              {{ proportionList ? proportionList.find(curr => curr.value == form.aspectRatio)['tag'] : null }}
            </span>
            <span class="fns">_</span>
            <!--声音语言-字幕语言-->
            <span class="fns" style="color: #6DD400">
              {{ mp3LanguageList.length ? mp3LanguageList.find(curr => curr.val == form.soundLanguage)['label'].split(' ')[1] + '-' + (textLanguageList ? textLanguageList.find(curr => curr.val == form.captionLanguage)['val'] : null) + '-' + (APList ? APList.find(curr => curr.val == form.captionType)['tag'] : null) : null }}
            </span>
            <span class="fns">_</span>
            <!--地区-->
            <span class="fns" style="color: #44D7B6">
              {{ areaList ? areaList[form.region]['label'].split(' ')[1] : null }}
            </span>
            <span class="fns">_</span>
            <!--声道类型-补充声道-->
            <span class="fns" style="color: #0091FF">
              {{ channelTypeList ? channelTypeList.find(curr => curr.value == form.soundtrack)['tag'] : null }}
            </span>
            <span class="fns">_</span>
            <!--分辨率-->
            <span class="fns" style="color: #6236FF">
              {{ resolutionList ? resolutionList.find(curr => curr.value == form.resolution)['tag'] : null }}
            </span>
            <span class="fns">_</span>
            <!--出品单位-->
            <span class="fns" style="color: #A62727">
              {{ form.presenter || 'NULL' }}
            </span>
            <span class="fns">_</span>
            <!--打包日期-->
            <span class="fns" style="color: #C29170">
              {{ form.packageDate.toLocaleDateString().split('/').join('') }}
            </span>
            <span class="fns">_</span>
            <!--制作单位-->
            <span class="fns" style="color: #F7ED5C">
              {{ form.productor || 'NULL' }}
            </span>
            <span class="fns">_</span>
            <!--任务模板-打包标准-->
            <span class="fns" style="color: #29AD40">
              {{ codingRule + '-' + modeList.find(curr => curr.value == form.filmType)['label'] }}
            </span>
            <span class="fns">_</span>
            <!--DCP类型-->
            <span class="fns" style="color: #E5C78A">
              {{ DCPTypeList ? DCPTypeList.find(curr => curr.val == form.packageType)['tag'] : '' }}
            </span>
          </p>
        </div>
        <!--影片名称-->
        <div class="item mini">
          <label class="farm-label">{{ label.movieName }}</label>
          <input type="text"
                 :class="[{'inputError': null}, 'farm-input', 'farm-name-input']"
                 v-model="form.filmName">
        </div>
        <!--影片类型-->
        <div class="item mini">
          <label class="farm-label">{{ label.filmCategory }}</label>
          <el-select v-model="form.filmCategory"
                     class="farm-select">
            <el-option
              v-for="(item,index) in movieTypeList"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--类型版本-->
        <div class="item mini">
          <label class="farm-label">{{ label.version }}</label>
          <el-select v-model="form.filmVersion"
                     class="farm-select">
            <el-option
              v-for="(item,index) in versionList"
              :key="index"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </div>
        <!--宽高比-->
        <div class="item mini">
          <label class="farm-label">{{ label.aspectRatio }}</label>
          <el-select v-model="form.aspectRatio"
                     class="farm-select">
            <el-option
              v-for="(item,index) in proportionList"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--声音语言-->
        <div class="item mini">
          <label class="farm-label">{{ label.mp3Language }}</label>
          <el-select v-model="form.soundLanguage"
                     class="farm-select">
            <el-option
              v-for="(item,index) in mp3LanguageList"
              :key="'mp3Language-' + index"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </div>
        <!--字幕语言-->
        <div class="item mini">
          <label class="farm-label">{{ label.textLanguage }}</label>
          <el-select v-model="form.captionLanguage"
                     class="farm-select">
            <el-option
              v-for="(item,index) in textLanguageList"
              :key="index"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </div>
        <!--OCAP/CCAP-->
        <div class="item mini">
          <label class="farm-label">{{ label.AP }}</label>
          <el-select v-model="form.captionType"
                     class="farm-select">
            <el-option
              v-for="(item,index) in APList"
              :key="'APList-' + index"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </div>
        <!--地区-->
        <div class="item mini">
          <label class="farm-label">{{ label.area }}</label>
          <el-select v-model="form.region"
                     class="farm-select">
            <el-option
              v-for="(item,index) in areaList"
              :key="'area-' + index"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </div>
        <!--声道类型-->
        <div class="item mini">
          <label class="farm-label">{{ label.mp3Type }}</label>
          <el-select v-model="form.soundtrack"
                     class="farm-select">
            <el-option
              v-for="(item,index) in channelTypeList"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--分辨率-->
        <div class="item mini">
          <label class="farm-label">{{ label.resolution }}</label>
          <el-select v-model="form.resolution"
                     class="farm-select">
            <el-option
              v-for="(item,index) in resolutionList"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--出品方-->
        <div class="item mini">
          <label class="farm-label">{{ label.producer }}</label>
          <input type="text"
                 :class="['farm-input', 'farm-name-input']"
                 v-model="form.presenter">
        </div>
        <!--打包日期-->
        <div class="item mini">
          <label class="farm-label">{{ label.date }}</label>
          <el-date-picker
            v-model="form.packageDate"
            type="date"
            placeholder="选择日期"/>
        </div>
        <!--制作方-->
        <div class="item mini">
          <label class="farm-label">{{ label.made }}</label>
          <input type="text"
                 :class="[{'inputError': null}, 'farm-input', 'farm-name-input']"
                 v-model="form.productor">
        </div>
        <!--2D/3D-->
        <div class="item mini">
          <label class="farm-label">{{ label.type }}</label>
          <el-select v-model="form.filmType"
                     class="farm-select">
            <el-option
              v-for="(item,index) in modeList"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--DCP类型-->
        <div class="item mini">
          <label class="farm-label">{{ label.DCPType }}</label>
          <el-select v-model="form.packageType"
                     class="farm-select">
            <el-option
              v-for="(item,index) in DCPTypeList"
              :key="index"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </div>
        <!--按钮-->
        <div class="farm-btnGroup">
          <div class="btnGroup">
            <div class="btnGroup-btn previous" @click="shutMe">
              <span>{{ $t('public.cancel') }}</span>
            </div>
            <div class="btnGroup-btn confirm" @click="saveFun">
              <span>{{ $t('public.save') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
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
    areaList
  } from '@/assets/common.js'

  export default {
    name: 'setName',
    data() {
      return {
        title: '设置DCP文件名',
        label: {
          fileName: 'DCP文件名',
          movieName: '影片名称',
          filmCategory: '影片类型',
          version: '类型版本',
          aspectRatio: '宽高比',
          mp3Language: '声音语言',
          textLanguage: '字幕语言',
          AP: 'OCAP/CCAP',
          area: '地区',
          mp3Type: '声道类型',
          resolution: '分辨率',
          producer: '出品方',
          date: '打包日期',
          made: '制作方',
          type: '2D/3D',
          DCPType: 'DCP类型'
        },
        form: {
          filmName: '',          // 影片名称
          filmCategory: 0,       // 影片类型
          filmVersion: 0,        // 类型版本
          aspectRatio: 0,        // 宽高比
          soundLanguage: 1,      // 声音语言
          captionLanguage: 1,    // 字幕语言
          captionType: 0,        // OCAP/CCAP
          region: 0,             // 地区
          soundtrack: 0,         // 声道类型
          resolution: 1,         // 分辨率
          presenter: '',         // 出品方
          packageDate: new Date(),              // 打包日期
          productor: '',         // 制作方
          filmType: 1,               // 2D/3D
          packageType: 0         // DCP类型
        },
        movieTypeList: [],
        proportionList: [],
        resolutionList: [],
        colorTypeList: [],
        modeList: [],
        channelTypeList: [],
        APList: [],
        DCPTypeList: [],
        soundtrackList: [],
        versionList: [],
        mp3LanguageList: [],
        textLanguageList: [],
        areaList: []
      }
    },
    props: {
      codingRule: String,
      formData: Object
    },
    methods: {
      // 关闭
      shutMe() {
        this.$emit('shutMe', null)
      },
      // 保存
      saveFun() {
        this.$emit('shutMe', this.form)
      }
    },
    watch: {
      'formData': {
        handler(obj) {
          Object.assign(this.form, obj)
        },
        deep: true,
        immediate: true
      }
    },
    mounted() {
      Object.assign(this, {
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
        areaList
      })
    }
  }
</script>

<style lang="less" scoped>
  .setName {
    .setFileNameForm {
      margin: -10px 0px;
      overflow-y: scroll;
      height: 630px;

      .farm-label {
        width: 100px;
        text-align: right;
        margin-right: 60px;
      }
    }

    .btnGroup-btn:nth-of-type(2) {
      margin-right: 0px;
    }
  }

  /deep/ .el-input__inner {
    height: 40px;
    line-height: 40px;
  }

  .no-font-size {
    font-size: 0px !important;
  }

  .fns {
    font-size: 14px;
  }

</style>
