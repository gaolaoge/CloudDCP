const Mock = require('mockjs')

let getCustomerTemplateList = {
  url: /\/dcpProfessional\/dcp\/getPackageTemplateList/,
  type: 'get',
  response: () => {
    return {
      code: 200,
      data: Array(12).fill(undefined).map(item => {
          return Mock.mock({
            'packageTemplateUuid': '@id()',        // Uuid
            'isDefault|0-1': 0,                    // 是否默认 0不是, 1是
            'codingRule|0-1': 0,                   // 打包标准
            'templateName': '@cname()',            // 模板名称
            'isDefault|0': 0,                      // 默认选中 0为非
            'codingRate|0-500': 0,                 // 码率
            'frameRate|0-5': 0                     // 帧速率
          })
        }
      ),
      total: 12
    }
  }
}  // DCP 设置渲染模板-获取已存在记录
  , checkPackageTemplateName = {
  url: /\/dcpProfessional\/dcp\/checkPackageTemplateName\?templateName=/,
  type: 'get',
  response: () => {
    return {code: 200}
  }
} // DCP 设置渲染模板-创建模板-判断模板名是否已存在
  , getSoftList = {
  url: /\/dcpProfessional\/template\/getSoftList/,
  type: 'get',
  response: () => {
    return {
      code: 200,
      data: [
        {
          'softName': '',
          'version': '',
          'softUuid': '@id()',
          softList: []
        }
      ]
    }
  }
}              // DCP 设置渲染模板-获取所有软件名和版本号
  , getInnerScreenGroupList = {
  url: /\/dcpProfessional\/kdm\/getInnerScreenGroupList/,
  type: 'get',
  response: () => {
    return Mock.mock({
      'code': 200,
      'data|4': [
        {
          'theatreUuid': '@id()',
          'theatreName': '@cname()',
          'theatreNo|+1': 1,
          'screenCount|1-5': 0
        }
      ],
      total: 4
    })
  }
}  // KDM 获取内部银幕分组列表
  , getScreenList = {
  url: /\/dcpProfessional\/kdm\/getScreenList\?theatreUuid=/,
  type: 'get',
  response: () => {
    return Mock.mock({
      'code': 200,
      'data|3': [
        {
          'screenUuid': '@id()',
          'screenId': /\d{12}/,
          'screenName': /\d{5}_[\u4e00-\u9fa5]{2}\d/,
          'certificateName': /Barco-ICMP\.\d{10}_cert\.pem/
        }
      ],
      total: 3
    })
  }
}            // KDM 获取分组内银幕列表
  , addKdmTask = {
  url: /\/dcpProfessional\/kdm\/addKdmTask/,
  type: 'POST',
  response: () => {
    return {}
  }
}              // KDM 新建KDM任务
module.exports = [
  // getCustomerTemplateList
  // , checkPackageTemplateName
  // , getSoftList
  // , getInnerScreenGroupList
  // , getScreenList
  // , addKdmTask
]
