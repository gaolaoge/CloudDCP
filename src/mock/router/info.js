module.exports = [
  {
    url: /\/auth\/sendPhoneCode4Login\//,
    type: 'get',
    response: config => {
      let {url} = config,
        l = url.split('/'),
        phone = Number(l[l.length - 2]),
        position = l[l.length - 1]

      if (phone === 18514347163 && position === 'login') return {
        code: 200
      }
    }
  },
  {
    url: /\/auth\/getCustomerByToken\//,
    type: 'get',
    response: () => {
      return {
        code: 200
      }
    }
  }
]
