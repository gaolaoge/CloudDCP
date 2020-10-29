import {
  http
} from './index.js'

// 获取screen-table列表
export function getScreenList(data) {
  return http({
    url: `/professional/screen/getScreenList`,
    method: 'POST',
    data
  })
}

// 获取【我的银幕】结构
export function getMineScreenList(keyword) {
  return http({
    url: `/professional/screen/getInnerGroupList?keyword=${keyword}`,
    method: 'GET'
  })
}

// 获取【院线银幕】结构
export function addNewScreenGroup(groupName) {
  return http({
    url: `/professional/screen/addInnerGroup/${groupName}`,
    method: 'POST'
  })
}
