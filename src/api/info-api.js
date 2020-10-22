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

// 获取手机验证码
export function getPhoneCode({phone, position}) {
  return http({
    url: `/auth/sendPhoneCode4Login/${phone}/${position}`,
    method: 'GET'
  })
}
