import {
  http
} from './index.js'

// 验证手机号是否已被注册
export function verifPhoneIsRegister(data) {
  return http({
    url: `/auth/checkPhone/${data}`,
    method: 'GET'
  })
}

// 验证帐号是否已被注册
export function verifAccountIsRegister(data) {
  return http({
    url: `/auth/checkAccount/${data}`,
    method: 'GET'
  })
}

// 短信登录
export function phoneLogin(data) {
  return http({
    url: `/auth/codeLogin`,
    method: 'POST',
    data
  })
}

// 账号登录
export function accountLogin(data) {
  return http({
    url: `/auth/accountLogin`,
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

// 用户服务协议
export function registerAccount(data) {
  return http({
    url: '/auth/signUp',
    method: 'POST',
    data
  })
}