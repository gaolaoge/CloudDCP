<template>
  <div class="login-wrapper base">
    <!--登录方式导航-->
    <div class="nav">
      <span :class="[{'active': navIndex === 1}, 'options']" @click="navIndex = 1">
        {{ $t('login_page.nav_phoneText') }}
      </span>
      <span :class="[{'active': navIndex === 2}, 'options']" @click="navIndex = 2">
        {{ $t('login_page.nav_accountText') }}
      </span>
    </div>
    <!--短信验证登录模板-->
    <div class="form" v-show="navIndex === 1">
      <!--手机号-->
      <div class="item">
        <input v-model="phoneForm.phone"
               autofocus
               ref="phoneForm_phone"
               :class="[{'inputError': phoneVerif.phone === false}, 'farm-input']"
               :placeholder="$t('login_page.SMS_verif.phone_placeholder')"
               @blur="verifInputPhone(false)"
               @input="verifInputPhone(true)"
               @focus="phoneVerif.phone === false ? phoneVerif.phone = null : null"/>
        <span class="warnInfo" v-show="phoneVerif.phone === false">{{ warnInfo.phone }}</span>
        <img src="@/icons/login-success.png" class="i" v-show="phoneVerif.phone === true">
        <img src="@/icons/login-error .png" class="i canClick"
             v-show="phoneVerif.phone === false"
             @click="DeleteInputFun('phoneForm','phone')">
      </div>
      <!--验证码-->
      <div class="item">
        <input v-model="phoneForm.code"
               :placeholder="$t('login_page.SMS_verif.code_placeholder')"
               :class="[{'inputError': phoneVerif.code === false}, 'farm-input', 'farm-cord-input']"
               ref="phoneForm_code"
               type="text"
               @blur="phoneCodeVerif(false)"
               @input="phoneCodeVerif(true)"
               @focus="phoneVerif.code === false ? phoneVerif.code = null : null"/>
        <!--获取验证码-->
        <div class="verif">
          <div :class="[{'suc': phoneVerif.phone}, 'btn']"
               @click="getPhoneCode"
               v-show="phoneForm.showGetCode">
            {{ phoneForm.btnText }}
          </div>
          <span class="delayDate" v-show="!phoneForm.showGetCode">{{ phoneForm.countdown }}</span>
        </div>
        <span class="warnInfo" v-show="phoneVerif.code === false">{{ warnInfo.code }}</span>
        <img src="@/icons/login-success.png" class="i"
             v-show="phoneVerif.code === true">
        <img src="@/icons/login-error .png" class="i canClick"
             v-show="phoneVerif.code === false"
             @click="DeleteInputFun('phoneForm','code', 'phoneVerif')">
      </div>
      <!--5天内自动登录-->
      <el-switch v-model="phoneForm.autoLogin"
                 active-color="RGBA(27, 83, 244, 1)"
                 inactive-color="rgba(230, 230, 230, 1)"/>
      <span class="switchLabel">{{ $t('login_page.SMS_verif.auto_login') }}</span>
      <span class="toRegister"><span @click="navActive = 2">{{ $t('login_page.account_verif.register') }}</span></span>
      <!--登录按钮-->
      <div :class="[{'canBeClick': phoneVerif.phone && phoneVerif.code}, 'bigBtn']"
           @click="phoneLoginFun">
        <span>{{ $t('login_page.loginText') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    verifPhoneIsRegister,       // 验证手机号是否已被注册
    phoneLogin                 // 短信登录
  } from '@/api/login-api'
  import {
    getPhoneCode
  } from '@/api/info-api'
  import {
    mapState
  } from 'vuex'
  import {
    messageFun,
    clearUserCookie,
    getUserInfoF
  } from '@/assets/common'

  export default {
    name: 'login',
    data() {
      return {
        navIndex: 1,
        phoneForm: {
          phone: null,
          code: null,
          countdown: 60,
          autoLogin: false,
          btnText: '获取验证码',
          intervalFun: null, // 倒计时回调函数
          showGetCode: true, // 显示获取验证码 按钮
          gotten: false      // 已获取验证码
        },
        phoneVerif: {
          phone: null,
          code: null
        },
        warnInfo: {
          phone: '',
          code: ''
        }
      }
    },
    computed: {
      ...mapState(['regExp'])
    },
    methods: {
      // 验证手机号是否已被注册
      async verifInputPhone(ing) {
        let f = this.phoneForm,
          v = this.phoneVerif
        if (!f.phone) v.phone = null
        else if (this.regExp.phone.test(f.phone)) {
          let data = await verifPhoneIsRegister(f.phone),
            response = data.data
          // code:200   手机号已存在
          // code:4031  手机号未注册
          if (response.code === 200) v.phone = true
          else if (response.code === 4031) {
            this.warnInfo.phone = this.$t('login_page.message.need_to_register')
            v.phone = false
          }
        } else if (ing) v.phone = null
        else {
          this.warnInfo.phone = this.$t('login_page.SMS_verif.phone_warnInfo')
          v.phone = false
        }
      },
      DeleteInputFun(from, input, verif) {
        this[from][input] = ''
        this.$refs[from + '_' + input].focus()
        this[verif][input] = null
      },
      phoneCodeVerif(ing) {
        let f = this.phoneForm,
          v = this.phoneVerif
        // 若未填写验证码 不做校验
        if (!f.code) v.code = null
        // 校验
        else if (/^\d{6}$/.test(f.code)) v.code = true
        else ing ? v.code = null : v.code = false      // '请正确输入验证码'
      },
      // 获取验证码
      async getPhoneCode() {
        let {phone} = this.phoneForm
        if (!this.phoneVerif.phone) return false
        this.delayFun('login')
        let data = await getPhoneCode({
          phone,
          position: 'login'
        })
        if (data.data.code === 200) {
          this.phoneForm.gotten = true
          messageFun('info', this.$t('login_page.message.code_is_coming'))
        } else if (data.data.code === 10001) {
          this.warnInfo.phone = this.$t('login_page.message.need_to_register')
          this.phoneVerif.phone = false
        }
      },
      // 手机号验证事件60秒延迟
      delayFun(obj) {
        let showDom
        if (obj === 'login') showDom = this.phoneForm
        // else if (obj === 'registered') showDom = this.registered
        else if (obj === 'findBack') showDom = this.login.forgetMode
        showDom.showGetCode = false
        showDom.intervalFun = window.setInterval(() => {
          showDom.countdown = parseInt(showDom.countdown) - 1 + 's'
          if (showDom.countdown === '0s') {
            window.clearInterval(showDom.intervalFun)
            showDom.showGetCode = true
            showDom.countdown = '60s'
            showDom.btnText = this.$t('login_page.getCodeAgain')
          }
        }, 1000)
      },
      // 短信登录 登录btn
      async phoneLoginFun() {
        let {gotten, phone, code, autoLogin} = this.phoneForm,
          {phone: phoneVerif, code: codeVerif} = this.phoneVerif
        // 若手机号或验证码未通过格式验证，直接忽略
        if (!phoneVerif || !codeVerif) return false
        else if (!gotten) {  // 检验是否已发送验证短信
          this.warnInfo.code = this.$t('login_page.message.no_sms')
          this.phoneVerif.code = false
        } else try {
          // 判断验证码是否正确
          let data = await phoneLogin({phone, code, autoLogin})
          if (data.data.code == 4032) messageFun('error', this.$t('login_page.message.code_err'))
          else if (data.data.code == 200) this.loginSuc(autoLogin, phone, data.data.data.account, data.data.data.token)
        } catch (err) {
          console.log('登录连接失败, ' + err)
        }
      },
      // 登录成功
      loginSuc(isAutoLogin, phone, account, token) {
        messageFun('success', this.$t('login_page.message.login_suc'))
        this.autoLogin(isAutoLogin, phone, account, token)
        sessionStorage.setItem('token', token)
        localStorage.setItem('loginPageIndex', this.activeIndex)
        getUserInfoF()
        this.$router.push('/')
      },
      // 5天自动登录 保留账号登录记录
      autoLogin(boolean, phone, account, token) {
        // 勾选
        if (phone) localStorage.setItem('lastLoginPhone', phone)
        if (account) localStorage.setItem('lastLoginAccount', account)
        if (boolean) {
          document.cookie = `token=${token};max-age=432000`
          if (phone) document.cookie = `phone=${phone};max-age=432000`
          if (account) document.cookie = `account=${account};max-age=432000`
          // 未勾选
        } else clearUserCookie(phone, account, sessionStorage.getItem('token'))
      }
    }
  }
</script>

<style lang="less" scoped>
  .login-wrapper {

  }
</style>
