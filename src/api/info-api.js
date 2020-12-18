import {
  http
} from './index.js'

// 个人信息
export function getUserInfo() {
  return http({
    url: `/common/customer/getCustomerByToken`,
    method: 'GET'
  })
}

// 验证短信验证码
export function verifPhoneCode(data) {
  return http({
    url: `/dcpAuth/checkPhoneCode4ChangePassword?${data}`,
    method: 'GET'
  })
}

// 修改密码
export function editPS(data) {
  return http({
    url: `/dcpAuth/changePasswordByPhone`,
    method: 'PUT',
    data
  })
}

// 找回密码 获取手机号验证码
export function getPhoneVeriFG(data) {
  return http({
    url: `/dcpAuth/sendPhoneCode4ChangePassword/${data}`,
    method: 'GET'
  })
}

// 修改个人信息
export function editBasicInfo(data) {
  return http({
    url: '/customer/updateCustomerInfo',
    method: 'PUT',
    data
  })
}

// 修改手机号 - 通过验证手机号 - 获取旧手机号验证码
export function editPhoneGetOC() {
  return http({
    url: `/customer/sendPhoneCode4ChangePhone`,
    method: 'GET'
  })
}

// 修改手机号 - 通用 - 获取新手机号验证码
export function editPhoneGetNC(data) {
  return http({
    url: `/customer/sendPhoneCode4CheckOwn/${data}`,
    method: 'GET'
  })
}

// 修改手机号 - 通过验证手机号 - 发送验证
export function editPhoneP(data) {
  return http({
    url: `/customer/changePhoneByPhoneCode`,
    method: 'PUT',
    data
  })
}

// 修改手机号 - 通过验证邮箱 - 获取邮箱验证码
export function editPhoneGetEC() {
  return http({
    url: `/customer/sendEmailCode4ChangePhone`,
    method: 'GET'
  })
}

// 修改手机号 - 通过验证邮箱 - 发送验证
export function editPhonePP(data) {
  return http({
    url: `/customer/changePhoneByEmailCode`,
    method: 'PUT',
    data
  })
}

// 修改手机号 - 通过验证密码 - 发送验证
export function editPhonePS(data) {
  return http({
    url: `/customer/changePhoneByPassword`,
    method: 'PUT',
    data
  })
}

// 修改邮箱 - 获取手机验证码
export function getPhoneCodeFromEmail() {
  return http({
    url: '/customer/sendPhoneCode4ChangeEmail',
    method: 'GET'
  })
}

// 修改邮箱 - 获取新邮箱验证码
export function getEmailCodeFromEmail(data) {
  return http({
    url: `/customer/sendEmailCode4CheckOwn/${data}`,
    method: 'GET'
  })
}

// 修改邮箱 - 修改
export function editEmail(data) {
  return http({
    url: `/customer/changeEmailByPhoneCode`,
    method: 'PUT',
    data
  })
}

// 修改密码 - 验证码
export function getCodeFromPS(data) {
  return http({
    url: '/customer/sendPhoneCode4ChangePassword',
    method: 'GET',
    data
  })
}

// 修改密码
export function editPassWord(data) {
  return http({
    url: '/customer/updatePassword',
    method: 'PUT',
    data
  })
}
