import {
  http
} from './index.js'

// 新建任务 设置渲染模板-获取已存在记录
export function createTaskSet(){
  return http({
    url: `/professional/template/getCustomerTemplateList`,
    method: 'GET'
  })
}

// 新建任务 设置渲染模板-获取所有软件名和版本号
export function createTaskSetSoftware(){
  return htto({
    url: `/professional/template/getSoftList`,
    method: 'GET'
  })
}
