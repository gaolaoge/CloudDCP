const Mock = require('mockjs')

let data = Array(55).fill(undefined).map(item => {
    return Mock.mock({
      'taskUuid': '@id',
      'taskId|+1': 10000,
      'taskName': '@cword(5, 15)',
      'taskStatus|1-8': 0,
      'projectName|1': ['项目1', '项目2', '项目3', '项目4'],
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
    })
  }
)

module.exports = [
  {   // 获取dcp列表
    url: /\/professional\/dcp\/getTaskList/,
    type: 'post',
    response: config => {
      let {body} = config,
        {pageIndex, pageSize} = body

      return {
        code: 200,
        msg: '',
        data: data.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
        total: 55
      }
    }
  }
]