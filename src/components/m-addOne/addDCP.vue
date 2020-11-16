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
                         @click="deleteTemplateF(index)"
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
                         @click="deleteTemplateF(index)"
                         class="item-icon">
                  </span>
                </span>
              </div>
              <div class="bodyB">
                <span
                  class="software">{{ dialogAdd.normL }}： {{ dialogAdd['normList'][item.codingRule]['label'] }}</span>
                <span class="software">{{ dialogAdd.internetSL }}： {{ item.codingRate }}Mb/s</span>
                <span
                  class="software">{{ dialogAdd.speedL }}： {{ dialogAdd['speedList'][item.frameRate]['label'] }}</span>
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
            <!--DCP文件名-->
            <div class="fileItem item">
              <label>{{ setUnpackBase.label.fileName }}：</label>
              <span class="farm-span">
                <!--影片名称-->
                <span>{{ setUnpackBase.form.fileName }}</span>_
                <!--影片类型-类型版本-->
                <span>{{ setUnpackBase.form.movieType }}-{{ setUnpackBase.form.version }}</span>_
                <!--声音语言-字幕语言-OCAP/CCAP-->
                <span>{{ setUnpackBase.form.mp3Language }}-{{ setUnpackBase.form.textLanguage }}-{{ setUnpackBase.form.AP }}</span>_
                <!--地区-分区-->
                <span>{{ setUnpackBase.form.area }}-{{ setUnpackBase.form.area }}</span>_
                <!--声道类型-补充声道-->
                <span>{{ setUnpackBase.form.mp3Type }}-{{ setUnpackBase.form.fileName }}</span>_
                <!--分辨率-->
                <span>{{ setUnpackBase.form.resolution }}</span>_
                <!--出品方-->
                <span>{{ setUnpackBase.form.producer }}</span>_
                <!--打包日期-->
                <span>{{ setUnpackBase.form.date }}</span>_
                <!--制作方-->
                <span>{{ setUnpackBase.form.made }}</span>_
                <!--2D/3D-->
                <span>{{ setUnpackBase.form.mode }}</span>_
                <!--DCP类型-->
                <span>{{ setUnpackBase.form.DCPType }}</span>
              </span>
              <div class="btn" @click="setFileNameDialog.visible = true">
                <span>{{ $t('public.set') }}</span>
              </div>
            </div>
            <!--所属项目-->
            <div class="fileItem item">
              <label class="farm-label">{{ setUnpackBase.label.project }}：</label>
              <el-select v-model="setUnpackBase.form.project"
                         class="farm-input farm-select">
                <el-option
                  v-for="(item,index) in setUnpackBase.projectList"
                  :key="index"
                  :label="item.label"
                  :value="item.val">
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
              <input type="text" :placeholder="setUnpackBase.pl.movieName" v-model="setUnpackBase.form.movieName">
            </div>
            <!--影片类型-->
            <div class="fileItem item">
              <label class="farm-label">{{ setUnpackBase.label.movieType }}：</label>
              <el-select v-model="setUnpackBase.form.movieType"
                         class="farm-input farm-select">
                <el-option
                  v-for="(item,index) in setUnpackBase.movieTypeList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!--宽高比-->
            <div class="fileItem item">
              <label class="farm-label">{{ setUnpackBase.label.proportion }}：</label>
              <el-select v-model="setUnpackBase.form.proportion"
                         class="farm-input farm-select">
                <el-option
                  v-for="(item,index) in setUnpackBase.proportionList"
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
                  v-for="(item,index) in setUnpackBase.resolutionList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!--源色彩-->
            <div class="fileItem item">
              <label class="farm-label">{{ setUnpackBase.label.colorType }}：</label>
              <el-select v-model="setUnpackBase.form.colorType"
                         class="farm-input farm-select">
                <el-option
                  v-for="(item,index) in setUnpackBase.colorTypeList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!--2D/3D-->
            <div class="fileItem item">
              <label class="farm-label">{{ setUnpackBase.label.mode }}：</label>
              <el-select v-model="setUnpackBase.form.mode"
                         class="farm-input farm-select">
                <el-option
                  v-for="(item,index) in setUnpackBase.modeList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!--声道类型-->
            <div class="fileItem item">
              <label class="farm-label">{{ setUnpackBase.label.channelType }}：</label>
              <el-select v-model="setUnpackBase.form.channelType"
                         class="farm-input farm-select">
                <el-option
                  v-for="(item,index) in setUnpackBase.channelTypeList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="fileTitle">{{ setUnpackBase.directory[1] }}</div>
            <div class="radio el-radio-group">
              <el-radio v-model="setUnpackBase.form.missionMode"
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
            <div class="fileItem" v-for="(item,index) in selectFileBase.imgFileList" :key="'imgFile-' + index">
              <label>{{ item.label }}：</label>
              <input type="text" disabled v-model="item.localPath">
              <div class="btn" @click="selectFile(item)"><span>{{ $t('public.browse') }}</span></div>
            </div>
            <!--声音目录-->
            <div class="fileTitle">{{ selectFileBase.directory[1] }}</div>
            <div class="fileItem" v-for="(item,index) in selectFileBase.mp3FileList" :key="'mp3File-' + index">
              <label>{{ item.label }}：</label>
              <input type="text" disabled v-model="item.localPath">
              <div class="btn" @click="selectFile(item)"><span>{{ $t('public.browse') }}</span></div>
            </div>
            <!--字幕目录-->
            <div class="fileTitle">{{ selectFileBase.directory[2] }}</div>
            <div class="fileItem" v-for="(item,index) in selectFileBase.subtitleFileList"
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
        <!--启动插件-临时-->
        <div class="btnGroup-btn previous" @click="$store.commit('WEBSOCKET_PLUGIN_INIT', true)"><span>启动插件</span></div>
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
    <el-dialog
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
              v-for="(item,index) in dialogAdd.normList"
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
      top="8vh"
      :show-close=false
      :visible.sync="setFileNameDialog.visible"
      @close="closesetFileNameDialog"
      append-to-body>
      <setName @shutMe="setFileNameDialog.visible = false"/>
    </el-dialog>
    <!--新建项目-->
    <el-dialog
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
    messageFun,
    throwInfoFun
  } from '@/assets/common.js'
  import addProject from '@/components/public-module/add_project'
  import setName from './components/setDCPFileName'

  export default {
    name: 'addDCP',
    data() {
      return {
        title: '新建DCP打包',
        navL: [
          '选择打包模板',
          '设置打包参数',
          '选择文件目录'
        ],
        stepBtnActive: 2,           // 当前所在步骤 1.选择打包模板 2.设置打包参数 3.选择文件目录
        // 选择打包模板
        selectUnpackBase: {
          addMoreText: '添加模板',
          renderTListActive: null,   // 渲染模板默认选中项索引
          renderTList: [],           // 设置渲染模板 已存在记录
          checked: false            // 下次不再提示
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
            // DCPFileName: '0103S_FTR-2_F_EN-XX_INT_51_2K_NULL_20200801_NULL_SMPTE_OV',
            fileName: '0103S',    // 影片名称
            movieType: 0,         // 影片类型
            version: 4,           // 类型版本
            project: '任务一',
            taskName: '',
            movieName: '',
            proportion: 0,        // 宽高比
            mp3Language: '',      // 声音语言
            textLanguage: 'QMS',  // 字幕语言
            AP: '开放式字幕OCAP',   // OCAP/CCAP
            area: 'CN',           // 地区
            mp3Type: '版本1',      // 声道类型
            resolution: 0,        // 分辨率
            colorType: 0,         // 源色彩
            producer: '',         // 出品方
            date: '',             // 打包日期
            mode: 0,              // 2D/3D
            made: '中影',          // 制作方
            DCPType: 'OV',        // DCP类型
            channelType: 0,       // 声道类型
            missionMode: 0        // 任务模式
          },
          movieTypeList: [
            {
              label: '正片FTR（Feature）',
              value: 0
            },
            {
              label: '预告片TLR（Trailer）',
              value: 1
            },
            {
              label: '短版本预告片TSR（Teaser）',
              value: 2
            },
            {
              label: '分级RTG（Rating）',
              value: 3
            },
            {
              label: '政策相关POL（Policy）',
              value: 4
            },
            {
              label: '公告服务或公告PSA（Public Service Announcement）',
              value: 5
            },
            {
              label: '广告片ADV（Advertisement）',
              value: 6
            },
            {
              label: '短片SHR（Short）',
              value: 7
            },
            {
              label: '过度片XSN（Transitional）',
              value: 8
            },
            {
              label: '测试片TST（Test）',
              value: 9
            }
          ],   // 影片类型
          proportionList: [
            {
              label: '遮幅F（Flat   1.85：1）',
              value: 0
            },
            {
              label: '宽荧幕S（Sope   2.39：1）',
              value: 1
            },
            {
              label: '全画幅C（Full   1.90：1）',
              value: 2
            }
          ],  // 宽高比
          resolutionList: [
            {
              label: '2K（2048*1080）',
              value: 0
            },
            {
              label: '4K（4096*2160）',
              value: 1
            }
          ],  // 分辨率
          colorTypeList: [
            {
              label: 'REC 709',
              value: 0
            },
            {
              label: 'P3 DCI',
              value: 1
            },
            {
              label: 'REC 2020',
              value: 2
            }
          ],   // 源色彩
          modeList: [
            {
              label: '2D',
              value: 0
            },
            {
              label: '3D',
              value: 1
            }
          ],
          channelTypeList: [
            {
              label: '2.1立体音',
              value: 0
            },
            {
              label: '5.1立体音',
              value: 1
            },
            {
              label: '7.1立体音',
              value: 2
            }
          ],
          pl: {
            taskName: '请输入任务名称',
            movieName: '请输入影片名称'
          },
          createObject: '新建项目',
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
              label: '导入图像(左)',
              localPath: null,
              key: 'TX001',
              type: ['tif', 'tiff', 'dpx', 'openEXR'],
              networkPath: null
            },
            {
              label: '导入图像(右)',
              localPath: null,
              key: 'TX002',
              type: ['tif', 'tiff', 'dpx', 'openEXR'],
              networkPath: null
            }
          ],
          mp3FileList: [
            {
              label: '左声道',
              localPath: null,
              key: 'SY001',
              type: ['wav', 'pcm'],
              networkPath: null
            },
            {
              label: '右声道',
              localPath: null,
              key: 'SY002',
              type: ['wav', 'pcm'],
              networkPath: null
            },
            {
              label: '中置声道',
              localPath: null,
              key: 'SY003',
              type: ['wav', 'pcm'],
              networkPath: null
            },
            {
              label: '左环绕',
              localPath: null,
              key: 'SY004',
              type: ['wav', 'pcm'],
              networkPath: null
            },
            {
              label: '右环绕',
              localPath: null,
              key: 'SY005',
              type: ['wav', 'pcm'],
              networkPath: null
            },
            {
              label: '左后环绕',
              localPath: null,
              key: 'SY006',
              type: ['wav', 'pcm'],
              networkPath: null
            },
            {
              label: '右后环绕',
              localPath: null,
              key: 'SY007',
              type: ['wav', 'pcm'],
              networkPath: null
            },
            {
              label: '低音炮',
              localPath: null,
              key: 'SY008',
              type: ['wav', 'pcm'],
              networkPath: null
            }
          ],
          subtitleFileList: [
            {
              label: '导入字幕',
              localPath: null,
              key: 'ZM001',
              type: ['png', 'txt'],
              networkPath: null
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
          normList: [
            {
              label: 'SMPTE',
              val: 0
            },
            {
              label: 'Interop',
              val: 1
            }
          ],
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
          }
        },
        immediate: true
      },
      'dialogAdd.visible': function (boolean) {
        if (!boolean) this.resetdialogAdd()
      }
    },
    methods: {
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
      // 1.选择打包模板 - 关闭添加or编辑模板窗口 创建模板
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
        if (data.code == 200) {
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
        let {data} = await getTemplateList(),
          {selectUnpackBase} = this
        selectUnpackBase.renderTList = data.data
        selectUnpackBase.renderTListActive = data.data.findIndex(curr => curr.isDefault == 1)
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
      deleteTemplateF(index) {
        this.$confirm('删除后将无法找回，确认删除当前模板吗？', '提示信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false
        })
          .then(() => {
            deleteTemplate(this.selectUnpackBase.renderTList[index]['renderTemplate']['templateUuid'])
              .then(data => {
                this.getList()
                messageFun('success', '删除成功')
              })
          })
          .catch(() => messageFun('info', '已取消删除'))
      },
      // 1.选择打包模板 - 关闭【新建/编辑模板窗口】数据初始化
      closeAddTemplateDialog() {
        let {dialogAdd} = this
        dialogAdd.form = {
          name: null,
          normV: null,
          speed: null,
          internetS: 250
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
        // let {data}  =await createNewDCP({
        //   'taskName': '',                  // 任务名
        //   'packageName': '',               // dcp文件名
        //   'projectUuid': '',               // 项目uuid
        //   'filmName': '',                  // 影片名称
        //   'filmCategory': '',              // 影片类型
        //   'filmVersion': '',               // 类型版本
        //   'aspectRatio': '',               // 宽高比
        //   'resolution': '',                // 分辨率
        //   'filmType': '',                  // 2d/3d 1:2d, 2:3d
        //   'sourceColor': '',               // 源色彩
        //   'soundLanguage': '',             // 声音语言
        //   'captionLanguage': '',           // 字幕语言
        //   'soundtrack': '',                // 声道类型
        //   'captionType': '',               // 字幕类型
        //   'region': '',                    // 地区
        //   'packageType': '',               // DCP类型
        //   'presenter': '',                 // 出品方
        //   'productor': '',                 // 制作方
        //   'packageDate': '',               // 打包日期
        //   'patternUuid': '',               // 打包模式uuid
        //   'packageTemplateUuid': '',       // 模板uuid
        //   'zoneUuid': '',                  // 分区uuid
        //   'operateSource': 1,              // 网页端: 1,客户端: 2
        //   'isEncrypt': '',                 // 是否加密 0不加密, 1加密
        //   'inputFileIndex': {              // 上传文件本地路径
        //     'image': '',                   // 图像
        //     'leftImage': '',               // 图像(左)
        //     'rightImage': '',              // 图像(右)
        //     'leftSound': '',               // 左声道
        //     'rightSound': '',              // 右声道
        //     'centerSound': '',             // 中置声道
        //     'leftRoundSound': '',          // 左环绕
        //     'rightRoundSound': '',         // 右环绕
        //     'leftBackRoundSound': '',      // 左后环绕
        //     'rightBackRoundSound': '',     // 右后环绕
        //     'subWoofer': '',               // 低音炮
        //     'subtitle': ''                 // 字幕文件
        //   }
        // })
        let {imgFileList, mp3FileList, subtitleFileList} = this.selectFileBase
        this.$store.commit('WEBSOCKET_PLUGIN_SEND', {
          code: 202,
          userID: '001',
          TaskUUid: '002',
          ID: '003',
          files: [
            ...imgFileList.map(item => {
              return {
                'localPath': item.localPath,
                'networkPath': {
                  'front': '/front',
                  'back': 'file/'
                },
                'type': item.type
              }
            }),
            ...mp3FileList.map(item => {
              return {
                'localPath': item.localPath,
                'networkPath': {
                  'front': '/front',
                  'back': item.localPath
                },
                'type': item.type
              }
            }),
            ...subtitleFileList.map(item => {
              return {
                'localPath': item.localPath,
                'networkPath': {
                  'front': '/front',
                  'back': item.localPath
                },
                'type': item.type
              }
            })
          ]
        })
      },
      // 3.选择文件
      selectFile(data) {
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
      this.getList()  // 1.选择打包模板 - 获取渲染模板列表
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
</style>
