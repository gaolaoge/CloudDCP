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
          <selectScreenFromAdmin @selectedAndNext="nextFun"/>
          <!--从我的电脑选择-->
          <selectScreenFromLocal/>
        </div>
        <!--设置KDM参数-->
        <div class="stepBody-item" v-show="stepBtnActive == 2">
          <div class="wrapper-border setScollBarStyle form">
            <!--KDM文件名-->
            <div class="fileItem item">
              <label>{{ setParameters.label.fileName }}：</label>
              <span class="farm-span">
                <!--所属项目-->
                <span>{{ setParameters.form.project }}</span>_
              </span>
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
              <el-select v-model="setParameters.form.project"
                         class="farm-input farm-select">
                <el-option
                  v-for="(item,index) in setParameters.projectList"
                  :key="index"
                  :label="item.label"
                  :value="item.val">
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
                     v-model="setParameters.form.taskName">
            </div>
            <!--影院时区-->
            <div class="fileItem item">
              <label class="farm-label">{{ setParameters.label.timeZone }}：</label>
              <el-select v-model="setParameters.form.proportion"
                         class="farm-input farm-select">
                <el-option
                  v-for="(item,index) in setParameters.timeZoneList"
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
            <div :class="[{'cannotBeGo': false}, 'dialog-btn']"
                 @click="stepBtnActive = 1">
              <span>{{ $t('public.previous') }}</span>
            </div>
            <!--确定-->
            <div :class="[{'cannotBeGo': false}, 'dialog-btn', 'save']"
                 @click="createKDMF">
              <span>{{ $t('public.save') }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--设置KDM参数-->
    <el-dialog
      width="860px"
      top="8vh"
      :show-close=false
      :visible.sync="setFileNameDialog.visible"
      @close="closesetFileNameDialog"
      append-to-body>
      <setName @shutMe="setFileNameDialog.visible = false"/>
    </el-dialog>
  </div>
</template>

<script>
  import selectScreenFromAdmin from './components/selectScreenFromAdmin'
  import selectScreenFromLocal from './components/selectScreenFromLocal'
  import setName from './components/setKDMFileName'
  import {mapState} from 'vuex'
  import {
    messageFun
  } from '@/assets/common.js'
  import {
    createNewKDM
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
        selectScreen: {
          theatreUuidList: [],     // 全选集合
          screenUuidList: [],      // 单选集合
          certificateSource: null  // 证书来源  1我的电脑, 2银幕列表-院线银幕, 3银幕列表-内部银幕
        },
        setParameters: {
          pl: {
            taskName: '请输入人物名称'
          },
          createObject: '新建项目',
          form: {
            project: '',
            taskName: '',
            timeZone: '',
            fileName: '',
            movieName: '',
            startTime: [],
            endTime: []
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
          projectList: [],
          timeZoneList: [],
          dateText: '（日期）',
          timeText: '（时间）'
        },
        setFileNameDialog: {
          visible: false
        },
        addProjectDialog: {
          visible: false
        }
      }
    },
    props: {
      packageTaskUuid: {
        type: String,
        required: true
      }
    },
    methods: {
      // 下一步
      nextFun(obj) {
        this.selectScreen = obj
        this.stepBtnActive = 2
      },
      // 2.设置KDM参数 - 关闭【设置KDM文件名】数据初始化
      closesetFileNameDialog() {

      },
      //
      async createKDMF() {
        let {theatreUuidList, screenUuidList, certificateSource} = this.selectScreen,
          {zoneUuid, packageTaskUuid} = this,
          {data} = await createNewKDM(JSON.stringify({
            'kdmFilenameTemplateUuid': '',      // kdm模板uuid
            'kdmCreateDate': '',                // kdm制作时间
            packageTaskUuid,                    // 选中DCP文件的Uuid
            'projectUuid': '',                  // 项目uuid
            'kdmTaskName': '',                  // 任务名
            'theatreTimeZone': '',              // 影院时区
            'movieStartTime': '',               // 播放起始时间
            'movieEndTime': '',                 // 播放结束时间
            screenUuidList,                     // 单选银幕Uuid列表
            theatreUuidList,                    // 全选银幕Uuid列表
            'cinemaUuidList': [],               // 院线uuid列表(只有下面的影院全选是才传)
            'keyword': '',                      // 查询关键字
            zoneUuid,                           // 分区uuid
            'operateSource': 1,                 // 操作来源, 1,网页端 2客户端
            certificateSource                   // 证书来源 1我的电脑, 2银幕列表-院线银幕, 3银幕列表-内部银幕
          }))
      }
    },
    mounted() {

    },
    components: {
      selectScreenFromAdmin,
      selectScreenFromLocal,
      setName
    },
    computed: {
      ...mapState(['zoneUuid'])
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
</style>
