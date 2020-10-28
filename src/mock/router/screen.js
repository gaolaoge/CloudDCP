const Mock = require('mockjs')

let data = Array(22).fill(undefined).map(item => {
    return Mock.mock({
      'screenUuid': '@id',
      'screenId|+1': 30000,
      'screenName': '@cword(5, 15)',
      'screenStatus|0-1': 0,
      'certificateName': '@cword(10, 16)',
      'updateName|': '@cname()',
      'updateTime|1603603004505-1603993874505': 0
    })
  }
)

module.exports = [
  {  // 获取screen-table列表
    url: /\/professional\/screen\/getScreenList/,
    type: 'post',
    response: config => {
      let {body} = config,
        {pageIndex, pageSize} = body

      return {
        code: 200,
        msg: '',
        data: data.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
        total: 22
      }
    }
  }
]
