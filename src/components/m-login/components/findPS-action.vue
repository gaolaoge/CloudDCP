<template>
  <div class="findPS-wrapper base">
    <!--nav-->
    <div class="nav">
      <span class="options active">{{ $t('login_page.forgetMode.tit') }}</span>
    </div>
    <!--验证身份-->
    <div class="form f" v-show="step == 'one'">
      <!--手机号-->
      <div class="item">
        <input v-model="forgetMode.phone"
               autofocus
               :placeholder="$t('login_page.forgetMode.phone_placeholder')"
               @focus="forgetVerif.phone = null"
               @blur="phoneVerif(false)"
               @input="phoneVerif(true)"
               ref="forgetMode_phone"
               :class="[{'inputError': forgetVerif.phone === false}, 'farm-input']"/>
        <span class="warnInfo" v-show="forgetVerif.phone === false">{{ warnInfo.phone }}</span>
        <img src="@/icons/login-success.png" class="i"
             v-show="forgetVerif.phone === true">
        <img src="@/icons/login-error .png" class="i canClick"
             v-show="forgetVerif.phone === false"
             @click="DeleteInputFun('phone', 'forgetVerif')">
      </div>
      <!--验证码-->
      <div class="item">
        <input v-model="forgetMode.code"
               :placeholder="$t('login_page.forgetMode.code_placeholder')"
               ref="forgetMode_code"
               @blur="codeVerif(false)"
               @input="codeVerif(true)"
               @focus="forgetVerif.code = null"
               class="farm-input farm-cord-input"
               :class="[{'inputError': forgetVerif.code === false}]"/>
        <span class="warnInfo" v-show="forgetVerif.code === false">{{ warnInfo.code }}</span>
        <img src="@/icons/login-success.png" class="i" v-show="forgetVerif.code === true">
        <img src="@/icons/login-error .png" class="i canClick" v-show="forgetVerif.code === false"
             @click="DeleteInputFun('code', 'forgetVerif')">
        <!--验证-->
        <div class="verif">
          <div :class="[{'suc': forgetVerif.phone}, 'btn']"
               @click="getCode"
               v-show="forgetMode.verifShow">
            {{ forgetMode.btnText }}
          </div>
          <span class="delayDate" v-show="!forgetMode.verifShow">{{ forgetMode.countdown }}</span>
        </div>
      </div>
      <!--按钮-->
      <div class="bigBtn"
           :class="[{'canBeClick': forgetVerif.phone && forgetVerif.code}]"
           @click="changeIng">
        <span>{{ $t('login_page.forgetMode.confirm') }}</span>
      </div>
    </div>
    <!--新密码-->
    <div class="form n" v-show="step == 'two'">
      <!--新密码-->
      <div class="item">
        <input v-model="forgetMode.newPassWord"
               @blur="psFormat(false)"
               @input="psFormat(true)"
               @focus="forgetVerif.newPassWord = null"
               :placeholder="$t('login_page.forgetMode.ps_new')"
               type="password"
               ref="forgetMode_newPassWord"
               class="farm-input"/>
        <!--查看密码-->
        <!--                <div class="swicthPWI">-->
        <!--                  <img src="@/icons/openPW.png" alt="" v-show="forgetMode.passwordEye"-->
        <!--                       @click="forgetMode.passwordEye = false">-->
        <!--                  <img src="@/icons/shuPW.png" alt="" v-show="!forgetMode.passwordEye"-->
        <!--                       @click="forgetMode.passwordEye = true">-->
        <!--                </div>-->
        <span class="warnInfo" v-show="forgetVerif.newPassWord === false">{{ warnInfo.newPassWord }}</span>
        <img src="@/icons/login-success.png" class="i" v-show="forgetVerif.newPassWord === true">
        <img src="@/icons/login-error .png" class="i canClick" v-show="forgetVerif.newPassWord === false"
             @click="DeleteInputFun('newPassWord', 'forgetVerif')">
      </div>
      <!--再次输入新密码-->
      <div class="item">
        <input v-model="forgetMode.newPassWordAgain"
               @blur="npsFormat(false)"
               @input="npsFormat(true)"
               @focus="forgetVerif.newPassWordAgain = null"
               :placeholder="$t('login_page.forgetMode.ps_again')"
               type="password"
               ref="forgetMode_newPassWordAgain"
               class="farm-input"/>
        <!--查看密码-->
        <!--                <div class="swicthPWI">-->
        <!--                  <img src="@/icons/openPW.png" alt="" v-show="forgetMode.passwordEyeAgain"-->
        <!--                       @click="forgetMode.passwordEyeAgain = false">-->
        <!--                  <img src="@/icons/shuPW.png" alt="" v-show="!forgetMode.passwordEyeAgain"-->
        <!--                       @click="forgetMode.passwordEyeAgain = true">-->
        <!--                </div>-->
        <span class="warnInfo" v-show="forgetVerif.newPassWordAgain === false">{{ warnInfo.newPassWordAgain }}</span>
        <img src="@/icons/login-success.png" class="i" v-show="forgetVerif.newPassWordAgain === true">
        <img src="@/icons/login-error .png" class="i canClick" v-show="forgetVerif.newPassWordAgain === false"
             @click="DeleteInputFun('newPassWordAgain', 'forgetVerif')">
      </div>
      <!--按钮-->
      <div :class="[{'canBeClick': forgetVerif.newPassWord && forgetVerif.newPassWordAgain}, 'bigBtn']"
           @click="changePSNow">
        <span>{{ $t('login_page.forgetMode.btnAgain') }}</span>
      </div>
    </div>
    <div class="operateBtn">
      <!--返回登录-->
      <div class="returnToLogin" @click="$emit('changeShowModule', 'login')">{{ $t('login_page.forgetMode.toLogin') }}
      </div>
      <!--返回注册-->
      <div class="returnToLogin" @click="$emit('changeShowModule', 'register')">{{
        $t('login_page.forgetMode.toRegister')
        }}
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import {
    getPhoneCode,                // 获取短信验证码
    verifPhoneCode,
    editPS                       // 修改密码
  } from '@/api/info-api'
  import {
    messageFun
  } from '../../../assets/common'

  export default {
    name: 'findPS',
    data() {
      return {
        step: 'one',
        acquired: false,
        forgetMode: {
          phone: '',
          code: '',
          verifShow: true,
          countdown: '60s',
          newPassWord: '',
          newPassWordAgain: '',
          passwordEye: false,
          passwordEyeAgain: false,
          intervalFun: null,
          codeObtained: false,               // 已获取验证码
          btnText: this.$t('login_page.getCode')
        },
        forgetVerif: {
          phone: null,
          code: null,
          newPassWord: null,
          newPassWordAgain: null
        },
        warnInfo: {
          phone: '',
          code: '',
          newPassWord: '',
          newPassWordAgain: ''
        }
      }
    },
    methods: {
      // 验证手机号格式
      phoneVerif(ing) {
        let {phone} = this.forgetMode,
          {warnInfo, forgetVerif} = this
        if (!phone.trim()) return false
        if (!this.regExp.phone.test(phone)) {
          warnInfo.phone = this.$t('login_page.message.phoneTypeErr_one')
          if (ing) forgetVerif.phone = null
          else forgetVerif.phone = false
        } else forgetVerif.phone = true
      },
      // 验证验证码格式
      codeVerif(ing) {
        let {code} = this.forgetMode,
          {warnInfo, forgetVerif} = this
        if (!code.trim()) return false
        if (!this.regExp.code.test(code)) {
          warnInfo.code = this.$t('login_page.message.codeTypeErr_two')
          if (ing) forgetVerif.code = null
          else forgetVerif.code = false
        } else forgetVerif.code = true
      },
      // 删除错误输入
      DeleteInputFun(input, verif) {
        this['forgetMode'][input] = ''
        this.$refs['forgetMode_' + input].focus()
        this[verif][input] = null
      },
      // 获取短信验证码
      async getCode() {
        let {phone} = this.forgetMode,
          {warnInfo, forgetVerif} = this
        if (!forgetVerif.phone) return false
        let data = await getPhoneCode({
          phone,
          position: 'login'
        })
        if (data.data.code == '4031') {
          warnInfo.phone = this.$t('login_page.message.phoneTypeErr_four')
          forgetVerif.phone = false
        } else this.acquired = true    // 验证码已发送
        this.delayFun()
      },
      // 验证验证码 下一步
      async changeIng() {
        let {forgetVerif, warnInfo} = this,
          {phone, code} = this.forgetMode
        if (!forgetVerif.phone || !forgetVerif.code) return false
        else if (!this.acquired) {    // 若没获取验证码 报错
          warnInfo.code = this.$t('login_page.message.codeTypeErr_three')
          forgetVerif.code = false
        } else {
          let data = await verifPhoneCode(`phone=${phone}&code=${code}`)
          if (data.data.code == 4034) {
            warnInfo.code = this.$t('login_page.message.code_err_two')
            forgetVerif.code = false
          } else if (data.data.code == 200) this.step = 'two'
          else messageFun('error', this.$t('login_page.message.verifErr'))
        }
      },
      psFormat(ing) {
        let {forgetVerif, warnInfo} = this,
          {newPassWord} = this.forgetMode
        if (!this.regExp.pwLength.test(newPassWord)) {
          warnInfo.newPassWord = this.$t('login_page.message.ps_verif_two')
          ing ? forgetVerif.newPassWord = null : forgetVerif.newPassWord = false
        } else if (!this.regExp.pwFormat.test(newPassWord)) {
          warnInfo.newPassWord = this.$t('login_page.message.ps_verif_one')
          ing ? forgetVerif.newPassWord = null : forgetVerif.newPassWord = false
        } else {
          forgetVerif.newPassWord = true
          this.npsFormat()
        }
      },
      npsFormat(ing) {
        let {forgetVerif, warnInfo} = this,
          {newPassWord, newPassWordAgain} = this.forgetMode
        // 若一或二次输入框未输入 不做验证
        if (!newPassWord.trim() || !newPassWordAgain.trim()) return false
        else if (newPassWord !== newPassWordAgain) {
          warnInfo.newPassWordAgain = this.$t('login_page.message.psTypeErr_two')
          ing ? forgetVerif.newPassWordAgain = null : forgetVerif.newPassWordAgain = false
        } else forgetVerif.newPassWordAgain = true
      },
      // 手机号验证事件60秒延迟
      delayFun() {
        let {forgetMode} = this
        forgetMode.verifShow = false
        forgetMode.intervalFun = window.setInterval(() => {
          forgetMode.countdown = parseInt(forgetMode.countdown) - 1 + 's'
          if (forgetMode.countdown == '0s') {
            window.clearInterval(forgetMode.intervalFun)
            forgetMode.verifShow = true
            forgetMode.countdown = '60s'
            forgetMode.btnText = this.$t('login_page.getCodeAgain')
          }
        }, 1000)
      },
      // 找回密码
      async changePSNow() {
        let { forgetMode,forgetVerif } = this
        if (!forgetVerif.newPassWord || !forgetVerif.newPassWordAgain) return false
        let data = await editPS({
          phone: forgetMode.phone,
          code: forgetMode.code,
          password: forgetMode.newPassWord,
          repeatPassword: forgetMode.newPassWordAgain
        })
        if (data.data.code == 200) {
          messageFun('success', this.$t('login_page.message.edit_suc'))
          setTimeout(() => {
            this.$emit('changeShowModule', 'login')
            window.clearInterval(this.forgetMode.intervalFun)
            this.forgetMode = {
              phone: '',
              code: '',
              verifShow: true,
              countdown: '60s',
              newPassWord: '',
              newPassWordAgain: '',
              passwordEye: false,
              passwordEyeAgain: false,
              intervalFun: null,
              codeObtained: false,               // 已获取验证码
              btnText: this.$t('login_page.getCode')
            }
            this.forgetVerif = {
              phone: null,
              code: null,
              newPassWord: null,
              newPassWordAgain: null
            }
            this.warnInfo = {
              phone: '',
              code: '',
              newPassWord: '',
              newPassWordAgain: ''
            }
            this.step = 'one'
            this.acquired = false
          }, 1000)
        }
      }
    },
    computed: {
      ...mapState(['regExp'])
    }
  }
</script>

<style lang="less" scoped>
  .findPS-wrapper {
    .operateBtn {
      margin-top: 60px;
      display: flex;
      justify-content: center;

      .returnToLogin {
        color: rgba(27, 83, 244, 1);
        font-size: 12px;
        cursor: pointer;
        line-height: 1em;

        &:nth-of-type(1) {
          padding-right: 9px;
          border-right: 1px solid rgba(22, 29, 37, 0.29);
        }

        &:nth-of-type(2) {
          padding-left: 9px;
        }
      }
    }
  }
</style>
