<template>
  <div class="set-system">
    <el-collapse v-model="collapseResult" @change="result => collapseResult = result">
      <!--语言和格式-->
      <el-collapse-item name="language">
        <template slot="title">
          <img src="@/icons/collapseIcon.png" :class="[{'open': languageOpen}, 'collapse-icon']">
          {{ languageItem.title }}
        </template>
        <div class="wrapper">
          <span class="desc">{{ languageItem.desc }}</span>
          <div class="form_">
            <!--设置语言-->
            <div class="form-item">
              <label class="form-item-label">{{ languageItem.setLanguageLabel }}</label>
              <el-select v-model="languageItem.setLanguageVal" placeholder="请选择">
                <el-option
                  v-for="item in languageItem.languageList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </div>
            <!--列表最大显示数-->
            <div class="form-item">
              <label class="form-item-label">{{ languageItem.setMaxLengthLabel }}</label>
              <el-select v-model="languageItem.setMaxLengthVal" placeholder="请选择">
                <el-option
                  v-for="item in languageItem.maxLengthList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </div>
          </div>
          <div class="filter">
            <!--保存-->
            <div class="filter-btn primary">{{ $t('public.save2') }}</div>
            <!--取消-->
            <div class="filter-btn">{{ $t('public.cancel') }}</div>
          </div>
        </div>
      </el-collapse-item>
      <!--发行方-->
      <el-collapse-item name="issuer">
        <template slot="title">
          <img src="@/icons/collapseIcon.png" :class="[{'open': issuerOpen}, 'collapse-icon']">
          {{ collapseItem.title }}
        </template>
       <div class="wrapper">
         <span class="desc">{{ collapseItem.desc }}</span>
         <div class="form_">
           <!--设置语言-->
           <div class="form-item">
             <label class="form-item-label">{{ collapseItem.mechanismLabel }}</label>
             <span class="form-item-span">{{ collapseItem.mechanismVal }}</span>
           </div>
           <!--设置语言-->
           <div class="form-item">
             <label class="form-item-label">{{ collapseItem.certificateLabel }}</label>
             <span class="form-item-span">{{ collapseItem.certificateVal }}</span>
           </div>
         </div>
         <div class="filter">
           <!--导出-->
           <div class="filter-btn primary">{{ $t('public.export') }}</div>
         </div>
       </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  export default {
    name: 'setSystem',
    data() {
      return {
        collapseResult: ['language', 'issuer'],
        issuerOpen: true,
        languageOpen: true,
        languageItem: {
          title: '语言和格式',
          desc: '用于知道当前账号语言和列表界面显示格式，您可以在此修改这些取值。',
          setLanguageLabel: '设置语言',
          setLanguageVal: '',
          setMaxLengthLabel: '列表最大显示数',
          setMaxLengthVal: '',
          languageList: [
            {
              value: 'zh',
              label: '简体中文'
            },
            {
              value: 'en',
              label: 'English'
            }
          ],
          maxLengthList: [
            {
              value: 10,
              label: '10条',
            },
            {
              value: 20,
              label: '20条',
            },
            {
              value: 50,
              label: '50条',
            }
          ]
        },
        collapseItem: {
          title: '发行方',
          desc: 'CloudDCP使用“发行方私钥”进行数字签名，您可以点击【导出】“发行方公钥”用于验证签名。CloudDCP默认使用“中国电影云”认证信息，您可以点击【更换】，更换对应的发行方信息。',
          mechanismLabel: '颁发机构：',
          mechanismVal: '国家电影云',
          certificateLabel: ' 数值证书：',
          certificateVal: 'CloudDCP_Public_kdm.pem'
        },
      }
    },
    methods: {},
    watch: {
      'collapseResult': function (list) {
        if (list.some(item => item == 'language')) this.languageOpen = true
        else this.languageOpen = false
        if (list.some(item => item == 'issuer')) this.issuerOpen = true
        else this.issuerOpen = false
      }
    }

  }
</script>

<style lang="less" scoped>
  .set-system {
    padding: 20px;

    .el-collapse {
      border: 0px;
    }

    .collapse-icon {
      width: 16px;
      margin-right: 8px;
      opacity: 0.6;
      transform: rotate(-90deg);
      transition: all 0.2s;

      &.open {
        transform: rotate(0deg);
      }
    }

    .wrapper {
      padding-left: 24px;

      .desc {
        color: rgba(22, 29, 37, 0.6);
        font-size: 14px;
        margin-bottom: 35px;
        display: inline-block;
      }

      .form-item {
        .form-item-label {
          color: rgba(22, 29, 37, 0.6);
        }

        /deep/.el-select {
          width: 650px;
        }

        /deep/.el-input__inner {
          height: 36px;
        }
      }
    }

    /deep/ .el-collapse-item__arrow.el-icon-arrow-right {
      display: none;
    }

  }
  .filter {
    margin: 29px 0px;
  }
  /deep/.el-collapse-item__content {
    padding: 0px;
  }
</style>
