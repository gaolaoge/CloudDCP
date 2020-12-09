<template>
  <div class="selectScreenFromAdmin">
    <div class="win wrapper-border setScollBarStyle">
      <div class="table-operate">
        <div class="searchInput">
          <input type="text"
                 class="input"
                 v-model="keyword"
                 @keyup.enter="getList"
                 :placeholder="placeholder">
          <!--搜索按钮-->
          <img src="@/icons/global-search-icon.png"
               class="searchIcon"
               @click="getList">
        </div>
        <div class="radioGroup">
          <el-radio v-model="screenType" label="internalScreen">{{ internalScreen }}</el-radio>
          <el-radio v-model="screenType" label="theaterScreen">{{ theaterScreen }}</el-radio>
        </div>
      </div>
      <div class="treeTabs">
        <!--内部银幕-->
        <div class="internalScreenTab" v-show="screenType == 'internalScreen'">
          <el-tree
            :props="props"
            :load="loadNode"
            lazy>
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <!--分组-->
              <span class="tree-node-span" v-if="!data.leaf">
                {{ data.theatreName }} ({{ data.screenCount }})
              </span>
              <span class="tree-node-operate" v-if="!data.leaf">
                <el-checkbox :indeterminate="checkedList[data.index]['checkAll']"
                             v-model="checkedList[data.index]['checkAll']"
                             @change="checkAllScreen(data.index)"/>
                <span>{{ $t('public.selectAll') }}</span>
              </span>
              <!--银幕-->
              <span class="tree-node-span screenName"
                    :title="data.screenName"
                    v-if="data.leaf">{{ data.screenName }}</span>
              <span class="tree-node-span certificateName"
                    :title="data.certificateName"
                    v-if="data.leaf">{{ data.certificateName }}</span>
              <span class="tree-node-operate" v-if="data.leaf">
                <el-checkbox v-model="checkedList[data.fatherIndex]['checkItemList']"
                             @change="checkItemScreen(checkedList[data.fatherIndex])"
                             :label="data.screenUuid"><span style="display: none"/></el-checkbox>
              </span>
            </span>
          </el-tree>
        </div>
        <!--院线银幕-->
        <div class="theaterScreenTab" v-show="screenType == 'theaterScreen'">
          <el-tree
            :props="props"
            :load="loadTNode"
            lazy>
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <!--院线-->
              <div v-if="node.level == 1" class="box">
                <span class="tree-node-span">
                  <img src="@/icons/filter.png" class="filterIcon">
                  {{ data.cinemaName }}
                </span>
                <span class="tree-node-operate">
                  <el-checkbox :indeterminate="cinemaCheckedList[data.index]['checkAll']"
                               v-model="cinemaCheckedList[data.index]['checkAll']"
                               @change="cinemaCheckAllScreen(data)"/>
                  <span class="">{{ $t('public.selectAll') }}</span>
                </span>
              </div>
              <!--影院-->
              <div v-if="node.level == 2" class="box">
                <span class="tree-node-span">
                  <img src="@/icons/filter.png" class="filterIcon">
                  {{ data.theatreName }} ({{ data.screenCount }})
                </span>
                <span class="tree-node-operate">
                  <el-checkbox
                    :indeterminate="cinemaCheckedList[data.fromCinemaIndex]['theatreItemList'][data.selfIndex]['checkAll']"
                    v-model="cinemaCheckedList[data.fromCinemaIndex]['theatreItemList'][data.selfIndex]['checkAll']"
                    @change="cinemaCheckAllScreen(data)"/>
                </span>
              </div>
              <!--银幕-->
              <div v-if="node.level == 3" class="box">
                <span class="tree-node-span screenName">{{ data.screenName }}</span>
                <span class="tree-node-span certificateName">{{ data.certificateName }}</span>
                <span class="tree-node-operate">
                  <el-checkbox
                    v-model="cinemaCheckedList[data.fromCinemaIndex]['theatreItemList'][data.fromTheatreIndex]['checkItemList']"
                    :label="data.screenUuid"
                    @change="checkScreen(data)"><span/></el-checkbox>
                </span>
              </div>
            </span>
          </el-tree>
        </div>
      </div>
    </div>
    <div class="bottomOperate">
      <div class="back" @click="$emit('selectByLocal')">
        <img src="@/icons/toUploadTab.png" class="icon">
        <span class="text">{{ backText.fromLocal }}</span>
      </div>
      <div class="dialog-btn-group rightOperate">
        <div class="totalText">
          <!--已选择n个场景-->
          <span class="internalScrSelText">
            {{ bottomOperate.selectedText1 }}
            <span class="internalScrSelTotal">
              {{ screenType == 'internalScreen' ? internalScrSelTotal : cinemaScrSelTotal }}
            </span>
            {{ bottomOperate.selectedText2 }}
          </span>
          <!--下一步-->
          <div
            :class="[{'cannotBeGo': (!internalScrSelTotal && screenType == 'internalScreen') || (!cinemaScrSelTotal && screenType == 'theaterScreen')}, 'dialog-btn', 'save']"
            @click="nextFun">
            <span>{{ $t('public.nextStop') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getInternalScrGroup,
    getInternalScrList,
    getCinemaList,
    getTheatreList
  } from '@/api/addOne-api'
  import {
    messageFun,
    throwInfoFun
  } from '../../../assets/common'

  export default {
    name: 'selectScreenFromAdmin',
    data() {
      return {
        internalScreen: '内部银幕',
        theaterScreen: '院线银幕',
        screenType: 'internalScreen',
        placeholder: '输入分组名称、银幕名称',
        keyword: '',
        props: {
          label: 'theatreName',
          children: 'zones',
          isLeaf: 'leaf'
        },
        checkedList: [
          // {
          //   theatreUuid,        // 分组ID
          //   checkAll: false,    // 分组全选状态
          //   acquired: false,    // 分组内荧幕是否已被加载
          //   itemList: [],       // 分组内银幕列表
          //   checkItemList: []   // 分组内被选中银幕
          // }
        ],                         // 内部银幕 - 银幕分组结构和即时状态
        cinemaCheckedList: [
          // {
          //   cinemaUuid,         // 院线ID
          //   checkAll: false,    // 分组全选状态
          //   acquired: false,    // 分组内荧幕是否已被加载
          //   checkItemList: [],  // 分组内被选中影院
          //   theatreItemList: [
          //    {
          //      theatreUuid,        // 影院ID
          //      checkAll: false,    // 分组全选状态
          //      acquired: false,    // 分组内荧幕是否已被加载
          //      checkItemList: []   // 分组内被选中银幕
          //    }
          //   ] // 影院列表
          // }
        ],                         // 院线分组结构和即时状态
        adminTreeResolve: null,    // 内部银幕 - 系统tree回调函数
        checkAll_ing: false,       // 内部银幕 - 全选指令（加载并展开分组时是否需要全选动作）
        btn: '去选择',
        backText: {
          fromLocal: '从我的电脑选择',
        },
        bottomOperate: {
          selectedText1: '已选择',
          selectedText2: '个银幕'
        }
      }
    },
    methods: {
      // 获取【院线银幕】
      async loadTNode(node, fillNode) {
        let {keyword} = this
        // 获取【院线列表】
        if (node.level == 0) {
          let {data} = await getCinemaList(keyword)
          // 进行tree结构进行备份
          this.cinemaCheckedList = new Array(data.data.length).fill(undefined).map((cinema, index) => new Object({
            cinemaUuid: null,
            checkAll: false,
            acquired: false,
            checkItemList: [],
            theatreItemList: [],
            callback: null,
            index
          }))
          // 填充 tree院线列表
          fillNode(data.data.map((item, index) => {
            this.cinemaCheckedList[index]['cinemaUuid'] = item['cinemaUuid']     // 补充tree数据备份
            return Object.assign(item, {
              'leaf': false,       // 是否为根节点
              'type': 'cinema',
              index
            })
          }))
        } else if (node.level == 1) {
          // 获取影院列表
          let {index} = node.data   // 院线的索引
          // 创建 Promise 以预备【获取影院列表】事件触发在对【影院】的全选动作
          // 对每一个tree影院节点预留 Promise 事件位置，确保如此以防止回调触发混乱
          this.cinemaCheckedList[index]['callback'] = new Promise(async canBeSelectAllF => {
            let {data} = await getTheatreList(keyword, node.data.cinemaUuid)
            this.cinemaCheckedList[index]['acquired'] = true   // 标记此tree院线节点下【影院列表】已被获取
            // 进行tree结构进行备份
            this.cinemaCheckedList[index]['theatreItemList'] = new Array(data.data.length).fill(undefined).map((theatre, selfIndex) => new Object({
              theatreUuid: null,           // 影院Uuid
              checkAll: false,             // 是否在全选状态
              acquired: false,             // 影院下【荧幕列表】是否已被获取
              checkItemList: [],           // 影院下【荧幕】选中结果
              screenList: [],              // 影院下【荧幕列表】
              screenLength: 0,             // 影院下银幕数量
              callback: null,              // 预留获取【荧幕列表】的 Promise
              fromCinemaIndex: index,      // 所在院线的索引
              selfIndex                    // 自身在院线内的索引
            }))
            // 填充tree影院节点
            fillNode(data.data.map((theatre, selfIndex) => {
              this.cinemaCheckedList[index]['theatreItemList'][selfIndex]['theatreUuid'] = theatre['theatreUuid']   // 补充tree数据备份
              this.cinemaCheckedList[index]['theatreItemList'][selfIndex]['screenLength'] = theatre['screenCount']
              return Object.assign(theatre, {
                'leaf': false,
                'type': 'theatre',
                fromCinemaIndex: index,
                selfIndex
              })
            }))
            canBeSelectAllF()    // 准备好触发全选操作
          })
        } else {
          // 获取银幕列表
          let {fromCinemaIndex, selfIndex} = node.data,   // 所在院线索引 and 所在影院索引
            {theatreItemList} = this.cinemaCheckedList[fromCinemaIndex]   // 所在影院的备份OBJ
          theatreItemList[selfIndex]['callback'] = new Promise(async canBeSelectAllF => {
            let {data} = await getInternalScrList(node.data.theatreUuid)
            theatreItemList[selfIndex]['acquired'] = true
            theatreItemList[selfIndex]['screenList'] = new Array(data.data.length).fill(undefined).map(() => new Object({
              screenUuid: null
            }))
            fillNode(data.data.map((item, index) => {
              theatreItemList[selfIndex]['screenList'][index]['screenUuid'] = item['screenUuid']
              return Object.assign(item, {
                'leaf': true,
                'type': 'screen',
                fromCinemaIndex,
                'fromTheatreIndex': selfIndex,
                'selfIndex': index
              })
            }))
            // 若影院全选状态的选中先于影院列表的获取动作，要在获取影院列表后触发影院内银幕的全选（此情况出现在【获取院线内影院列表】动作触发于对院线进行全选）
            // 且此时要确保对应 Promise 已经声明，所以放在了 Promise 内
            if (theatreItemList[selfIndex]['checkAll']) this.cinemaCheckAllScreen({
              'type': 'theatre',
              fromCinemaIndex, selfIndex
            })
            canBeSelectAllF()   // 节点已经准备好进行全选操作
          })
        }
      },
      // 获取【内部银幕】
      async loadNode(node, resolve) {
        let {checkedList} = this
        if (node.level == 0) {
          this.adminTreeResolve = resolve
          let {data} = await getInternalScrGroup()
          if (data.code == 200) {
            this.checkedList = new Array(data.total).fill(undefined).map(() => new Object({
              theatreUuid: null,
              checkAll: false,
              acquired: false,
              itemList: [],
              checkItemList: []
            }))
            return resolve(data.data.map((item, index) => {
              this.checkedList[index]['theatreUuid'] = item['theatreUuid']
              return Object.assign(item, {
                  leaf: false,
                  index
                }
              )
            }))
          } else throwInfoFun('获取内部银幕分组列表报错', 'm-addOne/components/selectScreenFromAdmin-155', data)
        } else if (node.level == 1) {
          let {data} = await getInternalScrList(node.data.theatreUuid)
          if (data.code == 200) {
            let {index} = node.data
            resolve(data.data.map(item => {
              checkedList[index]['itemList'].push(item.screenUuid)
              checkedList[index]['acquired'] = true
              return Object.assign(item, {
                leaf: true,
                fatherIndex: index
              })
            }))
            if (this.checkAll_ing) {   // 全选事件
              this.checkAll_ing = false
              checkedList[index]['checkItemList'] = [...checkedList[index]['itemList']]
            }
          } else throwInfoFun('获取内部银幕分组内列表报错', 'selectScreenFromAdmin-172', data)
        }
      },
      getList() {
        this.screenType == 'internalScreen'
      },
      // 【内部银幕】银幕选中
      checkItemScreen(group) {
        if (group.checkItemList.length == group.itemList.length && group.itemList.length > 0)
          group.checkAll = true
        else group.checkAll = false
      },
      // 内部银幕 全选
      checkAllScreen(index) {
        let {checkedList} = this
        // 判断是否已展开 未展开tree数据为空
        if (!checkedList[index]['acquired']) this.checkAll_ing = true
        else if (checkedList[index]['checkAll']) checkedList[index]['checkItemList'] = [...checkedList[index]['itemList']]
        else checkedList[index]['checkItemList'] = []
      },
      // 院线and影院 - 全选
      cinemaCheckAllScreen({type, ...val}) {
        let {cinemaCheckedList: list} = this
        if (type == 'cinema') {
          if (list[val.index]['checkAll']) {
            function doing() {
              list[val.index]['checkItemList'] = list[val.index]['theatreItemList'].map(theatre => theatre.theatreUuid)
              // 遍历内部影院 全部选中
              list[val.index]['theatreItemList'].forEach(item => {
                item.checkAll = true
                item.checkItemList = item.screenList.map(t => t.screenUuid)
              })
            }

            if (!list[val.index]['acquired']) list[val.index]['callback'].then(() => doing())
            else doing()
          } else {
            list[val.index]['checkItemList'] = []  // 清空当前院线的选中结果
            // 遍历内部影院 清空选中结果
            list[val.index]['theatreItemList'].forEach(item => {
              item.checkAll = false
              item.checkItemList = []
            })
          }
        } else if (type == 'theatre') {
          let {fromCinemaIndex, selfIndex} = val,
            theatreObj = list[fromCinemaIndex]['theatreItemList'][selfIndex],
            {checkAll, checkItemList, screenList, acquired, callback} = theatreObj
          if (checkAll) {
            function doing() {
              screenList.forEach(screen => {
                if (!checkItemList.find(Uuid => Uuid == screen.screenUuid)) checkItemList.push(screen.screenUuid)
              })
            }

            if (!acquired) callback.then(() => doing())
            else doing()
          } else checkItemList.splice(0)  // 清空
          // 判断影院是否已被全部选中 => 修改院线全选状态
          if (list[fromCinemaIndex]['theatreItemList'].every(item => item.checkAll)) list[fromCinemaIndex]['checkAll'] = true
          else list[fromCinemaIndex]['checkAll'] = false
        }
      },
      // 【院线银幕】银幕选中
      checkScreen({fromCinemaIndex, fromTheatreIndex, selfIndex, screenUuid}) {
        let {screenList, checkItemList} = this.cinemaCheckedList[fromCinemaIndex]['theatreItemList'][fromTheatreIndex],
          cinemaItem = this.cinemaCheckedList[fromCinemaIndex],
          theatreItem = this.cinemaCheckedList[fromCinemaIndex]['theatreItemList'][fromTheatreIndex],
          {checkItemList: TCL, theatreItemList} = cinemaItem
        if (screenList.length == checkItemList.length && screenList.length) {
          theatreItem.checkAll = true  // 设置全选自身
          if (TCL.length == theatreItemList.length && TCL.length) cinemaItem.checkAll = true   // 判断 选线是否符合全选状态
        } else {
          theatreItem.checkAll = false
          if (cinemaItem.checkAll) cinemaItem.checkAll = false
        }
      },
      // 下一步
      nextFun() {
        if (this.screenType == 'internalScreen' && !this.internalScrSelTotal) return false
        if (this.screenType == 'theaterScreen' && !this.cinemaScrSelTotal) return false
        let screenUuidList = []
        let promise = new Promise(async resolve => {
          // 内部银幕
          if (this.screenType == 'internalScreen') {
            this.checkedList.forEach(item => screenUuidList = [...screenUuidList, ...item.checkItemList])
            resolve()
          } else {
            // 院线银幕 (需要同步执行)
            for (let i = 0; i < this.cinemaCheckedList.length; i++) {
              let {theatreItemList} = this.cinemaCheckedList[i]
              for (let z = 0; z < theatreItemList.length; z++) {
                let {theatreUuid, acquired, checkItemList} = theatreItemList[z]
                // 银幕列表已被加载
                if (acquired) screenUuidList = [...screenUuidList, ...checkItemList]
                else {
                  // 银幕列表尚未加载
                  let {data} = await getInternalScrList(theatreUuid)
                  screenUuidList = [...screenUuidList, ...data.data.map(screen => screen['screenUuid'])]
                }
              }
            }
            resolve()
          }
        })
        promise.then(() => {
          this.$emit('selectedAndNext', {
            screenUuidList,
            'certificateSource': this.screenType == 'internalScreen' ? 3 : 2
          })
        })
      }
    },
    computed: {
      // 【内部银幕】选中项长度
      internalScrSelTotal() {
        return this.checkedList.reduce((total, item) => total + item['checkItemList'].length, 0)
      },
      // 【院线银幕】选中项长度
      cinemaScrSelTotal() {
        // 根据【院线】或【影院】预告长度判断是否有实际选中项
        let length2 = 0
        this.cinemaCheckedList.forEach(({theatreItemList}) => {
          if (!theatreItemList.length) return false
          // 银幕尚未被加载
          theatreItemList.forEach(({checkItemList, acquired, checkAll, screenLength}) => {
            // 银幕已加载
            if (acquired) length2 += checkItemList.length
            // 银幕尚未被加载 且已被全部选中
            else if (checkAll) length2 += screenLength
          })
        })
        return length2
      }
    }
  }
</script>

<style scoped lang="less">
  .selectScreenFromAdmin {
    width: 100%;

    .win {
      height: calc(100% - 50px);
    }

    .custom-tree-node {
      display: flex;
      align-items: center;

      .tree-node-span {
        display: inline-flex;
        align-items: center;

        &.screenName {
          width: 160px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        &.certificateName {
          padding-left: 40px;
          width: 240px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      .tree-node-operate {
        position: absolute;
        right: 0px;
        height: 40px;

        span {
          display: inline-block;
          padding-left: 4px;
          font-size: 14px;
        }
      }
    }

    .bottomOperate {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .back {
        cursor: pointer;

        .icon {
          transform: rotate(180deg);
        }

        .text {
          font-size: 14px;
          color: rgba(27, 83, 244, 1);
        }
      }

      .rightOperate {

        .filter-btn {
          margin-right: 0px;
          margin-left: 25px;
        }

        .totalText {
          display: flex;
          flex-direction: row;

          .internalScrSelText {
            color: rgba(22, 29, 37, 1);
            font-size: 14px;

            .internalScrSelTotal {
              color: rgba(27, 83, 244, 1);
              font-weight: 500;
              font-size: 21px;
            }
          }
        }

      }
    }
  }

  .dialog-btn-group {
    position: relative;
    right: 0px;
    bottom: 2px;
  }

  /deep/ .el-checkbox__label {
    padding-left: 0px;

    span {
      padding-left: 0px !important;
    }
  }

  .box {
    height: 40px;
  }

  .filterIcon {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
</style>
