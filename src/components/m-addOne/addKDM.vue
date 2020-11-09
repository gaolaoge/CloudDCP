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
    </section>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {
    messageFun
  } from '@/assets/common.js'

  export default {
    name: 'addKDM',
    data() {
      return {
        title: '新建KDM制作',
        navL: [
          '选择播放银幕',
          '设置KDM参数'
        ],
        stepBtnActive: 1
      }
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
  .addKDM {
    user-select: none;
    height: 80vh;
    position: relative;

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
