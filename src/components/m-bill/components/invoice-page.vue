<template>
  <div class="invoice-page">
    <div class="tableGroup">
      <div class="navList">
        <span class="navBtn"
              :class="[{'active': index == table.navListActiveIndex}]"
              @click="table.navListActiveIndex = index"
              v-for="(item,index) in table.navList"
              :key="index">
          {{ item }}
        </span>
      </div>
      <div class="tableList t setScollBarStyle">
        <!--选择充值记录-->
        <div class="recording item">
          <span class="label">{{ recordingLabel }}：</span>
          <div class="valTable">
            <el-table
              :data="recordingTableData"
              height="260"
              @selection-change="recordingSelectionChange"
              style="width: 100%">

              <el-table-column
                type="selection"
                align="right"
                width="55"/>

              <el-table-column
                prop="outTradeNo"
                min-width="300"
                label="交易ID"/>

              <el-table-column
                prop="actualPayment"
                width="180"
                label="实际支付金额（元）"/>

              <el-table-column
                label="支付方式"
                width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.paymentTitle == 1 ? '支付宝' : '微信' }}</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="productOrderUuid"
                min-width="300"
                label="支付单号"/>

              <el-table-column
                prop="updateTime"
                width="200"
                label="支付时间"/>

            </el-table>
          </div>
        </div>
        <!--开票金额-->
        <div class="item">
          <span class="label">{{ blanceLabel }}：</span>
          <span class="val">￥{{ blanceVal }}</span>
        </div>
        <!--发票类型-->
        <div class="item">
          <span class="label">{{ typeLabel }}：</span>
          <!--          <el-radio-group v-model="typeVal" class="radio">-->
          <!--            <el-radio :label="item.value"-->
          <!--                      v-for="(item,index) in typeValList"-->
          <!--                      :key="index">{{ item.label }}-->
          <!--            </el-radio>-->
          <!--          </el-radio-group>-->
          <span class="typeV">{{ typeV }}</span>
        </div>
        <!--发票抬头-->
        <div class="item">
          <span class="label">{{ invoiceLabel }}：</span>
          <div class="valTable">
            <el-table
              :data="invoiceTableData"
              style="width: 100%">

              <el-table-column
                width="55"
                align="right"
                show-overflow-tooltip
                label="">
                <template slot-scope="scope">
                  <el-checkbox :true-label="scope.$index"
                               false-label=null
                               v-model="checked"/>
                </template>
              </el-table-column>

              <el-table-column
                prop="invoiceTitle"
                min-width="400"
                show-overflow-tooltip
                label="发票抬头"/>

              <el-table-column
                prop="taxpayerId"
                width="200"
                label="纳税人识别号"/>

              <el-table-column
                prop="email"
                width="220"
                show-overflow-tooltip
                label="邮箱"/>

              <el-table-column
                prop="isDefault"
                width="80"
                label="是否默认">
                <template slot-scope="scope">
                  <span>{{ scope.row.isDefault == 0 ? '否' : '是' }}</span>
                </template>
              </el-table-column>

              <el-table-column
                width="240"
                label="操作">
                <template slot-scope="scope">
                  <span class="table-btn" @click="setDefault(scope.$index)">{{ operatingBtn[0] }}</span>
                  <span class="table-btn" @click="editItem(scope.$index)">{{ operatingBtn[1] }}</span>
                  <span class="table-btn" @click="deleteItem(scope.$index)">{{ operatingBtn[2] }}</span>
                </template>
              </el-table-column>

            </el-table>
            <!--按钮添加发票抬头-->
            <div class="addMore" @click="addNewHeader">
              <img src="@/icons/createIcon.png" alt="">
              <span>{{ addMoreBtn }}</span>
            </div>
          </div>
        </div>
        <!--按钮立即开票-->
        <div class="btn" @click="invoicingF"><span>{{ btn }}</span></div>
      </div>
    </div>
    <!--添加发票抬头-->
    <el-dialog
      :visible.sync="dialogData.visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="426px">
      <div class="dialog-header">
        <span class="title">添加发票抬头</span>
        <img src="@/icons/shutDialogIcon.png" class="closeBtn" @click="closeDialog">
      </div>
      <div class="dialog-body">
        <div class="farm-form">
          <div class="farm-form-item" v-for="(item, index) in dialogData.list" :key="index">
            <label :for="item.id" class="farm-form-label">
              <span v-if="item.required" class="star">*</span>
              {{ item.Label }}：
            </label>
            <input type="text"
                   :id="item.id"
                   :placeholder="item.Placeholder"
                   :class="[{'errorVal': item.status ? !item.status : null}, 'farm-form-input']"
                   v-model="item.Val"
                   @input="VerifType(item.id, true)"
                   @blur="VerifType(item.id, false)">
          </div>
          <div class="sw">
            <el-switch
              v-model="dialogData.isDefault"
              active-value="1"
              inactive-value="0"
              active-color="RGBA(18, 91, 243, 1)"
              inactive-color="RGBA(200, 202, 203, 1)"/>
            <span class="s" :class="[{'active': dialogData.isDefault == '1'}]">{{ dialogData.switchSpan }}</span>
          </div>
        </div>
        <div class="dialog-btn-group">
          <div class="dialog-btn cancel" @click="closeDialog"><span>取消</span></div>
          <div
            :class="[{'cannotBeGo': !dialogData.list[0]['status'] || !dialogData.list[1]['status'] || !dialogData.list[2]['status'] || !dialogData.list[4]['status']}, 'dialog-btn', 'save']"
            @click="addHeader" v-show="!editHeader">
            <span>确定</span>
          </div>
          <div
            :class="[{'cannotBeGo': !dialogData.list[0]['status'] || !dialogData.list[1]['status'] || !dialogData.list[2]['status'] || !dialogData.list[4]['status']}, 'dialog-btn', 'save']"
            @click="editHeaderF" v-show="editHeader">
            <span>确定</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getRechargeListF,          // 获取可开票的充值记录
    getInvoiceHeaderListF,     // 获取户开票抬头信息
    addInvoiceHeader,
    setItemDefault,
    deleteItemIn,
    editItemIn,
    invoicing
  } from '@/api/bill-api'
  import {
    createDateFun,
    messageFun
  } from '@/assets/common'
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'invoicePage',
    data() {
      return {
        table: {
          navListActiveIndex: 0,
          navList: ['开票']
        },
        recordingLabel: '选择充值记录',
        blanceLabel: '开票金额',
        blanceVal: '0.00',
        typeLabel: '开票类型',
        typeVal: '0',
        typeValList: [
          {
            label: '增值税普票',
            value: '0'
          }, {
            label: '增值税专票',
            value: '1'
          }
        ],
        typeV: '增值税普票',
        invoiceLabel: '开票抬头',
        btn: '立即开票',
        recordingTableData: [
          // {
          //   rechargeUuid: '',
          //   paymentStatus: '',
          //   actualPayment: '',          // 实际支付金额
          //   arrivalAmount: '',
          //   rechargeExplain: '',
          //   paymentTitle: '',           // 支付方式1:支付宝 2:微信
          //   outTradeNo: '',             // 交易id
          //   productOrderUuid: '',       // 支付单号
          //   updateTime: '',             // 支付时间
          //   invoice: ''
          // }
        ],   // 充值记录table
        invoiceTableData: [
          // {
          //    invoiceSettingUuid: '',    // 发票抬头uuid
          //    invoiceTitle: '',          // 发票抬头
          //    taxpayerId: '',            // 纳税人识别号
          //    email: '',                 // 邮箱
          //    isDefault: '',             // 是否默认0:非默认 1:默认
          //    customerUuid: '',          //
          //    companyAddress: '',        // 公司地址
          //    companyTelephone: '',      // 公司电话
          //    companyBank: '',           // 开户行
          //    bankAccount: ''            // 开户行账号
          // },
        ],     // 发票抬头table
        recordingSelection: [],            // 充值记录table多选
        operatingBtn: ['设为默认', '编辑', '删除'],
        addMoreBtn: '添加发票抬头',
        dialogData: {
          visible: false,
          list: [
            {
              Label: '发票抬头',
              Val: '',
              Placeholder: '请输入发票抬头',
              id: 'header',
              required: true,
              status: null
            },
            {
              Label: '纳税人识别号',
              Val: '',
              Placeholder: '请输入纳税人识别号',
              id: 'number',
              required: true,
              status: null
            },
            {
              Label: '邮箱',
              Val: '',
              Placeholder: '请输入邮箱',
              id: 'email',
              required: true,
              status: null
            },
            {
              Label: '注册地址',
              Val: '',
              Placeholder: '请输入公司地址',
              id: 'address'
            },
            {
              Label: '注册电话',
              Val: '',
              Placeholder: '请输入公司电话',
              id: 'phone',
              status: null
            },
            {
              Label: '开户银行',
              Val: '',
              Placeholder: '请输入公司开户行',
              id: 'bank'
            },
            {
              Label: '开户账号',
              Val: '',
              Placeholder: '请输入开户行账号',
              id: 'account'
            }
          ],
          switchSpan: '设为默认',
          isDefault: '0',
          Uuid: null
        },
        editHeader: false,          // 添加默认抬头 确认btn 切换
        checked: null               // 开票抬头索引
      }
    },
    methods: {
      // 验证格式
      VerifType(type, ing) {
        let list = this.dialogData.list
        if (type == 'email' && list[2]['Val']) {              // 邮箱
          if (!this.regExp.email.test(list[2]['Val'])) {
            if (ing) list[2]['status'] = null
            else {
              messageFun('error', '请输入正确的邮箱')
              list[2]['status'] = false
            }
          } else list[2]['status'] = true
        } else if (type == 'header' && list[0]['Val']) {      // 发票抬头
          if (!this.regExp.header.test(list[0]['Val'])) {
            if (ing) list[0]['status'] = null
            else {
              messageFun('error', '输入内容不能包含空格或特殊字符')
              list[0]['status'] = false
            }
          } else list[0]['status'] = true
        } else if (type == 'number' && list[1]['Val']) {      // 纳税人识别号
          if (!this.regExp.identificationNumber.test(list[1]['Val'])) {
            if (ing) list[1]['status'] = null
            else {
              messageFun('error', '请输入15-20位数字或字母')
              list[1]['status'] = false
            }
          } else list[1]['status'] = true
        } else if (type == 'phone' && list[4]['Val']) {       // 纳税人识别号
          if (!this.regExp.phone.test(list[4]['Val'])) {
            if (ing) list[4]['status'] = null
            else {
              messageFun('error', '请输入正确的手机号')
              list[4]['status'] = false
            }
          } else list[4]['status'] = true
        }
      },
      // 添加发票抬头
      addNewHeader() {
        this.dialogData.visible = true
      },
      // 关闭【添加发票抬头】弹窗
      closeDialog() {
        this.dialogData.visible = false
        this.reset()
      },
      // 获取可开票的充值记录
      async getRechargeList() {
        let {data} = await getRechargeListF()
        if (data.code == 200) {
          this.recordingTableData = data.data.map(item => {
            return Object.assign(item, {
              'updateTime': createDateFun(new Date(item.updateTime))
            })
          })
        }
      },
      // 获取户开票抬头信息
      async getInvoiceHeaderList() {
        let data = await getInvoiceHeaderListF()
        if (data.data.code == 200) {
          let index = data.data.data.findIndex(item => item.isDefault == 1)
          if (index) {
            data.data.data.unshift(data.data.data[index])
            data.data.data.splice(index + 1, 1)
          }
          this.invoiceTableData = data.data.data
        }
      },
      // 充值记录tab 多选
      recordingSelectionChange(list) {
        this.blanceVal = list.reduce((total, item) => {
          return total + item.actualPayment
        }, 0).toFixed(2)
        this.recordingSelection = list
      },
      // 开票抬头tab 多选
      invoiceSelectionChange(list) {

      },
      // 添加发票抬头
      async addHeader() {
        let list = this.dialogData.list
        if (!list[0]['Val']) {
          messageFun('info', '【发票抬头】为必填项')
          return false
        } else if (!list[1]['Val']) {
          messageFun('info', '【纳税人识别号】为必填项')
          return false
        } else if (!list[2]['Val']) {
          messageFun('info', '【邮箱】为必填项')
          return false
        } else if (list[0]['status'] || list[1]['status'] || list[2]['status'] || list[4]['status']) {
          messageFun('info', '已填项存在错误')
          return false
        }
        let data = await addInvoiceHeader({
          invoiceTitle: list[0]['Val'],                 // 发票抬头
          taxpayerId: list[1]['Val'],                   // 纳税人识别号
          email: list[2]['Val'],                        // 邮箱
          companyAddress: list[3]['Val'],               // 公司地址
          companyTelephone: list[4]['Val'],             // 公司电话
          companyBank: list[5]['Val'],                  // 公司开户行地址
          bankAccount: list[6]['Val'],                  // 公司开户行账号
          isDefault: this.dialogData.isDefault          // 0:非默认 1:默认
        })
        if (data.data.code == 200) {
          messageFun('success', '操作成功')
          this.getInvoiceHeaderList()
          this.dialogData.visible = false
          this.reset()
        }
      },
      // 发票抬头 - 编辑 - 打开
      editItem(index) {
        this.editHeader = true
        this.dialogData.visible = true
        let list = this.dialogData.list,
          item = this.invoiceTableData[index]
        list[0]['Val'] = item['invoiceTitle']
        list[1]['Val'] = item['taxpayerId']
        list[2]['Val'] = item['email']
        list[3]['Val'] = item['companyAddress']
        list[4]['Val'] = item['companyTelephone']
        list[5]['Val'] = item['companyBank']
        list[6]['Val'] = item['bankAccount']
        this.Uuid = item['invoiceSettingUuid']
        this.dialogData.isDefault = item['isDefault']
      },
      // 发票抬头 - 编辑 - 发送
      async editHeaderF() {
        let list = this.dialogData.list
        if (!list[0]['Val']) {
          messageFun('info', '【发票抬头】为必填项')
          return false
        }
        if (!list[1]['Val']) {
          messageFun('info', '【纳税人识别号】为必填项')
          return false
        }
        if (!list[2]['Val']) {
          messageFun('info', '【邮箱】为必填项')
          return false
        }
        let data = await editItemIn({
          invoiceSettingUuid: this.Uuid,
          invoiceTitle: list[0]['Val'],                 // 发票抬头
          taxpayerId: list[1]['Val'],                   // 纳税人识别号
          email: list[2]['Val'],                        // 邮箱
          companyAddress: list[3]['Val'],               // 公司地址
          companyTelephone: list[4]['Val'],             // 公司电话
          companyBank: list[5]['Val'],                  // 公司开户行地址
          bankAccount: list[6]['Val'],                  // 公司开户行账号
          isDefault: this.dialogData.isDefault          // 0:非默认 1:默认
        })
        if (data.data.code == 200) {
          this.editHeader = false
          messageFun('success', '操作成功')
          this.dialogData.visible = false
          this.getInvoiceHeaderList()
        }
      },
      // 发票抬头 - 设为默认
      async setDefault(index) {
        let data = await setItemDefault(this.invoiceTableData[index]['invoiceSettingUuid'])
        if (data.data.code == 200) {
          messageFun('success', '操作成功')
          this.getInvoiceHeaderList()
        }
      },
      // 发票抬头 - 删除
      deleteItem(index) {
        this.$confirm('删除后将无法找回，确认删除?', '提示信息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            let data = await deleteItemIn(this.invoiceTableData[index]['invoiceSettingUuid'])
            if (data.data.code == 200) {
              messageFun('success', '操作成功')
              this.getInvoiceHeaderList()
            }
          })
          .catch(() => messageFun('info', '已取消删除'))
      },
      // 开票
      async invoicingF() {
        if (!this.recordingSelection.length) {
          messageFun('info', '未选中充值记录')
          return false
        }
        if (this.checked == null) {
          messageFun('info', '未选中发票抬头')
          return false
        }
        let data = await invoicing({
          invoiceType: this.typeVal,                // 开票类型 0:普票 1:专票
          rechargeUuidList: this.recordingSelection.map(item => item.rechargeUuid),         // 用户选择的充值uuid列表
          invoiceSettingUuid: this.invoiceTableData[this.checked]['invoiceSettingUuid']     // 发票抬头uuid
        })
        if (data.data.code == 200) {
          messageFun('success', '发票申请已经提交到管理员，我们将会在5个工作日内给您回复，请耐心等待！')
          this.getRechargeList()
          this.checked = null
          this.recordingSelection = []
          this.$router.push({name: 'bill', params: {index: 2}})
        }
      },
      // 复位
      reset() {
        let list = this.dialogData.list
        list[0]['Val'] = ''
        list[1]['Val'] = ''
        list[2]['Val'] = ''
        list[3]['Val'] = ''
        list[4]['Val'] = ''
        list[5]['Val'] = ''
        list[6]['Val'] = ''
        this.dialogData.isDefault = 0
      }
    },
    mounted() {
      this.getRechargeList()
      this.getInvoiceHeaderList()
    },
    computed: {
      ...mapState(['regExp'])
    }
  }
</script>

<style lang="less" scoped>
  .invoice-page {
    width: 100%;

    .t {
      height: calc(100vh - 142px);
      overflow-y: auto;
      padding: 46px 30px;
      box-sizing: border-box;
    }

    .item {
      display: flex;
      margin-bottom: 20px;

      .label {
        width: 112px;
        font-size: 16px;
        color: rgba(22, 29, 37, 0.8);
        margin-right: 10px;
      }

      .val {
        font-size: 20px;
        font-weight: 600;
        color: rgba(22, 29, 37, 0.8);
        font-family: Cabin-Bold;
      }

      .typeV {
        line-height: 24px;
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
      }

      .valTable {
        flex-grow: 1;
        width: 1px;
        /*height: 280px;*/
        border-radius: 10px;
        padding: 10px;
        box-sizing: border-box;
        border: 1px solid rgba(22, 29, 37, 0.1);
      }

      .radio {
        /deep/ .el-radio {
          line-height: 24px;
        }
      }
    }

    .btn {
      width: 96px;
      height: 32px;
      background-color: rgba(27, 83, 244, 1);
      border-radius: 6px;
      text-align: center;
      cursor: pointer;
      margin-left: 122px;
      margin-top: 30px;

      span {
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 32px;
      }

    }

    .table-btn {
      font-size: 14px;
      color: rgba(0, 97, 255, 1);
      text-decoration: underline;
      margin-right: 30px;
      cursor: pointer;
    }

    .addMore {
      margin: 15px 0px;
      cursor: pointer;
      user-select: none;

      img {
        width: 20px;
      }

      span {
        font-size: 14px;
        color: rgba(10, 98, 241, 1);
        vertical-align: top;
        margin-left: 6px;
      }
    }
  }

  .farm-form {
    .farm-form-item {
      margin-bottom: 10px;

      .farm-form-label {
        display: inline-block;
        width: 134px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: rgba(22, 29, 37, 0.8);
        line-height: 36px;
        text-align: right;

        .star {
          color: tomato;
        }
      }

      .farm-form-input {
        width: 260px;
        height: 36px;
        border-radius: 6px;
        border: 1px solid rgba(22, 29, 37, 0.2);
        padding-left: 20px;
        box-sizing: border-box;
        outline: none;

        &.errorVal {
          color: rgba(255, 62, 77, 1);
        }
      }
    }
  }

  /deep/ .el-table th td .cell,
  /deep/ .el-table tr td .cell,
  /deep/ .el-table th th .cell,
  /deep/ .el-table tr th .cell {
    color: rgba(22, 29, 37, 0.6);
  }

  /deep/ .el-radio-group .el-radio .el-radio__label {
    color: rgba(22, 29, 37, 0.8);
  }

  .sw {
    display: flex;
    align-items: center;
    margin-top: 12px;
    margin-left: 134px;

    .s {
      display: inline-block;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: rgba(22, 29, 37, 1);
      opacity: 0.6;
      line-height: 20px;
      margin-left: 5px;
      transition: 0.2s;

      &.active {
        opacity: 1;
      }
    }
  }

  .valTable {
    /deep/ .el-table__body-wrapper {
      min-height: 67px;
      height: calc(100vh - 780px);
    }
  }

  .dialog-body {
    padding-bottom: 90px;
  }

</style>
