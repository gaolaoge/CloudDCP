<template>
  <div class="register-wrapper base">
    <!--返回登录-->
    <div class="rl">
      <span>{{ $t('login_page.register.rl1') }}</span>
      <span @click="$emit('changeShowModule', 'login')">{{ $t('login_page.register.rl2') }}</span>
    </div>
    <!--帐号-->
    <div class="u">
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
    <div class="u">
      <input v-model="form.password"
             type="password"
             ref="form_password"
             @blur="passwVerif(false)"
             @input="passwVerif(true)"
             @focus="verif.password = null"
             :placeholder="$t('login_page.register.ps_placeholder')"
             :class="[{'inputError': verif.password === false}, 'farm-input']"/>
      <div class="swicthPWI">
        <img src="@/icons/openPW.png" v-show="passwordEye" @click="changePSType(false)">
        <img src="@/icons/shuPW.png" v-show="!passwordEye" @click="changePSType(true)">
      </div>
      <span class="warnInfo" v-show="verif.password === false">{{ warnInfo.password }}</span>
      <img src="@/icons/login-success.png" class="i" v-show="verif.password === true">
      <img src="@/icons/login-error .png" class="i canClick" v-show="verif.password === false"
           @click="DeleteInputFun('password')">
    </div>
    <!--手机号-->
    <div class="u">
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
    <div class="v">
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
             @click="den"
             v-show="verifShow">{{ btnText }}
        </div>
        <span class="delayDate" v-show="!verifShow">{{ countdown }}</span>
      </div>
    </div>

    <div class="c">
      <label>{{ $t('login_page.register.type') }}：</label>
      <el-radio-group v-model="form.zone" class="radio">
        <el-radio :label=1>{{ $t('login_page.register.typeRadio')[0] }}</el-radio>
        <el-radio :label=2>{{ $t('login_page.register.typeRadio')[1] }}</el-radio>
      </el-radio-group>

    </div>
    <!--协议-->
    <div class="v">
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
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import {
    verifAccountIsRegister
  } from '@/api/login-api'

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
        clickEye: false,                   // 刚刚点击了密码展示状态切换
        form: {
          account: '',
          password: '',
          phone: '',
          code: '',
          zone: 1
        },
        verif: {                 // 输入文本是否通过正则 && 是否获得焦点
          account: null,
          password: null,
          phone: null,
          code: null,
          tick: null,
        },
        codeObtained: false,               // 已获取验证码
        btnText: this.$t('login_page.getCode'),
        pdf: null,
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
        let rfa = this['from']['account'],
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
          if (data.data.code == 200) {
            // 账号未被注册
            if (ing) verif.account = null
            else {
              verif.account = false
              warnInfo.account = this.$t('login_page.message.ac_verif_four')
            }
          } else verif.account = true    // 账号未被占用
        }
      },
      //
      passwVerif() {

      },
      //
      phoneVerif() {

      },
      //
      codeVerif(ing) {

      },
      //
      changePSType(boolean) {

      },
      //
      den() {

      },
      //
      showPDF() {

      },
      //
      registerFun() {

      }
    },
    computed: {
      ...mapState(['regExp'])
    }
  }
</script>

<style lang="less" scoped>
  .register-wrapper {
    .rl {
      position: relative;
      text-align: right;
      margin-bottom: 10px;
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
  }
</style>
