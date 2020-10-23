module.exports = [
  {
    url: /\/auth\/sendPhoneCode4Login\//,
    type: 'get',
    response: config => {
      let {url} = config,
        l = url.split('/'),
        phone = Number(l[l.length - 2]),
        position = l[l.length - 1]

      if (phone === 18514347163 && position == 'login') return {
        code: 200
      }
    }
  },
  {   // 个人信息
    url: /\/auth\/getCustomerByToken\//,
    type: 'get',
    response: () => {
      return {
        code: 200
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
  },
]
