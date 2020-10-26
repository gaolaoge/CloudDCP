module.exports = [
  {   // 获取验证码
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
  {   // 个人信息
    url: /\/customer\/getCustomerByToken/,
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          account: 'gaoge1834',                   // 帐号
          phone: 18514347163,                     // 手机号
          level: 1,
          vipLevel: 1,                            // 会员等级
          balance: '璀璨铂金',
          customerUuid: 1000000000000000000,      // ID
          headImg: null,                          // 头像
          nickname: '高歌',                        // 昵称
          birthday: null,                         // 生日
          email: '183412808@qq.com',              // email
          sex: 1,                                 // 性别
          zone: 1,                                // 分区 1影视区 2效果图区
          zoneUuid: 1111111111111,                // 所在区ID
          totalInvoiceAmount: 999999999999999,
          totalInvoiceAble: 888888888888,
          goldBalance: 77777777777777,            // 金币余额
          capacity: 6666666666666666,             // 总容量
          haveCapacity: 55555555,                 // 已用容量
          cumulativeRecharge: 4444444444444,      // 累计支付金额
          totalArrival: 33333,                    // 累计到账金币
          cumulativeConsume: 222222222            // 累计消费金币
        }
      }
    }
  },
  {   // 验证短信验证码
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
  {   // 修改密码
    url: /\/auth\/changePasswordByPhone/,
    type: 'put',
    response: () => {
      return {
        code: 200
      }
    }
  }
]
