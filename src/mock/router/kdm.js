const Mock = require('mockjs')

let data = Array(23).fill(undefined).map(item => {
    return Mock.mock({
      'kdmTaskUuid': '@id',
      'kdmTaskId|+1': 20000,
      'kdmTaskName': '@cword(5, 15)',
      'taskStatus|': 650,
      'projectName|1': ['项目1', '项目2', '项目3', '项目4'],
      'filmName': '@cword(5, 8)',
      'cost|45-999': 0,
      'kdmCount|1-99': 0,
      'movieStartTime|1603603004505-1603609004505': 0,
      'movieEndTime|1603619004505-1603629004505': 0,
      'expireTime|1603603004505-1603993874505': 0
    })
  }
)

let getKdmTaskList = {
  url: /\/dcpProfessional\/kdm\/getKdmTaskList/,
  type: 'post',
  response: config => {
    let {body} = config,
      {pageIndex, pageSize} = body
    return {
      code: 200,
      msg: '',
      data: data.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
      total: 23
    }
  }
}

module.exports = [
  // getKdmTaskList            // 获取kdm列表
]
