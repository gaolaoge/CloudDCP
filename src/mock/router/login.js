module.exports = [
  {  // 验证手机号是否已被注册
    url: /\/auth\/checkPhone\//,
    type: 'get',
    response: config => {
      let {url} = config,
        l = url.split('/'),
        phone = Number(l[l.length - 1])

      if (phone === 18514347163) return {code: 200}
      else return {code: 4031}
    }
  },
  {  // 验证帐号是否已被注册
    url: /\/auth\/checkAccount\//,
    type: 'GET',
    response: config => {
      let {url} = config,
        l = url.split('/'),
        account = Number(l[l.length - 1])

      if (account == 'gaoge1834') return {code: 200}
      else return {code: 4031}
    }
  },
  {  // 短信登录
    url: /\/auth\/codeLogin/,
    type: 'post',
    response: config => {
      let {phone, code} = config.body

      if (phone == 18514347163 && code == 123456) return {
        code: 200,
        data: {
          account: 'gaoge1834',
          token: 1000000000000000000000
        }
      }
      else return {code: 4032}
    }
  },
  {  // 账号登录
    url: /\/auth\/accountLogin/,
    type: 'post',
    response: config => {
      let {account, password} = config.body

      if ((account == 18514347163 || account == 'gaoge1834') && password == '22334455.') return {
        code: 200,
        data: {
          account: 'gaoge1834',
          token: 1000000000000000000000
        }
      }
      else return {code: 4032}
    }
  },
  {  // 注册
    url: /\/auth\/signUp/,
    type: 'post',
    response: () => {
      return {code: 200}
    }
  }
]
