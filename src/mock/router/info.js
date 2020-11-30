const getInfoF = {
      url: /\/common\/customer\/getCustomerByToken/,
      type: 'get',
      response: () => {
        return {
          code: 200,
          data: {
            account: 'gaoge1834',                   // 帐号
            phone: 18514347163,                     // 手机号
            vipLevel: 1,                            // 会员等级
            customerUuid: 1,                        // 用户ID
            headImg: null,                          // 头像
            nickname: '高歌',                        // 昵称
            birthday: null,                         // 生日
            email: '183412808@qq.com',              // email
            sex: 1,                                 // 性别
            zoneUuid: 'zone001',                    // 所在区ID
            goldBalance: 77777777                   // 金币余额
          }
        }
      }
    },  // 个人信息
  getNews = {
    url: /\/professional\/news\/getAllNewsList/,
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: [
          {
            'newsTitle': '示例公告',
            'newsDetail': '这里是一个公告示例'
          }
        ]
      }
    }
  },       // 获取公告
  getPartition = {
    url: /\/sdsd/,
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: [
          {
            zoneUuid: 100,
            zoneName: '示例分区'
          }
        ]
      }
    }
  }   // 获取分区列表

module.exports = [
  // getInfoF,
  getNews,
  getPartition
]
