import {
  http
} from './index.js'

// 获取DCP Table 数据
export function getDCPTableList(data) {
  return http({
    url: `/professional/dcp/getTaskList`,
    method: 'POST',
    data
  })
}
