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
        <!--选择渲染文件-->
        <div class="stepBody-item selectFile"
             v-show="stepBtnActive == 1">

        </div>
        <!--设置渲染模板-->
        <div class="stepBody-item"
             v-show="stepBtnActive == 2">

        </div>
        <!--设置渲染参数-->
        <div class="stepBody-item">

        </div>
      </div>
    </section>
    <div class="checked">
      <span class="base">
        {{ checkedSpan[0] }}
        <span class="num"></span>
        {{ checkedSpan[1] }}
      </span>
    </div>
    <!--前进或后退按钮-->
    <div class="btnGroup">
      <!--选择渲染文件-->
      <div v-show="stepBtnActive == 1">
        <!--下一步-->
        <div :class="[{'cannotTrigger': null}, 'btnGroup-btn', 'confirm']"
             @click="goToMode('next')">
          <span class="nextStep">{{ btn.next }}</span>
        </div>
      </div>
      <!--设置渲染模板-->
      <div v-show="stepBtnActive == 2">
        <!--上一步-->
        <div class="btnGroup-btn previous" @click="stepBtnActive = 1">
          <span>{{ btn.previous }}</span>
        </div>
        <!--下一步-->
        <div :class="[{'cannotTrigger': stepTwoBase.renderListActive == -1}, 'btnGroup-btn', 'confirm']"
             @click="stepTwoBase.renderListActive == -1 ? null : stepBtnActive = 3"
             v-show="taskType != 'profession'">
          <span>{{ btn.next }}</span>
        </div>
        <!--确定-->
        <div :class="[{'cannotTrigger': stepTwoBase.renderListActive == -1}, 'btnGroup-btn', 'confirm']"
             @click="confirmFun"
             v-show="taskType == 'profession'">
          <span>{{ btn.confirm }}</span>
        </div>
      </div>
      <!--设置渲染参数-->
      <div v-show="stepBtnActive == 3">
        <!--上一步-->
        <div class="btnGroup-btn previous" @click="goToMode('previous')">
          <span>{{ btn.previous }}</span>
        </div>
        <!--确定-->
        <div class="btnGroup-btn confirm" @click="confirmFun">
          <span>{{  }}</span>
        </div>
      </div>

    </div>
    <!--添加模板-->
    <el-dialog
      width="641px"
      :show-close=false
      :visible.sync="innerVisible"
      @close="closeAddTemplateDialog"
      append-to-body>
      <div class="wrapper">
        <header class="header">
          <span class="title">{{ dialogAdd.title }}</span>
          <img src="@/icons/shutDialogIcon.png"
               @click="innerVisible = false"
               class="closeBtn">
        </header>
        <div class="farm-form">
          <!--模板名称-->
          <div class="farm-form-item">
            <label for="templateName" class="farm-form-item-label">
              {{ dialogAdd.form.labelName }}：
            </label>
            <input type="text"
                   id="templateName"
                   ref="templateName"
                   :class="[{'inputError': dialogAdd.form.formatName == false}, 'farm-form-item-input']"
                   :placeholder="dialogAdd.namePlaceholder"
                   @blur="nameVerif"
                   @focus="dialogAdd.form.formatName = null"
                   v-model="dialogAdd.form.valName">
          </div>
          <!--渲染软件-->
          <div class="farm-form-item">
            <label class="farm-form-item-label">{{ dialogAdd.form.labelSoftware }}：</label>
            <el-cascader
              v-model="dialogAdd.form.valSoftware"
              :options="dialogAdd.softwareList"
              @change="changeSoftware"/>

          </div>
          <!--渲染插件-->
          <div class="farm-form-item">
            <label class="farm-form-item-label">{{ dialogAdd.form.labelPlugin }}：</label>
            <el-select v-model="dialogAdd.form.valPlugin"
                       class="i"
                       @change="changePlugin">
              <el-option
                v-for="(item,index) in dialogAdd.pluginList"
                :key="index"
                :label="item.label"
                :value="item.val">
              </el-option>
            </el-select>
          </div>
          <!--选择插件-->
          <div class="transferBase">
            <!--选择插件版本-->
            <div class="o">
              <div class="label">{{ dialogAdd.o }}</div>
              <div class="list">
                <div v-for="(item,index) in dialogAdd.oList"
                     :key="index"
                     @click="changeOIndex(index,item)"
                     :class="[{'active': item.status == true}, 'li']">
                  <span class="name">{{ item.pluginName }} - {{ item.version }}</span>
                  <span class="choiceIcon">
                    <img src="@/icons/choiceIcon.png"
                         v-show="item.status == true"
                         class="icon">
                  </span>
                </div>
              </div>
            </div>
            <div class="ig"/>
            <!--已选插件版本-->
            <div class="n">
              <div class="label">{{ dialogAdd.n }}</div>
              <div class="list">
                {{ dialogAdd.nList }}
                <div v-for="(item,index) in dialogAdd.nList"
                     :key="index"
                     class="li">
                  <span class="name">{{ item.pluginName }} - {{ item.version }}</span>
                  <span class="deleteNIcon" @click='deleteSeletedOption(item,index)'>
                    <img src="@/icons/deleteLiIcon.png"
                         class="icon">
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!--按钮-->
          <div class="btnGroup">
            <div @click="taskDefine"
                 :class="[{'disable-self': !disableSelf || !dialogAdd.nList.length}, 'btnGroup-btn', 'save']">
              <span>{{ dialogAdd.save }}</span>
            </div>
            <div class="btnGroup-btn cancel" @click="innerVisible = false">
              <span>{{ dialogAdd.cancel }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--操作指南-->
    <operation-guide v-show="infoMessageShow" @shutMe="infoMessageShow = false" v-operating/>
  </div>
</template>

<script>
  import {
    createTaskSetSoftware,
    createTaskSet
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
        taskType: 'profession',
        stepBtnActive: 1,           // 当前所在步骤 1.选择打包模板 2.设置打包参数 3.选择文件目录
        btn: {
          next: '下一步',
          previous: '上一步',
          confirm: '确认'
        },    // 按钮集合
        checkedSpan: ['已选择', '个场景文件'],
        stepOneBase: {              // 选择渲染文件

        },
        stepTwoBase: {},
        stepThreeBase: {},
        innerVisible: false,        // 添加模板
        // 添加模板窗口
        dialogAdd: {
          title: '添加模板',
          namePlaceholder: '输入模版名称',
          form: {
            labelName: '模板名称',
            valName: '',
            formatName: null,
            labelSoftware: '渲染软件',
            valSoftware: '',
            labelPlugin: '渲染插件',
            valPlugin: ''
          },
          // 渲染软件
          softwareList: [
            // {
            //   softName: 'Maya 2020',
            //   softList: [],
            //   children
            // }
          ],
          // 渲染插件下拉框
          pluginList: [
            // {
            //   label: 'mloa',
            //   val: 'mloa'
            // }
          ],
          o: '选择插件版本',
          n: '已选插件版本',
          // 插件版本
          oList: [
            // {
            //    id: 2
            //    pluginName: "Arnold"
            //    version: "2.233"
            //    publisher: "4K"
            //    pluginUuid: "457"
            //    createTime: "2020-03-31"
            //    createBy: "1"
            //    updateTime: "2020-03-31"
            //    updateBy: "1"
            //    dataStatus: 1
            //    status: false
            // }
          ],
          // 已选结果
          nList: [
            // {
            //   pluginUuid: '10011',
            //   pluginName: 'mloa',
            //   version: 'mloa 4.0.2',
            //   status: false
            // }
          ],
          cancel: '取消',
          save: '保存',
          // 【确定】标记编辑or新建
          editOrAdd: '',
          index: null      //编辑已存在模板时模板的索引
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
        },
        immediate: true
      }
    },
    methods: {
      // 2.设置渲染模板 - 添加模板 - 检验模板名格式
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
      // 0.关闭窗口
      closeDialogFun() {
        this.$emit('closeDialogFun', 'createDCPDialog')
        this.reset()
      },
      // 2.设置渲染模板 - 选择插件版本
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
      // 2.设置渲染模板 - 删除已选择插件结果
      deleteSeletedOption(item, index) {
        this.dialogAdd.oList.findIndex(curr => {
          if (item.pluginUuid == curr.pluginUuid)
            curr.status = false
          return item.pluginUuid == curr.pluginUuid
        })
        this.dialogAdd.nList.splice(index, 1)
      },
      // 2.设置渲染模板 - 获取渲染模板列表
      async getList() {
        let data = await createTaskSet()
        this.stepTwoBase.renderList = data.data.data
        this.stepTwoBase.renderListActive = data.data.data.findIndex(curr => curr.renderTemplate.isDefault == 1)
        // [
        //   {
        //     renderTemplate: {                       //模板
        //       id: 16
        //       createTime: 1586308643471
        //       createBy: "user42cd-82bb-44e7-9bc4-d6d046b5dff2"
        //       updateTime: 1586397047167
        //       updateBy: "user42cd-82bb-44e7-9bc4-d6d046b5dff2"
        //       templateUuid: "84168a1b-b32e-490c-854b-1590f756c28b"
        //       dataStatus: 1
        //       updateParamAfterAnalyse: null
        //       templateName: "用户4测试模板3"          //模板名称
        //       isDefault: 0                          //默认选中 0为非
        //       softName: "3dmax"                     //软件名
        //       softVer: "2021"                       //版本
        //       softNameVer: "3dmax2021"              //
        //       softUuid: "127"                       //软件编号
        //       customerUuid: "user42cd-82bb-44e7-9bc4-d6d046b5dff2"
        //     },
        //     xxlPlugins: [           模板插件
        //       {
        //         id: 1
        //         pluginName: "V-ray"              //插件名
        //         version: "1.233"                 //插件版本
        //         publisher: "2K"                  //插件发行商
        //         pluginUuid: "456"                //编号 唯一标识
        //         createTime: "2020-03-31"
        //         createBy: "1"
        //         updateTime: "2020-03-31"
        //         updateBy: "1"
        //         dataStatus: 1
        //       }
        //     ]
        //   }
        // ]
      },
      // 2.设置渲染模板 - 打开【新建模板】
      async addTemplate(s, index) {
        // 获取软件列表
        let data = await createTaskSetSoftware()
        this.dialogAdd.softwareList = data.data.data.map(curr => {   //options
          return {
            value: curr.softName,      //软件名
            label: curr.softName,
            children: curr.softList.map(curr_ => {
              return {
                label: curr_.softName + '-' + curr_.version,
                value: curr_.softUuid
              }
            })
            // children: [
            //   {
            //     value: 'shejiyuanze',
            //     label: '设计原则',
            //     children: [
            //       {
            //         value: 'yizhi',
            //         label: '一致'
            //       }
            //     ]
            //   }
            // ]       //软件版本
          }
        })
        // 打开弹窗
        this.innerVisible = true
        this.$nextTick(() => this.$refs.templateName.focus())
        this.dialogAdd.editOrAdd = s
        let v = this.dialogAdd
        if (s == 'addMore') {
          // 新建模板
          v.form.valSoftware = [v['softwareList'][0]['label'], v['softwareList'][0]['children'][0]['value']]
          this.changeSoftware([null, v['softwareList'][0]['children'][0]['value']], true)
        } else if (s == 'editOne') {
          // 编辑模板
          this.dialogAdd.index = index
          let t = this.stepTwoBase.renderList[index],   // 选中渲染模板data
            f = v.softwareList.find(curr => curr.label == t.renderTemplate.softName)  // 软件选中记录
          let b = f['children'].find(curr => curr.label == t.renderTemplate.softName + '-' + t.renderTemplate.softVer)   // 插件
          v.nList = t.xxlPlugins                                                // 导入已选中插件记录
          this.$data.dialogAdd.nList = t.xxlPlugins
          v.form.valName = t['renderTemplate']['templateName']                  // 编辑窗口内模板名
          if (!b) return false
          v.form.valSoftware = [t['renderTemplate']['softName'], b.value]       // 编辑窗口内渲染软件
          this.changeSoftware([t['renderTemplate']['softName'], b.value])   // 获取对应插件下拉框List
        }
      },
      // 2.设置渲染模板 - 删除模板
      deleteTemplate(index) {
        this.$confirm('删除后将无法找回，确认删除当前模板吗？', '提示信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false
        })
          .then(() => {
            createTaskSetDeletePlugin(this.stepTwoBase.renderList[index]['renderTemplate']['templateUuid'])
              .then(data => {
                this.getList()
                messageFun('success', '删除成功')
              })
          })
          .catch(() => messageFun('info', '已取消删除'))
      },
      // 2.设置渲染模板 - 软件下拉框选中
      async changeSoftware(val, defaultEvent) {
        let data = await createTaskSetPlugin(val[1])
        this.dialogAdd.pluginList = data.data.data.map(curr => {
          return {
            label: curr.pluginName,
            val: curr.pluginName,
            list: curr.pluginList
          }
        })
        this.dialogAdd.oList = []
        if (defaultEvent) {
          this.dialogAdd.form.valPlugin = this.dialogAdd.pluginList[0]['label']
          this.changePlugin(this.dialogAdd.pluginList[0]['label'])
        }
      },
      // 2.设置渲染模板 - 插件下拉框选中
      changePlugin(val) {
        // 匹配项
        let t = this.dialogAdd.pluginList.find(curr => curr.val == val)
        this.dialogAdd.oList = t.list.map(curr => {
          let r = this.dialogAdd.nList.findIndex(c => c.pluginName == curr.pluginName && c.version == curr.version)
          return {
            ...curr,
            status: r == -1 ? 'false' : 'true'
          }
        })
        // {
        //   id: '0001',
        //   software: 'mloa',
        //   plugin: 'mloa 4.0.2',
        //   status: false
        // }
        // t.list.map(curr => {
        // id: 2
        // pluginName: "Arnold"
        // version: "2.233"
        // publisher: "4K"
        // pluginUuid: "457"
        // createTime: "2020-03-31"
        // createBy: "1"
        // updateTime: "2020-03-31"
        // updateBy: "1"
        // dataStatus: 1
        // })
      },
      // 2.设置渲染模板 - 关闭【新建/编辑渲染模板窗口】
      closeAddTemplateDialog() {
        // 窗口数据初始化
        this.dialogAdd.form.valName = ''
        this.dialogAdd.form.valSoftware = ''
        this.dialogAdd.form.softwareList = []
        this.dialogAdd.form.valPlugin = ''
        this.dialogAdd.pluginList = []
        this.dialogAdd.oList = []
        this.dialogAdd.nList = []
      },
      // 数据复位
      reset() {

      }
    },
    mounted() {

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

    .btnGroup {
      height: 72px;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;

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
    }
  }
</style>
