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
                 :key="index">
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
          <span style="font-size: 14px">设置打包参数</span>
        </div>
        <!--选择文件目录-->
        <div class="stepBody-item">
          <div class="wrapper-border setScollBarStyle">
            <!--图像目录-->
            <div class="fileTitle">{{ selectFileBase.directory[0] }}</div>
            <div class="fileItem" v-for="(item,index) in selectFileBase.imgFileList" :key="index">
              <label>{{ item.label }}：</label>
              <input type="text" disabled>
              <div class="btn"><span>{{ $t('public.preview') }}</span></div>
            </div>
            <!--声音目录-->
            <div class="fileTitle">{{ selectFileBase.directory[1] }}</div>
            <div class="fileItem" v-for="(item,index) in selectFileBase.mp3FileList" :key="index">
              <label>{{ item.label }}：</label>
              <input type="text" disabled>
              <div class="btn"><span>{{ $t('public.preview') }}</span></div>
            </div>
            <!--字幕目录-->
            <div class="fileTitle">{{ selectFileBase.directory[2] }}</div>
            <div class="fileItem" v-for="(item,index) in selectFileBase.subtitleFileList" :key="index">
              <label>{{ item.label }}：</label>
              <input type="text" disabled>
              <div class="btn"><span>{{ $t('public.preview') }}</span></div>
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
      :visible.sync="innerVisible"
      @close="closeAddTemplateDialog"
      append-to-body>
      <div class="dialog-header">
        <span class="title">{{ dialogAdd.title }}</span>
        <img src="@/icons/shutDialogIcon.png"
             @click="innerVisible = false"
             class="closeBtn">
      </div>
      <div class="dialog-body form">
        <!--模板名称-->
        <div class="item mini">
          <label for="tName" class="farm-label">{{ dialogAdd.nameL }}</label>
          <input type="text"
                 id="tName"
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
                     class="farm-select"
                     @change="changePlugin">
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
                     class="farm-select"
                     @change="changePlugin">
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
          <div class="btnGroup-btn previous" @click="innerVisible = false">
            <span>{{ $t('public.cancel') }}</span>
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
        setUnpackBase: {},
        // 选择文件目录
        selectFileBase: {
          directory: ['图像目录', '声音目录', '字幕目录'],
          imgFileList: [
            {
              label: '导入图像(左)',
              path: null
            },
            {
              label: '导入图像(右)',
              path: null
            }
          ],
          mp3FileList: [
            {
              label: '左声道',
              path: null
            },
            {
              label: '右声道',
              path: null
            },
            {
              label: '中置声道',
              path: null
            },
            {
              label: '左环绕',
              path: null
            },
            {
              label: '右环绕',
              path: null
            },
            {
              label: '左后环绕',
              path: null
            },
            {
              label: '右后环绕',
              path: null
            },
            {
              label: '低音炮',
              path: null
            }
          ],
          subtitleFileList: [
            {
              label: '导入字幕',
              path: null
            }
          ]
        },
        innerVisible: false,        // 添加模板
        // 添加模板窗口
        dialogAdd: {
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
        this.innerVisible = true
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
      // 1.设置渲染模板 - 软件下拉框选中
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
      // 1.设置渲染模板 - 插件下拉框选中
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
      // 1.设置渲染模板 - 关闭【新建/编辑渲染模板窗口】
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
      // 0.数据复位
      reset() {

      },
      // 3.保存
      confirmFun() {

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

          .wrapper-border {
            width: 100%;
            border: 1px solid rgba(22, 29, 37, 0.3);
            border-radius: 4px;
            overflow-y: scroll;
            padding: 30px;
          }

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
              margin-right: 23px;
              flex-grow: 1;
              border-radius: 6px;
              border: 1px solid rgba(22, 29, 37, 0.3);
              background-color: rgba(255, 255, 255, 1);
              height: 36px;
            }

            .btn {
              width: 54px;
              height: 32px;
              border-radius: 6px;
              border: 1px solid rgba(27, 83, 244, 0.3);
              text-align: center;
              cursor: pointer;

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
        }
      }
    }
  }

  .dialog-body {
    padding: 30px;

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

</style>
