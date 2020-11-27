<template>
  <div class="register-wrapper base">
    <!--返回登录-->
    <div class="rl">
      <span>{{ $t('login_page.register.rl1') }}</span>
      <span @click="$emit('changeShowModule', 'login')">{{ $t('login_page.register.rl2') }}</span>
    </div>
    <div class="form">
      <!--帐号-->
      <div class="item">
        <input v-model="form.account"
               @blur="accouVerif(false)"
               @input="accouVerif(true)"
               @focus="verif.account = null"
               ref="form_account"
               :placeholder="$t('login_page.register.ac_placeholder')"
               :class="[{'inputError': verif.account === false}, 'farm-input']"/>
        <span class="warnInfo" v-show="verif.account === false">{{ warnInfo.account }}</span>
        <img src="@/icons/login-success.png" class="i" v-show="verif.account === true">
        <img src="@/icons/login-error .png" class="i canClick" v-show="verif.account === false"
             @click="DeleteInputFun('account')">
      </div>
      <!--密码-->
      <div class="item">
        <input v-model="form.password"
               type="password"
               ref="form_password"
               @blur="passwVerif(false)"
               @input="passwVerif(true)"
               @focus="verif.password = null"
               :placeholder="$t('login_page.register.ps_placeholder')"
               :class="[{'inputError': verif.password === false}, 'farm-input']"/>
        <div class="swicthPWI">
          <img src="@/icons/openPW.png" v-show="passwordEye" @click="passwordEye = false">
          <img src="@/icons/shuPW.png" v-show="!passwordEye" @click="passwordEye = true">
        </div>
        <span class="warnInfo" v-show="verif.password === false">{{ warnInfo.password }}</span>
        <img src="@/icons/login-success.png" class="i" v-show="verif.password === true">
        <img src="@/icons/login-error .png" class="i canClick" v-show="verif.password === false"
             @click="DeleteInputFun('password')">
      </div>
      <!--手机号-->
      <div class="item">
        <input v-model="form.phone"
               @blur="phoneVerif(false)"
               @input="phoneVerif(true)"
               @focus="verif.phone = null"
               ref="form_phone"
               :placeholder="$t('login_page.register.ph_placeholder')"
               :class="[{'inputError': verif.phone === false}, 'farm-input']"/>
        <span class="warnInfo" v-show="verif.phone === false">{{ warnInfo.phone }}</span>
        <img src="@/icons/login-success.png" class="i" v-show="verif.phone === true">
        <img src="@/icons/login-error .png" class="i canClick" v-show="verif.phone === false"
             @click="DeleteInputFun('phone')">
      </div>
      <!--验证码-->
      <div class="item">
        <input v-model="form.code"
               @blur="codeVerif(false)"
               @input="codeVerif(true)"
               @focus="verif.code = null"
               ref="form_code"
               :placeholder="$t('login_page.register.code_placeholder')"
               :class="[{'inputError': verif.code === false}, 'farm-input', 'farm-cord-input']"/>
        <span class="warnInfo" v-show="verif.code === false">{{ warnInfo.code }}</span>
        <img src="@/icons/login-success.png" class="i" v-show="verif.code === true">
        <img src="@/icons/login-error .png" class="i canClick" v-show="verif.code === false"
             @click="DeleteInputFun('code')">
        <div class="verif register">
          <div :class="[{'canClick': verif.phone}, 'btn']"
               @click="getCode"
               v-show="verifShow">{{ btnText }}
          </div>
          <span class="delayDate" v-show="!verifShow">{{ countdown }}</span>
        </div>
      </div>
      <!--区-->
      <div class="item zone">
        <label>{{ $t('login_page.register.type') }}：</label>
        <el-radio-group v-model="form.zone" class="radio">
          <el-radio :label=1>{{ $t('login_page.register.typeRadio')[0] }}</el-radio>
          <el-radio :label=2>{{ $t('login_page.register.typeRadio')[1] }}</el-radio>
        </el-radio-group>
      </div>
      <!--协议-->
      <div class="item m">
        <div class="protocol">
          <img src="@/icons/df.png" class="protocolIcon" v-show="!tick" @click="tick = true">
          <img src="@/icons/dfg.png" class="protocolIcon" v-show="tick" @click="tick = false">
          <span class="r">{{ $t('login_page.register.text1') }}</span>
          <span class="protocolLetter" @click="showPDF">{{ $t('login_page.register.text2') }}</span>
        </div>
        <span class="warnInfo" v-show="verif.tick === false && tick === false">{{ warnInfo.tick }}</span>
      </div>
      <!--注册btn-->
      <div :class="[{'canClick': verif.account && verif.password && verif.phone && verif.code }, 'bigBtn']"
           @click="registerFun">
        <span>{{ $t('login_page.register.label') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import {
    verifAccountIsRegister,
    verifPhoneIsRegister,
    getProtocal,
    registerAccount,
    registerGetphoneCode
  } from '@/api/login-api'
  import {
    messageFun,
    exportDownloadFun
  } from '../../../assets/common'

  export default {
    name: 'register',
    data() {
      return {
        tick: true,
        countdown: '60s',
        verifShow: true,
        intervalFun: null,
        passwordEye: false,
        warnInfo: {
          account: '',
          password: '',
          phone: '',
          tick: '',
          code: this.$t('login_page.register.warnInfo.code')
        },
        form: {
          account: '',
          password: '',
          phone: '',
          code: '',
          zone: 1
        },
        verif: {
          account: null,
          password: null,
          phone: null,
          code: null,
          tick: null
        },
        codeObtained: false,               // 已获取验证码
        btnText: this.$t('login_page.getCode'),
        pdf: null
      }
    },
    methods: {
      // 删除错误输入
      DeleteInputFun(input) {
        this['form'][input] = ''
        this.$refs['form_' + input].focus()
        this['verif'][input] = null
      },
      // 验证账号格式
      async accouVerif(ing) {
        let rfa = this['form']['account'],
          {verif, warnInfo} = this
        // 为空
        if (!rfa) verif.account = null
        // 验证帐号长度
        else if (!/^[\w\W]{8,14}$/.test(rfa)) {
          warnInfo.account = this.$t('login_page.message.ac_verif_one')
          ing ? verif.account = null : verif.account = false
        } else if ((!/^[\u4E00-\u9FA5\w]+$/.test(rfa) || !this.regExp.accountFormat.test(rfa)) && !this.regExp.phone.test(rfa)) {
          // 验证帐号格式
          warnInfo.account = '请输入正确账号'
          ing ? verif.account = null : verif.account = false
        } else {
          // 验证帐号是否可用
          let data = await verifAccountIsRegister(rfa)
          if (data.data.code == 4031) verif.account = true
          else {
            if (ing) verif.account = null
            else {
              verif.account = false
              warnInfo.account = this.$t('login_page.message.ac_verif_three')
            }
          }
        }
      },
      // 验证密码格式
      passwVerif(ing) {
        let {password} = this['form'],
          {verif, warnInfo} = this

        if (!password.trim()) verif.password = null
        else if (!this.regExp.pwLength.test(password)) {
          // 验证密码长度
          warnInfo.password = this.$t('login_page.message.ps_verif_two')
          ing ? verif.password = null : verif.password = false
        } else if (!this.regExp.pwFormat.test(password)) {
          // 验证密码复杂度
          warnInfo.password = this.$t('login_page.message.ps_verif_one')
          ing ? verif.password = null : verif.password = false
        } else verif.password = true    // 密码正确
      },
      // 验证手机号格式
      async phoneVerif(ing) {
        let {phone} = this['form'],
          {verif, warnInfo} = this

        if (!phone.trim()) verif.phone = null
        else if (!this.regExp.phone.test(phone)) {
          // 验证密码长度
          warnInfo.phone = this.$t('login_page.SMS_verif.phone_warnInfo')
          ing ? verif.phone = null : verif.phone = false
        } else {
          let data = await verifPhoneIsRegister(phone),
            response = data.data
          // code:200   手机号已存在
          // code:4031  手机号未注册
          if (response.code === 4031) verif.phone = true
          else if (response.code === 200) {
            this.warnInfo.phone = this.$t('login_page.message.phoneRegistered')
            verif.phone = false
          }
        }
      },
      // 验证验证码格式
      codeVerif(ing) {
        let {code} = this['form'],
          {verif} = this

        if (!code.trim()) verif.code = null
        else if (!this.regExp.code.test(code)) {
          ing ? verif.code = null : verif.code = false
        } else verif.code = true    // 密码正确
      },
      // 获取验证码
      getCode() {
        if (!this.verif.phone) return false
        registerGetphoneCode(this.form.phone)
        this.delayFun()
        this.codeObtained = true
      },
      // 用户服务协议
      async showPDF() {
        let data = await getProtocal()
        exportDownloadFun(data, '《用户服务协议》', 'pdf', true)
      },
      // 注册
      async registerFun() {
        let {account, password, phone, code} = this.verif
        if (!account || !password || !phone || !code) return false
        else if (!this.codeObtained) {
          this.verif.code = false
          this.warnInfo.code = this.$t('login_page.message.no_sms')
        } else if (!this.tick) messageFun('info', '未勾选并同意《用户服务歇息》')
        else {
          let data = await registerAccount(this.form)
          // code:101 帐号或手机号重复
          if (data.data.code == '200') {
            // 注册成功
            localStorage.setItem(this.form.account, false)
            messageFun('success', this.$t('login_page.message.registerSuc'))
            setTimeout(() => {
              // 返回登录窗口
              this.$emit('changeShowModule', 'login')    // 切换回登录窗口
              this.reset()
            }, 800)
          } else if (data.data.code == '4032') messageFun('error', this.$t('login_page.message.registerCodeErr'))
          else messageFun('error', this.$t('login_page.message.registerErr'))
        }
      },
      // 60s 倒计时
      delayFun() {
        this.verifShow = false
        this.intervalFun = window.setInterval(() => {
          this.countdown = parseInt(this.countdown) - 1 + 's'
          if (this.countdown == '0s') {
            window.clearInterval(this.intervalFun)
            this.verifShow = true
            this.countdown = '60s'
            this.btnText = this.$t('login_page.getCodeAgain')
          }
        }, 1000)
      },
      // 复位
      reset() {
        this.tick = true
        this.verifShow = true
        this.intervalFun = null
        this.passwordEye = false
        Object.assign(this.warnInfo, {
          account: '',
          password: '',
          phone: '',
          tick: ''
        })
        Object.assign(this.form, {
          account: '',
          password: '',
          phone: '',
          code: '',
          zone: 1
        })
        Object.assign(this.verif, {
          account: null,
          password: null,
          phone: null,
          code: null,
          tick: null
        })
        this.codeObtained = false
      }
    },
    computed: {
      ...mapState(['regExp'])
    },
    watch: {
      'passwordEye': function (val) {
        if (val) this.$refs.form_password.type = 'text'
        else this.$refs.form_password.type = 'password'
      }
    }
  }
</script>

<style lang="less" scoped>
  .register-wrapper {
    .rl {
      position: relative;
      text-align: right;
      margin: -30px 0px 10px;
      z-index: 1;

      span {
        font-size: 12px;

        &:nth-of-type(1) {
          color: rgba(22, 29, 37, 1);
        }

        &:nth-of-type(2) {
          color: rgba(27, 83, 244, 1);
          cursor: pointer;
        }
      }
    }

    .zone {
      margin: -4px 0px 10px;

      label {
        font-size: 14px;
        color: rgba(22, 29, 37, 0.4);
      }

      .radio {
        vertical-align: super;
        margin-left: 30px;

        /deep/ .el-radio .el-radio__label {
          font-size: 14px;
        }
      }
    }

    .protocol {
      position: relative;
      padding-bottom: 28px;
      font-size: 12px;

      .protocolIcon {
        vertical-align: sub;
        cursor: pointer;
      }

      .r {
        color: rgba(22, 29, 37, 1);
      }

      .protocolLetter {
        color: rgba(22, 113, 255, 0.8);
        cursor: pointer;

        &:hover {
          color: rgba(22, 113, 255, 1)
        }
      }
    }

    .bigBtn {
      margin-top: 0px;
    }
  }
</style>
