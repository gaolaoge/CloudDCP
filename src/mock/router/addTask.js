const Mock = require('mockjs')

let templateList = Array(12).fill(undefined).map(item => {
    return Mock.mock({
      renderTemplate: {                        // 模板
        'id|0-999': 0,
        'createTime': 1586308643471,
        'createBy': '@id()',
        'updateTime': 1586397047167,
        'updateBy': '@id()',
        'templateUuid': '@id()',
        'dataStatus': 1,
        'updateParamAfterAnalyse': null,
        'templateName': '@cname()',          // 模板名称
        'isDefault|0': 0,                       // 默认选中 0为非
        'softName': '3dmax',                     // 软件名
        'softVer': '2021',                       // 版本
        'softNameVer': '3dmax2021',              //
        'softUuid': '127',                       // 软件编号
        'customerUuid': '@id()',
      },
      'xxlPlugins': [                            // 模板插件
        {
          'id': 1,
          'pluginName': 'V-ray',                 // 插件名
          'version': '1.233',                    // 插件版本
          'publisher': '2K',                     // 插件发行商
          'pluginUuid': '456',                   // 编号 唯一标识
          'createTime': '2020-03-31',
          'createBy': '1',
          'updateTime': '2020-03-31',
          'updateBy': '1',
          'dataStatus': 1
        }
      ]
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
        data: templateList
      }
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
  }
]
