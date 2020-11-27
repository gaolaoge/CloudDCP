import {
  http
} from './index.js'

// 获取院线screen-table列表
export function getScreenList(data) {
  return http({
    url: `/dcpProfessional/screen/getScreenList`,
    method: 'POST',
    data
  })
}

// 获取内部screen-table列表
export function getMineScreenTabList(data) {
  return http({
    url: `/dcpProfessional/screen/getInnerScreenList`,
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

// 添加【我的银幕】
export function addMineScreen(data) {
  return http({
    url: `/dcpProfessional/screen/addInnerScreenList`,
    method: 'POST',
    data
  })
}

// 银幕操作 - 删除
export function deleteScreen(data) {
  return http({
    url: `/dcpProfessional/screen/deleteScreen`,
    method: 'DELETE',
    data
  })
}

// 银幕操作 - 编辑
export function editScreen(data) {
  return http({
    url: `/dcpProfessional/screen/updateScreenInfo`,
    method: 'PUT',
    data
  })
}

