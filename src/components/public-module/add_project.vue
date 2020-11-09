<template>
  <div class="add-project">
    <div class="form">
      <div class="item">
        <input type="text"
               class="farm-input showBorder"
               v-model="name"
               @focus="verif = null"
               @blur="verifName(false)"
               @input="verifName(true)"
               @keyup.enter="addNewProject"
               :placeholder="placeholder">
        <span class="warnInfo" v-show="verif === false">{{ warnInfo }}</span>
      </div>
      <el-checkbox
        true-label='1'
        false-label='0'
        v-model="checked"
        :label="checkText"/>
      <div class="dialog-btn-group">
        <div class="dialog-btn cancel" @click="$emit('cancelAdd', false)">
          <span>{{ $t('public.cancel') }}</span>
        </div>
        <div class="dialog-btn save" :class="[{'cannotBeGo': !verif}]" @click="addNewProject">
          <span>{{ $t('public.save') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {
    createTask
  } from '@/api/set-api'
  import {
    messageFun
  } from "../../assets/common"

  export default {
    name: 'add-project',
    data() {
      return {
        name: '',
        warnInfo: null,
        checked: '1',
        checkText: '设为当前项',
        placeholder: '请输入项目名称',
        verif: false
      }
    },
    methods: {
      // 新建项目
      async addNewProject() {
        let {data} = await createTask({
          'projectName': this.name,
          'isDefault': this.checked
        })
        if (data.code == 201) {
          messageFun('success', '创建成功')
          this.$emit('cancelAdd', true)
        } else if (data.data.code == 101) {
          this.warnInfo = '项目已存在，请重新输入'
          this.verif = false
        }
      },
      // 验证项目名
      verifName(ing) {
        if (!this.name.trim()) {
          if (ing) return false
          this.warnInfo = '请输入项目名称'
          this.verif = false
        } else if (this.name.trim().length > 50) {
          if (ing) return false
          this.warnInfo = '最多输入50个字符'
          this.verif = false
        } else this.verif = true
      }
    },
    computed: {
      ...mapState['regExp']
    }
  }
</script>

<style lang="less" scoped>
  .add-project {
    .form {
      position: relative;
      padding-bottom: 50px;

      .dialog-btn-group {
        bottom: 0px;
        right: 0px;
      }
    }
  }
</style>
