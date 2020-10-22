module.exports = [
  {
    url: /\/auth\/checkPhone\//,
    type: 'get',
    response: config => {
      let {url} = config,
        l = url.split('/'),
        phone = Number(l[l.length - 1])

      if (phone === 18514347163) return {
        code: 200
      }
      else return {
        code: 4031
      }
    }
  },
  {
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
      else return {
        code: 4032
      }
    }
  }
]
