const Mock = require('mockjs')

let login = require('./router/login'),
  info = require('./router/info'),
  dcp = require('./router/dcp'),
  kdm = require('./router/kdm'),
  screen = require('./router/screen'),
  bill = require('./router/bill'),
  set = require('./router/set'),
  addTask = require('./router/addTask')

let mocks = [
  ...login,
  ...info,
  ...dcp,
  ...kdm,
  ...screen,
  ...bill,
  ...set,
  ...addTask
]

function mockXHR() {
  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url),
          url
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) return {}
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

export {
  mockXHR
}
