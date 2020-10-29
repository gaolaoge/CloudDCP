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
  },
  {  // 获取【我的银幕】结构
    url: /\/professional\/screen\/getInnerGroupList/,
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: [
          {
            'theatreUuid': '001',
            'theatreName': '项目1',
            'theatreNo': '0001',
            'total': 2
          },
          {
            'theatreUuid': '002',
            'theatreName': '项目2',
            'theatreNo': '0002',
            'total': 0
          },
          {
            'theatreUuid': '003',
            'theatreName': '项目3',
            'theatreNo': '0003',
            'total': 7
          },
          {
            'theatreUuid': '004',
            'theatreName': '项目4',
            'theatreNo': '0004',
            'total': 12
          }
        ]
      }
    }
  }
]
