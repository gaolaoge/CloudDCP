<template>
  <div class="setName">
    <div class="dialog-header">
      <span class="title">{{ title }}</span>
      <img src="@/icons/shutDialogIcon.png"
           @click="shutMe"
           class="closeBtn">
    </div>
    <div class="dialog-body">
      <div class="wrapper-border form setFileNameForm setScollBarStyle">
        <!--DCP文件名-->
        <div class="item mini">
          <label class="farm-label">{{ label.fileName }}</label>
          <span class="farm-span">{{ form.fileName }}</span>
        </div>
        <!--影片名称-->
        <div class="item mini">
          <label class="farm-label">{{ label.movieName }}</label>
          <input type="text"
                 :class="[{'inputError': null}, 'farm-input', 'farm-name-input']"
                 v-model="form.movieName">
        </div>
        <!--影片类型-->
        <div class="item mini">
          <label class="farm-label">{{ label.movieType }}</label>
          <el-select v-model="form.movieType"
                     class="farm-select">
            <el-option
              v-for="(item,index) in movieTypeList"
              :key="index"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </div>
        <!--类型版本-->
        <div class="item mini">
          <label class="farm-label">{{ label.version }}</label>
          <el-select v-model="form.version"
                     class="farm-select">
            <el-option
              v-for="(item,index) in versionList"
              :key="index"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </div>
        <!--宽高比-->
        <div class="item mini">
          <label class="farm-label">{{ label.proportion }}</label>
          <el-select v-model="form.proportion"
                     class="farm-select">
            <el-option
              v-for="(item,index) in proportionList"
              :key="index"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </div>
        <!--声音语言-->
        <div class="item mini">
          <label class="farm-label">{{ label.mp3Language }}</label>
          <el-select v-model="form.mp3Language"
                     class="farm-select">
            <el-option
              v-for="(item,index) in mp3LanguageList"
              :key="'mp3Language-' + index"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </div>
        <!--字幕语言-->
        <div class="item mini">
          <label class="farm-label">{{ label.textLanguage }}</label>
          <el-select v-model="form.textLanguage"
                     class="farm-select">
            <el-option
              v-for="(item,index) in textLanguageList"
              :key="index"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </div>
        <!--OCAP/CCAP-->
        <div class="item mini">
          <label class="farm-label">{{ label.AP }}</label>
          <el-select v-model="form.AP"
                     class="farm-select">
            <el-option
              v-for="(item,index) in APList"
              :key="'APList-' + index"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </div>
        <!--地区-->
        <div class="item mini">
          <label class="farm-label">{{ label.area }}</label>
          <el-select v-model="form.area"
                     class="farm-select">
            <el-option
              v-for="(item,index) in areaList"
              :key="'area-' + index"
              :label="item"
              :value="index">
            </el-option>
          </el-select>
        </div>
        <!--声道类型-->
        <div class="item mini">
          <label class="farm-label">{{ label.mp3Type }}</label>
          <el-select v-model="form.mp3Type"
                     class="farm-select">
            <el-option
              v-for="(item,index) in mp3TypeList"
              :key="index"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </div>
        <!--分辨率-->
        <div class="item mini">
          <label class="farm-label">{{ label.resolution }}</label>
          <el-select v-model="form.resolution"
                     class="farm-select">
            <el-option
              v-for="(item,index) in resolutionList"
              :key="index"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </div>
        <!--出品方-->
        <div class="item mini">
          <label class="farm-label">{{ label.producer }}</label>
          <input type="text"
                 :class="['farm-input', 'farm-name-input']"
                 v-model="form.producer">
        </div>
        <!--打包日期-->
        <div class="item mini">
          <label class="farm-label">{{ label.date }}</label>
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"/>
        </div>
        <!--制作方-->
        <div class="item mini">
          <label class="farm-label">{{ label.made }}</label>
          <input type="text"
                 :class="[{'inputError': null}, 'farm-input', 'farm-name-input']"
                 v-model="form.made">
        </div>
        <!--2D/3D-->
        <div class="item mini">
          <label class="farm-label">{{ label.type }}</label>
          <el-select v-model="form.type"
                     class="farm-select">
            <el-option
              v-for="(item,index) in typeList"
              :key="index"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </div>
        <!--DCP类型-->
        <div class="item mini">
          <label class="farm-label">{{ label.DCPType }}</label>
          <el-select v-model="form.DCPType"
                     class="farm-select">
            <el-option
              v-for="(item,index) in DCPTypeList"
              :key="index"
              :label="item.label"
              :value="item.val">
            </el-option>
          </el-select>
        </div>
        <!--按钮-->
        <div class="farm-btnGroup">
          <div class="btnGroup">
            <div :class="[{'disable-self': null}, 'btnGroup-btn', 'confirm']"
                 @click="saveFun">
              <span>{{ $t('public.save') }}</span>
            </div>
            <div class="btnGroup-btn previous" @click="shutMe">
              <span>{{ $t('public.cancel') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'setName',
    data() {
      return {
        title: '设置DCP文件名',
        movieTypeList: [
          {
            label: '广告片 ADV',
            val: 0
          },
          {
            label: '正片 FTR',
            val: 1
          },
          {
            label: '政策相关 POL',
            val: 2
          },
          {
            label: '推广片 PRO',
            val: 3
          },
          {
            label: '公告 PSA',
            val: 4
          },
          {
            label: '短片 SHR',
            val: 5
          },
          {
            label: '预告片 TLR',
            val: 6
          },
          {
            label: '样片 TSR',
            val: 7
          },
          {
            label: '测试片 TST',
            val: 8
          },
          {
            label: '过度片 XSN',
            val: 9
          }
        ],    // 影片类型
        versionList: [
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
        ],      // 类型版本
        proportionList: [
          {
            label: '全画幅C（Full   1.90：1）',
            val: 0
          },
          {
            label: '遮幅F（Flat   1.85：1）',
            val: 1
          },
          {
            label: '宽银幕S（Sope   2.39：1）',
            val: 2
          }
        ],   // 宽高比
        mp3LanguageList: [
          {
            label: '中文普通话 CMN',
            val: 1
          },
          {
            label: '中文粤语 YUE',
            val: 2
          },
          {
            label: '越南语 VI',
            val: 5
          },
          {
            label: '英语 EN',
            val: 6
          },
          {
            label: '印尼语 IND',
            val: 7
          },
          {
            label: '印地语 HI',
            val: 8
          },
          {
            label: '意大利语 IT',
            val: 9
          },
          {
            label: '匈牙利语 HU',
            val: 10
          },
          {
            label: '希腊语 EL',
            val: 11
          },
          {
            label: '希伯来语 HE',
            val: 12
          },
          {
            label: '西班牙语-阿根廷 QSA',
            val: 14
          },
          {
            label: '西班牙语-卡斯蒂利亚 ES',
            val: 15
          },
          {
            label: '西班牙语-拉美 LAS',
            val: 16
          },
          {
            label: '西班牙语-墨西哥 QSM',
            val: 17
          },
          {
            label: '乌克兰语 UK',
            val: 18
          },
          {
            label: '土耳其语 TR',
            val: 19
          },
          {
            label: '泰语 TH',
            val: 20
          },
          {
            label: '泰米尔语 TA',
            val: 21
          },
          {
            label: '泰卢固语 TE',
            val: 22
          },
          {
            label: '斯洛文尼亚语 SL',
            val: 23
          },
          {
            label: '斯洛伐克语 SK',
            val: 24
          },
          {
            label: '塞尔维亚语 SR',
            val: 25
          },
          {
            label: '瑞典语 SV',
            val: 26
          },
          {
            label: '日语 JA',
            val: 27
          },
          {
            label: '葡萄牙语-巴西 QBP',
            val: 28
          },
          {
            label: '葡萄牙语-欧洲 PT',
            val: 29
          },
          {
            label: '挪威语 NO',
            val: 30
          },
          {
            label: '马来语 MSA',
            val: 31
          },
          {
            label: '罗马尼亚语 RO',
            val: 32
          },
          {
            label: '立陶宛语 LT',
            val: 33
          },
          {
            label: '拉脱维亚语 LV',
            val: 34
          },
          {
            label: '克罗地亚语 HR',
            val: 35
          },
          {
            label: '捷克－斯洛伐克语 CS',
            val: 36
          },
          {
            label: '加泰隆语 CA',
            val: 37
          },
          {
            label: '荷兰语 NL',
            val: 38
          },
          {
            label: '韩语 KO',
            val: 39
          },
          {
            label: '佛兰芒语 VLS',
            val: 40
          },
          {
            label: '芬兰语 FI',
            val: 41
          },
          {
            label: '法语-加拿大 QFC',
            val: 42
          },
          {
            label: '法语 FR',
            val: 43
          },
          {
            label: '俄语 RU',
            val: 44
          },
          {
            label: '德语 DE',
            val: 45
          },
          {
            label: '丹麦语 DA',
            val: 46
          },
          {
            label: '波斯尼亚语 BS',
            val: 47
          },
          {
            label: '波兰语 PL',
            val: 48
          },
          {
            label: '冰岛语 IS',
            val: 49
          },
          {
            label: '爱沙尼亚语 ET',
            val: 50
          },
          {
            label: '阿拉伯语 AR',
            val: 51
          },
          {
            label: '阿尔巴尼亚语 SQ',
            val: 52
          }
        ],
        textLanguageList: [
          {
            label: '无字幕 XX',
            val: 'XX'
          },
          {
            label: '中文简体 QMS',
            val: 'QMS'
          },
          {
            label: '中文繁体 QMT',
            val: 'QMT'
          },
          {
            label: '越南语 VI',
            val: 'VI'
          },
          {
            label: '英语 EN',
            val: 'EN'
          },
          {
            label: '印尼语 IND',
            val: 'IND'
          },
          {
            label: '印地语 HI',
            val: 'HI'
          },
          {
            label: '意大利语 IT',
            val: 'IT'
          },
          {
            label: '匈牙利语 HU',
            val: 'HU'
          },
          {
            label: '希腊语 EL',
            val: 'EL'
          },
          {
            label: '希伯来语 HE',
            val: 'HE'
          },
          {
            label: '西班牙语-阿根廷 QSA',
            val: 'QSA'
          },
          {
            label: '西班牙语-卡斯蒂利亚 ES',
            val: 'ES'
          },
          {
            label: '西班牙语-拉美 LAS',
            val: 'LAS'
          },
          {
            label: '西班牙语-墨西哥 QSM',
            val: 'QSM'
          },
          {
            label: '乌克兰语 UK',
            val: 'UK'
          },
          {
            label: '土耳其语 TR',
            val: 'TR'
          },
          {
            label: '泰语 TH',
            val: 'TH'
          },
          {
            label: '泰米尔语 TA',
            val: 'TA'
          },
          {
            label: '泰卢固语 TE',
            val: 'TE'
          },
          {
            label: '斯洛文尼亚语 SL',
            val: 'SL'
          },
          {
            label: '斯洛伐克语 SK',
            val: 'SK'
          },
          {
            label: '塞尔维亚语 SR',
            val: 'SR'
          },
          {
            label: '瑞典语 SV',
            val: 'SV'
          },
          {
            label: '日语 JA',
            val: 'JA'
          },
          {
            label: '葡萄牙语-巴西 QBP',
            val: 'QBP'
          },
          {
            label: '葡萄牙语-欧洲 PT',
            val: 'PT'
          },
          {
            label: '挪威语 NO',
            val: 'NO'
          },
          {
            label: '马来语 MSA',
            val: 'MSA'
          },
          {
            label: '罗马尼亚语 RO',
            val: 'RO'
          },
          {
            label: '立陶宛语 LT',
            val: 'LT'
          },
          {
            label: '拉脱维亚语 LV',
            val: 'LV'
          },
          {
            label: '克罗地亚语 HR',
            val: 'HR'
          },
          {
            label: '捷克－斯洛伐克语 CS',
            val: 'CS'
          },
          {
            label: '加泰隆语 CA',
            val: 'CA'
          },
          {
            label: '荷兰语 NL',
            val: 'NL'
          },
          {
            label: '韩语 KO',
            val: 'KO'
          },
          {
            label: '佛兰芒语 VLS',
            val: 'VLS'
          },
          {
            label: '芬兰语 FI',
            val: 'FI'
          },
          {
            label: '法语-加拿大 QFC',
            val: 'QFC'
          },
          {
            label: '法语 FR',
            val: 'FR'
          },
          {
            label: '俄语 RU',
            val: 'RU'
          },
          {
            label: '德语 DE',
            val: 'DE'
          },
          {
            label: '丹麦语 DA',
            val: 'DA'
          },
          {
            label: '波斯尼亚语 BS',
            val: 'BS'
          },
          {
            label: '波兰语 PL',
            val: 'PL'
          },
          {
            label: '冰岛语 IS',
            val: 'IS'
          },
          {
            label: '爱沙尼亚语 ET',
            val: 'QMSET'
          },
          {
            label: '阿拉伯语 AR',
            val: 'AR'
          },
          {
            label: '阿尔巴尼亚语 SQ',
            val: 'SQ'
          }
        ],
        APList: [
          {
            label: '无字幕',
            val: 0
          },
          {
            label: '开放式字幕OCAP',
            val: 1
          },
          {
            label: '隐藏式字幕CCAP',
            val: 2
          }
        ],           // OCAP/CCAP
        areaList: [
          this.$t('public.areaList.INT'),
          this.$t('public.areaList.CN'),
          this.$t('public.areaList.HK'),
          this.$t('public.areaList.TW'),
          this.$t('public.areaList.MO')
        ],         // 地区
        mp3TypeList: [
          {
            label: '无版本',
            val: 0
          },
          {
            label: '版本1',
            val: 1
          }
        ],      // 声道类型
        resolutionList: [
          {
            label: '2K 2048*1080',
            val: 0
          },
          {
            label: '4K 4096*2160',
            val: 1
          }
        ],   // 分辨率
        typeList: [
          {
            label: '2D',
            val: 0
          },
          {
            label: '3D',
            val: 1
          }
        ],         // 2D/3D
        DCPTypeList: [
          {
            label: '原版OV Original Version',
            val: 0
          },
          {
            label: '版本文件VF Version File',
            val: 1
          }
        ],      // DCP类型
        label: {
          fileName: 'DCP文件名',
          movieName: '影片名称',
          movieType: '影片类型',
          version: '类型版本',
          proportion: '宽高比',
          mp3Language: '声音语言',
          textLanguage: '字幕语言',
          AP: 'OCAP/CCAP',
          area: '地区',
          mp3Type: '声道类型',
          resolution: '分辨率',
          producer: '出品方',
          date: '打包日期',
          made: '制作方',
          type: '2D/3D',
          DCPType: 'DCP类型'
        },
        form: {
          fileName: '',          // DCP文件名
          movieName: '',         // 影片名称
          movieType: 0,         // 影片类型
          version: 0,            // 类型版本
          proportion: 0,         // 宽高比
          mp3Language: 1,        // 声音语言
          textLanguage: '',      // 字幕语言
          AP: 0,                 // OCAP/CCAP
          area: 0,               // 地区
          mp3Type: 0,            // 声道类型
          resolution: 0,         // 分辨率
          producer: '',          // 出品方
          date: '',              // 打包日期
          made: '',              // 制作方
          type: 0,               // 2D/3D
          DCPType: 0             // DCP类型
        }
      }
    },
    methods: {
      // 关闭
      shutMe() {
        this.$emit('shutMe')
      },
      // 保存
      saveFun() {
        this.shutMe()
      }
    }
  }
</script>

<style lang="less" scoped>
  .setName {
    .setFileNameForm {
      margin: -10px 0px;
      overflow-y: scroll;
      height: 630px;

      .farm-label {
        width: 100px;
        text-align: right;
        margin-right: 60px;
      }
    }
    .btnGroup-btn:nth-of-type(2) {
      margin-right: 0px;
    }

  }

</style>
