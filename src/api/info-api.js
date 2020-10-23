import {
  http
} from './index.js'

// 个人信息
export function getUserInfo() {
  return http({
    url: `/customer/getCustomerByToken`,
    method: 'GET'
  })
}

// 获取短信验证码
export function getPhoneCode({phone, position}) {
  return http({
    url: `/auth/sendPhoneCode4Login/${phone}/${position}`,
    method: 'GET'
  })
}

// 验证短信验证码
export function verifPhoneCode(data) {
  return http({
    url: `/auth/checkPhoneCode4ChangePassword?${data}`,
    method: 'GET'
  })
}

// 修改密码
export function editPS(data) {
  return http({
    url: `/auth/changePasswordByPhone`,
    method: 'PUT',
    data
  })
}
