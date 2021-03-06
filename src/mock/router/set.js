// const Mock = require('mockjs')

module.exports = [
  {   // 消息设置 - 获取既定参数
    url: /\/professional\/notice\/setting\/getSystemNoticeSetting/,
    type: 'get',
    response: () => {
      return {
        'code': 200,
        'msg': '成功',
        'data': [{
          'id': 1,
          'createTime': 1591061954296,
          'createBy': 'system',
          'updateTime': 1591061954296,
          'updateBy': 'system',
          'dataStatus': 1,
          'noticeSettingUuid': 'ac6601d3-930b-45b1-b1c4-301645e7f001',
          'noticeSettingName': '添加任务通知',
          'noticeSettingDetail': '任务[任务ID_场景名]已添加到渲染任务列表。',
          'noticeSettingNode': '每一个任务新建成功',
          'platform': 1,
          'subsystem': 1,
          'noticeType': 1,
          'noticeSubtype': 1,
          'customerNoticeSettingUuid': '0ABB120565B14549A6B78BF394A55274',
          'customerUuid': '82152711-d7c2-4d03-9bc1-8894b150e687',
          'isMessage': 1,
          'isEmail': 1,
          'isNote': 1,
          'isWeChat': 0
        }, {
          'id': 2,
          'createTime': 1591061954296,
          'createBy': 'system',
          'updateTime': 1591061954296,
          'updateBy': 'system',
          'dataStatus': 1,
          'noticeSettingUuid': 'ac6601d3-930b-45b1-b1c4-301645e7f002',
          'noticeSettingName': '渲染染完成通知',
          'noticeSettingDetail': '任务[任务ID_场景名]渲染完成，渲染结果将保留20天，请您及时登录系统下载。',
          'noticeSettingNode': '每一个子任务状态更新为“渲染完成”',
          'platform': 1,
          'subsystem': 1,
          'noticeType': 1,
          'noticeSubtype': 1,
          'customerNoticeSettingUuid': '3933CCE33B4D4AD58CDEEE1C2504F2B6',
          'customerUuid': '82152711-d7c2-4d03-9bc1-8894b150e687',
          'isMessage': 1,
          'isEmail': 1,
          'isNote': 1,
          'isWeChat': 0
        }, {
          'id': 3,
          'createTime': 1591061954296,
          'createBy': 'system',
          'updateTime': 1591061954296,
          'updateBy': 'system',
          'dataStatus': 1,
          'noticeSettingUuid': 'ac6601d3-930b-45b1-b1c4-301645e7f003',
          'noticeSettingName': '单帧超时提醒通知',
          'noticeSettingDetail': '任务[任务ID_场景名]第[X]帧已渲染超[X]小时，请您及时登录系统查看。',
          'noticeSettingNode': '渲染时长超过对该任务设置的“单帧超时提醒”时长',
          'platform': 1,
          'subsystem': 1,
          'noticeType': 1,
          'noticeSubtype': 1,
          'customerNoticeSettingUuid': '63AA088D4E324EE2971F9A4B9FB3703F',
          'customerUuid': '82152711-d7c2-4d03-9bc1-8894b150e687',
          'isMessage': 1,
          'isEmail': 1,
          'isNote': 1,
          'isWeChat': 0
        }, {
          'id': 4,
          'createTime': 1591061954296,
          'createBy': 'system',
          'updateTime': 1591061954296,
          'updateBy': 'system',
          'dataStatus': 1,
          'noticeSettingUuid': 'ac6601d3-930b-45b1-b1c4-301645e7f004',
          'noticeSettingName': '单帧超时停止通知',
          'noticeSettingDetail': '任务[任务ID_场景名]第[X]帧在因渲染超时已自动暂停渲染，请您及时登录系统查看。',
          'noticeSettingNode': '渲染时长超过对该任务设置的“单帧超时停止”时长',
          'platform': 1,
          'subsystem': 1,
          'noticeType': 1,
          'noticeSubtype': 1,
          'customerNoticeSettingUuid': 'B2F5D8BEBAF74413B4FCA608A4F23DD0',
          'customerUuid': '82152711-d7c2-4d03-9bc1-8894b150e687',
          'isMessage': 1,
          'isEmail': 1,
          'isNote': 1,
          'isWeChat': 0
        }, {
          'id': 5,
          'createTime': 1591061954296,
          'createBy': 'system',
          'updateTime': 1591061954296,
          'updateBy': 'system',
          'dataStatus': 1,
          'noticeSettingUuid': 'ac6601d3-930b-45b1-b1c4-301645e7f005',
          'noticeSettingName': '单帧渲染失败通知',
          'noticeSettingDetail': '任务[任务ID_场景名]第[X]帧渲染失败，请您及时登录系统查看。',
          'noticeSettingNode': '渲染时长超过对该任务设置的“单帧超时停止”时长',
          'platform': 1,
          'subsystem': 1,
          'noticeType': 1,
          'noticeSubtype': 1,
          'customerNoticeSettingUuid': 'DEC7DA2ED372433A959759D8D7A42183',
          'customerUuid': '82152711-d7c2-4d03-9bc1-8894b150e687',
          'isMessage': 1,
          'isEmail': 1,
          'isNote': 1,
          'isWeChat': 0
        }, {
          'id': 6,
          'createTime': 1591061954296,
          'createBy': 'system',
          'updateTime': 1591061954296,
          'updateBy': 'system',
          'dataStatus': 1,
          'noticeSettingUuid': 'ac6601d3-930b-45b1-b1c4-301645e7f006',
          'noticeSettingName': '单个任务渲染预警',
          'noticeSettingDetail': '任务[任务ID_场景名]累计渲染费用已达到[X]金币，请您及时登录系统查看。',
          'noticeSettingNode': '渲染时长超过对该任务设置的“单个任务渲染预警”时长',
          'platform': 1,
          'subsystem': 1,
          'noticeType': 1,
          'noticeSubtype': 1,
          'customerNoticeSettingUuid': 'C844F12E9DEA4D6C9FF934747336844A',
          'customerUuid': '82152711-d7c2-4d03-9bc1-8894b150e687',
          'isMessage': 1,
          'isEmail': 1,
          'isNote': 1,
          'isWeChat': 0
        }],
        'total': null,
        'other': null
      }
    }
  },
  {   // 消息设置 - 获取既定参数
    url: /\/dcpProfessional\/notice\/setting\/updateNoticeSetting/,
    type: 'get',
    response: () => {
      return {code: 201}
    }
  },
  {   // 项目设置 - 获取列表
    url: /\/dcpProfessional\/project\/getAllCustomerProject\?/,
    type: 'get',
    response: () => {
      return {
        'code': 200,
        'msg': '成功',
        'data': [
          {
            'id': 115,
            'createTime': 1600153363857,
            'createBy': '82152711-d7c2-4d03-9bc1-8894b150e687',
            'updateTime': 1600153363857,
            'updateBy': '82152711-d7c2-4d03-9bc1-8894b150e687',
            'taskProjectUuid': '346345420CE4430C9A8E3F3AE74F12B8',
            'dataStatus': 1,
            'projectName': '123',
            'projectOverview': null,
            'projectStatus': 1,
            'isDefault': 1,
            'thumbnail': null,
            'customerUuid': '82152711-d7c2-4d03-9bc1-8894b145e687',
            'customerName': '大王'
          },
          {
            'id': 9,
            'createTime': 1587611083498,
            'createBy': '82152711-d7c2-4d03-9bc1-8894b150e687',
            'updateTime': 1600152567188,
            'updateBy': '1',
            'taskProjectUuid': 'db6bea12-3450-4f4a-b4c4-f7d958afdce8',
            'dataStatus': 1,
            'projectName': '默认项目',
            'projectOverview': null,
            'projectStatus': 1,
            'isDefault': 0,
            'thumbnail': null,
            'customerUuid': '82152711-d7c2-4d03-9bc1-8894b150e687',
            'customerName': '大王2'
          },
          {
            'id': 9,
            'createTime': 1587611083498,
            'createBy': '82152711-d7c2-4d03-9bc1-8894b150e687',
            'updateTime': 1600152567188,
            'updateBy': '1',
            'taskProjectUuid': 'db6bea12-2870-4345-b4c4-f7d958afdce8',
            'dataStatus': 1,
            'projectName': '默认项目',
            'projectOverview': null,
            'projectStatus': 1,
            'isDefault': 0,
            'thumbnail': null,
            'customerUuid': '82152711-d7c2-4d03-9bc1-8894b150e687',
            'customerName': '大王3'
          }, {
            'id': 9,
            'createTime': 1587611083498,
            'createBy': '82152711-d7c2-4d03-9bc1-8894b1345687',
            'updateTime': 1600152567188,
            'updateBy': '1',
            'taskProjectUuid': 'db6bea12-2870-4f4a-b4c4-f7d958afdce8',
            'dataStatus': 1,
            'projectName': '默认项目',
            'projectOverview': null,
            'projectStatus': 1,
            'isDefault': 0,
            'thumbnail': null,
            'customerUuid': '82152711-d7c2-4d03-9345-8894b150e687',
            'customerName': '大王4'
          }, {
            'id': 9,
            'createTime': 1587611083498,
            'createBy': '82152711-d7c2-4d03-9bc1-88345150e687',
            'updateTime': 1600152567188,
            'updateBy': '1',
            'taskProjectUuid': 'db6bea12-2870-4f4a-b4c4-f7d958afdce8',
            'dataStatus': 1,
            'projectName': '默认项目',
            'projectOverview': null,
            'projectStatus': 1,
            'isDefault': 0,
            'thumbnail': null,
            'customerUuid': '82152711-d7c2-4d03-9bc1-8894b150e687',
            'customerName': '大王5'
          }, {
            'id': 9,
            'createTime': 1587611083498,
            'createBy': '82152711-d2c2-4d03-9345-8894b150e687',
            'updateTime': 1600152567188,
            'updateBy': '1',
            'taskProjectUuid': 'db6bea12-2870-4f4a-b4c4-f7d958afdce8',
            'dataStatus': 1,
            'projectName': '默认项目',
            'projectOverview': null,
            'projectStatus': 1,
            'isDefault': 0,
            'thumbnail': null,
            'customerUuid': '82152711-d7c2-4d03-9bc1-8894b150e687',
            'customerName': '大王6'
          }, {
            'id': 9,
            'createTime': 1587611083498,
            'createBy': '82134511-d7c2-4d03-9bc1-8894b150e687',
            'updateTime': 1600152567188,
            'updateBy': '1',
            'taskProjectUuid': 'db6bea12-2870-4f4a-b4c4-f7d958afdce8',
            'dataStatus': 1,
            'projectName': '默认项目',
            'projectOverview': null,
            'projectStatus': 1,
            'isDefault': 0,
            'thumbnail': null,
            'customerUuid': '82152711-d7c2-4d03-9bc1-8894b150e687',
            'customerName': '大王7'
          }, {
            'id': 9,
            'createTime': 1587611083498,
            'createBy': '82152711-d7c2-4d03-9bc1-8894b150e687',
            'updateTime': 1600152567188,
            'updateBy': '1',
            'taskProjectUuid': '345bea12-2870-4f4a-b4c4-f7d958afdce8',
            'dataStatus': 1,
            'projectName': '默认项目',
            'projectOverview': null,
            'projectStatus': 1,
            'isDefault': 0,
            'thumbnail': null,
            'customerUuid': '82152711-d7c2-4d03-9bc1-8894b150e687',
            'customerName': '大王8'
          }, {
            'id': 9,
            'createTime': 1587611083498,
            'createBy': '82152711-d7c2-4d03-9bc1-8894b150e687',
            'updateTime': 1600152567188,
            'updateBy': '1',
            'taskProjectUuid': 'db456a12-2870-4f4a-b4c4-f7d958afdce8',
            'dataStatus': 1,
            'projectName': '默认项目',
            'projectOverview': null,
            'projectStatus': 1,
            'isDefault': 0,
            'thumbnail': null,
            'customerUuid': '82152711-d7c2-4d03-9bc1-8894b150e687',
            'customerName': '大王9'
          }, {
            'id': 9,
            'createTime': 1587611083498,
            'createBy': '82152711-d7c2-4d03-9bc1-8894b150e687',
            'updateTime': 1600152567188,
            'updateBy': '1',
            'taskProjectUuid': 'db6be456-2870-4f4a-b4c4-f7d958afdce8',
            'dataStatus': 1,
            'projectName': '默认项目',
            'projectOverview': null,
            'projectStatus': 1,
            'isDefault': 0,
            'thumbnail': null,
            'customerUuid': '82152711-d7c2-4d03-9bc1-8894b150e687',
            'customerName': '大王10'
          }

        ],
        'total': 18,
        'other': null
      }
    }
  }
]
