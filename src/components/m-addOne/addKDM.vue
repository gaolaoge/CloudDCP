<template>
  <div class="addKDM">
    <header class="header">
      <span class="title">{{ title }}</span>
      <img src="@/icons/shutDialogIcon.png"
           @click="$emit('closeDialogFun', 'createKDMDialog')"
           class="closeBtn">
    </header>
    <section class="stepGroup">
      <!--面包屑-->
      <div class="navL">
        <ul>
          <li class="li" :class="[{'active': index + 1 == stepBtnActive}]" v-for="(item,index) in navL" :key="index">
            <svg width="406.75" height="37" class="f svg" v-show="index == 0">
              <path d="M 0 0 H 389.25 L 406.75 18.5 L 389.25 37 H 0 Z" fill="rgba(27, 83, 244, 1)"/>
            </svg>
            <svg width="406.75" height="37" class="st svg" v-show="index != 0">
              <path d="M 0 0 H 389.25 L 406.75 18.5 L 389.25 37 H 0 L 18.5 18.5 Z" fill="rgba(27, 83, 244, 1)"/>
            </svg>
            <span class="i">{{ index + 1 }}</span>
            <span class="s">{{ item }}</span>
          </li>
        </ul>
      </div>
      <!--主体-->
      <div class="stepBody">
        <!--选择播放银幕-->
        <div class="stepBody-item" v-show="stepBtnActive == 1">
          <!--从银幕管理选择-->
          <selectScreenFromAdmin
            @selectedAndNext="nextFun"
            @selectByLocal="selectBy = 'local'"
            v-show="selectBy == 'netdisc'"/>
          <!--从我的电脑选择-->
          <selectScreenFromLocal
            @selectedAndNext="nextFun"
            @selectByNetdisc="selectBy = 'netdisc'"
            v-show="selectBy == 'local'"/>
        </div>
        <!--设置KDM参数-->
        <div class="stepBody-item" v-show="stepBtnActive == 2">
          <div class="wrapper-border setScollBarStyle form">
            <!--KDM文件名-->
            <div class="fileItem item">
              <label>{{ setParameters.label.fileName }}：</label>
              <span class="farm-span" :title="setParameters.form.fileName">{{ setParameters.form.fileName }}</span>
              <!--设置-->
              <div class="btn" @click="setFileNameDialog.visible = true">
                <span>{{ $t('public.set') }}</span>
              </div>
            </div>
            <!--任务名称-->
            <div class="fileItem">
              <label>{{ setParameters.label.movieName }}：</label>
              <input type="text" disabled v-model="setParameters.form.movieName">
            </div>
            <!--所属项目-->
            <div class="fileItem item">
              <label class="farm-label">{{ setParameters.label.project }}：</label>
              <el-select v-model="setParameters.form.projectUuid"
                         class="farm-input farm-select">
                <el-option
                  v-for="(item,index) in projectList"
                  :key="index"
                  :label="item.projectName"
                  :value="item.projectUuid">
                </el-option>
              </el-select>
              <div class="btn" @click="addProjectDialog.visible = true"><span>{{ setParameters.createObject }}</span>
              </div>
            </div>
            <!--任务名称-->
            <div class="fileItem">
              <label>{{ setParameters.label.taskName }}：</label>
              <input type="text"
                     :placeholder="setParameters.pl.taskName"
                     v-model="setParameters.form.kdmTaskName">
            </div>
            <!--影院时区-->
            <div class="fileItem item">
              <label class="farm-label">{{ setParameters.label.timeZone }}：</label>
              <el-select v-model="setParameters.form.theatreTimeZone"
                         class="farm-input farm-select">
                <el-option
                  v-for="(item,index) in timeZone"
                  :key="index"
                  :label="item.label"
                  :value="item.val">
                </el-option>
              </el-select>
            </div>
            <!--播放起始时间-->
            <div class="fileItem item">
              <label class="farm-label">{{ setParameters.label.startTime }}：</label>
              <el-date-picker
                v-model="setParameters.form.startTime[0]"
                type="date"
                placeholder="选择日期"/>
              <span class="dateSpan">{{ setParameters.dateText }}</span>
              <el-time-picker
                v-model="setParameters.form.startTime[1]"
                placeholder="选择时间"/>
              <span class="dateSpan">{{ setParameters.timeText }}</span>
            </div>
            <!--播放结束时间-->
            <div class="fileItem item">
              <label class="farm-label">{{ setParameters.label.endTime }}：</label>
              <el-date-picker
                v-model="setParameters.form.endTime[0]"
                type="date"
                placeholder="选择日期"/>
              <span class="dateSpan">{{ setParameters.dateText }}</span>
              <el-time-picker
                v-model="setParameters.form.endTime[1]"
                placeholder="选择时间"/>
              <span class="dateSpan">{{ setParameters.timeText }}</span>
            </div>
          </div>
          <div class="dialog-btn-group">
            <!--上一步-->
            <div class="dialog-btn cancel"
                 @click="stepBtnActive = 1">
              <span>{{ $t('public.previous') }}</span>
            </div>
            <!--确定-->
            <div :class="[{'cannotBeGo': !setParameters.form.kdmTaskName.trim()}, 'dialog-btn', 'save']"
                 @click="createKDMF">
              <span>{{ $t('public.save') }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--设置KDM名-->
    <el-dialog
      width="640px"
      top="20vh"
      :show-close=false
      :visible.sync="setFileNameDialog.visible"
      @close="closesetFileNameDialog"
      append-to-body>
      <setName @shutMe="shutSetFileNameDia"
               :typeList="typeList"
               :typeUuid="setParameters.form.kdmFilenameTemplateUuid"
               :fileName="setParameters.form.movieName"/>
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
  import selectScreenFromAdmin from './components/selectScreenFromAdmin'
  import selectScreenFromLocal from './components/selectScreenFromLocal'
  import addProject from '../public-module/add_project'
  import setName from './components/setKDMFileName'
  import {mapState} from 'vuex'
  import {
    messageFun,
    timeZone
  } from '@/assets/common.js'
  import {
    createNewKDM,
    getTypeList
  } from '@/api/addOne-api'

  export default {
    name: 'addKDM',
    data() {
      return {
        title: '新建KDM制作',
        navL: [
          '选择播放银幕',
          '设置KDM参数'
        ],
        stepBtnActive: 1,
        selectBy: 'netdisc',
        selectScreen: {
          screenList: [],
          certificateSource: null  // 证书来源  1我的电脑, 2银幕列表-院线银幕, 3银幕列表-内部银幕
        },
        setParameters: {
          pl: {
            taskName: '请输入任务名称'
          },
          createObject: '新建项目',
          form: {
            projectUuid: '',
            kdmTaskName: '',
            theatreTimeZone: 0,
            fileName: '',
            movieName: '',
            startTime: [new Date(), new Date()],
            endTime: [new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), new Date()],
            kdmCreateDate: new Date().getTime(),          // kdm制作时间
            kdmFilenameTemplateUuid: null,                // kdm文件名格式uuid
          },
          label: {
            project: '所属项目',
            taskName: '任务名称',
            timeZone: '影院时区',
            fileName: 'KDM文件名',
            movieName: '电影名称',
            startTime: '播放起始时间',
            endTime: '播放结束时间'
          },
          dateText: '（日期）',
          timeText: '（时间）'
        },
        setFileNameDialog: {
          visible: false
        },
        // 新建项目
        addProjectDialog: {
          visible: false,
          title: '新建项目'
        },
        timeZone: [],
        typeList: [],
        typeIndex: 0      // 文件名格式索引
      }
    },
    props: {
      selectedDCPUTask: Object
    },
    methods: {
      // 1.关闭新建项目窗口
      shutAddProjectDialog(status) {
        this.addProjectDialog.visible = false
        if (status) this.getList()
      },
      // 获取列表
      async getNameTypeList() {
        let {data} = await getTypeList()
        if (data.code == 200) {
          this.typeList = data.data.map((item, index) => Object.assign(item, {index}))
          this.setParameters.form.kdmFilenameTemplateUuid = data.data[0]['filenameTemplateUuid']
        }
      },
      // 关闭【设置KDM文件名】弹窗
      shutSetFileNameDia(obj) {
        this.setFileNameDialog.visible = false
        if (obj) {
          this.setParameters.form.fileName = obj.name
          this.setParameters.form.kdmFilenameTemplateUuid = obj.Uuid
        }
      },
      // 下一步
      nextFun(obj) {
        this.selectScreen = obj
        this.stepBtnActive = 2
      },
      // 2.设置KDM参数 - 关闭【设置KDM文件名】数据初始化
      closesetFileNameDialog() {

      },
      // 3.创建KDM
      async createKDMF() {
        if (!this.setParameters.form.kdmTaskName.trim()) return false
        let {theatreUuidList, screenUuidList, certificateSource} = this.selectScreen,
          {projectUuid, kdmTaskName, theatreTimeZone, kdmFilenameTemplateUuid, kdmCreateDate} = this.setParameters.form,
          {zoneUuid, movieStartTime, movieEndTime} = this,
          {taskUuid} = this.selectedDCPUTask,
          {data} = await createNewKDM({
            kdmFilenameTemplateUuid,            // kdm文件名格式uuid
            kdmCreateDate,                      // kdm制作时间
            'packageTaskUuid': taskUuid,        // 选中DCP文件的Uuid
            projectUuid,                        // 项目uuid
            kdmTaskName,                        // 任务名
            theatreTimeZone,                    // 影院时区
            movieStartTime,                     // 播放起始时间
            movieEndTime,                       // 播放结束时间
            'screenUuidList': certificateSource == 1 ? [] : screenUuidList,      // 单选银幕Uuid列表
            'theatreUuidList': certificateSource == 1 ? null : theatreUuidList,    // 全选银幕Uuid列表
            'cinemaUuidList': certificateSource == 1 ? null : [],     // 院线uuid列表(只有下面的影院全选是才传)
            zoneUuid,                           // 分区uuid
            'operateSource': 1,                 // 操作来源, 1,网页端 2客户端
            certificateSource,                  // 证书来源 1我的电脑, 2银幕列表-院线银幕, 3银幕列表-内部银幕
            'uploadCert': certificateSource == 1 ? {
              'cinemaName': null,
              'theatreName': null,
              'screenList': this.selectScreen.screenList.map(item => {
                return {
                  'screenName': item.name,
                  'localPath': item.localPath
                }
              })
            } : null
          })
        if (data.code == 200) {
          messageFun('success', '创建成功')
          this.$emit('closeDialogFun', 'createKDMDialog')
          this.$store.commit('WEBSOCKET_PLUGIN_SEND', {
            userID: this.user.id,
            code: 211,
            files: data.data.map(item => {
              return {
                'taskUuid': item.taskUuid,
                'ID': item.taskId,
                'localPath': item.localPath,
                'networkPath': {
                  'front': item.pathPrefix,
                  'back': item.certificateName
                }
              }
            })
          })
        } else messageFun('error', '报错')
      }
    },
    mounted() {
      if (!this.projectList.length) this.$store.dispatch('getProjectList')
      this.getNameTypeList()
      this.$nextTick(() => {
        Object.assign(this, {
          timeZone
        })
        this.setParameters.form.fileName = 'KDM_' + this.setParameters.form.movieName + '_<银幕名称>'
      })
    },
    watch: {
      'projectList': {
        handler: function (list) {
          if (!list.length) return false
          this.setParameters.form.projectUuid = list.find(item => item.isDefault == 1)['projectUuid']
        },
        immediate: true
      },
      'selectedDCPUTask': {
        handler: function (obj) {
          if (!obj) return false
          let {form} = this.setParameters
          form.movieName = obj.filmName
        },
        immediate: true
      },
      selectBy(type) {
        if(type == 'local' && !this.socket_plugin)
          this.$store.commit('WEBSOCKET_PLUGIN_INIT', true)
      }
    },
    components: {
      selectScreenFromAdmin,
      selectScreenFromLocal,
      setName,
      addProject
    },
    computed: {
      ...mapState(['socket_plugin', 'zoneUuid', 'projectList', 'user']),
      movieStartTime() {
        let [d, t] = this.setParameters.form.startTime
        return new Date(d.toDateString()).getTime() + (t.getTime() - new Date(t.toDateString()).getTime())
      },
      movieEndTime() {
        let [d, t] = this.setParameters.form.endTime
        return new Date(d.toDateString()).getTime() + (t.getTime() - new Date(t.toDateString()).getTime())
      }
    }
  }
</script>

<style lang="less" scoped>
  .addKDM {
    user-select: none;
    height: 80vh;
    position: relative;

    .stepGroup {
      height: calc(100% - 35px - 40px);
      padding: 20px 30px;

      .navL {
        ul {
          display: flex;
          flex-direction: row;
        }

        .li {
          position: relative;
          width: 406.75px;
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
        border-radius: 0px 6px 6px 6px;
        height: calc(100% - 57px);
        overflow: hidden;

        .stepBody-item {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: row;
        }
      }
    }
  }

  .fileItem label {
    width: 120px !important;
  }

  .dateSpan {
    color: rgba(22, 29, 37, 0.4);
    font-size: 14px;
  }

  .wrapper-border {
    height: calc(100% - 50px);
  }

  .dialog-btn-group {
    right: 0px;
    bottom: 0px;
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
</style>
