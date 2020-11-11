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
                <span class="">全选</span>
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
                             :label="data.screenUuid"><span style="display: none"/></el-checkbox>
              </span>
            </span>
          </el-tree>
        </div>
        <!--院线银幕-->
        <div class="theaterScreenTab" v-show="screenType == 'theaterScreen'"></div>
      </div>
    </div>
    <div class="bottomOperate">
      <div class="back">
        <img src="@/icons/toUploadTab.png" class="icon">
        <span class="text" v-show="screenType == 'internalScreen'">{{ backText.fromInterval }}</span>
        <span class="text" v-show="screenType == 'theaterScreen'">{{ backText.fromTheater }}</span>
      </div>
      <div class="filter rightOperate">
        <div class="totalText" v-show="false">
          <div class="filter-btn primary">{{btn}}</div>
        </div>
        <div class="totalText" v-show="true">
          <span class="internalScrSelText">
            {{ bottomOperate.selectedText1 }}
            <span class="internalScrSelTotal">{{ internalScrSelTotal }}</span>
            {{ bottomOperate.selectedText2 }}
          </span>
          <div class="filter-btn primary">{{ $t('public.nextStop') }}</div>
        </div>

      </div>

    </div>
    ying
  </div>
</template>

<script>
  import {
    getInternalScrGroup,
    getInternalScrList
  } from '@/api/addOne-api'
  import {messageFun} from "../../../assets/common";

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
        checkedList: [],
        adminTreeResolve: null,   // 内部系统tree回调函数
        checkAlling: false,       // 全选-即时状态
        btn: '去选择',
        backText: {
          fromInterval: '从我的电脑选择',
          fromTheater: '从我的电脑选择'
        },
        bottomOperate: {
          selectedText1: '已选择',
          selectedText2: '个场景'
        }
      }
    },
    methods: {
      async loadNode(node, resolve) {
        let {checkedList} = this
        if (node.level == 0) {
          this.adminTreeResolve = resolve
          let {data} = await getInternalScrGroup()
          if (data.code == 200) {
            this.checkedList = new Array(data.total).fill(undefined).map(() => new Object({
              checkAll: false,
              acquired: false,
              itemList: [],
              checkItemList: []
            }))
            return resolve(data.data.map((item, index) => Object.assign(item, {
                leaf: false,
                index
              }
            )))
          } else {
            messageFun('error', '获取内部银幕分组列表')
            console.log('-------------------')
            console.log('获取内部银幕分组列表报错， 位置 selectScreenFromAdmin-200')
            console.log(data)
            console.log('-------------------')
          }
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
            if (this.checkAlling) {   // 全选事件
              this.checkAlling = false
              checkedList[index]['checkItemList'] = [...checkedList[index]['itemList']]
            }
          } else {
            messageFun('error', '获取内部银幕分组内列表')
            console.log('-------------------')
            console.log('获取内部银幕分组内列表报错， 位置 selectScreenFromAdmin-112')
            console.log(data)
            console.log('-------------------')
          }
        }
      },
      getList() {

      },
      // 内部银幕 全选
      checkAllScreen(index) {
        let {checkedList} = this
        // 判断是否已展开 未展开tree数据为空
        if (!checkedList[index]['acquired']) this.checkAlling = true
          //   this.loadNode(null, this.adminTreeResolve).then(() => {
          //   console.log('then')
          //   setTimeout(() => checkedList[index]['checkItemList'] = [...checkedList[index]['itemList']], 1000)
        // })
        else if (checkedList[index]['checkAll']) checkedList[index]['checkItemList'] = [...checkedList[index]['itemList']]
        else checkedList[index]['checkItemList'] = []
      }
    },
    computed: {
      internalScrSelTotal() {
        return this.checkedList.reduce((total, item) => total + item['checkItemList'].length, 0)
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
              font-size: 21px;
            }
          }
        }

      }
    }
  }
</style>
