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
    url: `/dcpProfessional/project/getAllCustomerProject?${data}`,
    method: 'GET'
  })
}

// 项目设置 - 删除任务
export function deleteTask(data) {
  return http({
    url: `/professional/project/deleteCustomerProject`,
    method: 'DELETE',
    data
  })
}

// 项目设置 - 编辑任务
export function setDefault(data) {
  return http({
    url: `/professional/project/updateDefaultProject`,
    method: 'POST',
    data
  })
}

// 项目设置 - 编辑任务
export function editTask(data) {
  return http({
    url: `/professional/project/updateCustomerProject`,
    method: 'POST',
    data
  })
}

// 项目设置 - 新建任务
export function createTask(data) {
  return http({
    url: `/dcpProfessional/project/addCustomerProject`,
    method: 'POST',
    data
  })
}
