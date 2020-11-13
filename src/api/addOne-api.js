import {
  http
} from './index.js'

// DCP 设置渲染模板-获取已存在记录
export function getTemplateList() {
  return http({
    url: `/professional/template/getCustomerTemplateList`,
    method: 'GET'
  })
}

// DCP 设置渲染模板-创建模板-判断模板名是否已存在
export function existedTName(templateName) {
  return http({
    url: `/dcpProfessional/dcp/checkPackageTemplateName?templateName=${templateName}`,
    method: 'GET'
  })
}

// DCP 设置渲染模板-删除模板
export function deleteTemplate(packageTemplateUuid) {
  return http({
    url: `/professional/dcp/deletePackageTemplate/${packageTemplateUuid}`,
    method: 'DELETE'
  })
}

// DCP 设置渲染模板-创建模板
export function createTemplate(data) {
  return http({
    url: `/professional/dcp/addPackageTemplate`,
    method: 'POST',
    data
  })
}

// DCP 设置渲染模板-编辑模板
export function editTemplate(data) {
  return http({
    url: `/professional/dcp/updatePackageTemplate`,
    method: 'PUT',
    data
  })
}

// DCP 创建DCP
export function createNewDCP(data) {
  return http({
    url: `/professional/dcp/addDcpTask`,
    method: 'POST',
    data
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

// KDM 新建KDM任务
export function createNewKDM(data) {
  return http({
    url: `/professional/kdm/addKdmTask`,
    method: 'POST',
    data
  })
}
