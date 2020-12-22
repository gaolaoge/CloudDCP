<template>
  <div class="screen-tree">
    <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
      <el-tab-pane v-for="(item, index) in card" :key="index" :label="item"/>
    </el-tabs>
    <!--内部银幕-->
    <div class="screenW internal" v-show="activeName == 0">
      <!--操作-->
      <div class="search">
        <!--搜索框-->
        <input type="text" class="input"
               :placeholder="mineScreenPlaceholder"
               v-model="mineScreenKeyword"
               @keyup.enter="getMineScreenListNode">
        <img src="@/icons/search.png" class="icon search" @click="getMineScreenListNode">
        <!--添加-->
        <div class="addBase" @click="addNewInnerTreeG">
          <img src="@/icons/add.png" class="icon add default">
          <el-tooltip content="添加分组"
                      popper-class="default"
                      effect="dark"
                      placement="top">
            <img src="@/icons/add-hover.png" class="icon add hover">
          </el-tooltip>
        </div>
      </div>
      <!--树形结构-->
      <el-tree
        :props="props"
        :data="mineScreenListNode"
        :allow-drop="allowDrop"
        draggable>
        <span class="custom-tree-node" :key="node.id" slot-scope="{ node, data }"
              @click="$emit('selectMineScreen', {'type': 'mineScreen', data})">
          <div class="l">
            <img src="@/icons/filer.png" class="filer default">
            <img src="@/icons/filer-hover.png" class="filer hover">
            <span class="tree-node-span">{{ data.theatreName }}</span>
          </div>
          <el-popover
            placement="right-start"
            width="72"
            trigger="hover"
            :visible-arrow="false">
            <ul class="tree-node-operate-brnG">
              <li @click="deleteInnerTreeG(data.theatreUuid)"><span>{{ $t('public.delete') }}</span></li>
              <li @click="showRenameInnerTreeG(data)"><span>{{ $t('public.rename') }}</span></li>
            </ul>
            <div class="r" slot="reference">
              <span class="total">{{ data.screenCount }}</span>
              <img src="@/icons/operate-icon-white.png" class="operate-icon hover">
            </div>
          </el-popover>
        </span>
      </el-tree>
    </div>
    <!--院线银幕-->
    <div class="screenW cinema" v-if="refresh" v-show="activeName == 1">
      <!--操作-->
      <div class="search">
        <!--搜索框-->
        <input type="text" class="input"
               :placeholder="screenPlaceholder"
               v-model="screenKeyword"
               @keyup.enter="createKeywordTree">
        <img src="@/icons/search.png" class="icon search" @click="createKeywordTree">
        <!--添加-->
        <el-popover
          placement="right-end"
          width="120"
          trigger="hover"
          :visible-arrow="false">
          <!--院线-->
          <ul class="tree-node-operate-brnG">
            <li class="z" @click="addNewCinema.visible = true"><span>{{ addMineScreen.addCinema }}</span></li>
            <li class="z" @click="addNewTheatre.visible = true"><span>{{ addMineScreen.addTheatre }}</span></li>
            <li class="z" @click="addFromTem.visible = true"><span>{{ addMineScreen.selectFromTem }}</span></li>
          </ul>
          <div slot="reference">
            <div class="addBase">
              <img src="@/icons/add.png" class="icon add default">
              <img src="@/icons/add-hover.png" class="icon add hover">
            </div>
          </div>
        </el-popover>
      </div>
      <el-tree
        v-show="!showKeywordTree"
        :props="props2"
        :load="getScreenListNode"
        :allow-drop="allowDrop"
        @node-click="getThreateTab"
        lazy
        draggable>
        <span class="custom-tree-node" :key="node.id" slot-scope="{ node, data }">
          <!--院线-->
          <div class="l" v-if="node.level == 1">
            <img src="@/icons/filer.png" class="filer default">
            <img src="@/icons/filer-hover.png" class="filer hover">
            <span class="tree-node-span">{{ data.cinemaName }}</span>
          </div>
          <!--影院-->
          <div class="l theatre" v-if="node.level == 2">
            <img src="@/icons/movie-icon-black.png" class="filer default">
            <img src="@/icons/movie-icon-white.png" class="filer hover">
            <span class="tree-node-span">{{ data.theatreName }}</span>
          </div>
          <el-popover
            placement="right-start"
            width="72"
            trigger="hover"
            :visible-arrow="false">
            <!--院线-->
            <ul class="tree-node-operate-brnG" v-if="node.level == 1">
              <li @click="deleteCinemaTreeG(data.cinemaUuid)"><span>{{ $t('public.delete') }}</span></li>
              <li @click="showRenameInnerTreeG(data)"><span>{{ $t('public.rename') }}</span></li>
            </ul>
            <!--影院-->
            <ul class="tree-node-operate-brnG" v-if="node.level == 2">
              <li @click="deleteInnerTreeG(data.theatreUuid)"><span>{{ $t('public.delete') }}</span></li>
              <li @click="showRenameInnerTreeG(data)"><span>{{ $t('public.rename') }}</span></li>
            </ul>
            <div class="r" slot="reference">
              <span v-if="node.level == 2" class="total">{{ data.screenCount }}</span>
              <img src="@/icons/operate-icon-white.png" class="operate-icon hover">
            </div>
          </el-popover>
        </span>
      </el-tree>
      <el-tree
        v-show="showKeywordTree"
        :data="keywordTree"
        :default-expand-all="true"
        @node-click="getThreateTab">
        <span class="custom-tree-node" :key="node.id" slot-scope="{ node, data }">
          <!--院线-->
          <div class="l" v-if="data.class == 'cinema'">
            <img src="@/icons/filer.png" class="filer default">
            <img src="@/icons/filer-hover.png" class="filer hover">
            <span class="tree-node-span">{{ data.cinemaName }}</span>
          </div>
          <!--影院-->
          <div class="l theatre" v-if="data.class == 'theatre'">
            <img src="@/icons/movie-icon-black.png" class="filer default">
            <img src="@/icons/movie-icon-white.png" class="filer hover">
            <span class="tree-node-span">{{ data.theatreName }}</span>
          </div>
          <el-popover
            placement="right-start"
            width="72"
            trigger="hover"
            :visible-arrow="false">
            <!--院线-->
            <ul class="tree-node-operate-brnG" v-if="data.class == 'cinema'">
              <li @click="deleteCinemaTreeG(data.cinemaUuid)"><span>{{ $t('public.delete') }}</span></li>
              <li @click="showRenameInnerTreeG(data)"><span>{{ $t('public.rename') }}</span></li>
            </ul>
            <!--影院-->
            <ul class="tree-node-operate-brnG" v-if="data.class == 'theatre'">
              <li @click="deleteInnerTreeG(data.cinemaUuid)"><span>{{ $t('public.delete') }}</span></li>
              <li @click="showRenameInnerTreeG(data)"><span>{{ $t('public.rename') }}</span></li>
            </ul>
            <div class="r" slot="reference">
              <span v-if="data.class == 'theatre'" class="total">{{ data.screenCount }}</span>
              <img src="@/icons/operate-icon-white.png" class="operate-icon hover">
            </div>
          </el-popover>
        </span>
      </el-tree>
    </div>
    <!--添加分组-->
    <el-dialog
      top="0px"
      :append-to-body="true"
      :visible.sync="addMineScreen.visible"
      :destroy-on-close="true"
      width="380px">
      <div class="dialog-header">
        <span class="title" v-if="addMineScreen.addOrEdit == 'add'">{{ addMineScreen.titleA }}</span>
        <span class="title" v-if="addMineScreen.addOrEdit == 'edit'">{{ addMineScreen.titleE }}</span>
        <img src="@/icons/shutDialogIcon.png"
             @click="addMineScreen.visible = false"
             class="closeBtn">
      </div>
      <div class="dialog-body form" style="box-sizing: border-box; padding: 20px 20px">
        <div class="item" style="padding-bottom: 40px">
          <input type="text"
                 class="farm-input addMineScreenInput"
                 :placeholder="addMineScreen.placeholder"
                 v-model="addMineScreen.input"
                 @keyup.enter="addMineScreen.addOrEdit == 'add' ? addMineScreenGroupFun() : renameInnerTreeG()"
                 @input="verifAddMineScreenName(true)"
                 @blur="verifAddMineScreenName(false)"
                 @focus="addMineScreen.status = null">
          <span class="warnInfo" v-show="addMineScreen.status === false">
            {{ addMineScreen.warnInfo }}
          </span>
        </div>
        <div class="dialog-btn-group">
          <div class="dialog-btn cancel" @click="addMineScreen.visible = false">
            <span>{{ $t('public.cancel') }}</span>
          </div>
          <div :class="[{'cannotBeGo': !addMineScreen.status}, 'dialog-btn', 'save']"
               v-if="addMineScreen.addOrEdit == 'add'"
               @click="addMineScreenGroupFun">
            <span>{{ $t('public.save') }}</span>
          </div>
          <div :class="[{'cannotBeGo': !addMineScreen.status}, 'dialog-btn', 'save']"
               v-if="addMineScreen.addOrEdit == 'edit'"
               @click="renameInnerTreeG">
            <span>{{ $t('public.save') }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--添加院线-->
    <el-dialog
      :append-to-body="true"
      :visible.sync="addNewCinema.visible"
      :destroy-on-close="true"
      top="0px"
      width="380px">
      <div class="dialog-header">
        <span class="title">{{ addNewCinema.title }}</span>
        <img src="@/icons/shutDialogIcon.png"
             @click="addNewCinema.visible = false"
             class="closeBtn">
      </div>
      <div class="dialog-body form" style="box-sizing: border-box; padding: 20px 20px">
        <div class="item" style="padding-bottom: 40px">
          <span class="item-title">{{ addNewCinema.label }}：</span>
          <input type="text"
                 class="farm-input addMineScreenInput"
                 :placeholder="addNewCinema.placeholder"
                 v-model="addNewCinema.input"
                 @keyup.enter="addMineScreenGroupFun"
                 @input="verifNewCinemaName(true)"
                 @blur="verifNewCinemaName(false)"
                 @focus="addNewCinema.status = null">
          <span class="warnInfo" v-show="addNewCinema.status === false">
            {{ addNewCinema.warnInfo }}
          </span>
        </div>
        <div class="dialog-btn-group">
          <div class="dialog-btn cancel" @click="addNewCinema.visible = false">
            <span>{{ $t('public.cancel') }}</span>
          </div>
          <div :class="[{'cannotBeGo': !addNewCinema.status}, 'dialog-btn', 'save']"
               @click="addNewCinemaFun">
            <span>{{ $t('public.save') }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--添加影院-->
    <el-dialog
      :append-to-body="true"
      :visible.sync="addNewTheatre.visible"
      :destroy-on-close="true"
      top="0px"
      width="380px">
      <div class="dialog-header">
        <span class="title">{{ addNewTheatre.title }}</span>
        <img src="@/icons/shutDialogIcon.png"
             @click="addNewTheatre.visible = false"
             class="closeBtn">
      </div>
      <div class="dialog-body form z" style="box-sizing: border-box; padding: 20px 20px">
        <div class="item">
          <span class="item-title">{{ addNewTheatre.label1 }}：</span>
          <el-select v-model="selectCinemaUuid" placeholder="请选择">
            <el-option
              v-for="item in cinemaList"
              :key="item.value"
              :label="item.cinemaName"
              :value="item.cinemaUuid">
            </el-option>
          </el-select>
        </div>
        <div class="item" style="padding-bottom: 40px">
          <span class="item-title">{{ addNewTheatre.label2 }}：</span>
          <input type="text"
                 class="farm-input addMineScreenInput"
                 :placeholder="addNewTheatre.placeholder"
                 v-model="addNewTheatre.input"
                 @keyup.enter="addMineScreenGroupFun"
                 @input="verifAddCinemaName(true)"
                 @blur="verifAddCinemaName(false)"
                 @focus="addNewTheatre.status = null">
          <span class="warnInfo" v-show="addNewTheatre.status === false">
            {{ addNewTheatre.warnInfo }}
          </span>
        </div>
        <div class="dialog-btn-group">
          <div class="dialog-btn cancel" @click="addNewTheatre.visible = false">
            <span>{{ $t('public.cancel') }}</span>
          </div>
          <div :class="[{'cannotBeGo': !addNewTheatre.status || !selectCinemaUuid}, 'dialog-btn', 'save']"
               @click="addNewTheatreF">
            <span>{{ $t('public.save') }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--从模板中选择-->
    <el-dialog
      :append-to-body="true"
      :visible.sync="addFromTem.visible"
      :destroy-on-close="true"
      top="0px"
      width="380px">
      <div class="dialog-header">
        <span class="title">{{ addFromTem.title }}</span>
        <img src="@/icons/shutDialogIcon.png"
             @click="addFromTem.visible = false"
             class="closeBtn">
      </div>
      <div class="dialog-body form" style="box-sizing: border-box; padding: 20px 20px">
        <div class="item" style="padding-bottom: 40px">
          <input type="text"
                 class="farm-input addMineScreenInput"
                 :placeholder="addFromTem.placeholder"
                 v-model="addFromTem.input"
                 @keyup.enter="addMineScreenGroupFun"
                 @input="verifAddMineScreenName(true)"
                 @blur="verifAddMineScreenName(false)"
                 @focus="addFromTem.status = null">
          <span class="warnInfo" v-show="addFromTem.status === false">
            {{ addFromTem.warnInfo }}
          </span>
        </div>
        <div class="dialog-btn-group">
          <div class="dialog-btn cancel" @click="addFromTem.visible = false">
            <span>{{ $t('public.cancel') }}</span>
          </div>
          <div :class="[{'cannotBeGo': !addFromTem.status}, 'dialog-btn', 'save']"
               @click="renameInnerTreeG">
            <span>{{ $t('public.save') }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getMineScreenList,
    addNewScreenGroup,
    addNewCScreenGroup,
    addNewCinema,
    verifNewCinema,
    deleteMineScreenG,
    renameMineScreenG,
    getCinemaGList,
    getTheatreList,
    deleteCinemaG,
    searchCinemaKey,
    renameCinemaScreenG
  } from '@/api/screen-api'
  import {
    messageFun,
    transformParameterT
  } from '../../assets/common'

  export default {
    name: 'screenTree',
    data() {
      return {
        addMineScreen: {
          addOrEdit: null,   // 'add' or 'edit'
          visible: false,
          titleA: '添加',
          titleE: '重命名',
          addCinema: '添加院线',
          addTheatre: '添加影院',
          selectFromTem: '从模板库中选择',
          placeholder: '请输入分组名称',
          theatreUuid: null,
          input: '',
          status: null,
          warnInfo: '',
          addMineScreen: false      // 若重命名窗口属于【院线】则打开
        },
        addNewCinema: {
          visible: false,
          title: '添加院线',
          label: '院线名称',
          placeholder: '',
          input: '',
          status: null,
          warnInfo: ''
        },
        addNewTheatre: {
          visible: false,
          title: '添加影院',
          label1: '院线名称',
          label2: '影院名称',
          placeholder: '',
          input: '',
          status: null,
          warnInfo: ''
        },
        addFromTem: {
          visible: false,
          title: '从模板库中选择',
          placeholder: '',
          input: '',
          status: null,
          warnInfo: ''
        },
        mineScreenListNode: [],
        // screenListNode: [],
        mineScreenPlaceholder: '输入分组名称',
        mineScreenKeyword: '',
        screenPlaceholder: '输入院线/影院名称',
        screenKeyword: '',
        props: {
          label: 'theatreName'
        },
        props2: {
          label: 'theatreName',
          children: 'zones',
          isLeaf: 'leaf'
        },
        card: ['内部银幕', '院线银幕'],
        activeName: '0',
        cinemaList: [],
        selectCinemaUuid: '',
        refresh: true,
        selectedCinemaUuid: null,
        keywordTree: [],
        showKeywordTree: false
      }
    },
    methods: {
      // 影院结构 - 关键字检索
      async createKeywordTree() {
        let {screenKeyword} = this
        if (!screenKeyword.trim()) this.showKeywordTree = false
        else {
          let {data} = await searchCinemaKey(transformParameterT({
            'keyword': screenKeyword
          }))
          if (data.code == 200) {
            this.showKeywordTree = true
            this.keywordTree = data.data.map(({cinemaUuid, cinemaName, theatreResultDTOList}) => {
              return {
                cinemaUuid,
                cinemaName,
                'class': 'cinema',
                'children': theatreResultDTOList ? theatreResultDTOList.map(({theatreUuid, theatreName, screenCount}) => {
                  return {
                    theatreUuid,
                    theatreName,
                    screenCount,
                    'class': 'theatre'
                  }
                }) : []
              }
            })
          }
        }
      },
      // 拖拽事件预判
      allowDrop(draggingNode, dropNode, type) {
        return type !== 'inner'
      },
      //
      handleClick() {

      },
      // 校验新院线名是否存在
      async verifNewCinemaName(ing) {
        let {addNewCinema} = this
        if (!addNewCinema.input.trim()) return false
        if (!addNewCinema.input.trim().length > 50) {
          addNewCinema.status = false
          addNewCinema.warnInfo = '最多输入50个字符'
          return false
        }
        let {data} = await verifNewCinema(transformParameterT({
          'cinemaName': addNewCinema.input
        }))
        if (data.code == 200) addNewCinema.status = true
        else if (ing) addNewCinema.status = null
        else {
          addNewCinema.status = false
          addNewCinema.warnInfo = '院线已存在，请重新输入'
        }
      },
      // 【院线银幕】刷新
      refreshTree() {
        this.refresh = false
        this.$nextTick(function () {
          this.refresh = true
        })
      },
      // 【院线银幕】添加院线
      async addNewCinemaFun() {
        let {status, input} = this.addNewCinema
        if (!status) return false
        let {data} = await addNewCinema({
          'cinemaName': input
        })
        if (data.code == 201) {
          messageFun('success', '操作成功')
          Object.assign(this.addNewCinema, {
            'status': null,
            'input': '',
            'visible': false
          })
          this.refreshTree()
        }
      },
      // 【院线银幕】获取银幕tab
      getThreateTab(data, node) {
        this.$emit('selectMineScreen', {
          'type': 'threateScreen',
          'data': {
            'cinemaUuid': node.data.cinemaUuid,
            'theatreUuid': node.data.theatreUuid || null
          }
        })
      },
      // 【院线银幕】删除分组
      deleteCinemaTreeG(cinemaUuid) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            let {data} = await deleteCinemaG(cinemaUuid)
            if (data.code == 204) {
              messageFun('success', '操作成功！')
              this.refreshTree()
            } else if (data.code == 1000) messageFun('info', data.msg)
          })
      },
      // 【院线银幕】获取结构
      async getScreenListNode(node, resolve) {
        if (node.level == 0) {
          let {data} = await getCinemaGList()
          if (data.code == 200) {
            this.cinemaList = data.data
            resolve(data.data)
          } else resolve([])
        } else if (node.level == 1) {
          this.selectedCinemaUuid = node.data.cinemaUuid
          let {data} = await getTheatreList(node.data.cinemaUuid)
          if (data.code == 200) resolve(data.data.map(item => Object.assign(item, {
            'leaf': true
          })))
          else resolve([])
        }
      },
      // 【院线银幕】添加影院
      async addNewTheatreF() {
        let {status, input} = this.addNewTheatre
        if (!status) return false
        let {data} = await addNewCScreenGroup({
          'cinemaUuid': this.selectCinemaUuid,
          'theatreName': input
        })
        if (data.code == 200) {
          messageFun('success', '操作成功')
          this.addNewTheatre.visible = false
          this.refreshTree()
        }
      },
      // 【院线银幕】验证【添加影院】name 格式
      async verifAddCinemaName(ing) {
        let {input} = this.addNewTheatre,
          {addNewTheatre} = this
        if (!input.trim()) {
          ing ? addNewTheatre.status = null : addNewTheatre.status = false
        } else if (input.trim().length > 50) {
          addNewTheatre.status = false
          addNewTheatre.warnInfo = '最多输入50个字符'
        } else addNewTheatre.status = true
      },
      // 【内部银幕】获取结构
      async getMineScreenListNode() {
        let {data} = await getMineScreenList(this.mineScreenKeyword)
        if (data.code == 200) this.mineScreenListNode = data.data
        else this.mineScreenListNode = []
      },
      // 【内部银幕】验证【添加分组】name 格式
      async verifAddMineScreenName(ing) {
        let {input} = this.addMineScreen,
          {addMineScreen} = this
        if (!input.trim()) {
          ing ? addMineScreen.status = null : addMineScreen.status = false
        } else if (input.trim().length > 50) {
          addMineScreen.status = false
          addMineScreen.warnInfo = '最多输入50个字符'
        } else addMineScreen.status = true
      },
      // 【内部银幕】【添加分组】 - 确定
      async addMineScreenGroupFun() {
        if (!this.addMineScreen.status) return false
        let {activeName, addMineScreen} = this,
          {data} = await addNewScreenGroup({'groupName': addMineScreen.input})
        if (data.code == 201) {
          messageFun('success', '操作成功！')
          addMineScreen.visible = false
          this.mineScreenKeyword = ''
          addMineScreen.input = ''
          if (activeName == 0) this.getMineScreenListNode()
        } else if (data.code == 1000) {
          messageFun('info', '分组名已存在，请重新输入')
          addMineScreen.status = false
          addMineScreen.warnInfo = '分组名已存在，请重新输入'
        }
      },
      // 【内部银幕】删除分组
      deleteInnerTreeG(theatreUuid) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            let {data} = await deleteMineScreenG(theatreUuid)
            if (data.code == 204) {
              messageFun('success', '操作成功！')
              this.activeName == 0 ? this.getMineScreenListNode() : this.refreshTree()
            } else if (data.code == 1000) messageFun('info', data.msg)
          })
      },
      // 【内部银幕】显示【重命名分组】窗口
      showRenameInnerTreeG(data) {
        let {addMineScreen} = this
        addMineScreen.visible = true
        addMineScreen.addOrEdit = 'edit'
        if ('theatreName' in data) {
          addMineScreen.input = data.theatreName
          addMineScreen.theatreUuid = data.theatreUuid
          addMineScreen.addMineScreen = false
        } else {
          addMineScreen.input = data.cinemaName
          addMineScreen.theatreUuid = data.cinemaUuid
          addMineScreen.addMineScreen = true
        }
        addMineScreen.status = true
      },
      // 【内部银幕】- 重命名分组
      async renameInnerTreeG() {
        let {theatreUuid, input, addMineScreen} = this.addMineScreen
        let {data} = addMineScreen ? await renameCinemaScreenG({
          'cinemaUuid': theatreUuid,
          'cinemaName': input
        }) : await renameMineScreenG({
          theatreUuid,
          'theatreName': input
        })
        if (data.code == 201 || data.code == 200) {
          messageFun('success', '操作成功')
          this.addMineScreen.visible = false
          this.refreshTree()
        } else if (data.code == 101) messageFun('info', data.msg)
        else if (data.code == 1000) {
          messageFun('info', data.msg)
          this.addMineScreen.visible = false
        }
      },
      // 【内部银幕】添加分组
      addNewInnerTreeG() {
        let {addMineScreen} = this
        addMineScreen.visible = true
        addMineScreen.addOrEdit = 'add'
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.getMineScreenListNode()
        // this.getScreenListNode()
      })
    },
    watch: {
      'activeName': {
        handler: function (num) {
          if (num == 0) this.$emit('mineScreen', {
            'type': 'threateScreen',
            'data': {'theatreUuid': null}
          })
          else this.$emit('selectMineScreen', {
            'type': 'threateScreen',
            'data': {'theatreUuid': null}
          })
        }
      },
      'addMineScreen.visible': {
        handler: function (boolean) {
          if (!boolean) Object.assign(this.addMineScreen, {
            'input': '',
            'theatreUuid': ''
          })
        }
      },
      'addNewTheatre.visible': {
        handler: function (boolean) {
          if (boolean) {
            if (this.selectedCinemaUuid) this.selectCinemaUuid = this.selectedCinemaUuid
            this.addNewTheatre.input = ''
            this.addNewTheatre.status = null
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .screen-tree {
    position: relative;
    overflow: hidden;
    z-index: 2;
    width: 212px;
    padding: 0px 10px;
    box-sizing: border-box;
    box-shadow: 2px 0px 12px 0px rgba(27, 83, 244, 0.08);

    .screenW {
      font-size: 14px;

      .search {
        position: relative;
        border-bottom: 1px solid rgba(22, 29, 37, 0.11);

        .input {
          height: 34px;
          border: 0px;
          outline: none;
          width: 100%;
          padding-left: 36px;
        }

        .addBase {
          .add.hover {
            display: none;
          }

          &:hover {
            .add.hover {
              display: inline-block;
            }

            .add.default {
              display: none;
            }
          }
        }

        .icon {
          position: absolute;
          cursor: pointer;

          &.add {
            top: 10px;
            right: 16px;
          }

          &.search {
            top: 10px;
            left: 16px;
          }
        }
      }

      .custom-tree-node {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-radius: 4px;
        padding: 0px 16px;
        height: 40px;

        .r {
          display: inline-flex;
          align-items: center;
          height: 46px;

          & > span {
            display: inline-flex;
            align-items: center;
          }

          .total {
            font-size: 14px;
            display: inline-flex;
            margin-right: 4px;
          }

          img.operate-icon {
            cursor: pointer !important;
            margin-right: 10px;
            margin-left: 4px;
          }
        }

        .l {
          display: flex;
          flex-direction: row;
          align-items: center;

          .filer {
            margin-right: 8px;
            width: 12px;
          }
        }

        img.hover {
          display: none;
        }
      }

      &.internal,
      &.cinema {
        /deep/ .is-leaf {
          display: none;
        }
      }

      /deep/ .el-tree-node:focus > .el-tree-node__content {
        background-color: rgba(27, 83, 244, 0.8);

        .total,
        .tree-node-span {
          color: rgba(255, 255, 255, 1);
        }

        .default {
          display: none;
        }

        .hover {
          display: inline-block;
        }
      }

      &.cinema {
        .custom-tree-node {
          position: absolute;
          right: 0px;
          width: calc(100% - 40px);
          padding-left: 0px;
        }

        .theatre {
          padding-left: 14px;
        }
      }
    }

    .dialog-body {
      display: flex;
      justify-content: center;

      .item {
        margin-bottom: 60px;
      }

      .addMineScreenInput {
        margin-top: 10px;
        width: 320px;
        height: 36px;
        border-radius: 6px;
        border: 1px solid rgba(22, 29, 37, 0.2);
        outline: none;
        padding-left: 16px;
      }
    }
  }

  .tree-node-operate-brnG {
    width: 100%;
    padding: 10px 0px;
    overflow: hidden;

    li {
      list-style: none;
      height: 33px;
      line-height: 33px;
      cursor: pointer;
      padding: 0px 10px;

      &.z {
        width: 100%;
      }

      &:hover {
        background-color: rgba(241, 244, 249, 1);
      }
    }
  }

  /deep/ .el-tabs__item {
    line-height: 50px;
    height: 50px;
  }

  .form .item .warnInfo {
    bottom: initial;
    top: 44px;
  }

  .item-title {
    font-size: 14px;
    color: rgba(22, 29, 37, 0.8);
    width: 100px;
  }

  /deep/ .el-select {
    width: 100%;
    height: 40px;
    border: 1px solid rgba(22, 29, 37, 0.2);
    border-radius: 6px;
    outline: none;

    .el-input,
    .el-input__inner {
      height: 100%;
      outline: none;
    }
  }

</style>
