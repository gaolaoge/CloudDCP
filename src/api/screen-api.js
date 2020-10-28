import {
  http
} from './index.js'

// 获取screen-table列表
export function getScreenList(data) {
  return http({
    url: `/professional/screen/getScreenList`,
    method: 'POST',
    data
  })
}
