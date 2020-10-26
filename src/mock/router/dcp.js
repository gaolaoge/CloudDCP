const Mock = require('mockjs')

let tableData = Mock.mock({
  'code': 200,
  'msg': '',
  'data|10': [
    {
      'taskUuid': '@id',
      'taskId|1000-9999': 0,
      'taskName': '@cword(5, 15)',
      'taskStatus|1-8': 0,
      'projectName': '@cword(5, 10)',
      'filmName': '@cword(5, 8)',
      'cost|45-999': 0,
      'useTime|1000-9999000': 0,
      'film_category|1-10': 0,
      'aspect_ratio|1-3': 0,
      'film_type|1-2': 0,
      'resolution|1-2': 0,
      'is_encrypt|0-1': 0,
      'createName': '@cname()',
      'createTime|1603603004505-1603693874505': 0,
      'expireTime|1603603004505-1603993874505': 0
    }
  ],
  'total': 55
})

module.exports = [
  {   // 获取验证码
    url: /\/professional\/dcp\/getTaskList/,
    type: 'post',
    response: config => {
      // let {body} = config
      return tableData
    }
  }
]
