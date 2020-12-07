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

// 下载DCP
export function downloadDCPFile(data) {
  return http({
    url: `/dcpProfessional/dcp/dcpDownload`,
    method: 'POST',
    data
  })
}

// DCP 详情 - 打包结果 => 初始数据
export function getDCPPackTheResult(packageTaskUuid) {
  return http({
    url: `/dcpProfessional/dcp/getProcessList/${packageTaskUuid}`,
    method: 'GET'
  })
}

// DCP 详情 - 打包结果 => 初始数据
export function getDCPPackTheResultFForTab(data) {
  return http({
    url: `/dcpProfessional/dcp/getFrameTaskList`,
    method: 'POST',
    data
  })
}
