import {
  http
} from './index.js'

// 站内信 - 获取列表
export function identify(data) {
  return http({
    url: `/professional/notice/message/getCustomerNoticeMessage?${data}`,
    method: 'GET'
  })
}
