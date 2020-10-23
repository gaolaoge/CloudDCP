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
      <span class="toRegister">
        <span @click="$emit('changeShowModule', 'register')">{{ $t('login_page.account_verif.register') }}</span>
      </span>
      <!--登录按钮-->
      <div :class="[{'canBeClick': phoneVerif.phone && phoneVerif.code}, 'bigBtn']"
           @click="phoneLoginFun">
        <span>{{ $t('login_page.loginText') }}</span>
      </div>
    </div>
    <!--帐号密码登录模板-->
    <div class="form" v-show="navIndex == 2">
      <input type="password" style="display: none"/>
      <!--帐号-->
      <div class="item">
        <input v-model="accountFrom.account"
               :placeholder="$t('login_page.account_verif.ac_placeholder')"
               ref="accountFrom_account"
               @blur="accounVerif(false)"
               @input="accounVerif(true)"
               @focus="accountVerif.account === false ? accountVerif.account = null : null"
               class="farm-input"
               :class="[{'inputError': accountVerif.account === false}]"/>
        <span class="warnInfo" v-show="accountVerif.account === false">{{ warnInfo.account }}</span>
        <img src="@/icons/login-success.png" class="i"
             v-show="accountVerif.account === true">
        <img src="@/icons/login-error .png" class="i canClick"
             v-show="accountVerif.account === false"
             @click="DeleteInputFun('accountFrom','account', 'accountVerif')">
      </div>
      <!--密码-->
      <div class="item">
        <input v-model="accountFrom.password"
               ref="accountFrom_password"
               :placeholder="$t('login_page.account_verif.ps_placeholder')"
               @keyup.enter="accountLoginFun"
               @focus="accountVerif.password === false ? accountVerif.password = null : null"
               @blur="passwVerif(false)"
               @input="passwVerif(true)"
               autocomplete="new-password"
               type="password"
               class="farm-input"/>
        <div class="swicthPWI">
          <img src="@/icons/openPW.png" v-show="accountFrom.passwordEye"
               @click="accountFrom.passwordEye = false">
          <img src="@/icons/shuPW.png" v-show="!accountFrom.passwordEye"
               @click="accountFrom.passwordEye = true">
        </div>
        <span class="warnInfo" v-show="accountVerif.password === false">{{ warnInfo.password }}</span>
        <img src="@/icons/login-error .png" class="i canClick"
             v-show="accountVerif.password === false"
             @click="DeleteInputFun('accountFrom','password', 'accountVerif')">
      </div>
      <!--5天内自动登录-->
      <el-switch
        active-color="RGBA(27, 83, 244, 1)"
        inactive-color="rgba(230, 230, 230, 1)"
        v-model="accountFrom.isAutoLogin">
      </el-switch>
      <span class="switchLabel">{{ $t('login_page.account_verif.auto_login') }}</span>
      <!--忘记密码-->
      <span class="toRegister">
                <span @click="$emit('changeShowModule', 'findPS')">{{ $t('login_page.account_verif.forgetPw') }}</span>
                |
                <span
                  @click="$emit('changeShowModule', 'register')">{{ $t('login_page.account_verif.register') }}</span>
              </span>
      <!--登录按钮-->
      <div :class="[{'canBeClick': accountVerif.account && accountVerif.password}, 'bigBtn']"
           @click="accountLoginFun">
        <span>{{ $t('login_page.loginText') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    verifPhoneIsRegister,       // 验证手机号是否已被注册
    verifAccountIsRegister,     // 验证账号是否已被注册
    phoneLogin,                 // 短信登录
    accountLogin                // 账号登录
  } from '@/api/login-api'
  import {
    getPhoneCode                // 获取短信验证码
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
        accountFrom: {
          account: null,
          password: null,
          passwordEye: false,
          isAutoLogin: false
        },
        phoneVerif: {
          phone: null,
          code: null
        },
        accountVerif: {
          account: null,
          password: null
        },
        warnInfo: {
          phone: '',
          code: '',
          account: '',
          password: null
        }
      }
    },
    watch: {
      'accountFrom.passwordEye': function (val) {
        if (val) this.$refs.accountFrom_password.type = 'text'
        else this.$refs.accountFrom_password.type = 'password'
      }
    },
    computed: {
      ...mapState(['regExp'])
    },
    methods: {
      // 删除错误输入
      DeleteInputFun(from, input, verif) {
        this[from][input] = ''
        this.$refs[from + '_' + input].focus()
        this[verif][input] = null
      },
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
      // 验证短信验证码格式
      phoneCodeVerif(ing) {
        let f = this.phoneForm,
          v = this.phoneVerif
        // 若未填写验证码 不做校验
        if (!f.code) v.code = null
        // 校验
        else if (/^\d{6}$/.test(f.code)) v.code = true
        else ing ? v.code = null : v.code = false      // '请正确输入验证码'
      },
      // 验证账号格式
      async accounVerif(ing) {
        let rfa = this['accountFrom']['account'],
          rs = this['accountVerif'],
          w = this.warnInfo
        // 为空
        if (!rfa) rs.account = null
        // 验证帐号长度
        else if (!/^[\w\W]{8,14}$/.test(rfa)) {
          w.account = this.$t('login_page.message.ac_verif_one')
          ing ? rs.account = null : rs.account = false
        } else if ((!/^[\u4E00-\u9FA5\w]+$/.test(rfa) || !this.regExp.accountFormat.test(rfa)) && !this.regExp.phone.test(rfa)) {
          // 验证帐号格式
          w.account = '请输入正确账号/手机号'
          ing ? rs.account = null : rs.account = false
        } else {
          // 验证帐号是否可用
          let data = await verifAccountIsRegister(rfa)
          if (data.data.code == 4031) {
            // 账号未被注册
            if (ing) rs.account = null
            else {
              rs.account = false
              w.account = this.$t('login_page.message.ac_verif_four')
            }
          } else rs.account = true    // 账号已被注册
        }
      },
      // 验证密码格式
      passwVerif(ing) {
        let t = this['accountFrom']['password'],
          s = this.accountVerif,
          i = this.warnInfo
        if (!t) s.password = null
        else if (!this.regExp.pwLength.test(t)) {
          // 验证密码长度
          i.password = this.$t('login_page.message.ps_verif_two')
          ing ? s.password = null : s.password = false
        } else if (!this.regExp.pwFormat.test(t)) {
          // 验证密码复杂度
          i.password = this.$t('login_page.message.ps_verif_one')
          ing ? s.password = null : s.password = false
        } else s.password = true    // 密码正确
      },
      // 获取验证码
      async getPhoneCode() {
        let {phone} = this.phoneForm
        if (!this.phoneVerif.phone) return false
        this.delayFun()
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
        let s = this.phoneForm
        s.showGetCode = false
        s.intervalFun = window.setInterval(() => {
          s.countdown = parseInt(s.countdown) - 1 + 's'
          if (s.countdown === '0s') {
            window.clearInterval(s.intervalFun)
            s.showGetCode = true
            s.countdown = '60s'
            s.btnText = this.$t('login_page.getCodeAgain')
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
      // 账号登录
      async accountLoginFun() {
        let {account, password, isAutoLogin} = this.accountFrom
        if (this.accountVerif.password === false || !account || !password) return false
        try {
          let data = await accountLogin({account, password, isAutoLogin})
          if (data.data.code == '4032') {
            this.accountVerif.password = false
            this.warnInfo.password = '密码错误'
          } else if (data.data.code == 200) this.loginSuc(isAutoLogin, '', account, data.data.data.token)
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
