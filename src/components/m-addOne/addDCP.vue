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
                 @click="addTemplate('addMore','')">
              <img src="@/icons/addIcon.png"
                   class="addMoreIcon">
              <span class="addMoreText">{{ selectUnpackBase.addMoreText }}</span>
            </div>
            <!--已存在模板-->
            <div :class="[{'active': selectUnpackBase.renderListActive == index},
                           'set-renderTemplate-item', 'ed']"
                 @click="selectUnpackBase.renderListActive = index"
                 v-for="(item,index) in selectUnpackBase.renderList"
                 :key="'template-' + index">
              <div class="headerB">
                <span class="headerText" :title="item.renderTemplate.templateName">
                  {{ item.renderTemplate.templateName }}
                </span>
                <span class="opacityBtnGroup">
                  <span v-show="selectUnpackBase.renderListActive == index">
                    <!--编辑-->
                    <img src="@/icons/set-renderTemplate-item-edit.png"
                         @click.stop="addTemplate('editOne',index)"
                         class="item-icon">
                    <!--删除-->
                    <img src="@/icons/set-renderTemplate-item-delete.png"
                         @click="deleteTemplate(index)"
                         class="item-icon">
                  </span>
                  <span v-show="selectUnpackBase.renderListActive != index">
                    <!--编辑-->
                    <img src="@/icons/set-renderTemplate-item-edit-b.png"
                         alt=""
                         @click.stop="addTemplate('editOne',index)"
                         class="item-icon">
                    <!--删除-->
                    <img src="@/icons/set-renderTemplate-item-delete-b.png"
                         alt=""
                         @click="deleteTemplate(index)"
                         class="item-icon">
                  </span>
                </span>
              </div>
              <div class="bodyB">
                <span class="software">
                  {{ item.renderTemplate.softName }} - {{ item.renderTemplate.softVer }}
                </span>
                <span class="plugin" v-for="(plugin,index) in item.xxlPlugins" :key="index" v-show="index < 2">
                  {{ plugin.pluginName }} - {{ plugin.version }},
                </span>
                <span class="plugin" v-show="item.xxlPlugins.length > 2">...</span>
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
            <div class="fileItem">
              <label>{{ setUnpackBase.label.fileName }}：</label>
              <input type="text" disabled v-model="setUnpackBase.form.fileName">
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
              <div class="btn" @click="selectFile(item)"><span>{{ setUnpackBase.createObject }}</span></div>
            </div>
            <!--任务名称-->
            <div class="fileItem">
              <label>{{ setUnpackBase.label.taskName }}：</label>
              <input type="text" :placeholder="setUnpackBase.pl.taskName" v-model="setUnpackBase.form.taskName">
            </div>
            <!--影片名称-->
            <div class="fileItem">
              <label>{{ setUnpackBase.label.moiveName }}：</label>
              <input type="text" :placeholder="setUnpackBase.pl.moiveName" v-model="setUnpackBase.form.moiveName">
            </div>
            <!--影片类型-->
            <div class="fileItem item">
              <label class="farm-label">{{ setUnpackBase.label.moiveType }}：</label>
              <el-select v-model="setUnpackBase.form.moiveType"
                         class="farm-input farm-select">
                <el-option
                  v-for="(item,index) in setUnpackBase.moiveTypeList"
                  :key="index"
                  :label="item.label"
                  :value="item.val">
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
                  :value="item.val">
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
                  :value="item.val">
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
                  :value="item.val">
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
                  :value="item.val">
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
                  :value="item.val">
                </el-option>
              </el-select>
            </div>
            <div class="fileTitle">{{ setUnpackBase.directory[1] }}</div>
            <div class="radio el-radio-group">
              <el-radio v-model="setUnpackBase.mode"
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
    <div class="btnGroup">
      <!--选择打包模板-->
      <div v-show="stepBtnActive == 1">
        <span class="checked"><el-checkbox v-model="selectUnpackBase.checked">下次不再提示</el-checkbox></span>
        <!--下一步-->
        <div :class="[{'cannotTrigger': selectUnpackBase.renderListActive < 0}, 'btnGroup-btn', 'confirm']"
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
        <div class="item mini">
          <label for="templateName" class="farm-label">{{ dialogAdd.nameL }}</label>
          <input type="text"
                 id="templateName"
                 ref="templateName"
                 :class="[{'inputError': null}, 'farm-input', 'farm-name-input']"
                 :placeholder="dialogAdd.placeholder"
                 @blur="nameVerif(false)"
                 @input="nameVerif(true)"
                 @focus="dialogAdd.format.name = null"
                 v-model="dialogAdd.form.name">
        </div>
        <!--打包标准-->
        <div class="item mini">
          <label class="farm-label">{{ dialogAdd.normL }}</label>
          <el-select v-model="dialogAdd.form.normV"
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
              <el-slider :max="500" v-model="dialogAdd.form.internetS"/>
            </div>
            <span>{{ dialogAdd.form.internetS }} (MB/s)</span>
          </div>
        </div>
        <!--帧速率-->
        <div class="item mini">
          <label class="farm-label">{{ dialogAdd.speedL }}</label>
          <el-select v-model="dialogAdd.form.speed"
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
        <div class="btnGroup">
          <div :class="[{'disable-self': null}, 'btnGroup-btn', 'confirm']">
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
      <div class="dialog-header">
        <span class="title">{{ setFileNameDialog.title }}</span>
        <img src="@/icons/shutDialogIcon.png"
             @click="setFileNameDialog.visible = false"
             class="closeBtn">
      </div>
      <div class="dialog-body">
        <div class="wrapper-border form setFileNameForm setScollBarStyle">
          <!--DCP文件名-->
          <div class="item mini">
            <label class="farm-label">{{ setFileNameDialog.label.fileName }}</label>
            <input type="text"
                   :class="['farm-input', 'farm-name-input']"
                   v-model="setFileNameDialog.form.fileName">
          </div>
          <!--影片名称-->
          <div class="item mini">
            <label class="farm-label">{{ setFileNameDialog.label.movieName }}</label>
            <input type="text"
                   :class="[{'inputError': null}, 'farm-input', 'farm-name-input']"
                   v-model="setFileNameDialog.form.movieName">
          </div>
          <!--影片类型-->
          <div class="item mini">
            <label class="farm-label">{{ setFileNameDialog.label.movieType }}</label>
            <el-select v-model="setFileNameDialog.form.movieType"
                       class="farm-select">
              <el-option
                v-for="(item,index) in setFileNameDialog.movieTypeList"
                :key="index"
                :label="item.label"
                :value="item.val">
              </el-option>
            </el-select>
          </div>
          <!--类型版本-->
          <div class="item mini">
            <label class="farm-label">{{ setFileNameDialog.label.version }}</label>
            <el-select v-model="setFileNameDialog.form.version"
                       class="farm-select">
              <el-option
                v-for="(item,index) in setFileNameDialog.versionList"
                :key="index"
                :label="item.label"
                :value="item.val">
              </el-option>
            </el-select>
          </div>
          <!--宽高比-->
          <div class="item mini">
            <label class="farm-label">{{ setFileNameDialog.label.proportion }}</label>
            <el-select v-model="setFileNameDialog.form.proportion"
                       class="farm-select">
              <el-option
                v-for="(item,index) in setFileNameDialog.proportionList"
                :key="index"
                :label="item.label"
                :value="item.val">
              </el-option>
            </el-select>
          </div>
          <!--声音语言-->
          <div class="item mini">
            <label class="farm-label">{{ setFileNameDialog.label.mp3Language }}</label>
            <el-select v-model="setFileNameDialog.form.mp3Language"
                       class="farm-select">
              <el-option
                v-for="(item,index) in setFileNameDialog.mp3LanguageList"
                :key="'mp3Language-' + index"
                :label="item.label"
                :value="item.val">
              </el-option>
            </el-select>
          </div>
          <!--字幕语言-->
          <div class="item mini">
            <label class="farm-label">{{ setFileNameDialog.label.textLanguage }}</label>
            <el-select v-model="setFileNameDialog.form.textLanguage"
                       class="farm-select">
              <el-option
                v-for="(item,index) in setFileNameDialog.textLanguageList"
                :key="index"
                :label="item.label"
                :value="item.val">
              </el-option>
            </el-select>
          </div>
          <!--OCAP/CCAP-->
          <div class="item mini">
            <label class="farm-label">{{ setFileNameDialog.label.AP }}</label>
            <el-select v-model="setFileNameDialog.form.AP"
                       class="farm-select">
              <el-option
                v-for="(item,index) in setFileNameDialog.APList"
                :key="'APList-' + index"
                :label="item"
                :value="index + 1">
              </el-option>
            </el-select>
          </div>
          <!--地区-->
          <div class="item mini">
            <label class="farm-label">{{ setFileNameDialog.label.area }}</label>
            <el-select v-model="setFileNameDialog.form.area"
                       class="farm-select">
              <el-option
                v-for="(item,index) in setFileNameDialog.areaList"
                :key="'area-' + index"
                :label="item"
                :value="index + 1">
              </el-option>
            </el-select>
          </div>
          <!--声道类型-->
          <div class="item mini">
            <label class="farm-label">{{ setFileNameDialog.label.mp3Type }}</label>
            <el-select v-model="setFileNameDialog.form.mp3Type"
                       class="farm-select">
              <el-option
                v-for="(item,index) in setFileNameDialog.mp3TypeList"
                :key="index"
                :label="item.label"
                :value="item.val">
              </el-option>
            </el-select>
          </div>
          <!--分辨率-->
          <div class="item mini">
            <label class="farm-label">{{ setFileNameDialog.label.resolution }}</label>
            <el-select v-model="setFileNameDialog.form.resolution"
                       class="farm-select">
              <el-option
                v-for="(item,index) in setFileNameDialog.resolutionList"
                :key="index"
                :label="item.label"
                :value="item.val">
              </el-option>
            </el-select>
          </div>
          <!--出品方-->
          <div class="item mini">
            <label class="farm-label">{{ setFileNameDialog.label.producer }}</label>
            <input type="text"
                   :class="['farm-input', 'farm-name-input']"
                   v-model="setFileNameDialog.form.producer">
          </div>
          <!--打包日期-->
          <div class="item mini">
            <label class="farm-label">{{ setFileNameDialog.label.date }}</label>
            <el-date-picker
              v-model="setFileNameDialog.form.date"
              type="date"
              placeholder="选择日期"/>
          </div>
          <!--制作方-->
          <div class="item mini">
            <label class="farm-label">{{ setFileNameDialog.label.made }}</label>
            <input type="text"
                   :class="[{'inputError': null}, 'farm-input', 'farm-name-input']"
                   v-model="setFileNameDialog.form.made">
          </div>
          <!--2D/3D-->
          <div class="item mini">
            <label class="farm-label">{{ setFileNameDialog.label.type }}</label>
            <el-select v-model="setFileNameDialog.form.type"
                       class="farm-select">
              <el-option
                v-for="(item,index) in setFileNameDialog.typeList"
                :key="index"
                :label="item.label"
                :value="item.val">
              </el-option>
            </el-select>
          </div>
          <!--DCP类型-->
          <div class="item mini">
            <label class="farm-label">{{ setFileNameDialog.label.DCPType }}</label>
            <el-select v-model="setFileNameDialog.form.DCPType"
                       class="farm-select">
              <el-option
                v-for="(item,index) in setFileNameDialog.DCPTypeList"
                :key="index"
                :label="item.label"
                :value="item.val">
              </el-option>
            </el-select>
          </div>
          <!--按钮-->
          <div class="btnGroup">
            <div :class="[{'disable-self': null}, 'btnGroup-btn', 'confirm']">
              <span>{{ $t('public.save') }}</span>
            </div>
            <div class="btnGroup-btn previous" @click="setFileNameDialog.visible = false">
              <span>{{ $t('public.cancel') }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    createTaskSetSoftware,
    createTaskSet              // 设置渲染模板-获取已存在记录
  } from '@/api/addOne-api'
  import {mapState} from 'vuex'
  import {
    messageFun
  } from '@/assets/common.js'

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
        stepBtnActive: 1,           // 当前所在步骤 1.选择打包模板 2.设置打包参数 3.选择文件目录
        // 选择打包模板
        selectUnpackBase: {
          addMoreText: '添加模板',
          renderListActive: null,   // 渲染模板默认选中项索引
          renderList: [],           // 设置渲染模板 已存在记录
          checked: false            // 下次不再提示
        },
        // 设置打包参数
        setUnpackBase: {
          directory: ['DCP参数', '任务模式'],
          label: {
            fileName: 'DCP文件名',
            project: '所属项目',
            taskName: '任务名称',
            moiveName: '影片名称',
            moiveType: '影片类型',
            proportion: '宽高比',
            resolution: '分辨率',
            colorType: '源色彩',
            mode: '2D/3D',
            channelType: '声道类型'
          },
          form: {
            fileName: '0103S_FTR-2_F_EN-XX_INT_51_2K_NULL_20200801_NULL_SMPTE_OV',
            project: '',
            taskName: '',
            moiveName: '',
            moiveType: '',
            proportion: '',
            resolution: '',
            colorType: '',
            mode: '',
            channelType: ''
          },
          moiveTypeList: [
            {
              label: '正片FTR（Feature）',
              value: '001'
            },
            {
              label: '预告片TLR（Trailer）',
              value: '002'
            },
            {
              label: '短版本预告片TSR（Teaser）',
              value: '003'
            },
            {
              label: '分级RTG（Rating）',
              value: '004'
            },
            {
              label: '政策相关POL（Policy）',
              value: '005'
            },
            {
              label: '公告服务或公告PSA（Public Service Announcement）',
              value: '006'
            },
            {
              label: '广告片ADV（Advertisement）',
              value: '007'
            },
            {
              label: '短片SHR（Short）',
              value: '008'
            },
            {
              label: '过度片XSN（Transitional）',
              value: '009'
            },
            {
              label: '测试片TST（Test）',
              value: '010'
            }
          ],
          projectList: [
            {
              label: '默认项目',
              value: '001'
            },
            {
              label: '项目2',
              value: '002'
            }
          ],
          proportionList: [
            {
              label: '遮幅F（Flat   1.85：1）',
              value: '001'
            },
            {
              label: '宽荧幕S（Sope   2.39：1）',
              value: '002'
            },
            {
              label: '全画幅C（Full   1.90：1）',
              value: '003'
            }
          ],
          resolutionList: [
            {
              label: '2K（2048*1080）',
              value: '001'
            },
            {
              label: '4K（4096*2160）',
              value: '002'
            }
          ],
          colorTypeList: [
            {
              label: 'REC 709',
              value: '001'
            },
            {
              label: 'P3 DCI',
              value: '002'
            },
            {
              label: 'REC 2020',
              value: '003'
            }
          ],
          modeList: [
            {
              label: '2D',
              value: '001'
            },
            {
              label: '3D',
              value: '002'
            }
          ],
          channelTypeList: [
            {
              label: '2.1立体音',
              value: '002'
            },
            {
              label: '5.1立体音',
              value: '005'
            },
            {
              label: '7.1立体音',
              value: '007'
            }
          ],
          pl: {
            taskName: '请输入任务名称',
            moiveName: '请输入影片名称'
          },
          createObject: '新建项目',
          mode: '',
          modeRadioList: [
            {
              number: '10台',
              type: '普通模式',
              value: 1
            },
            {
              number: '20台',
              type: '加速模式',
              value: 2
            },
            {
              number: '50台',
              type: '极速模式',
              value: 3
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
            name: null,
            normV: null,
            speed: null,
            internetS: 250
          },
          format: {
            name: null
          },
          normList: [
            {
              label: 'SMPTE',
              val: 'SMPTE'
            },
            {
              label: 'Interop',
              val: 'Interop'
            }
          ],
          speedList: [
            {
              label: 'SMPTE',
              val: 'SMPTE'
            },
            {
              label: 'Interop',
              val: 'Interop'
            }
          ],
          editOrAdd: '',    // 【确定】标记编辑or新建
          index: null       // 编辑已存在模板时模板的索引
        },
        // 设置DCP文件名
        setFileNameDialog: {
          visible: false,
          title: '设置DCP文件名',
          movieTypeList: [
            {
              label: '广告片 ADV',
              val: '001'
            },
            {
              label: '正片 FTR',
              val: '002'
            },
            {
              label: '政策相关 POL',
              val: '003'
            },
            {
              label: '推广片 PRO',
              val: '004'
            },
            {
              label: '公告 PSA',
              val: '005'
            },
            {
              label: '短片 SHR',
              val: '006'
            },
            {
              label: '预告片 TLR',
              val: '007'
            },
            {
              label: '样片 TSR',
              val: '008'
            },
            {
              label: '测试片 TST',
              val: '009'
            },
            {
              label: '过度片 XSN',
              val: '010'
            }
          ],
          versionList: [
            {
              label: '无版本',
              val: '000'
            },
            {
              label: '版本1',
              val: '001'
            },
            {
              label: '版本2',
              val: '002'
            },
            {
              label: '版本3',
              val: '003'
            },
            {
              label: '版本4',
              val: '004'
            },
            {
              label: '版本5',
              val: '005'
            },
            {
              label: '版本6',
              val: '006'
            },
            {
              label: '版本7',
              val: '007'
            },
            {
              label: '版本8',
              val: '008'
            },
            {
              label: '版本9',
              val: '009'
            }
          ],
          proportionList: [
            {
              label: '全画幅C（Full   1.90：1）',
              val: '000'
            },
            {
              label: '遮幅F（Flat   1.85：1）',
              val: '001'
            },
            {
              label: '宽银幕S（Sope   2.39：1）',
              val: '002'
            }
          ],
          mp3LanguageList: [
            {
              label: '中文普通话 CMN',
              val: 1
            },
            {
              label: '中文粤语 YUE',
              val: 2
            },
            {
              label: '越南语 VI',
              val: 5
            },
            {
              label: '英语 EN',
              val: 6
            },
            {
              label: '印尼语 IND',
              val: 7
            },
            {
              label: '印地语 HI',
              val: 8
            },
            {
              label: '意大利语 IT',
              val: 9
            },
            {
              label: '匈牙利语 HU',
              val: 10
            },
            {
              label: '希腊语 EL',
              val: 11
            },
            {
              label: '希伯来语 HE',
              val: 12
            },
            {
              label: '西班牙语-阿根廷 QSA',
              val: 14
            },
            {
              label: '西班牙语-卡斯蒂利亚 ES',
              val: 15
            },
            {
              label: '西班牙语-拉美 LAS',
              val: 16
            },
            {
              label: '西班牙语-墨西哥 QSM',
              val: 17
            },
            {
              label: '乌克兰语 UK',
              val: 18
            },
            {
              label: '土耳其语 TR',
              val: 19
            },
            {
              label: '泰语 TH',
              val: 20
            },
            {
              label: '泰米尔语 TA',
              val: 21
            },
            {
              label: '泰卢固语 TE',
              val: 22
            },
            {
              label: '斯洛文尼亚语 SL',
              val: 23
            },
            {
              label: '斯洛伐克语 SK',
              val: 24
            },
            {
              label: '塞尔维亚语 SR',
              val: 25
            },
            {
              label: '瑞典语 SV',
              val: 26
            },
            {
              label: '日语 JA',
              val: 27
            },
            {
              label: '葡萄牙语-巴西 QBP',
              val: 28
            },
            {
              label: '葡萄牙语-欧洲 PT',
              val: 29
            },
            {
              label: '挪威语 NO',
              val: 30
            },
            {
              label: '马来语 MSA',
              val: 31
            },
            {
              label: '罗马尼亚语 RO',
              val: 32
            },
            {
              label: '立陶宛语 LT',
              val: 33
            },
            {
              label: '拉脱维亚语 LV',
              val: 34
            },
            {
              label: '克罗地亚语 HR',
              val: 35
            },
            {
              label: '捷克－斯洛伐克语 CS',
              val: 36
            },
            {
              label: '加泰隆语 CA',
              val: 37
            },
            {
              label: '荷兰语 NL',
              val: 38
            },
            {
              label: '韩语 KO',
              val: 39
            },
            {
              label: '佛兰芒语 VLS',
              val: 40
            },
            {
              label: '芬兰语 FI',
              val: 41
            },
            {
              label: '法语-加拿大 QFC',
              val: 42
            },
            {
              label: '法语 FR',
              val: 43
            },
            {
              label: '俄语 RU',
              val: 44
            },
            {
              label: '德语 DE',
              val: 45
            },
            {
              label: '丹麦语 DA',
              val: 46
            },
            {
              label: '波斯尼亚语 BS',
              val: 47
            },
            {
              label: '波兰语 PL',
              val: 48
            },
            {
              label: '冰岛语 IS',
              val: 49
            },
            {
              label: '爱沙尼亚语 ET',
              val: 50
            },
            {
              label: '阿拉伯语 AR',
              val: 51
            },
            {
              label: '阿尔巴尼亚语 SQ',
              val: 52
            }
          ],
          textLanguageList: [
            {
              label: '无字幕 XX',
              val: 'XX'
            },
            {
              label: '中文简体 QMS',
              val: 'QMS'
            },
            {
              label: '中文繁体 QMT',
              val: 'QMT'
            },
            {
              label: '越南语 VI',
              val: 'VI'
            },
            {
              label: '英语 EN',
              val: 'EN'
            },
            {
              label: '印尼语 IND',
              val: 'IND'
            },
            {
              label: '印地语 HI',
              val: 'HI'
            },
            {
              label: '意大利语 IT',
              val: 'IT'
            },
            {
              label: '匈牙利语 HU',
              val: 'HU'
            },
            {
              label: '希腊语 EL',
              val: 'EL'
            },
            {
              label: '希伯来语 HE',
              val: 'HE'
            },
            {
              label: '西班牙语-阿根廷 QSA',
              val: 'QSA'
            },
            {
              label: '西班牙语-卡斯蒂利亚 ES',
              val: 'ES'
            },
            {
              label: '西班牙语-拉美 LAS',
              val: 'LAS'
            },
            {
              label: '西班牙语-墨西哥 QSM',
              val: 'QSM'
            },
            {
              label: '乌克兰语 UK',
              val: 'UK'
            },
            {
              label: '土耳其语 TR',
              val: 'TR'
            },
            {
              label: '泰语 TH',
              val: 'TH'
            },
            {
              label: '泰米尔语 TA',
              val: 'TA'
            },
            {
              label: '泰卢固语 TE',
              val: 'TE'
            },
            {
              label: '斯洛文尼亚语 SL',
              val: 'SL'
            },
            {
              label: '斯洛伐克语 SK',
              val: 'SK'
            },
            {
              label: '塞尔维亚语 SR',
              val: 'SR'
            },
            {
              label: '瑞典语 SV',
              val: 'SV'
            },
            {
              label: '日语 JA',
              val: 'JA'
            },
            {
              label: '葡萄牙语-巴西 QBP',
              val: 'QBP'
            },
            {
              label: '葡萄牙语-欧洲 PT',
              val: 'PT'
            },
            {
              label: '挪威语 NO',
              val: 'NO'
            },
            {
              label: '马来语 MSA',
              val: 'MSA'
            },
            {
              label: '罗马尼亚语 RO',
              val: 'RO'
            },
            {
              label: '立陶宛语 LT',
              val: 'LT'
            },
            {
              label: '拉脱维亚语 LV',
              val: 'LV'
            },
            {
              label: '克罗地亚语 HR',
              val: 'HR'
            },
            {
              label: '捷克－斯洛伐克语 CS',
              val: 'CS'
            },
            {
              label: '加泰隆语 CA',
              val: 'CA'
            },
            {
              label: '荷兰语 NL',
              val: 'NL'
            },
            {
              label: '韩语 KO',
              val: 'KO'
            },
            {
              label: '佛兰芒语 VLS',
              val: 'VLS'
            },
            {
              label: '芬兰语 FI',
              val: 'FI'
            },
            {
              label: '法语-加拿大 QFC',
              val: 'QFC'
            },
            {
              label: '法语 FR',
              val: 'FR'
            },
            {
              label: '俄语 RU',
              val: 'RU'
            },
            {
              label: '德语 DE',
              val: 'DE'
            },
            {
              label: '丹麦语 DA',
              val: 'DA'
            },
            {
              label: '波斯尼亚语 BS',
              val: 'BS'
            },
            {
              label: '波兰语 PL',
              val: 'PL'
            },
            {
              label: '冰岛语 IS',
              val: 'IS'
            },
            {
              label: '爱沙尼亚语 ET',
              val: 'QMSET'
            },
            {
              label: '阿拉伯语 AR',
              val: 'AR'
            },
            {
              label: '阿尔巴尼亚语 SQ',
              val: 'SQ'
            }
          ],
          APList: [
            '无字幕',
            '开放式字幕OCAP',
            '隐藏式字幕CCAP'
          ],
          areaList: [
            this.$t('public.areaList.INT'),
            this.$t('public.areaList.CN'),
            this.$t('public.areaList.HK'),
            this.$t('public.areaList.TW'),
            this.$t('public.areaList.MO')
          ],
          mp3TypeList: [
            {
              label: '无版本',
              val: '000'
            },
            {
              label: '版本1',
              val: '001'
            }
          ],
          resolutionList: [
            {
              label: '2K 2048*1080',
              val: '2K'
            },
            {
              label: '4K 4096*2160',
              val: '4K'
            }
          ],
          typeList: [
            {
              label: '2D',
              val: '2D'
            },
            {
              label: '3D',
              val: '3D'
            }
          ],
          DCPTypeList: [
            {
              label: '原版OV Original Version',
              val: '000'
            },
            {
              label: '版本文件VF Version File',
              val: '001'
            }
          ],
          label: {
            fileName: 'DCP文件名',
            movieName: '影片名称',
            movieType: '影片类型',
            version: '类型版本',
            proportion: '宽高比',
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
            fileName: '',
            movieName: '',
            movieType: '',
            version: '',
            proportion: '',
            mp3Language: '',
            textLanguage: '',
            AP: '',
            area: '',
            mp3Type: '',
            resolution: '',
            producer: '',
            date: '',
            made: '',
            type: '',
            DCPType: ''
          }
        }
      }
    },
    computed: {
      ...mapState(['zone', 'zoneId', 'user', 'socket_backS', 'socket_backS_msg', 'socket_plugin', 'socket_plugin_msg']),
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
              let fileType = data.key.splice(0, 2),
                team
              if (fileType == 'SY') team = this.selectFileBase.mp3FileList
              else if (fileType == 'TX') team = this.selectFileBase.imgFileList
              else if (fileType == 'ZM') team = this.selectFileBase.subtitleFileList
              else {
                console.log('-------------------')
                throw '获取插件返回值类型报错，位置 addDCP-406'
                console.log(data)
                console.log('-------------------')
                return
              }
              let index = team.findIndex(curr => curr.key == data.key)
              team[index]['localPath'] = data.localPath
            }
          }
        },
        immediate: true
      }
    },
    methods: {
      // 1.设置渲染模板 - 添加模板 - 检验模板名格式
      nameVerif() {
        if (!this.dialogAdd.form.valName) {
          this.dialogAdd.form.formatName = null
          return false
        } else if (this.dialogAdd.form.valName.length > 50) {
          messageFun('error', '最多输入50个字符')
          this.dialogAdd.form.formatName = false
          return false
        } else this.dialogAdd.form.formatName = true
      },
      // 0.设置渲染文件 - 下一步
      goToMode(dire) {
        if (dire == 'previous') this.stepBtnActive = 2
        else if (this.selectUnpackBase.renderListActive < 0) messageFun('info', '尚未选择模板')// 我的资产
        else this.stepBtnActive = 2
      },
      // 0.关闭窗口
      closeDialogFun() {
        this.$emit('closeDialogFun', 'createDCPDialog')
        this.reset()
      },
      // 1.设置渲染模板 - 选择插件版本
      changeOIndex(index) {
        //插件版本左侧窗口切换选中状态
        this.dialogAdd.oList.forEach((curr, ind) => {
          // curr = {
          //   id: 2
          //   pluginName: "Arnold"
          //   version: "2.233"
          //   publisher: "4K"
          //   pluginUuid: "457"
          //   createTime: "2020-03-31"
          //   createBy: "1"
          //   updateTime: "2020-03-31"
          //   updateBy: "1"
          //   dataStatus: 1
          //   status: true
          // }
          // 当前选中项
          if (index == ind) {
            //当前插件是否有其它版本已被选中
            // 当前插件curr.pluginName
            // 当前版本curr.version
            let r = this.dialogAdd.nList.findIndex(c => {
              return c.pluginName == curr.pluginName
            })
            if (r != -1) {
              this.dialogAdd.nList.splice(r, 1)
            }
            // 若还未选中
            if (!curr.status) {
              // 判断此项是否已在选中项中
              let d = this.dialogAdd.nList.findIndex(c => {
                return c.pluginUuid == curr.pluginUuid
              })
              if (d == -1) {
                this.dialogAdd.nList.push(curr)
              }
              curr.status = true
            } else {
              curr.status = false
            }
          } else {
            // 其它项
            curr.status = false
          }
        })
      },
      // 1.设置渲染模板 - 删除已选择插件结果
      deleteSeletedOption(item, index) {
        this.dialogAdd.oList.findIndex(curr => {
          if (item.pluginUuid == curr.pluginUuid)
            curr.status = false
          return item.pluginUuid == curr.pluginUuid
        })
        this.dialogAdd.nList.splice(index, 1)
      },
      // 1.设置渲染模板 - 获取渲染模板列表
      async getList() {
        let {data} = await createTaskSet(),
          {selectUnpackBase} = this
        selectUnpackBase.renderList = data.data
        selectUnpackBase.renderListActive = data.data.findIndex(curr => curr.renderTemplate.isDefault == 1)
      },
      // 1.设置渲染模板 - 打开【新建模板】
      async addTemplate(s, index) {
        // 打开弹窗
        this.dialogAdd.visible = true
        this.$nextTick(() => this.$refs.templateName.focus())
        this.dialogAdd.editOrAdd = s
        let v = this.dialogAdd
        if (s == 'addMore') {

        }
      },
      // 1.设置渲染模板 - 删除模板
      deleteTemplate(index) {
        this.$confirm('删除后将无法找回，确认删除当前模板吗？', '提示信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false
        })
          .then(() => {
            createTaskSetDeletePlugin(this.selectUnpackBase.renderList[index]['renderTemplate']['templateUuid'])
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
      confirmFun() {
        let {imgFileList, mp3FileList, subtitleFileList} = this.selectFileBase
        this.$store.commit('WEBSOCKET_PLUGIN_SEND', {
          code: 202,
          userID: '001',
          TaskUUid: '002',
          ID: '003',
          files: [
            ...imgFileList.map(item => {
              item.localPath, item.networkPath, item.type
            }),
            ...mp3FileList.map(item => {
              item.localPath, item.networkPath, item.type
            }),
            ...subtitleFileList.map(item => {
              item.localPath, item.networkPath, item.type
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
      this.getList()  // 1.设置渲染模板 - 获取渲染模板列表
    }
  }
</script>

<style lang="less" scoped>
  .addDCP {
    user-select: none;
    height: 80vh;
    position: relative;

    .header {
      background-color: rgba(241, 244, 249, 1);
      box-shadow: 0px 1px 6px 0px rgba(27, 83, 244, 0.3);
      height: 35px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 30px;

      .title {
        font-size: 14px;
        font-weight: 600;
        color: rgba(22, 29, 37, 1);
        line-height: 25px;
      }

      .closeBtn {
        width: 12px;
        cursor: pointer;
        opacity: 0.8;
      }
    }

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

          .fileItem {
            display: flex;
            align-items: center;
            margin-bottom: 15px;

            label {
              color: rgba(22, 29, 37, 0.6);
              font-size: 14px;
              margin-right: 60px;
              display: inline-block;
              width: 96px;
              text-align: right;
            }

            input {
              flex-grow: 1;
              border-radius: 6px;
              border: 1px solid rgba(22, 29, 37, 0.15);
              background-color: rgba(255, 255, 255, 1);
              height: 36px;
              outline: none;
              padding-left: 17px;
            }

            .btn {
              height: 32px;
              border-radius: 6px;
              border: 1px solid rgba(27, 83, 244, 0.3);
              text-align: center;
              cursor: pointer;
              flex-shrink: 0;
              margin-left: 23px;
              padding: 0px 12px;

              span {
                line-height: 32px;
                color: rgba(27, 83, 244, 1);
                font-size: 12px;
              }
            }
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
                  .plugin,
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

                    .plugin {
                      color: rgba(255, 255, 255, 0.8);
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

    .btnGroup {
      height: auto;
      margin-top: 22px;

      .btnGroup-btn:nth-of-type(1) {
        margin-right: 0px;
      }
    }
  }

  .btnGroup {
    position: relative;
    height: 72px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;

    & > div {
      position: relative;
      width: 100%;
      text-align: right;
    }

    .btnGroup-btn {
      margin-right: 30px;
      display: inline-block;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.79);
      text-align: center;
      cursor: pointer;

      &.confirm {
        background-color: rgba(10, 98, 241, 1);
        border: 1px solid rgba(10, 98, 241, 1);
        width: 76px;
        line-height: 32px;

        span {
          color: rgba(255, 255, 255, 0.8);
        }
      }

      &.previous {
        border: 1px solid rgba(22, 29, 37, 0.2);
        width: 74px;
        line-height: 30px;

        span {
          color: rgba(22, 29, 37, 0.79);
        }
      }

      &.cannotTrigger {
        cursor: no-drop;
        border: 1px solid rgba(22, 29, 37, 0.19);
        background-color: rgba(255, 255, 255, 1);
        width: 74px;
        line-height: 30px;

        span {
          color: rgba(22, 29, 37, 0.19);
        }
      }
    }

    .checked {
      position: absolute;
      left: 30px;
      top: 8px;

      /deep/ .el-checkbox__label {
        color: rgba(22, 29, 37, 0.6);
      }

    }
  }

  .wrapper-border {
    width: 100%;
    border: 1px solid rgba(22, 29, 37, 0.3);
    border-radius: 4px;
    overflow-y: scroll;
    padding: 20px;
    box-sizing: border-box;
  }

  .setFileNameForm {
    margin: -10px 0px;
    overflow-y: scroll;
    height: 700px;

    .farm-label {
      width: 100px;
      text-align: right;
      margin-right: 60px;
    }
  }

</style>
