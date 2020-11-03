const Mock = require('mockjs')

// 充值记录
let rechargeCentreData = Array(25).fill(undefined).map(item => {
    return Mock.mock({
      'outTradeNo': '@id',
      'paymentStatus|1-3': 0,
      'actualPayment|1-1000': 0,
      'arrivalAmount|10-1000': 0,
      'rechargeExplain': '@cword(12,20)',
      'productOrderUuid': /\d{18}/,
      'updateTime|1603603004505-1603693874505': 0,
      'invoice|0-3': 0,
      'operate': ''
    })
  })

// 消费记录
let consumptionData = Array(44).fill(undefined).map(item => {
    return Mock.mock({
      'layerNo': '@id',
      'fileName': '@cword(4,18)',
      'layerTaskStatus|1': [1, 2, 3, 4, 6],
      'projectName|1': ['项目1', '项目2', '项目3'],
      'totalFrame|9-99': 0,
      'tableType': '',
      'patternOfConsumption|1-2': 0,
      'totalCost|9-99': 1,
      'account': '@cname()',
      'updateTime|1603603004505-1603693874505': 0,
      'layerTaskUuid': '@id'
    })
  })

// 开票记录
let invoicingData = Array(56).fill(undefined).map(item => {
    return Mock.mock({
      'invoiceTitle': '@cword(8, 12)',
      'taxpayerId': '@id',
      'invoiceAmount|1-99': 0,
      'invoiceType|0-1': 0,
      'updateTime|1603603004505-1603693874505': 0,
      'invoiceStatus|0-3': 0,
      'email': '@email()'
    })
  })

module.exports = [
  {   // 开票记录 获取table数据
    url: /\/billing\/invoice\/getInvoicePage\?/,
    type: 'get',
    response: config => {
      let {query} = config,
        {pageIndex, pageSize} = query

      return {
        code: 200,
        msg: '',
        data: invoicingData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
        total: 56
      }
    }
  },
  {   // 充值记录 获取table数据
    url: /\/billing\/recharge\/getRechargeList\?/,
    type: 'get',
    response: config => {
      let {query} = config,
        {pageIndex, pageSize} = query

      return {
        code: 200,
        msg: '',
        data: rechargeCentreData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
        total: 25
      }
    }
  },
  {   // 消费记录 获取table数据
    url: /\/billing\/spending\/getSpendingList\?/,
    type: 'get',
    response: config => {
      let {query} = config,
        {pageIndex, pageSize} = query

      return {
        code: 200,
        msg: '',
        data: consumptionData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
        total: 44
      }
    }
  },
  {   // 获取所属项目List
    url: /\/professional\/project\/getCustomerProjectList/,
    type: 'get',
    response: () => {
      return {
        code: 200,
        msg: '',
        data: [
          {
            'taskProjectUuid': '001',
            'projectName': '项目1'
          },
          {
            'taskProjectUuid': '002',
            'projectName': '项目2'
          },
          {
            'taskProjectUuid': '003',
            'projectName': '项目3'
          }
        ],
        total: 25
      }
    }
  },
  {   // 获取所属项目List
    url: /\/billing\/invoice\/getInvoiceTitleList/,
    type: 'get',
    response: () => {
      return {
        code: 200,
        msg: '',
        data: [
          {
            'value': 123,
            'label': '发票抬头1'
          },
          {
            'value': 234,
            'label': '发票抬头2'
          },
          {
            'value': 345,
            'label': '发票抬头3'
          }
        ],
        total: 25
      }
    }
  },
  {   // 获取可开票的充值记录
    url: /\/billing\/invoice\/getRechargeList4Invoice/,
    type: 'get',
    response: () => {
      return {
        code: 200,
        msg: '',
        data: [],
        total: 0
      }
    }
  },
  {   // 获取可开票的充值记录
    url: /\/billing\/invoice\/getInvoiceSettingList/,
    type: 'get',
    response: () => {
      return {
        code: 200,
        msg: '',
        data: [],
        total: 0
      }
    }
  }
]
