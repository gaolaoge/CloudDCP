<template>
  <div class="addDCP">
    <header class="header">
      <span class="title">{{ title }}</span>
      <img src="@/icons/shutDialogIcon.png"
           @click="closeDialogFun"
           class="closeBtn">
    </header>
    <section class="stepGroup">
      <!--面包屑-->
      <div class="navL">
        <ul>
          <li class="li" :class="[{'active': index + 1 == stepBtnActive}]" v-for="(item,index) in navL" :key="index">
            <svg width="277" height="37" class="f svg" v-show="index == 0">
              <path d="M 0 0 H 259.5 L 277 18.5 L 259.5 37 H 0 Z" fill="rgba(27, 83, 244, 1)"/>
            </svg>
            <svg width="277" height="37" class="st svg" v-show="index != 0">
              <path d="M 0 0 H 259.5 L 277 18.5 L 259.5 37 H 0 L 18.5 18.5 Z" fill="rgba(27, 83, 244, 1)"/>
            </svg>
            <span class="i">{{ index + 1 }}</span>
            <span class="s">{{ item }}</span>
          </li>
        </ul>
      </div>
      <!--主体-->
      <div class="stepBody">
        <!--选择打包模板-->
        <div class="stepBody-item" v-show="stepBtnActive == 1">
          <div class="set-renderTemplate setScollBarStyle">
            <!--添加模板-->
            <div class="set-renderTemplate-item addMore"
                 @click="addOrEditTemplate('addMore','')">
              <img src="@/icons/addIcon.png"
                   class="addMoreIcon">
              <span class="addMoreText">{{ selectUnpackBase.addMoreText }}</span>
            </div>
            <!--已存在模板-->
            <div :class="[{'active': selectUnpackBase.renderTListActive == index},
                           'set-renderTemplate-item', 'ed']"
                 @click="selectUnpackBase.renderTListActive = index"
                 v-for="(item,index) in selectUnpackBase.renderTList"
                 :key="'template-' + index">
              <div class="headerB">
                <span class="headerText" :title="item.templateName">
                  {{ item.templateName }}
                </span>
                <span class="opacityBtnGroup">
                  <span v-show="selectUnpackBase.renderTListActive == index">
                    <!--编辑-->
                    <img src="@/icons/set-renderTemplate-item-edit.png"
                         @click.stop="addOrEditTemplate('editOne',index)"
                         class="item-icon">
                    <!--删除-->
                    <img src="@/icons/set-renderTemplate-item-delete.png"
                         @click="deleteTemplateF(item.templateUuid)"
                         class="item-icon">
                  </span>
                  <span v-show="selectUnpackBase.renderTListActive != index">
                    <!--编辑-->
                    <img src="@/icons/set-renderTemplate-item-edit-b.png"
                         alt=""
                         @click.stop="addOrEditTemplate('editOne',index)"
                         class="item-icon">
                    <!--删除-->
                    <img src="@/icons/set-renderTemplate-item-delete-b.png"
                         alt=""
                         @click="deleteTemplateF(item.templateUuid)"
                         class="item-icon">
                  </span>
                </span>
              </div>
              <div class="bodyB">
                <span class="software">
                  {{ dialogAdd.normL }}： {{ normList.find(curr => curr.val == item.codingRule)['label'] }}
                </span>
                <span class="software">{{ dialogAdd.internetSL }}： {{ item.codingRate }}Mb/s</span>
                <span class="software">
                  {{ dialogAdd.speedL }}： {{ dialogAdd['speedList'][item.frameRate]['label'] }}
                </span>
                <img src="@/icons/item-selected.png" class="item-selected">
              </div>
            </div>
          </div>
          <hr>
        </div>
        <!--设置打包参数-->
        <div class="stepBody-item" v-show="stepBtnActive == 2">
          <div class="wrapper-border setScollBarStyle form">
            <div class="fileTitle">{{ setUnpackBase.directory[0] }}</div>
            <div class="checkbox">
              <!--加密打包-->
              <el-checkbox v-model="setUnpackBase.form.isEncrypt"
                           :checked="true"
                           true-label=1
                           false-label=0>{{ setUnpackBase.encryptionL }}
              </el-checkbox>
            </div>
            <!--DCP文件名-->
            <div class="fileItem item">
              <label>{{ setUnpackBase.label.fileName }}：</label>
              <span class="farm-span" :title="packageName">{{ packageName }}</span>
              <div class="btn" @click="setFileNameDialog.visible = true">
                <span>{{ $t('public.set') }}</span>
              </div>
            </div>
            <!--所属项目-->
            <div class="fileItem item">
              <label class="farm-label">{{ setUnpackBase.label.project }}：</label>
              <el-select v-model="setUnpackBase.form.projectUuid"
                         class="farm-input farm-select">
                <el-option
                  v-for="(item,index) in projectList"
                  :key="index"
                  :label="item.projectName"
                  :value="item.projectUuid">
                </el-option>
              </el-select>
              <div class="btn" @click="addProjectDialog.visible = true"><span>{{ setUnpackBase.createObject }}</span>
              </div>
            </div>
            <!--任务名称-->
            <div class="fileItem">
              <label>{{ setUnpackBase.label.taskName }}：</label>
              <input type="text" :placeholder="setUnpackBase.pl.taskName" v-model="setUnpackBase.form.taskName">
            </div>
            <!--影片名称-->
            <div class="fileItem">
              <label>{{ setUnpackBase.label.movieName }}：</label>
              <input type="text" :placeholder="setUnpackBase.pl.movieName" v-model="setUnpackBase.form.filmName">
            </div>
            <!--影片类型-->
            <div class="fileItem item">
              <label class="farm-label">{{ setUnpackBase.label.movieType }}：</label>
              <el-select v-model="setUnpackBase.form.filmCategory"
                         class="farm-input farm-select">
                <el-option
                  v-for="(item,index) in movieTypeList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!--宽高比-->
            <div class="fileItem item">
              <label class="farm-label">{{ setUnpackBase.label.proportion }}：</label>
              <el-select v-model="setUnpackBase.form.aspectRatio"
                         class="farm-input farm-select">
                <el-option
                  v-for="(item,index) in proportionList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!--分辨率-->
            <div class="fileItem item">
              <label class="farm-label">{{ setUnpackBase.label.resolution }}：</label>
              <el-select v-model="setUnpackBase.form.resolution"
                         class="farm-input farm-select">
                <el-option
                  v-for="(item,index) in resolutionList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!--源色彩-->
            <div class="fileItem item">
              <label class="farm-label">{{ setUnpackBase.label.colorType }}：</label>
              <el-select v-model="setUnpackBase.form.sourceColor"
                         class="farm-input farm-select">
                <el-option
                  v-for="(item,index) in colorTypeList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!--2D/3D-->
            <div class="fileItem item">
              <label class="farm-label">{{ setUnpackBase.label.mode }}：</label>
              <el-select v-model="setUnpackBase.form.filmType"
                         :disabled="createType == 3"
                         class="farm-input farm-select">
                <el-option
                  v-for="(item,index) in modeList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!--声道类型-->
            <div class="fileItem item">
              <label class="farm-label">{{ setUnpackBase.label.channelType }}：</label>
              <el-select v-model="setUnpackBase.form.soundtrack"
                         :disabled="createType == 3"
                         class="farm-input farm-select">
                <el-option
                  v-for="(item,index) in channelTypeList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="fileTitle">{{ setUnpackBase.directory[1] }}</div>
            <div class="radio el-radio-group">
              <el-radio v-model="setUnpackBase.form.patternUuid"
                        v-for="item in setUnpackBase.modeRadioList"
                        :key="'mode-' + item.value"
                        :label="item.value">
                <span class="num">{{ item.number }}</span>
                <span class="type">【{{ item.type }}】</span>
              </el-radio>
            </div>
          </div>
        </div>
        <!--选择文件目录-->
        <div class="stepBody-item">
          <div class="wrapper-border setScollBarStyle">
            <!--图像目录-->
            <div class="fileTitle">{{ selectFileBase.directory[0] }}</div>
            <div class="fileItem"
                 v-show="setUnpackBase.form.filmType == 0 ? index == 0 : index != 0"
                 v-for="(item,index) in selectFileBase.imgFileList"
                 :key="'imgFile-' + index">
              <label>{{ item.label }}：</label>
              <input type="text" disabled v-model="item.localPath"
                     :class="[{'disabled': item.tag == 'image' && createType == 3}]">
              <div :class="[{'disabled': item.tag == 'image' && createType == 3}, 'btn']"
                   @click="selectFile(item, true)">
                <span>{{ $t('public.browse') }}</span>
              </div>
            </div>
            <!--声音目录-->
            <div class="fileTitle">{{ selectFileBase.directory[1] }}</div>
            <div class="fileItem"
                 v-show="showSoundInput(index)"
                 v-for="(item,index) in selectFileBase.mp3FileList"
                 :key="'mp3File-' + index">
              <label>{{ item.label }}：</label>
              <input type="text" disabled v-model="item.localPath">
              <div class="btn" @click="selectFile(item)"><span>{{ $t('public.browse') }}</span></div>
            </div>
            <!--字幕目录-->
            <div class="fileTitle">{{ selectFileBase.directory[2] }}</div>
            <div class="fileItem"
                 v-for="(item,index) in selectFileBase.subtitleFileList"
                 :key="'subtitleFile-' + index">
              <label>{{ item.label }}：</label>
              <input type="text" disabled v-model="item.localPath">
              <div class="btn" @click="selectFile(item)"><span>{{ $t('public.browse') }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--前进或后退按钮-->
    <div class="farm-btnGroup">
      <!--选择打包模板-->
      <div v-show="stepBtnActive == 1">
        <span class="checked"><el-checkbox v-model="selectUnpackBase.checked">下次不再提示</el-checkbox></span>
        <!--下一步-->
        <div :class="[{'cannotTrigger': selectUnpackBase.renderTListActive < 0}, 'btnGroup-btn', 'confirm']"
             @click="goToMode('next')">
          <span class="nextStep">{{ $t('public.nextStop') }}</span>
        </div>
      </div>
      <!--设置打包参数-->
      <div v-show="stepBtnActive == 2">
        <!--上一步-->
        <div class="btnGroup-btn previous" @click="stepBtnActive = 1">
          <span>{{ $t('public.previous') }}</span>
        </div>
        <!--下一步-->
        <div :class="[{'cannotTrigger': null}, 'btnGroup-btn', 'confirm']"
             @click="stepBtnActive = 3">
          <span>{{ $t('public.nextStop') }}</span>
        </div>
      </div>
      <!--选择文件目录-->
      <div v-show="stepBtnActive == 3">
        <!--上一步-->
        <div class="btnGroup-btn previous" @click="goToMode('previous')">
          <span>{{ $t('public.previous') }}</span>
        </div>
        <!--确定-->
        <div class="btnGroup-btn confirm" @click="confirmFun">
          <span>{{ $t('public.save') }}</span>
        </div>
      </div>
    </div>
    <!--添加模板-->
    <el-dialog top="0px"
               width="460px"
               :show-close=false
               :visible.sync="dialogAdd.visible"
               @close="closeAddTemplateDialog"
               append-to-body>
      <div class="dialog-header">
        <span class="title">{{ dialogAdd.title }}</span>
        <img src="@/icons/shutDialogIcon.png"
             @click="dialogAdd.visible = false"
             class="closeBtn">
      </div>
      <div class="dialog-body form">
        <!--模板名称-->
        <div class="item">
          <label for="templateName" class="farm-label">{{ dialogAdd.nameL }}</label>
          <input type="text"
                 id="templateName"
                 ref="templateName"
                 :class="[{'inputError': dialogAdd.format.name === false}, 'farm-input', 'farm-name-input']"
                 :placeholder="dialogAdd.placeholder"
                 @blur="nameVerif(false)"
                 @input="nameVerif(true)"
                 @focus="dialogAdd.format.name = null"
                 v-model="dialogAdd.form.templateName">
          <span class="warnInfo" v-show="dialogAdd.format.name === false">
            {{ dialogAdd.warnInfo.name }}
          </span>
        </div>
        <!--打包标准-->
        <div class="item mini">
          <label class="farm-label">{{ dialogAdd.normL }}</label>
          <el-select v-model="dialogAdd.form.codingRule"
                     class="farm-select">
            <el-option
              v-for="(item,index) in normList"
              :key="index"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </div>
        <!--码率-->
        <div class="item mini">
          <label class="farm-label">{{ dialogAdd.internetSL }}</label>
          <div class="box">
            <div>
              <el-slider :max="500" v-model="dialogAdd.form.codingRate"/>
            </div>
            <span>{{ dialogAdd.form.codingRate }} (MB/s)</span>
          </div>
        </div>
        <!--帧速率-->
        <div class="item mini">
          <label class="farm-label">{{ dialogAdd.speedL }}</label>
          <el-select v-model="dialogAdd.form.frameRate"
                     class="farm-select">
            <el-option
              v-for="(item,index) in dialogAdd.speedList"
              :key="index"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </div>
        <!--按钮-->
        <div class="farm-btnGroup">
          <div :class="[{'cannotTrigger': !dialogAdd.format.name},'no-margin', 'btnGroup-btn', 'confirm']"
               @click="createOrEditDCPT">
            <span>{{ $t('public.save') }}</span>
          </div>
          <div class="btnGroup-btn previous" @click="dialogAdd.visible = false">
            <span>{{ $t('public.cancel') }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--设置DCP参数-->
    <el-dialog
      width="860px"
      top="0px"
      :show-close=false
      :visible.sync="setFileNameDialog.visible"
      @close="closesetFileNameDialog"
      append-to-body>
      <setName @shutMe="shutSetNameDialog"
               :codingRule="selectUnpackBase.renderTList.length && selectUnpackBase.renderTListActive != -1 ? normList.find(item => item.val == selectUnpackBase.renderTList[selectUnpackBase.renderTListActive]['codingRule'])['label'] : null"/>
    </el-dialog>
    <!--新建项目-->
    <el-dialog
      top="0px"
      width="380px"
      :show-close=false
      :visible.sync="addProjectDialog.visible"
      :destroy-on-close="true"
      @close="closesetFileNameDialog"
      append-to-body>
      <div class="dialog-header">
        <span class="title">{{ addProjectDialog.title }}</span>
        <img src="@/icons/shutDialogIcon.png"
             @click="addProjectDialog.visible = false"
             class="closeBtn">
      </div>
      <div class="dialog-body">
        <addProject @cancelAdd="shutAddProjectDialog"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getTemplateList,            // 选择打包模板-获取模板
    deleteTemplate,             // 选择打包模板-删除模板
    existedTName,               // 选择打包模板-创建模板-判断模板名是否已存在
    createTemplate,             // 创建模板
    editTemplate,               // 编辑模板
    createNewDCP                // 创建DCP
  } from '@/api/addOne-api'
  import {
    mapState
  } from 'vuex'
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
    areaList,
    messageFun,
    throwInfoFun,
    normList,
    transformParameterS
  } from '@/assets/common'
  import addProject from '@/components/public-module/add_project'
  import setName from './components/setDCPFileName'

  export default {
    name: 'addDCP',
    data() {
      return {
        createType: 1,               // 新建1 拷贝2 农场选择3
        title: '新建DCP打包',
        navL: [
          '选择打包模板',
          '设置打包参数',
          '选择文件目录'
        ],
        stepBtnActive: 1,            // 当前所在步骤 1.选择打包模板 2.设置打包参数 3.选择文件目录
        // 选择打包模板
        selectUnpackBase: {
          addMoreText: '添加模板',
          renderTListActive: 0,      // 渲染模板默认选中项索引
          renderTList: [],           // 设置渲染模板 已存在记录
          checked: false             // 下次不再提示
        },
        // 设置打包参数
        setUnpackBase: {
          directory: ['DCP参数', '任务模式'],
          label: {
            fileName: 'DCP文件名',
            project: '所属项目',
            taskName: '任务名称',
            movieName: '影片名称',
            movieType: '影片类型',
            proportion: '宽高比',
            resolution: '分辨率',
            colorType: '源色彩',
            mode: '2D/3D',
            channelType: '声道类型'
          },
          form: {
            filmCategory: 0,         // 影片类型
            filmVersion: 0,          // 类型版本
            projectUuid: '',         // 所属项目Uuid
            taskName: '',            // 任务名称
            filmName: '',            // 影片名称
            aspectRatio: 0,          // 宽高比
            soundLanguage: 1,        // 声音语言
            captionLanguage: 1,      // 字幕语言
            captionType: 0,          // OCAP/CCAP
            region: 0,               // 地区
            resolution: 1,           // 分辨率
            sourceColor: 0,          // 源色彩
            presenter: '',           // 出品方
            packageDate: new Date(),    // 打包日期
            filmType: 0,             // 2D/3D
            productor: '',           // 制作方
            packageType: 0,          // DCP类型
            soundtrack: 0,           // 声道类型
            patternUuid: 0,          // 任务模式
            isEncrypt: 1
          },
          pl: {
            taskName: '请输入任务名称',
            movieName: '请输入影片名称'
          },
          createObject: '新建项目',
          encryptionL: '加密打包',
          modeRadioList: [
            {
              number: '10台',
              type: '普通模式',
              value: 0
            },
            {
              number: '20台',
              type: '加速模式',
              value: 1
            },
            {
              number: '50台',
              type: '极速模式',
              value: 2
            }
          ]
        },
        // 选择文件目录
        selectFileBase: {
          directory: ['图像目录', '声音目录', '字幕目录'],
          imgFileList: [
            {
              label: '导入图像',
              tag: 'image',
              localPath: null,    // 文件本地路径
              key: 'TX003',
              type: ['tif', 'tiff', 'dpx', 'openEXR']
            },
            {
              label: '导入图像(左)',
              tag: 'leftImage',
              localPath: null,
              key: 'TX001',
              type: ['tif', 'tiff', 'dpx', 'openEXR']
            },
            {
              label: '导入图像(右)',
              tag: 'rightImage',
              localPath: null,
              key: 'TX002',
              type: ['tif', 'tiff', 'dpx', 'openEXR']
            }
          ],
          mp3FileList: [
            {
              label: '左声道',
              tag: 'leftSound',
              localPath: null,
              key: 'SY001',
              type: ['wav', 'pcm']
            },
            {
              label: '右声道',
              tag: 'rightSound',
              localPath: null,
              key: 'SY002',
              type: ['wav', 'pcm']
            },
            {
              label: '中置声道',
              tag: 'centerSound',
              localPath: null,
              key: 'SY003',
              type: ['wav', 'pcm']
            },
            {
              label: '左环绕',
              tag: 'leftRoundSound',
              localPath: null,
              key: 'SY004',
              type: ['wav', 'pcm']
            },
            {
              label: '右环绕',
              tag: 'rightRoundSound',
              localPath: null,
              key: 'SY005',
              type: ['wav', 'pcm']
            },
            {
              label: '左后环绕',
              tag: 'leftBackRoundSound',
              localPath: null,
              key: 'SY006',
              type: ['wav', 'pcm']
            },
            {
              label: '右后环绕',
              tag: 'rightBackRoundSound',
              localPath: null,
              key: 'SY007',
              type: ['wav', 'pcm']
            },
            {
              label: '低音炮',
              tag: 'subWoofer',
              localPath: null,
              key: 'SY008',
              type: ['wav', 'pcm']
            }
          ],
          subtitleFileList: [
            {
              label: '导入字幕',
              tag: 'subtitle',
              localPath: null,
              key: 'ZM001',
              type: ['png', 'txt']
            }
          ]
        },
        // 添加/编辑模板窗口
        dialogAdd: {
          visible: false,
          title: '添加模板',
          placeholder: '输入模版名称',
          nameL: '模板名称',
          normL: '打包标准',
          internetSL: '码率',
          speedL: '帧速率',
          form: {
            'templateName': null,        // 模板名称
            'codingRule': 0,             // 打包标准
            'frameRate': 0,              // 帧速率
            'codingRate': 250,           // 码率
            'packageTemplateUuid': null
          },
          format: {
            name: false
          },
          warnInfo: {
            name: null
          },
          speedList: [
            {
              label: '24FPS',
              val: 0
            },
            {
              label: '48FPS',
              val: 1
            },
            {
              label: '60FPS',
              val: 2
            },
            {
              label: '72FPS',
              val: 3
            },
            {
              label: '96FPS',
              val: 4
            },
            {
              label: '120FPS',
              val: 5
            }
          ],
          editOrAdd: '',    // 【确定】标记编辑or新建
          index: null       // 编辑已存在模板时模板的索引
        },
        // 新建项目
        addProjectDialog: {
          visible: false,
          title: '新建项目'
        },
        // 设置DCP文件名
        setFileNameDialog: {
          visible: false
        }

      }
    },
    computed: {
      packageName() {
        let {filmName, filmCategory, filmVersion, packageDate, aspectRatio, soundLanguage, region, resolution, presenter, productor, filmType, packageType, soundtrack} = this.setUnpackBase.form
          , {dialogAdd, movieTypeList, proportionList, mp3LanguageList, areaList, resolutionList, modeList, DCPTypeList, channelTypeList} = this
          , {renderTList, renderTListActive} = this.selectUnpackBase
          , name = [
          filmName
          , movieTypeList ? movieTypeList[filmCategory]['tag'] + '-' + filmVersion : null
          , proportionList ? proportionList[aspectRatio]['tag'] : null
          , mp3LanguageList ? mp3LanguageList.find(curr => curr.val == soundLanguage)['label'].split(' ')[1] + '-' + '字幕语言-AP' : null
          , areaList.length ? areaList.find(curr => curr.val == region)['label'].split(' ')[1] : null
          , channelTypeList ? channelTypeList[soundtrack]['tag'] : null
          , resolutionList[resolution - 1]['tag']
          , presenter ? presenter : 'NULL'
          , packageDate.toLocaleDateString().split('/').join('')
          , productor ? productor : 'NULL'
          , renderTList.length && renderTListActive != -1 ? (normList.find(curr => curr.val == renderTList[renderTListActive]['codingRule'])['label'] + modeList ? modeList[filmType]['label'] : '') : null
          , DCPTypeList ? DCPTypeList[packageType]['tag'] : ''
        ]
        return name.join('_')
      },
      ...mapState(['zone', 'zoneUuid', 'user', 'socket_backS', 'socket_backS_msg', 'socket_plugin', 'socket_plugin_msg', 'projectList']),
    },
    watch: {
      'socket_backS_msg': {
        handler: function (e) {
          if (!e) return false
          let data = JSON.parse(e.data)
          if (data.code != 208) return false
        },
        immediate: true
      },
      'socket_plugin_msg': {
        handler: function (e) {
          if (!e) return false
          let data = JSON.parse(e.data)
          if (data.code == 201) {
            if (data.result == 0) {
              let fileType = data.key.slice(0, 2),
                team
              if (fileType == 'SY') team = this.selectFileBase.mp3FileList
              else if (fileType == 'TX') team = this.selectFileBase.imgFileList
              else if (fileType == 'ZM') team = this.selectFileBase.subtitleFileList
              else {
                throwInfoFun('获取插件返回值类型报错', 'm-addOne/addDCP-406', data)
                return false
              }
              let index = team.findIndex(curr => curr.key == data.key)
              team[index]['localPath'] = data.localPath
            }
          } else if (data.code == 202) {
            messageFun('success', '创建成功')
            this.closeDialogFun()
          }
        },
        immediate: true
      },
      'dialogAdd.visible': function (boolean) {
        if (!boolean) this.resetdialogAdd()
      },
      'stepBtnActive': function (step) {
        if (step == 3 && !this.socket_plugin)
          this.$store.commit('WEBSOCKET_PLUGIN_INIT', true)

      },
      'projectList': {
        handler: function (list) {
          if (!list.length) this.$store.dispatch('getProjectList')
          else this.setUnpackBase.form.projectUuid = list.find(item => item['isDefault'] == 1)['projectUuid']
        },
        immediate: true
      }
    },
    methods: {
      // 3.选择文件目录 - 显示上传文件选项
      showSoundInput(index) {
        let {soundtrack} = this.setUnpackBase.form
        switch (soundtrack) {
          case 0:
            if (index == 0 || index == 1 || index == 7) return true
            else return false
          case 1:
            if (index == 0 || index == 1 || index == 2 || index == 3 || index == 4 || index == 7) return true
            else return false
          case 2:
            return true
        }
      },
      // 2.设置打包参数 - 关闭【设置】
      shutSetNameDialog(obj) {
        if (obj) Object.assign(this.setUnpackBase.form, obj)
        this.setFileNameDialog.visible = false
      },
      // 1.选择打包模板 - 关闭添加or编辑模板窗口 数据复位
      resetdialogAdd() {
        let {form, format} = this.dialogAdd
        Object.assign(form, {
          name: null,
          normV: 0,
          speed: 0,
          internetS: 250
        })
        Object.assign(format, {
          name: false
        })
      },
      // 1.选择打包模板 - 关闭添加or编辑模板窗口 创建or确认编辑模板
      async createOrEditDCPT() {
        let {zoneUuid, dialogAdd} = this,
          {templateName, codingRule, frameRate, codingRate, packageTemplateUuid} = dialogAdd.form,
          {data} = dialogAdd.editOrAdd == 'addMore' ? await createTemplate({
            templateName,        // 模板名称
            codingRule,          // 打包标准
            frameRate,           // 帧速率
            codingRate,          // 码率
            zoneUuid
          }) : await editTemplate({
            templateName,        // 模板名称
            codingRule,          // 打包标准
            frameRate,           // 帧速率
            codingRate,          // 码率
            packageTemplateUuid
          })
        if (data.code == 201) {
          messageFun('success', '操作成功！')
          this.getList()
          this.dialogAdd.visible = false
        }
      },
      // 1.关闭新建项目窗口
      shutAddProjectDialog(status) {
        this.addProjectDialog.visible = false
        if (status) this.getList()
      },
      // 1.选择打包模板 - 添加模板 - 检验模板名格式
      async nameVerif(ing) {
        let {form, format, warnInfo} = this.dialogAdd
        if (!form.templateName || !form.templateName.trim() || (form.templateName.trim().length > 50 && ing)) format.name = null
        else if (!form.templateName.trim() && !ing) format.name = false
        else if (form.templateName.trim().length > 50) {
          warnInfo.name = '最多输入50个字符'
          format.name = false
        } else {
          let {data} = await existedTName(form.templateName.trim())
          if (data.code == 101) {
            warnInfo.name = '模板名称已存在，请重新输入'
            format.name = false
          } else format.name = true
        }
      },
      // 0.设置渲染文件 - 下一步
      goToMode(dire) {
        if (dire == 'previous') this.stepBtnActive = 2
        else if (this.selectUnpackBase.renderTListActive < 0) messageFun('info', '尚未选择模板')// 我的资产
        else this.stepBtnActive = 2
      },
      // 0.关闭窗口
      closeDialogFun() {
        this.$emit('closeDialogFun', 'createDCPDialog')
        this.reset()
      },
      // 1.选择打包模板 - 获取渲染模板列表
      async getList() {
        let {data} = await getTemplateList(this.zoneUuid),
          {selectUnpackBase} = this
        selectUnpackBase.renderTList = data.data
        if (data.data.length) selectUnpackBase.renderTListActive = data.data.findIndex(curr => curr.isDefault == 1)
      },
      // 1.选择打包模板 - 新建/编辑 - 打开【新建模板】
      async addOrEditTemplate(type, index) {
        // 打开弹窗
        let {dialogAdd} = this,
          {form, format} = this.dialogAdd
        dialogAdd.visible = true
        this.$nextTick(() => {
          this.$refs.templateName.focus()
          if (type == 'editOne') format.name = true
        })
        dialogAdd.editOrAdd = type
        if (type == 'editOne') {
          let {templateName, codingRule, frameRate, codingRate, packageTemplateUuid} = this.selectUnpackBase.renderTList[index]
          // 赋值
          Object.assign(form, {
            templateName,
            codingRule,
            frameRate,
            codingRate,
            packageTemplateUuid
          })
        }
      },
      // 1.选择打包模板 - 删除模板
      deleteTemplateF(templateUuid) {
        this.$confirm('删除后将无法找回，确认删除当前模板吗？', '提示信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false
        })
          .then(() => {
            deleteTemplate(templateUuid)
              .then(data => {
                this.getList()
                messageFun('success', '删除成功')
              })
          })
      },
      // 1.选择打包模板 - 关闭【新建/编辑模板窗口】数据初始化
      closeAddTemplateDialog() {
        let {dialogAdd} = this
        dialogAdd.form = {
          'templateName': null,        // 模板名称
          'codingRule': 0,             // 打包标准
          'frameRate': 0,              // 帧速率
          'codingRate': 250,           // 码率
          'packageTemplateUuid': null
        }
        dialogAdd.format = {
          name: null
        }
        dialogAdd.editOrAdd = ''
        dialogAdd.index = null
      },
      // 0.数据复位
      reset() {

      },
      // 2.设置打包参数 - 关闭【设置DCP文件名】数据初始化
      closesetFileNameDialog() {

      },
      // 3.保存
      async confirmFun() {
        let {isEncrypt, patternUuid, captionType, packageDate, productor, presenter, packageType, region, soundtrack, captionLanguage, soundLanguage, sourceColor, taskName, projectUuid, filmName, filmCategory, filmVersion, aspectRatio, resolution, filmType} = this.setUnpackBase.form
          , {renderTList, renderTListActive, checked} = this.selectUnpackBase
          , {imgFileList, mp3FileList, subtitleFileList} = this.selectFileBase
          , {zoneUuid, user, packageName, createType} = this
          , {data} = await createNewDCP({
          createType,                // 新建1 拷贝2 农场选择3
          checked,                   // 记住模板选项
          taskName,                  // 任务名
          packageName,               // dcp文件名
          projectUuid,               // 项uuid
          filmName,                  // 影片名称
          filmCategory,              // 影片类型
          filmVersion,               // 类型版本
          aspectRatio,               // 宽高比
          resolution,                // 分辨率
          'filmType': filmType + 1,  // 2d/3d 1:2d, 2:3d
          sourceColor,               // 源色彩
          soundLanguage,             // 声音语言
          captionLanguage,           // 字幕语言
          soundtrack,                // 声道类型
          captionType,               // 字幕类型 AP
          region,                    // 地区
          packageType,               // DCP类型
          presenter,                 // 出品方
          productor,                 // 制作方
          'packageDate': packageDate.getTime(),               // 打包日期
          patternUuid,               // 打包模式uuid  【任务模式】
          'packageTemplateUuid': renderTList[renderTListActive]['templateUuid'],  // 模板uuid
          zoneUuid,                  // 分区uuid
          'operateSource': 1,        // 网页端: 1,客户端: 2
          isEncrypt,                 // 是否加密 0不加密, 1加密
          'inputFileIndex': {
            'image': imgFileList[0]['localPath'],                   // 图像
            'leftImage': imgFileList[1]['localPath'],               // 图像(左)
            'rightImage': imgFileList[2]['localPath'],              // 图像(右)
            'leftSound': mp3FileList[0]['localPath'],               // 左声道
            'rightSound': mp3FileList[1]['localPath'],              // 右声道
            'centerSound': mp3FileList[2]['localPath'],             // 中置声道
            'leftRoundSound': mp3FileList[3]['localPath'],          // 左环绕
            'rightRoundSound': mp3FileList[4]['localPath'],         // 右环绕
            'leftBackRoundSound': mp3FileList[5]['localPath'],      // 左后环绕
            'rightBackRoundSound': mp3FileList[6]['localPath'],     // 右后环绕
            'subWoofer': mp3FileList[7]['localPath'],               // 低音炮
            'subtitle': subtitleFileList[0]['localPath']            // 字幕文件
          }    // 上传文件本地路径
        })
        if (data.code != 200) {
          throwInfoFun('新建DCP失败（信息传递到JAVA报错）', 'm-addOne/addDCP-953', data.data)
          return false
        }
        let {pathPrefix} = data.data,
          list = createType == 3 ?  [
            ...mp3FileList.filter(item => item.localPath),
            ...subtitleFileList.filter(item => item.localPath)
          ] : [
            ...imgFileList.filter(item => item.localPath),
            ...mp3FileList.filter(item => item.localPath),
            ...subtitleFileList.filter(item => item.localPath)
          ]
        this.$store.commit('WEBSOCKET_PLUGIN_SEND', {
          code: 202,
          userID: user.id,
          TaskUUid: data.data.packageTaskUuid,
          taskName,
          ID: data.data.taskId,
          files: list.map(item => {
            return {
              'localPath': item.localPath,
              'networkPath': {
                'front': data.data[item.tag] ? pathPrefix : null,
                'back': data.data[item.tag]
              },
              'type': item.type
            }
          })
        })
      },
      // 3.选择文件
      selectFile(data, disabled) {
        if (disabled) return false
        let {localPath, key, type} = data
        this.$store.commit('WEBSOCKET_PLUGIN_SEND', {
          code: 201,
          localPath,
          key,
          type
        })
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
        areaList,
        normList
      })
      this.getList()  // 1.选择打包模板 - 获取渲染模板列表
      let obj = transformParameterS(window.location.search)
      if ('token' in obj) {
        // 从农场平台跳转至此
        // 选定为【2D】，【2.1立体音】不可修改
        // 已选中图像地址
        this.createType = 3
        this.selectFileBase.imgFileList[0]['localPath'] = obj.imagePath
      }
    },
    components: {
      addProject,
      setName
    }
  }
</script>

<style lang="less">
  .addDCP {
    user-select: none;
    height: 80vh;
    position: relative;

    .stepGroup {
      height: calc(100% - 35px - 20px - 72px);
      padding: 20px 30px 0px;

      .navL {
        ul {
          display: flex;
          flex-direction: row;
        }

        .li {
          position: relative;
          width: 277px;
          height: 37px;
          display: flex;
          align-items: center;
          padding-left: 45px;
          box-sizing: border-box;
          margin-right: -12px;
          opacity: 0.3;

          .svg {
            position: absolute;
            left: 0px;
          }

          .i {
            position: relative;
            width: 19px;
            height: 19px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 0px 3px rgba(255, 255, 255, 0.3);
            font-size: 14px;
            font-weight: 500;
            color: rgba(27, 83, 244, 1);
            text-align: center;
            margin-right: 8px;
          }

          .s {
            position: relative;
            font-size: 14px;
            font-family: SourceHanSansCN-Medium, SourceHanSansCN;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
          }

          &:nth-of-type(1) {
            padding-left: 20px;
          }

          &.active {
            opacity: 1;
          }
        }
      }

      .stepBody {
        margin-top: 20px;
        position: relative;
        background-color: rgba(255, 255, 255, 1);
        height: calc(100% - 57px);
        overflow: hidden;

        .stepBody-item {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: row;

          .fileTitle {
            font-size: 14px;
            font-weight: 600;
            color: rgba(22, 29, 37, 1);
            margin-left: 26px;
            margin-bottom: 15px;
          }

          /*设置渲染模板*/

          .set-renderTemplate {
            position: relative;
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            align-content: flex-start;
            justify-content: flex-start;
            flex-wrap: wrap;
            overflow-y: scroll;

            .set-renderTemplate-item {
              width: 180px;
              height: 150px;
              border-radius: 8px;
              overflow: hidden;
              margin: 0px 9px 30px 9px;
              cursor: pointer;

              &.addMore {
                width: 174px;
                height: 146px;
                border: 2px dashed rgba(22, 29, 37, 0.29);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                .addMoreIcon {
                  width: 30px;
                  margin-bottom: 12px;
                }

                .addMoreText {
                  font-size: 12px;
                  color: rgba(22, 29, 37, 0.3);
                }
              }

              &.ed {
                background-color: rgba(240, 240, 240, 1);

                .headerB {
                  height: 36px;
                  background-color: rgba(240, 240, 240, 1);
                  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.2);
                  padding: 0px 20px;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;

                  .headerText {
                    font-size: 13px;
                    line-height: 36px;
                    color: rgba(22, 29, 37, 0.8);
                    display: inline-block;
                    width: 94px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }

                  .opacityBtnGroup {
                    .item-icon {
                      margin-left: 8px;
                      width: 13px;
                      cursor: pointer;
                    }
                  }

                }

                .bodyB {
                  position: relative;
                  height: 114px;
                  padding: 17px;
                  box-sizing: border-box;

                  .hardware,
                  .software {
                    display: block;
                    font-size: 14px;
                    color: rgba(22, 29, 37, 0.6);
                    line-height: 20px;
                    margin-bottom: 3px;
                  }

                  .software,
                  .hardware {
                    font-weight: 600;
                  }

                  .item-selected {
                    display: none;
                    position: absolute;
                    bottom: 17px;
                    right: 17px;
                    width: 26px;
                  }
                }

                &:hover {
                  box-shadow: 0px 0px 2px 2px rgba(27, 83, 244, 0.5);
                }

                &.active {
                  .headerB {
                    background-color: rgba(5, 81, 206, 1);
                    box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.21);

                    .headerText {
                      color: rgba(255, 255, 255, 0.8);
                    }
                  }

                  .bodyB {
                    background-color: rgba(10, 98, 241, 0.59);

                    .hardware,
                    .software {
                      color: rgba(255, 255, 255, 1);
                    }

                    .item-selected {
                      display: inline-block;
                    }

                  }
                }
              }
            }
          }

          hr {
            position: absolute;
            bottom: 0px;
            width: calc(100% - 10px);
            height: 1px;
            background-color: rgba(255, 255, 255, 1);
            border: 0px;
            box-shadow: 0px 0px 100px 60px rgba(255, 255, 255, 1);
            opacity: 1;
          }

          .radio {
            margin-left: 26px;
            display: flex;
            justify-content: space-between;

            .num {

            }

            /deep/ .el-radio:nth-of-type(1) .type {
              color: rgba(27, 83, 244, 0.7);
            }

            /deep/ .el-radio:nth-of-type(2) .type {
              color: rgba(70, 203, 93, 0.7);
            }

            /deep/ .el-radio:nth-of-type(3) .type {
              color: rgba(255, 87, 74, 0.7);
            }

          }
        }
      }
    }
  }

  .dialog-body {
    padding: 30px;
    box-sizing: border-box;

    .box {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      & > div {
        flex-grow: 1;

        /deep/ .el-slider__runway {
          height: 4px;
        }

        /deep/ .el-slider__bar {
          background-color: rgba(27, 83, 244, 1);
          height: 4px;
        }

        /deep/ .el-slider__button {
          border: 4px solid rgba(27, 83, 244, 1);
          width: 8px;
          height: 8px;
        }

        /deep/ .el-slider__button-wrapper {
          top: -16px;
        }
      }

      span {
        text-align: right;
        width: 90px;
        font-size: 14px;
        flex-grow: 0;
      }
    }

    .farm-btnGroup {
      height: auto;
      margin-top: 22px;
    }
  }

  .farm-select input {
    border: 0px !important;
  }

  .checkbox {
    position: absolute;
    right: 20px;
    top: 14px;
  }

  .fileItem {
    input.disabled {
      background-color: #F5F7FA;
      color: #C0C4CC;
    }
  }
</style>
