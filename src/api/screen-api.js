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

// 获取【院线】分组
export function getCinemaGList() {
  return http({
    url: `/dcpProfessional/screen/getCinemaList`,
    method: 'GET'
  })
}

// 获取【影院】分组
export function getTheatreList(cinemaUuid) {
  return http({
    url: `/dcpProfessional/screen/getTheatreList/${cinemaUuid}`,
    method: 'GET'
  })
}

// 添加【内部影院】银幕分组
export function addNewScreenGroup(data) {
  return http({
    url: `/dcpProfessional/screen/addInnerGroup`,
    method: 'POST',
    data
  })
}

// 添加【院线】银幕分组
export function addNewCScreenGroup({cinemaUuid, theatreName}) {
  return http({
    url: `/dcpProfessional/screen/addTheatre/${cinemaUuid}`,
    method: 'POST',
    data: {
      theatreName
    }
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
export function renameMineScreenG(data) {
  return http({
    url: `/dcpProfessional/screen/renameTheatre`,
    method: 'PUT',
    data
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

// 添加【院线银幕】
export function addCinemaScreen(data) {
  return http({
    url: `/dcpProfessional/screen/addScreenList`,
    method: 'POST',
    data
  })
}

// 添加院线
export function addNewCinema(data) {
  return http({
    url: `/dcpProfessional/screen/addCinema`,
    method: 'POST',
    data
  })
}

// 添加院线 - 校验新院线名是否存在
export function verifNewCinema(data) {
  return http({
    url: `/dcpProfessional/screen/checkCinemaName?${data}`,
    method: 'GET'
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

// 银幕操作 - 下载
export function downloadScreen(screenUuid) {
  return http({
    url: `/dcpProfessional/screen/downloadCertificate/${screenUuid}`,
    method: 'GET'
  })
}
