import {
  http
} from './index.js'

// 获取DCP Table 数据
export function getDCPTableList(data) {
  return http({
    url: `/dcpProfessional/dcp/getTaskList`,
    method: 'POST',
    data
  })
}

// 获取DCP Table 数据
export function getDCPTableDefault(taskUuid) {
  return http({
    url: `/dcpProfessional/dcp/getTaskInfo/${taskUuid}`,
    method: 'GET'
  })
}
