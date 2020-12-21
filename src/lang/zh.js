export default {
  transportBtn: '传输列表',
  // layout - 导航
  navbar: ['DCP打包', 'KDM制作', '银幕管理', '我的账单', '统计', '设置'],
  // layout - 首部
  header: {
    userOLT: ['未知用户', '金币余额', '剩余容量', '基本信息', '退出'],
    problemOLT: ['渲染指引', '帮助中心'],
    uptopBtn: '充值',
    bulletinT: '公告：'
  },
  // 登录页
  login_page: {
    nav_phoneText: '短信验证登录',
    nav_accountText: '账号密码登录',
    loginText: '登录',
    // 短信验证
    SMS_verif: {
      phone_placeholder: '请输入手机号',
      phone_warnInfo: '手机号格式错误',
      code_placeholder: '请输入验证码',
      auto_login: '5天内自动登录'
    },
    // 账号验证
    account_verif: {
      // ac_placeholder: '请输入账号/手机号',
      ac_placeholder: '请输入账号',
      ps_placeholder: '请输入密码',
      auto_login: '5天内自动登录',
      forgetPw: '忘记密码',
      register: '注册'
    },
    // 忘记密码
    forgetMode: {
      tit: '找回密码',
      btnAgain: '确认修改',
      phone_placeholder: '请输入手机号',
      code_placeholder: '请输入验证码',
      ps_new: '请输入新密码',
      ps_again: '请再次输入新密码',
      toLogin: '登录',
      toRegister: '注册',
      confirm: '下一步'
    },
    // 注册
    register: {
      label: '注册',
      text1: '我已阅读并同意',
      text2: '《用户服务协议》',
      type: '类型',
      typeRadio: ['影视版', '效果图'],
      typeRadio2: ['院线版', '网络版'],
      ac_placeholder: '请输入帐号',
      ps_placeholder: '请输入密码',
      ph_placeholder: '请输入手机号',
      code_placeholder: '手机验证码',
      rl1: '已有账号，',
      rl2: '马上登录',
      warnInfo: {
        code: '验证码格式错误'
      },
      prompt: {
        account: '8-14个字符，至少输入包含大小写字母、汉字、数字、下划线中任意2种',
        password: '8-18个字符，至少包含大小写字母、数字、特殊字符中任意2种'
      }
    },
    message: {
      phoneTypeErr_one: '手机号码格式错误',
      phoneTypeErr_two: '手机号已存在',
      phoneTypeErr_three: '已输入手机号格式错误',
      phoneTypeErr_four: '手机号未注册，请核对后重新输入',
      codeTypeErr_one: '验证码未填写或填写错误',
      codeTypeErr_two: '请正确输入验证码',
      codeTypeErr_three: '还未获取验证码',
      tickTypeErr_one: '请阅读用户服务协议',
      psTypeErr_one: '请至少输入包含大小写字母、数字、特殊字符中任意2种的8-18个字符',
      psTypeErr_two: '两次输入密码不一致，请核对后重新输入',
      registerSuc: '注册成功',
      registerErr: '报错，注册失败',
      registerCodeErr: '报错，验证码错误',
      verifErr: '报错，验证失败',
      ac_verif_one: '请输入框8-14个字符',
      ac_verif_two: '请在大小写字母、汉字、数字、下划线中设置帐号且至少包含任意2种',
      ac_verif_three: '该账号已注册，请重新输入',
      ac_verif_four: '该账号未被注册，请核对后重新输入',
      ps_verif_one: '请至少包含大小写字母、数字、特殊字符中任意2种字符',
      ps_verif_two: '请输入8-18个字符',
      ac_ps_null: '帐号或密码未输入',
      ps_err: '密码错误',
      code_err: '验证码错误',
      code_err_two: '验证码无效',
      ph_err: '未输入手机号或输入格式有误',
      code_is_coming: '验证信息已发送',
      need_to_register: '当前手机号未注册，请先注册',
      phoneRegistered: '手机号已注册，请重新输入',
      no_sms: '还未做短信验证',
      login_suc: '登录成功',
      edit_suc: '修改成功'
    },
    // 备案
    record: {
      text1: '',
      text2: 'Copyright © 2020 国家电影云制作服务平台 鲁ICP备20027751号-3'
    },
    getCode: '获取验证码',
    getCodeAgain: '重新发送'
  },
  // 资产
  assets: {
    myUploadBtnGroup: ['上传', '新建文件夹', '下载'],
    outPutBtnGroup: ['下载', '删除'],
    moreBtnText: '更多',
    moreBtnList: ['移动到', '复制到', '重命名'],  // , '解压'
    howToCreateBtn: ['手动创建资产目录', '自动创建资产目录'],
    info: [
      '温馨提示：上传的资产有效期为20天，20天后系统会自动清除，请在有效期截止前进行渲染或下载，如有特殊需求，可联系在线客服。',
      '温馨提示：渲染输出文件夹的有效期为20天，20天后系统会自动清除，请在有效期截止前及时下载，如有特殊需求，可联系在线客服。'
    ],
    navList: ['我的上传', '渲染输出']
  },
  // 消息提示
  message: {
    configExit: '确认退出登录?',
    sucExit: '退出成功!',
    cancelExit: '已取消退出',
    prompt: '提示',
    config: '确认',
    cancel: '取消',
    editSuc: '修改成功',
    noTimes: '本月更新次数已用完'
  },
  // 公共文本
  public: {
    delete: '删除',
    rename: '重命名',
    refresh: '刷新',
    cancel: '取消',
    save: '确定',
    save2: '保存',
    preview: '预览',
    unData: '暂无数据',
    export: '导出',
    nextStop: '下一步',
    previous: '上一步',
    set: '设置',
    browse: '浏览',
    consummation: '完成',
    pause: '暂停',
    error: '错误',
    suggest: '建议',
    back: '返回',
    selectAll: '全选'
  },
  // 公共下拉框选项
  selectionList: {
    // 地区
    areaList: {
      INT: '全球 INT',
      CN: '中国 CN',
      HK: '中国香港 HK',
      TW: '中国台湾 TW',
      MO: '中国澳门 MO'
    },
    // 字幕语言
    textLanguageList: {
      XX: '无字幕 XX',
      QMS: '中文简体 QMS',
      QMT: '中文繁体 QMT',
      VI: '越南语 VI',
      EN: '英语 EN',
      IND: '印尼语 IND',
      HI: '印地语 HI',
      IT: '意大利语 IT',
      HU: '匈牙利语 HU',
      EL: '希腊语 EL',
      HE: '希伯来语 HE',
      QSA: '西班牙语-阿根廷 QSA',
      ES: '西班牙语-卡斯蒂利亚 ES',
      LAS: '西班牙语-拉美 LAS',
      QSM: '西班牙语-墨西哥 QSM',
      UK: '乌克兰语 UK',
      TR: '土耳其语 TR',
      TH: '泰语 TH',
      TA: '泰米尔语 TA',
      TE: '泰卢固语 TE',
      SL: '斯洛文尼亚语 SL',
      SK: '斯洛伐克语 SK',
      SR: '塞尔维亚语 SR',
      SV: '瑞典语 SV',
      JA: '日语 JA',
      QBP: '葡萄牙语-巴西 QBP',
      PT: '葡萄牙语-欧洲 PT',
      NO: '挪威语 NO',
      MSA: '马来语 MSA',
      RO: '罗马尼亚语 RO',
      LT: '立陶宛语 LT',
      LV: '拉脱维亚语 LV',
      HR: '克罗地亚语 HR',
      CS: '捷克－斯洛伐克语 CS',
      CA: '加泰隆语 CA',
      NL: '荷兰语 NL',
      KO: '韩语 KO',
      VLS: '佛兰芒语 VLS',
      FI: '芬兰语 FI',
      QFC: '法语-加拿大 QFC',
      RF: '法语 FR',
      RU: '俄语 RU',
      DE: '德语 DE',
      DA: '丹麦语 DA',
      BS: '波斯尼亚语 BS',
      PL: '波兰语 PL',
      IS: '冰岛语 IS',
      ET: '爱沙尼亚语 ET',
      AR: '阿拉伯语 AR',
      SQ: '阿尔巴尼亚语 SQ'
    },
    // 声音语言
    voiceLanguageList: {
      CMN: '中文普通话 CMN',
      YUE: '中文粤语 YUE',
      VI: '越南语 VI',
      EN: '英文 EN',
      IND: '印尼语 IND',
      HI: '印地语 HI',
      IT: '意大利语 IT',
      HU: '匈牙利语',
      EL: '希腊语 EL',
      HE: '希伯来语 HE',
      QSA: '西班牙语-阿根廷 QSA',
      ES: '西班牙语-卡斯蒂利亚 ES',
      LAS: '西班牙语-拉美 LAS',
      QSM: '西班牙语-墨西哥 QSM',
      UK: '乌克兰语 UK',
      TR: '土耳其语 TR',
      TH: '泰语 TH',
      TA: '泰米尔语 TA',
      TE: '泰卢固语 TE',
      SL: '斯洛文尼亚语 SL',
      SK: '斯洛伐克语 SK',
      SR: '塞尔维亚语 SR',
      SV: '瑞典语 SV',
      JA: '日语 JA',
      QBP: '葡萄牙语-巴西 QBP',
      PT: '葡萄牙语-欧洲 PT',
      NO: '挪威语 NO',
      MSA: '马来语 MSA',
      RO: '罗马尼亚语 RO',
      LT: '立陶宛语 LT',
      LV: '拉脱维亚语 LV',
      HR: '克罗地亚语 HR',
      CS: '捷克斯洛伐克语 CS',
      CA: '加泰隆语 CA',
      NL: '荷兰语 NL',
      KO: '韩语 KO',
      VLS: '佛兰芒语 VLS',
      FI: '芬兰语 FI',
      QFC: '法语-加拿大 QFC',
      FR: '法语 FR',
      RU: '俄语 RU',
      DE: '德语 DE',
      DA: '丹麦语 DA',
      BS: '波斯尼亚语 BS',
      PL: '波兰语 PL',
      IS: '冰岛语 IS',
      ET: '爱沙尼亚语 ET',
      AR: '阿拉伯语 AR',
      SQ: '阿尔巴尼亚语 SQ'
    }
  }
}
