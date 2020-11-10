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

// KDM 获取内部银幕分组列表
export function getInternalScrGroup() {
  return http({
    url: `/professional/kdm/getInnerScreenGroupList`,
    method: 'GET'
  })
}

// KDM 获取分组内银幕列表
export function getInternalScrList(theatreUuid) {
  return http({
    url: `/professional/kdm/getScreenList?theatreUuid=${theatreUuid}`,
    method: 'GET'
  })
}
