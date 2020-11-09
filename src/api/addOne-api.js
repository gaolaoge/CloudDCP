import {
  http
} from './index.js'

// DCP 设置渲染模板-获取已存在记录
export function createTaskSet() {
  return http({
    url: `/professional/template/getCustomerTemplateList`,
    method: 'GET'
  })
}

// DCP 设置渲染模板-获取所有软件名和版本号
export function deleteTemplate(packageTemplateUuid) {
  return http({
    url: `/professional/dcp/deletePackageTemplate/${packageTemplateUuid}`,
    method: 'DELETE'
  })
}
