import {
  http
} from './index.js'

// 获取screen-table列表
export function getScreenList(data) {
  return http({
    url: `/dcpProfessional/screen/getScreenList`,
    method: 'POST',
    data
  })
}

// 获取【我的银幕】结构
export function getMineScreenList(keyword) {
  return http({
    url: `/dcpProfessional/screen/getInnerGroupList?keyword=${keyword}`,
    method: 'GET'
  })
}

// 添加【院线银幕】分组
export function addNewScreenGroup(groupName) {
  return http({
    url: `/dcpProfessional/screen/addInnerGroup?groupName=${groupName}`,
    method: 'POST'
  })
}

// 删除【我的银幕】分组
export function deleteMineScreenG(theatreUuid) {
  return http({
    url: `/dcpProfessional/screen/deleteTheatre/${theatreUuid}`,
    method: 'DELETE'
  })
}

// 重命名【我的银幕】分组
export function renameMineScreenG(theatreUuid, theatreName) {
  return http({
    url: `/dcpProfessional/screen/renameTheatre/${theatreUuid}?theatreName=${theatreName}`,
    method: 'PUT'
  })
}
