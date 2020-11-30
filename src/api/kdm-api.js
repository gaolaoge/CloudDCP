import {
  http
} from './index.js'

// 获取KDM Table 数据
export function getKDMTableList(data) {
  return http({
    url: `/dcpProfessional/kdm/getKdmTaskList`,
    method: 'POST',
    data
  })
}

// 获取KDM 子项 Table 数据
export function getKDMSonTableList(data) {
  return http({
    url: `/dcpProfessional/kdm/getKdmTaskDetailList`,
    method: 'POST',
    data
  })
}

// 获取KDM 子项 info
export function getKDMInfo(kdmTaskUuid) {
  return http({
    url: `/professional/kdm/getKdmTaskInfo/${kdmTaskUuid}`,
    method: 'GET'
  })
}
