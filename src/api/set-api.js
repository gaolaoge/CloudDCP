import {
  http
} from './index.js'

// 消息设置 - 获取既定参数
export function getMessageData() {
  return http({
    url: `/professional/notice/setting/getSystemNoticeSetting`,
    method: 'GET'
  })
}

// 消息设置 - 获取既定参数
export function setMessageData(data) {
  return http({
    url: `/professional/notice/setting/updateNoticeSetting`,
    method: 'POST',
    data
  })
}

// 项目设置 - 获取列表
export function getObjectList(data) {
  return http({
    url: `/dcpProfessional/project/getProjectList`,
    method: 'POST',
    data
  })
}

// 项目设置 - 删除项目
export function deleteTask(projectUuid) {
  return http({
    url: `/dcpProfessional/project/setDefaultProject/${projectUuid}`,
    method: 'DELETE'
  })
}

// 项目设置 - 设为当前项
export function setDefault(data) {
  return http({
    url: `/dcpProfessional/project/updateDefaultProject`,
    method: 'POST',
    data
  })
}

// 项目设置 - 编辑项目
export function editTask(data) {
  return http({
    url: `/dcpProfessional/project/updateProject`,
    method: 'POST',
    data
  })
}

// 项目设置 - 新建项目
export function createTask(data) {
  return http({
    url: `/dcpProfessional/project/addProject`,
    method: 'POST',
    data
  })
}
