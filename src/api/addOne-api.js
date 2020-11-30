import {
  http
} from './index.js'

// DCP 设置渲染模板-获取已存在记录
export function getTemplateList(zoneUuid) {
  return http({
    url: `/dcpProfessional/dcp/getPackageTemplateList/${zoneUuid}`,
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
    url: `/dcpProfessional/dcp/deletePackageTemplate/${packageTemplateUuid}`,
    method: 'DELETE'
  })
}

// DCP 设置渲染模板-创建模板
export function createTemplate(data) {
  return http({
    url: `/dcpProfessional/dcp/addPackageTemplate`,
    method: 'POST',
    data
  })
}

// DCP 设置渲染模板-编辑模板
export function editTemplate(data) {
  return http({
    url: `/dcpProfessional/dcp/updatePackageTemplate`,
    method: 'PUT',
    data
  })
}

// DCP 创建DCP
export function createNewDCP(data) {
  return http({
    url: `/dcpProfessional/dcp/addDcpTask`,
    method: 'POST',
    data
  })
}

// KDM 获取内部银幕分组列表
export function getInternalScrGroup() {
  return http({
    url: `/dcpProfessional/kdm/getInnerScreenGroupList`,
    method: 'GET'
  })
}

// KDM 获取院线列表
export function getCinemaList(keyword) {
  return http({
    url: `/dcpProfessional/kdm/getCinemaList?keyword=${keyword}`,
    method: 'GET'
  })
}

// KDM 获取影院列表
export function getTheatreList(keyword, cinemaUuid) {
  return http({
    url: `/dcpProfessional/kdm/getTheatreList?keyword=${keyword}&cinemaUuid=${cinemaUuid}`,
    method: 'GET'
  })
}

// KDM 获取银幕列表
export function getInternalScrList(theatreUuid) {
  return http({
    url: `/dcpProfessional/kdm/getScreenList?theatreUuid=${theatreUuid}`,
    method: 'GET'
  })
}

// KDM 新建KDM任务
export function createNewKDM(data) {
  return http({
    url: `/dcpProfessional/kdm/addKdmTask`,
    method: 'POST',
    data
  })
}
