import {
  http
} from './index.js'

// 验证手机号是否已被注册
export function verifPhoneIsRegister(data) {
  return http({
    url: `/dcpAuth/checkPhone/${data}`,
    method: 'GET'
  })
}

// 验证帐号是否已被注册
export function verifAccountIsRegister(data) {
  return http({
    url: `/dcpAuth/checkAccount/${data}`,
    method: 'GET'
  })
}

// 短信登录 获取code
export function phoneVerifFun(phone){
  return http({
    url: `/dcpAuth/sendPhoneCode4Login/${phone}`,
    method: 'GET'
  })
}

// 短信登录
export function phoneLogin(data) {
  return http({
    url: `/dcpAuth/codeLogin`,
    method: 'POST',
    data
  })
}

// 账号登录
export function accountLogin(data) {
  return http({
    url: `/dcpAuth/accountLogin`,
    method: 'POST',
    data
  })
}

// 用户服务协议
export function getProtocal() {
  return http({
    url: '/file/getProtocol',
    method: 'GET',
    responseType: 'blob'
  })
}

// 注册
export function registerAccount(data) {
  return http({
    url: '/dcpAuth/signUp',
    method: 'POST',
    data
  })
}

// 注册 获取手机验证码
export function registerGetphoneCode(phone){
  return http({
    url: `/dcpAuth/sendPhoneCode4CheckOwn/${phone}`,
    method: 'GET'
  })
}

