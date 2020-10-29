module.exports = [
  // 获取验证码
  {
    url: /\/auth\/sendPhoneCode4Login\//,
    type: 'get',
    response: config => {
      let {url} = config,
        l = url.split('/'),
        phone = Number(l[l.length - 2]),
        position = l[l.length - 1]

      if (phone === 18514347163 && position == 'login') return {code: 200}
      else if (position == 'regitser') return {}
      else return {code: 4031}
    }
  },
  // 个人信息
  {
    url: /\/customer\/getCustomerByToken/,
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          account: 'gaoge1834',                   // 帐号
          phone: 18514347163,                     // 手机号
          vipLevel: 1,                            // 会员等级
          customerUuid: 1000000000000000000,      // 用户ID
          headImg: null,                          // 头像
          nickname: '高歌',                        // 昵称
          birthday: null,                         // 生日
          email: '183412808@qq.com',              // email
          sex: 1,                                 // 性别
          zoneUuid: 100,                          // 所在区ID
          goldBalance: 77777777                   // 金币余额
        }
      }
    }
  },
  // 验证短信验证码
  {
    url: /\/auth\/checkPhoneCode4ChangePassword\?phone=\d{11}&code=\d{6}/,
    type: 'get',
    response: config => {
      let {query} = config

      if (query.phone == 18514347163 && query.code == '123456') return {
        code: 200
      }
      else return {
        code: 4034
      }
    }
  },
  // 修改密码
  {
    url: /\/auth\/changePasswordByPhone/,
    type: 'put',
    response: () => {
      return {
        code: 200
      }
    }
  },
  // 获取公告
  {
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
  },
  // 获取分区列表
  {
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
  }
]
