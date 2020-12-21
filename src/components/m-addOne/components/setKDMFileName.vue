<template>
  <div class="setName">
    <div class="dialog-header">
      <span class="title">{{ title }}</span>
      <img src="@/icons/shutDialogIcon.png"
           @click="shutMe"
           class="closeBtn">
    </div>
    <div class="dialog-body">
      <div class="form">
        <!--KDM文件名-->
        <div class="item mini">
          <label class="farm-label">{{ label.name }}：</label>
          <p class="farm-span">{{ name }}</p>
        </div>
        <!--文件名格式-->
        <div class="item mini">
          <label class="farm-label">{{ label.type }}：</label>
          <el-select v-model="form.uuid"
                     class="farm-select">
            <el-option
              v-for="(item,index) in typeList"
              :key="index"
              :label="item.filenameTemplate"
              :value="item.filenameTemplateUuid">
            </el-option>
          </el-select>
        </div>
        <!--制作日期-->
        <div class="item mini">
          <label class="farm-label">{{ label.date }}：</label>
          <el-date-picker
            :clearable="false"
            v-model="form.date"
            type="date"
            placeholder="选择日期"/>
        </div>
        <!--按钮-->
        <div class="farm-btnGroup">
          <div class="btnGroup">
            <div class="btnGroup-btn previous" @click="shutMe">
              <span>{{ $t('public.cancel') }}</span>
            </div>
            <div class="btnGroup-btn confirm" @click="saveFun">
              <span>{{ $t('public.save') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    createDateFun
  } from '@/assets/common'

  export default {
    name: 'setName',
    data() {
      return {
        title: '设置KDM文件名',
        label: {
          name: 'KDM文件名',
          type: '文件名格式',
          date: '制作日期'
        },
        form: {
          date: new Date(),
          uuid: ''
        }
      }
    },
    methods: {
      // 关闭
      shutMe() {
        this.$emit('shutMe', null)
      },
      // 保存
      saveFun() {
        this.$emit('shutMe', {
          'name': this.name,
          'Uuid': this.form.uuid
        })
      }
    },
    props: {
      'fileName': String,
      'typeList': Array,
      'typeUuid': String
    },
    watch: {
      typeUuid: {
        handler: function (id) {
          if (id) this.form.uuid = id
        },
        immediate: true
      }
    },
    computed: {
      name() {
        let {typeList, fileName, typeUuid, form} = this
        let index = typeList.length && form.uuid ? typeList.find(item => item['filenameTemplateUuid'] == form.uuid)['index'] : null
        if (index == 0) return 'KDM_' + fileName + `_<银幕名称>_<银幕名称>`
        else if (index == 1) return 'KDM_' + fileName + `_<影院名称>_` + createDateFun(form.date, true)
      }
    }
  }
</script>

<style lang="less" scoped>
  .setName {

    .form {
      padding: 0px 30px;
      box-sizing: border-box;

      .item {
        width: 560px;
      }

      .farm-label {
        width: 106px;
        text-align: right;
        margin-right: 40px;
      }
    }

    .btnGroup-btn:nth-of-type(2) {
      margin-right: 0px;
    }
  }

  /deep/ .el-input__inner {
    height: 40px;
    line-height: 40px;
  }

  .no-font-size {
    font-size: 0px !important;
  }

  .fns {
    font-size: 14px;
  }

  /deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }

</style>
