<template>
  <div class="set-project">
    <div class="table-operate">
      <div class="btnGroup">
        <div :class='[item.class, {notTriggerable: item.triggerable}, "btn"]'
             v-for="(item,index) in btnGroup"
             @click="uploadOperating(item['text'])"
             :key="index">
          <img :src="item.initialIcon" v-if="item.initialIcon" class="btnIcon default">
          <img :src="item.selectedIcon" v-if="item.selectedIcon" class="btnIcon hover">
          <span>{{ item['text'] }}</span>
        </div>
      </div>
      <div class="searchInput">
          <input type="text"
                 class="input"
                 v-model="searchInputVal"
                 @keyup.enter="getData"
                 :placeholder="placeholder">
          <!--搜索按钮-->
          <img src="@/icons/global-search-icon.png"
               class="searchIcon"
               @click="getData">
      </div>
    </div>

    <hr>

    <div class="table">
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        style="width: 100%">

        <el-table-column
          type="selection"
          align="right"
          width="55"/>

        <el-table-column
          prop="projectName"
          label="项目名称"
          show-overflow-tooltip
          min-width="400"/>

        <el-table-column
          prop="projectStatus"
          label="项目状态"
          width="120"/>

        <el-table-column
          prop="isDefault"
          label="当前项目"
          width="120"/>

        <el-table-column
          prop="customerName"
          label="创建人"
          show-overflow-tooltip
          width="120"/>

        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180"
          show-overflow-tooltip/>

        <el-table-column
          width="200"
          label="操作">
          <template slot-scope="scope">
            <span class="operateBtn" @click="editItem(scope.$index)">{{ tableOperateBtn[0] }}</span>
            <span class="operateBtn" @click="setItem(scope.row.screenUuid)">{{ tableOperateBtn[1] }}</span>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :current-page.sync="page.index"
        @current-change="jump"
        :total="page.total">
      </el-pagination>
      <div class="refresh-btn" @click="getList('', 1, page.size)">
        <span>{{ $t('public.refresh') }}</span>
      </div>
    </div>

    <!--新建项目dialog-->
    <div class="createProject" v-show="createBaseShow">
      <div class="createBase">
        <div class="tit">
          <span>{{ createProject.tit }}</span>
          <img src="@/icons/shutDialogIcon.png" alt="" @click="createCancelBtnFun">
        </div>
        <div class="con">
          <input type="text"
                 class="name"
                 :class="[{'err': newNameErr}]"
                 @focus="newNameErr = false"
                 @keyup.enter="createSaveBtnFun"
                 v-model="createProject.name"
                 :placeholder="createProject.placeholder">
          <el-checkbox v-model="createProject.checked" true-label='1' false-label='0' label="设为当前项目"/>
          <div class="btn-group">
            <div class="farm-btn cancel" @click="createCancelBtnFun">
              <span>{{ btnCancel }}</span>
            </div>
            <div class="farm-btn save" :class="[{'cannotBeGo': verif}]" @click="createSaveBtnFun">
              <span>{{ btnSave }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--编辑项目dialog-->
    <div class="editProject" v-show="editBaseShow">
      <div class="editBase">
        <div class="tit">
          <span>{{ editProject.tit }}</span>
          <img src="@/icons/shutDialogIcon.png" alt="" @click="editCancelBtnFun">
        </div>
        <div class="con">
          <!--缩略图-->
          <div class="imgB">
            <!--            <div class="avatarEdit" @click="avatarEditFun"><span>{{ editAvatar }}</span></div>-->
            <!--            <img class="img" :src="editProject.thumbnail" alt="">-->
            <div class="avatarEdit"><span>{{ editAvatar }}</span></div>
            <img :src="editProject.thumbnail" class="avatar img">
            <el-upload
              action=""
              class="avatar-uploader avatarEdit"
              :show-file-list="false"
              :on-change="handleAvatarChange"
              :auto-upload="false">
              <img v-if="editProject.thumbnail" :src="editProject.thumbnail" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!--项目名称-->
          <div class="item">
            <span class="label">{{ editProject.nameL }}：</span>
            <input type="text"
                   class="name v"
                   :class="[{'err': editNameErr}]"
                   @focus="editNameErr = false"
                   @keyup.enter="editSaveBtnFun"
                   v-model="editProject.nameV">
          </div>
          <!--项目状态-->
          <div class="item">
            <span class="label">{{ editProject.statusL }}：</span>
            <el-select v-model="editProject.statusV" class="v" placeholder="请选择">
              <el-option
                v-for="item in editProject.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="btn-group">
            <div class="farm-btn cancel" @click="editCancelBtnFun">
              <span>{{ btnCancel }}</span>
            </div>
            <div class="farm-btn save"
                 :class="[{'cannotBeGo': editVerif}]"
                 @click="editSaveBtnFun">
              <span>{{ btnSave }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getObjectList,
    createTask,
    deleteTask,
    editTask,
    setDefault
  } from '@/api/set-api.js'
  import {
    messageFun,
    createDateFun
  } from '@/assets/common'

  export default {
    name: 'set-project',
    data() {
      return {
        newNameErr: false,     // 新建项目 项目名状态
        editNameErr: false,    // 编辑项目 项目名状态
        tableData: [],
        tableOperateBtn: ['编辑', '设为当前项目'],
        btnGroup: [
          {
            text: '新建项目',
            class: 'addMoreBtn',
            initialIcon: require('@/icons/addIcon-black.png'),
            selectedIcon: require('@/icons/addIcon-white.png')
          },
          {
            text: '删除',
            class: 'deleteBtn',
            initialIcon: require('@/icons/deleteIcon-black.png'),
            selectedIcon: require('@/icons/deleteIcon-white.png'),
            triggerable: true
          }
        ],
        searchInputVal: '',           // 检索关键字
        placeholder: '输入项目名称',
        createProject: {
          tit: '新建项目',
          name: '',
          checked: 0,
          placeholder: '请输入项目名称'
        },
        editProject: {
          tit: '编辑项目',
          nameL: '项目名称',
          nameV: '',
          statusL: '项目状态',
          statusV: null,
          thumbnail: null,
          screenUuid: null,
          options: [
            {
              value: 1,
              label: '启动'
            },
            {
              value: 0,
              label: '停用'
            }
          ]
        },
        createBaseShow: false,
        editBaseShow: false,
        selectionList: [],
        page: {
          index: 0,
          size: 10,
          total: 0
        },
        btnCancel: '取消',
        btnSave: '确定',
        editAvatar: '修改图片'
      }
    },
    watch: {
      'selectionList': {
        handler: function (val) {
          if (!val.length) this.btnGroup[1]['triggerable'] = true
          else this.btnGroup[1]['triggerable'] = false
        }
      }
    },
    methods: {
      handleAvatarChange(res, file) {
        const type = ['image/jpeg', 'image/jpg', 'image/png'],
          isType = type.some(t => t == res.raw.type),
          isLt2M = res.raw.size / 1024 / 1024 < 2
        if (!isType) this.$message.error('上传头像图片只能是 JPG JPEG PNG 格式!')
        else if (!isLt2M) this.$message.error('上传头像图片大小不能超过 2MB!')
        else this.editProject.thumbnail = window.URL.createObjectURL(res.raw)
      },
      handleSelectionChange(val) {
        this.selectionList = val
      },
      // 关键字搜索
      getData() {
        this.getList(this.searchInputVal, 1, this.page.size)
      },
      // 获得list
      async getList(keyword, pageIndex, pageSize) {
        let {data} = await getObjectList({
          keyword,
          pageIndex,
          pageSize,
          projectStatusList: [],
          sortBy: null,
          sortType: 0
        })
        if (data.code == 200) {
          this.page.total = data.total
          this.tableData = data.data.map(curr => {
            // {
            //   createBy: "1"
            //   createTime: 1586999761039
            //   customerUuid: "1"
            //   dataStatus: 1
            //   id: 1
            //   isDefault: 0
            //   projectName: "项目一"
            //   projectOverview: "这是一个测试项目"
            //   projectStatus: 1
            //   screenUuid: "1"
            //   thumbnail: null
            //   updateBy: "1"
            //   updateTime: 1591689369051
            // }
            return Object(curr, {
              'screenUuid': curr.screenUuid,
              'createTime': createDateFun(new Date(curr.updateTime)),
              'projectName': curr.projectName,
              'customerName': curr.customerName,
              'isDefault': curr.isDefault == 0 ? '否' : '是',
              'projectStatus': curr.projectStatus == 0 ? '停用' : '启用',
              'thumbnail': curr.thumbnail     // 缩略图
            })
          })
        } else messageFun('error', '获取数据失败')
      },
      // 新建项目 - 关闭
      createCancelBtnFun() {
        this.createProject.name = ''
        this.createBaseShow = false
      },
      // 新建项目 - 保存
      async createSaveBtnFun() {
        if (this.verif) return false
        let c = this.createProject,
          data = await createTask({
            'projectName': c.name,
            'isDefault': c.checked
          })

        if (data.data.code == 201) {
          messageFun('success', '创建成功')
          this.createBaseShow = false
          Object.assign(this.createProject, {
            name: null,
            checked: 0
          })
          this.getList('', 1, this.page.size)
          this.createCancelBtnFun()
        } else if (data.data.code == 101) {
          messageFun('info', '项目名已存在')
          this.newNameErr = true
        }
      },
      // 编辑项目 - 关闭
      editCancelBtnFun() {
        this.editBaseShow = false
      },
      // 编辑项目 - 保存
      async editSaveBtnFun() {
        let {nameV, statusV, screenUuid, thumbnail} = this.editProject
        if (this.editVerif) return false
        let {data} = await editTask({
          'projectName': nameV,
          'projectStatus': statusV,
          'screenUuid': screenUuid,
          'thumbnail': thumbnail
        })
        if (data.code == 201) {
          messageFun('success', '编辑成功')
          this.editBaseShow = false
          this.getList('', 1, this.page.size)
        } else if (data.code == 101) messageFun('info', '项目名已存在')
      },
      // 操作按钮
      uploadOperating(name) {
        switch (name) {
          case '新建项目':
            this.createProjectFun()
            break
          case '删除':
            if (!this.selectionList.length) return false
            this.deleteFun()
        }
      },
      // 新建项目
      createProjectFun() {
        this.createBaseShow = true
      },
      // 项目 - 编辑
      editItem(index) {
        this.editBaseShow = true
        let {screenUuid, thumbnail, projectName, projectStatus} = this.tableData[index]
        Object.assign(this.editProject, {
          nameV: projectName,
          statusV: projectStatus == '禁用' ? 0 : 1,
          thumbnail,
          screenUuid
        })
      },
      // 项目 - 设为当前项目
      async setItem(id) {
        let {data} = await setDefault({
          'screenUuid': id
        })
        if (data.code == 201) {
          messageFun('success', '设置成功')
          this.getList('', 1, this.page.size)
        }
      },
      // 删除
      deleteFun() {
        this.$confirm('项目删除后将无法找回，确认删除选中项目吗?', '提示信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            let {data} = await deleteTask(this.selectionList.map(curr => curr.screenUuid))
            if (data.code == 201) {
              messageFun('success', '操作成功')
              this.getList(this.searchInputVal, this.page.index, this.page.size)
            } else if (data.code == 1000) messageFun('error', '操作失败')
            else if (data.code == 10001) messageFun('error', '参数无效')
          })
      },
      // 跳页
      jump(val) {
        this.getList(this.searchInputVal, val, this.page.size)
      }
    },
    mounted() {
      this.getList('', 1, this.page.size)
    },
    computed: {
      verif() {
        return !!this.newNameErr || !this.createProject.name.trim()
      },
      editVerif() {
        return !!this.editNameErr || !this.editProject.nameV.trim()
      }
    }
  }
</script>

<style lang="less" scoped>
  .set-project {
    height: calc(100vh - 203px);
    padding: 10px;
  }

  .table-operate {
    margin: 0px;
  }

  hr{
    margin: 20px 0px;
  }

  .createProject,
  .editProject {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    user-select: none;

    .createBase,
    .editBase {
      background-color: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 6px 0px rgba(27, 83, 244, 0.15);
      border-radius: 8px;
      overflow: hidden;

      .tit {
        height: 36px;
        text-align: center;
        background-color: rgba(241, 244, 249, 1);
        box-shadow: 0px 1px 6px 0px rgba(27, 83, 244, 0.3);
        padding: 0px 30px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          font-size: 14px;
          font-weight: 600;
          color: rgba(22, 29, 37, 1);
        }

        img {
          cursor: pointer;
        }
      }

      .con {
        padding: 0px 30px;

        .name {
          height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(22, 29, 37, 0.4);
          background-color: transparent;
          outline: none;
          margin: 20px 0px;
          padding-left: 16px;
          box-sizing: border-box;
          color: rgba(22, 29, 37, 1);
        }

        .btn-group {
          margin-top: 30px;
          text-align: right;
          width: 100%;
        }
      }
    }

    .createBase {
      width: 500px;
      height: 220px;

      .con {
        .name {
          width: 100%;

          &.err {
            color: rgba(255, 62, 77, 1);
          }
        }
      }
    }

    .editBase {
      width: 398px;
      height: 455px;

      .con {
        padding: 0px 30px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .imgB {
          position: relative;
          width: 150px;
          height: 150px;
          border-radius: 4px;
          margin: 30px 0px;
          overflow: hidden;

          .img {
            width: 100%;
          }

          .avatarEdit {
            position: absolute;
            width: 150px;
            height: 150px;
            cursor: pointer;
            background-color: rgba(0, 0, 0, 0);
            text-align: center;

            span {
              font-size: 14px;
              line-height: 150px;
              color: rgba(255, 255, 255, 0);
            }
          }

          &:hover .avatarEdit {
            background-color: rgba(0, 0, 0, 0.7);

            span {
              color: rgba(255, 255, 255, 1);
            }
          }
        }

        .item {
          display: flex;
          width: 100%;
          align-items: center;
          margin-bottom: 15px;

          .label {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: rgba(22, 29, 37, 0.6);
          }

          .v {
            flex-grow: 1;
            margin: 0px;
            border: 1px solid rgba(22, 29, 37, 0.2);
            border-radius: 6px;
          }
        }
      }
    }
  }

  .notTriggerable,
  .notTriggerable:hover {
    cursor: no-drop;
    color: rgba(22, 29, 37, 0.29);
    background-color: rgba(255, 255, 255, 1);

    .default {
      display: inline-block;
      opacity: 0.29;
    }

    .hover {
      display: none;
    }
  }

  /deep/ .el-table .el-table__row:hover::after {
    display: none;
  }

  .avatar-uploader {
    opacity: 0;
    top: 0px;
    z-index: 9;
  }

  .table-operate {
    padding-left: 20px;
  }

  /deep/.el-table__body-wrapper {
    height: calc(100vh - 80px - 42px - 20px - 47px - 20px - 52px - 52px - 20px);
  }

  .operateBtn {
    color: #0061ff;
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;
    text-decoration: underline;
  }
</style>
