import {
  Message
} from 'element-ui'
import i18n from '@/lang'
import store from '../store'
import {
  getUserInfo
} from '@/api/info-api'

// get请求转换参数为字符串
const transformParameterT = function (obj) {
  if(!obj instanceof Object) return false
  let default_ = []
  Object.keys(obj).forEach(key => default_.push(`${key}=${obj[key]}`))
  return default_.join('&')
}

// 获取个人信息
const
getUserInfoF = function () {
  getUserInfo().then(data => setInfo(data.data.data))
}

// 读取时间戳
const createCalendar = function (date) {
  let val
  date instanceof Date ? val = date : val = new Date(date)
  let year = val.getFullYear(),
    month = val.getMonth() > 8 ? val.getMonth() + 1 : '0' + (val.getMonth() + 1),
    day = val.getDate() > 9 ? val.getDate() : '0' + val.getDate(),
    hour = val.getHours() > 9 ? val.getHours() : '0' + val.getHours(),
    minutes = val.getMinutes() > 9 ? val.getMinutes() : '0' + val.getMinutes(),
    seconds = val.getSeconds() > 9 ? val.getSeconds() : '0' + val.getSeconds()
  return {year, month, day, hour, minutes, seconds}
}

// 获得日期时间
const createDateFun = function (date, mini, inADay, miniInDay) {
  let val
  date instanceof Date ? val = date : val = new Date(date)
  if ((val.getFullYear() === '1970' && !inADay)) return '-'
  let {year, month, day, hour, minutes, seconds} = createCalendar(val)
  if (mini) return `${year}-${month}-${day}`
  else if (inADay) return `${hour}:${minutes}:${seconds}`
  else if (miniInDay) return `${hour}:${minutes}`
  else return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
}

// 耗时
const consum = function (time) {
  let result = ''
  if (time >= 1000) {
    let day = parseInt(time / (24 * 60 * 60 * 1000)),
      hour = parseInt((time % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)),
      minute = parseInt(((time % (24 * 60 * 60 * 1000)) % (60 * 60 * 1000)) / (60 * 1000)),
      second = parseInt((((time % (24 * 60 * 60 * 1000)) % (60 * 60 * 1000)) % (60 * 1000)) / 1000)
    if (day !== 0) {
      result += day + '天'
    }
    if (hour !== 0 || result !== '') {
      result += hour + '小时'
    }
    if (minute !== 0 || result !== '') {
      result += minute + '分'
    }
    if (second !== 0 || result !== '') {
      result += second + '秒'
    }
  }
  return result === '' ? '0秒' : result
}

// 获得时间戳
const getDate = (year, month, day) => {
  return new Date(year, month - 1, day)
}

// 下载
const exportDownloadFun = (data, name, type, isProtocal) => {
  // arguments isProtocal=>用户协议
  let blob = null
  if (type === 'xlsx') {
    blob = new Blob([data.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
    const a = document.createElement('A'),
      url = window.URL.createObjectURL(blob),
      filename = name + '.xlsx'
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  } else if (type === 'pdf') {
    let url = window.URL.createObjectURL(new Blob([data.data], {type: `application/pdf;charset-UTF-8`})),
      link = document.createElement('A')
    link.style.display = 'none'
    if (isProtocal) link.setAttribute('target', '_blank')
    link.href = url
    if (!isProtocal) link.setAttribute('download', name + '.pdf')
    document.body.appendChild(link)
    link.click()
  } else {
    let url = window.URL.createObjectURL(new Blob([data.data], {'type': data.headers['content-type']})),
      a = document.createElement('A')
    a.style.display = 'none'
    a.target = '_blank'
    a.href = url
    a.download = name
    a.click()
  }
}

// 2位排序
const sortF = function (a, b) {
  if (a < b) return
  a += b
  b = a - b
  a -= b
}

// table 筛选icon样式
const createTableIconList = function () {
  // 筛选图标
  // if (!document.getElementsByClassName('iconshaixuan2').length) {
  let t = [...document.getElementsByClassName('el-icon-arrow-down')]
  t.forEach(curr => {
    if (curr.querySelector('.farmIconFont')) return false
    let i = document.createElement('I'),
      ii = document.createElement('I')
    i.classList.add('farmIconFont')
    i.classList.add('iconshaixuan2')
    ii.classList.add('farmIconFont')
    ii.classList.add('iconshaixuan1')
    curr.appendChild(i)
    curr.appendChild(ii)
  })
  // }
  // 排序图标
  // if (!document.getElementsByClassName('kkkk').length) {
  let q = [...document.getElementsByClassName('ascending')]
  q.forEach(curr => {
    if (curr.querySelector('.kkkk')) return false
    let i = document.createElement('I')
    i.classList.add('el-icons-arrow-up')
    i.classList.add('kkkk')
    curr.appendChild(i)
  })
  let w = [...document.getElementsByClassName('descending')]
  w.forEach(curr => {
    if (curr.querySelector('.kkkk')) return false
    let i = document.createElement('I')
    i.classList.add('el-icons-arrow-down')
    i.classList.add('kkkk')
    curr.appendChild(i)
  })
  // }
  // 展开图标
  if (document.querySelector('.download-table')) {
    let table = document.querySelector('.download-table'),
      elTable = table.querySelector('.el-table__body-wrapper'),
      list = elTable.querySelectorAll('table tbody .el-table__row .el-table__expand-icons')
    list.forEach(curr => {
      if (curr.querySelector('.farmIconFont')) return false
      let original = curr.querySelector('i'),
        i = document.createElement('I')
      i.classList.add('farmIconFont')
      i.classList.add('iconsanjiaoright')
      curr.removeChild(original)
      curr.appendChild(i)
    })
  }
}

// message 信息
const messageFun = function (type, message) {
  return Message({
    message: message,
    type: type,
    showClose: true,
    duration: 3000
  })
}

// 报错信息
const throwInfoFun = function (info, site, data) {
  messageFun('error', info)
  console.log('╔══════════════════════════════════════╗')
  console.log(`║ ${info}， 位置 ${site}`)
  console.log('║ ' + data)
  console.log('╚══════════════════════════════════════╝')
}

// 渲染帧范围
const renderingRange = function (min, max, interval) {
  let a = [min],
    m = min + interval
  while (m <= max) {
    a.push(m)
    m += interval
  }
  return a
}

//
const itemDownloadStatus = function (num) {
  switch (num) {
    case 1:
    case 2:
      return '渲染中'
    case 3:
      return '渲染完成'
    case 4:
      return '渲染暂停'
    case 5:
      return '待全部渲染'
    case 6:
      return '渲染放弃'
  }
}

// Uuid
const UuidFun = function () {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'                                                        // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)       // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}

const setInfo = function (data) {
  sessionStorage.setItem('info', JSON.stringify({
    account: data.account,
    phone: data.phone,
    level: data.vipLevel,
    balance: data.goldBalance
  }))
  store.commit('changeID', data.customerUuid)                                                    // ID
  store.commit('changeAvatar', data.headImg)                                                     // 头像
  store.commit('changeName', data.nickname)                                                      // 昵称
  store.commit('changeAccount', data.account)                                                    // 帐号
  store.commit('changePhone', data.phone)                                                        // 手机号
  store.commit('changeLevel', data.vipLevel)                                                     // 会员等级
  store.commit('changeBirthday', data.birthday)                                                  // 生日
  store.commit('changeEmail', data.email)                                                        // email
  store.commit('changeSex', data.sex)                                                            // 性别
  store.commit('changeZoneId', data.zoneUuid || 'zone001')                                                    // 所在区ID
  store.commit('changeUserBalance', data.goldBalance.toFixed(3))                      // 金币余额
}

// 判断是否为IE等版本
const IEVersion = function () {
  var userAgent = navigator.userAgent,                                                    // 取得浏览器的userAgent字符串
    isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1,        // 判断是否IE<11浏览器
    isEdge = userAgent.indexOf('Edge') > -1 && !isIE,                                     // 判断是否IE的Edge浏览器
    isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
  if (isIE) {
    var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    var fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion === 7) return 7
    else if (fIEVersion === 8) return 8
    else if (fIEVersion === 9) return 9
    else if (fIEVersion === 10) return 10
    else return 6                       // IE版本<=7
  } else if (isEdge) return 'edge'      // edge
  else if (isIE11) return 11            // IE11
  else return -1                        // 不是ie浏览器
}

const clearUserCookie = function (phone, account, token) {
  if (!document.cookie) return false
  let s = {},
    f = false
  document.cookie.split(';').forEach(function (curr) {
    s[curr.split('=')[0].trim()] = curr.split('=')[1].trim()
  })
  if ('phone' in s) f = s['phone'] === phone
  else if ('account' in s) f = s['account'] === account
  if (f) {
    document.cookie = `token=${token};max-age=-1`
    if ('phone' in s) document.cookie = `phone=${phone};max-age=-1`
    if ('account' in s) document.cookie = `account=${account};max-age=-1`
  }
}

// 文件大小单位转换
const getFileSize = function (fileByte) {
  let fileSizeByte = fileByte,
    fileSizeMsg = ''
  if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + 'KB'
  else if (fileSizeByte === 1048576) fileSizeMsg = '1MB'
  else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + 'MB'
  else if (fileSizeByte > 1048576 && fileSizeByte === 1073741824) fileSizeMsg = '1GB'
  else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
  else fileSizeMsg = '文件超过1TB'
  return fileSizeMsg
}

// 比较
function compare(a, b) {
  if (new Date(a).getTime() > new Date(b).getTime()) return true
  else return false
}

// 交换
function axchange(arr, a, b) {
  let aV = arr[a]
  arr[a] = arr[b]
  arr[b] = aV
}

// 日期排序 2020-01-01
const sortDateF = function (arr) {
  for (let t = 1; t < arr.length - 1; t++) {
    for (let i = 0; i < arr.length - t; i++) if (compare(arr[i], arr[i + 1])) axchange(arr, i, i + 1)
  }
  return arr
}

// 显示插件
const openPlugin = function () {
  if (store.state.socket_plugin) store.commit('WEBSOCKET_PLUGIN_SEND', 'open')
  else store.commit('openPluginDialog', true)
}

// 下拉框 - 影片类型
const movieTypeList = [
  {
    label: '正片FTR（Feature）',
    tag: 'FTR',
    value: 0
  },
  {
    label: '预告片TLR（Trailer）',
    tag: 'TLR',
    value: 1
  },
  {
    label: '短版本预告片TSR（Teaser）',
    tag: 'TSR',
    value: 2
  },
  {
    label: '分级RTG（Rating）',
    tag: 'RTG',
    value: 3
  },
  {
    label: '政策相关POL（Policy）',
    tag: 'POL',
    value: 4
  },
  {
    label: '公告服务或公告PSA（Public Service Announcement）',
    tag: 'PSA',
    value: 5
  },
  {
    label: '广告片ADV（Advertisement）',
    tag: 'ADV',
    value: 6
  },
  {
    label: '短片SHR（Short）',
    tag: 'SHR',
    value: 7
  },
  {
    label: '过度片XSN（Transitional）',
    tag: 'XSN',
    value: 8
  },
  {
    label: '测试片TST（Test）',
    tag: 'TST',
    value: 9
  }
]

// 下拉框 - 宽高比
const proportionList = [
  {
    label: '遮幅F（Flat   1.85：1）',
    tag: 'F',
    value: 0
  },
  {
    label: '宽荧幕S（Sope   2.39：1）',
    tag: 'S',
    value: 1
  },
  {
    label: '全画幅C（Full   1.90：1）',
    tag: 'C',
    value: 2
  }
]

// 下拉框 - 分辨率
const resolutionList = [
  {
    label: '2K（2048*1080）',
    tag: '2K',
    value: 0
  },
  {
    label: '4K（4096*2160）',
    tag: '4K',
    value: 1
  }
]

// 下拉框 - 源色彩
const colorTypeList = [
  {
    label: 'REC 709',
    tag: 'REC',
    value: 0
  },
  {
    label: 'P3 DCI',
    tag: 'P3',
    value: 1
  },
  {
    label: 'REC 2020',
    tag: 'REC',
    value: 2
  }
]

// 下拉框 - 2D/3D
const modeList = [
  {
    label: '2D',
    value: 0
  },
  {
    label: '3D',
    value: 1
  }
]

// 下拉框 - 声道类型
const channelTypeList = [
  {
    label: '2.1立体音',
    tag: '21',
    value: 0
  },
  {
    label: '5.1立体音',
    tag: '51',
    value: 1
  },
  {
    label: '7.1立体音',
    tag: '71',
    value: 2
  }
]

// 下拉框 - 字幕
const APList = [
  {
    label: '无字幕',
    tag: 'XX',
    val: 0
  },
  {
    label: '开放式字幕OCAP',
    tag: 'OCAP',
    val: 1
  },
  {
    label: '隐藏式字幕CCAP',
    tag: 'CCAP',
    val: 2
  }
]

// 下拉框 - DCP类型
const DCPTypeList = [
  {
    label: '原版OV Original Version',
    tag: 'OV',
    val: 0
  },
  {
    label: '版本文件VF Version File',
    tag: 'VF',
    val: 1
  }
]

// 下拉框 -
const soundtrackList = [
  {
    label: '无版本',
    val: 0
  },
  {
    label: '版本1',
    val: 1
  }
]

// 下拉框 - 类型版本
const versionList = [
  {
    label: '无版本',
    val: 0
  },
  {
    label: '版本1',
    val: 1
  },
  {
    label: '版本2',
    val: 2
  },
  {
    label: '版本3',
    val: 3
  },
  {
    label: '版本4',
    val: 4
  },
  {
    label: '版本5',
    val: 5
  },
  {
    label: '版本6',
    val: 6
  },
  {
    label: '版本7',
    val: 7
  },
  {
    label: '版本8',
    val: 8
  },
  {
    label: '版本9',
    val: 9
  }
]

// 下拉框 - 声音语言
const mp3LanguageList = [
  {
    label: i18n.t('selectionList.voiceLanguageList.CMN'),
    val: 1
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.YUE'),
    val: 2
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.VI'),
    val: 5
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.EN'),
    val: 6
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.IND'),
    val: 7
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.HI'),
    val: 8
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.IT'),
    val: 9
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.HU'),
    val: 10
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.EL'),
    val: 11
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.HE'),
    val: 12
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.QSA'),
    val: 14
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.ES'),
    val: 15
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.LAS'),
    val: 16
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.QSM'),
    val: 17
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.UK'),
    val: 18
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.TR'),
    val: 19
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.TH'),
    val: 20
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.TA'),
    val: 21
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.TE'),
    val: 22
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.SL'),
    val: 23
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.SK'),
    val: 24
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.SR'),
    val: 25
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.SV'),
    val: 26
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.JA'),
    val: 27
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.QBP'),
    val: 28
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.PT'),
    val: 29
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.NO'),
    val: 30
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.MSA'),
    val: 31
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.RO'),
    val: 32
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.LT'),
    val: 33
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.LV'),
    val: 34
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.HR'),
    val: 35
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.CS'),
    val: 36
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.CA'),
    val: 37
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.NL'),
    val: 38
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.KO'),
    val: 39
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.VLS'),
    val: 40
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.FI'),
    val: 41
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.QFC'),
    val: 42
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.FR'),
    val: 43
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.RU'),
    val: 44
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.DE'),
    val: 45
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.DA'),
    val: 46
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.BS'),
    val: 47
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.PL'),
    val: 48
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.IS'),
    val: 49
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.ET'),
    val: 50
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.AR'),
    val: 51
  },
  {
    label: i18n.t('selectionList.voiceLanguageList.SQ'),
    val: 52
  }
]

// 下拉框 - 字幕语言
const textLanguageList = [
  {
    label: i18n.t('selectionList.textLanguageList.XX'),
    val: 1
  },
  {
    label: i18n.t('selectionList.textLanguageList.QMS'),
    val: 2
  },
  {
    label: i18n.t('selectionList.textLanguageList.QMT'),
    val: 3
  },
  {
    label: i18n.t('selectionList.textLanguageList.VI'),
    val: 6
  },
  {
    label: i18n.t('selectionList.textLanguageList.EN'),
    val: 7
  },
  {
    label: i18n.t('selectionList.textLanguageList.IND'),
    val: 8
  },
  {
    label: i18n.t('selectionList.textLanguageList.HI'),
    val: 9
  },
  {
    label: i18n.t('selectionList.textLanguageList.IT'),
    val: 10
  },
  {
    label: i18n.t('selectionList.textLanguageList.HU'),
    val: 11
  },
  {
    label: i18n.t('selectionList.textLanguageList.EL'),
    val: 12
  },
  {
    label: i18n.t('selectionList.textLanguageList.HE'),
    val: 13
  },
  {
    label: i18n.t('selectionList.textLanguageList.QSA'),
    val: 15
  },
  {
    label: i18n.t('selectionList.textLanguageList.ES'),
    val: 16
  },
  {
    label: i18n.t('selectionList.textLanguageList.LAS'),
    val: 17
  },
  {
    label: i18n.t('selectionList.textLanguageList.QSM'),
    val: 18
  },
  {
    label: i18n.t('selectionList.textLanguageList.UK'),
    val: 19
  },
  {
    label: i18n.t('selectionList.textLanguageList.TR'),
    val: 20
  },
  {
    label: i18n.t('selectionList.textLanguageList.TH'),
    val: 21
  },
  {
    label: i18n.t('selectionList.textLanguageList.TA'),
    val: 22
  },
  {
    label: i18n.t('selectionList.textLanguageList.TE'),
    val: 23
  },
  {
    label: i18n.t('selectionList.textLanguageList.SL'),
    val: 24
  },
  {
    label: i18n.t('selectionList.textLanguageList.SK'),
    val: 25
  },
  {
    label: i18n.t('selectionList.textLanguageList.SR'),
    val: 26
  },
  {
    label: i18n.t('selectionList.textLanguageList.SV'),
    val: 27
  },
  {
    label: i18n.t('selectionList.textLanguageList.JA'),
    val: 28
  },
  {
    label: i18n.t('selectionList.textLanguageList.QBP'),
    val: 29
  },
  {
    label: i18n.t('selectionList.textLanguageList.PT'),
    val: 30
  },
  {
    label: i18n.t('selectionList.textLanguageList.NO'),
    val: 31
  },
  {
    label: i18n.t('selectionList.textLanguageList.MSA'),
    val: 32
  },
  {
    label: i18n.t('selectionList.textLanguageList.RO'),
    val: 33
  },
  {
    label: i18n.t('selectionList.textLanguageList.LT'),
    val: 34
  },
  {
    label: i18n.t('selectionList.textLanguageList.LV'),
    val: 35
  },
  {
    label: i18n.t('selectionList.textLanguageList.HR'),
    val: 36
  },
  {
    label: i18n.t('selectionList.textLanguageList.CS'),
    val: 37
  },
  {
    label: i18n.t('selectionList.textLanguageList.CA'),
    val: 38
  },
  {
    label: i18n.t('selectionList.textLanguageList.NL'),
    val: 39
  },
  {
    label: i18n.t('selectionList.textLanguageList.KO'),
    val: 40
  },
  {
    label: i18n.t('selectionList.textLanguageList.VLS'),
    val: 41
  },
  {
    label: i18n.t('selectionList.textLanguageList.FI'),
    val: 42
  },
  {
    label: i18n.t('selectionList.textLanguageList.QFC'),
    val: 43
  },
  {
    label: i18n.t('selectionList.textLanguageList.FR'),
    val: 44
  },
  {
    label: i18n.t('selectionList.textLanguageList.RU'),
    val: 45
  },
  {
    label: i18n.t('selectionList.textLanguageList.DE'),
    val: 46
  },
  {
    label: i18n.t('selectionList.textLanguageList.DA'),
    val: 47
  },
  {
    label: i18n.t('selectionList.textLanguageList.BS'),
    val: 48
  },
  {
    label: i18n.t('selectionList.textLanguageList.PL'),
    val: 49
  },
  {
    label: i18n.t('selectionList.textLanguageList.IS'),
    val: 50
  },
  {
    label: i18n.t('selectionList.textLanguageList.ET'),
    val: 51
  },
  {
    label: i18n.t('selectionList.textLanguageList.AR'),
    val: 52
  },
  {
    label: i18n.t('selectionList.textLanguageList.SQ'),
    val: 53
  }
]

// 下拉框 - 地区
const areaList = [
  {
    label: i18n.t('selectionList.areaList.INT'),
    val: 0
  },
  {
    label: i18n.t('selectionList.areaList.CN'),
    val: 1
  },
  {
    label: i18n.t('selectionList.areaList.HK'),
    val: 2
  },
  {
    label: i18n.t('selectionList.areaList.TW'),
    val: 3
  },
  {
    label: i18n.t('selectionList.areaList.MO'),
    val: 4
  }
]

const DCPmainStatusList = [
  {
    code: 610,
    class: '上传',
    status: '等待上传'
  },
  {
    code: 620,
    class: '上传',
    status: '上传中'
  },
  {
    code: 630,
    class: '上传',
    status: '上传暂停'
  },
  {
    code: 640,
    class: '上传',
    status: '上传失败'
  },
  {
    code: 650,
    class: '上传',
    status: '上传成功'
  },
  {
    code: 101,
    class: '等待',
    status: '等待打包'
  },
  {
    code: 201,
    class: '进行中',
    status: '进行打包'
  },
  {
    code: 900,
    class: '进行中',
    status: '进行打包'
  },
  {
    code: 301,
    class: '暂停',
    status: '手动暂停'
  },
  {
    code: 302,
    class: '暂停',
    status: '欠费暂停'
  },
  {
    code: 400,
    class: '失败',
    status: '打包失败'
  },
  {
    code: 500,
    class: '成功',
    status: '打包成功'
  }
]

const KDMmainStatusList = [
  {
    code: 610,
    class: '上传',
    status: '等待上传'
  },
  {
    code: 620,
    class: '上传',
    status: '上传中'
  },
  {
    code: 630,
    class: '上传',
    status: '上传暂停'
  },
  {
    code: 640,
    class: '上传',
    status: '上传失败'
  },
  {
    code: 650,
    class: '上传',
    status: '上传成功'
  },
  {
    code: 101,
    class: '等待',
    status: '等待制作'
  },
  {
    code: 103,
    class: '等待',
    status: '等待DCP打包完成'
  },
  {
    code: 201,
    class: '进行中',
    status: '进行制作'
  },
  {
    code: 301,
    class: '暂停',
    status: '手动暂停'
  },
  {
    code: 302,
    class: '暂停',
    status: '欠费暂停'
  },
  {
    code: 400,
    class: '失败',
    status: '制作失败'
  },
  {
    code: 500,
    class: '成功',
    status: '制作成功'
  }
]

// 时区
const timeZone = [
  {
    label: 'UTC-12',
    val: 0
  },
  {
    label: 'UTC-11',
    val: 1
  },
  {
    label: 'UTC-10',
    val: 2
  },
  {
    label: 'UTC-9',
    val: 3
  },
  {
    label: 'UTC-8',
    val: 4
  },
  {
    label: 'UTC-7',
    val: 5
  },
  {
    label: 'UTC-6',
    val: 6
  },
  {
    label: 'UTC-5',
    val: 7
  },
  {
    label: 'UTC-4',
    val: 8
  },
  {
    label: 'UTC-3',
    val: 9
  },
  {
    label: 'UTC-2',
    val: 10
  },
  {
    label: 'UTC-1',
    val: 11
  },
  {
    label: 'UTC',
    val: 12
  },
  {
    label: 'UTC+1',
    val: 13
  },
  {
    label: 'UTC+2',
    val: 14
  },
  {
    label: 'UTC+3',
    val: 15
  },
  {
    label: 'UTC+4',
    val: 16
  },
  {
    label: 'UTC+5',
    val: 17
  },
  {
    label: 'UTC+6',
    val: 18
  },
  {
    label: 'UTC+7',
    val: 19
  },
  {
    label: 'UTC+8',
    val: 20
  },
  {
    label: 'UTC+9',
    val: 21
  },
  {
    label: 'UTC+10',
    val: 22
  },
  {
    label: 'UTC+11',
    val: 23
  },

]

export {
  movieTypeList,
  proportionList,
  resolutionList,
  colorTypeList,
  modeList,
  channelTypeList,
  APList,
  DCPTypeList,
  soundtrackList,
  versionList,
  mp3LanguageList,
  textLanguageList,
  areaList,
  DCPmainStatusList,
  KDMmainStatusList,
  timeZone,
  createCalendar,
  createDateFun,
  getDate,
  exportDownloadFun,
  consum,
  createTableIconList,
  messageFun,
  throwInfoFun,
  renderingRange,
  itemDownloadStatus,
  UuidFun,
  setInfo,
  IEVersion,
  clearUserCookie,
  getFileSize,
  sortF,
  sortDateF,
  openPlugin,
  getUserInfoF,
  transformParameterT
}
