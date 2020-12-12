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
    url: `/dcpProfessional/kdm/getKdmTaskInfo/${kdmTaskUuid}`,
    method: 'GET'
  })
}

// 获取KDM 子项 info
export function downLoadKDM(data) {
  return http({
    url: `/dcpProfessional/kdm/kdmDownload`,
    method: 'POST',
    data
  })
}

// KDM 操作
export function KDMTabOperating(data) {
  return http({
    url: `/dcpProfessional/kdm/buttonOperate`,
    method: 'POST',
    data
  })
}
