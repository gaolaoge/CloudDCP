import {
  http
} from './index.js'

// 站内信 - 获取列表
export function getMessageList(data) {
  return http({
    url: `/professional/notice/message/getCustomerNoticeMessage?${data}`,
    method: 'GET'
  })
}

// 站内信 - 获取站内信列表中选中项目所在位置
export function getTaskPosition(data) {
  return http({
    url: `/professional/notice/message/getCustomerNoticeMessage?${data}`,
    method: 'GET'
  })
}

// 站内信 - 设为已读
export function readMessages(data) {
  return http({
    url: `/professional/notice/message/getCustomerNoticeMessage?${data}`,
    method: 'GET'
  })
}

// 获取分区列表
export function getZoneList() {
  return http({
    url: `/dcpProfessional/project/getZoneList`,
    method: 'GET'
  })
}

// 切换分区
export function putNewZoneID(data) {
  return http({
    url: `/professional/notice/message/getCustomerNoticeMessage?${data}`,
    method: 'GET'
  })
}

// 获取公告
export function getBulletin() {
  return http({
    url: `/professional/news/getAllNewsList`,
    method: 'GET'
  })
}
