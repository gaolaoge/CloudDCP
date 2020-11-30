const Mock = require('mockjs')

let data = Array(55).fill(undefined).map(item => {
    return Mock.mock({
      'taskUuid': '@id',
      'taskId|+1': 10000,
      'taskName': '@cword(5, 15)',
      'taskStatus': 201,
      'projectName|1': ['项目1', '项目2', '项目3', '项目4'],
      'filmName': '@cword(5, 8)',
      'cost|45-999': 0,
      'useTime|1000-9999000': 0,
      'filmCategory|1-10': 0,
      'aspectRatio|0-2': 0,
      'filmType|1-2': 0,
      'resolution|0-1': 0,
      'isEncrypt|0-1': 0,
      'createName': '@cname()',
      'createTime|1603603004505-1603693874505': 0,
      'expireTime|1603603004505-1603993874505': 0
    })
  }
)

let getTaskList = {   // 获取dcp列表
  url: /\/dcpProfessional\/dcp\/getTaskList/,
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

module.exports = [
  // getTaskList
]
