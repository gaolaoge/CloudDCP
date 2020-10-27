import {
  http
} from './index.js'

// 获取KDM Table 数据
export function getKDMTableList(data) {
  return http({
    url: `/professional/kdm/getKdmTaskList`,
    method: 'POST',
    data
  })
}
