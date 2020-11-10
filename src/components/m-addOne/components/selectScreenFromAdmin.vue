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
                <el-checkbox indeterminate
                             v-model="checkedList[data.index]['checkAll']"/>
                <span class="">全选</span>
              </span>
              <!--银幕-->
              <span class="tree-node-span screenName" :title="data.screenName" v-if="data.leaf">{{ data.screenName }}</span>
              <span class="tree-node-span certificateName" :title="data.certificateName" v-if="data.leaf">{{ data.certificateName }}</span>
              <span class="tree-node-operate" v-if="data.leaf">
                <el-checkbox v-model="checkedList[data.fatherIndex]['checkAItemList']" :label="data.screenUuid"><span style="display: none"/></el-checkbox>
              </span>
            </span>
          </el-tree>
        </div>
        <!--院线银幕-->
        <div class="theaterScreenTab" v-show="screenType == 'theaterScreen'"></div>
      </div>
    </div>
    <div class="">

    </div>
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
        checkedList: null
      }
    },
    methods: {
      async loadNode(node, resolve) {
        if (node.level == 0) {
          let {data} = await getInternalScrGroup()
          if(data.code == 200) {
            this.checkedList = new Array(data.total).fill(new Object({
              checkAll: false,
              checkItemList: []
            }))
            return resolve(data.data.map((item,index) => Object.assign(item, {
                leaf: false,
                index
              }
            )))
          } else {
            messageFun('error', '获取内部银幕分组列表')
            console.log('-------------------')
            console.log('获取内部银幕分组列表报错， 位置 selectScreenFromAdmin-116')
            console.log(data)
            console.log('-------------------')
          }
        }
        else if (node.level == 1) {
          // console.log(node.data.index)
          let {data} = await getInternalScrList(node.data.theatreUuid)
          if(data.code == 200) {
            resolve(data.data.map(item => Object.assign(item, {
              leaf: true,
              fatherIndex: node.data.index
            })))
          } else {

          }
        }
      },
      getList() {

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

        span {
          display: inline-block;
          padding-left: 4px;
          font-size: 14px;
        }
      }
    }
  }
</style>
