const Mock = require('mockjs')

let templateList = Array(12).fill(undefined).map(item => {
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
)

module.exports = [
  { // DCP 设置渲染模板-获取已存在记录
    url: /\/professional\/template\/getCustomerTemplateList/,
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: templateList,
        total: 12
      }
    }
  },
  { // DCP 设置渲染模板-获取已存在记录
    url: /\/dcpProfessional\/dcp\/checkPackageTemplateName\?templateName=/,
    type: 'get',
    response: () => {
      return {code: 200}
    }
  },
  { // DCP 设置渲染模板-获取所有软件名和版本号
    url: /\/professional\/template\/getSoftList/,
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
  },
  { // KDM 获取内部银幕分组列表
    url: /\/professional\/kdm\/getInnerScreenGroupList/,
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
  },
  { // KDM 获取分组内银幕列表
    url: /\/professional\/kdm\/getScreenList\?theatreUuid=/,
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
  },
  { // KDM 新建KDM任务
    url: /\/professional\/kdm\/addKdmTask/,
    type: 'POST',
    response: () => {
      return {}
    }
  }
]
