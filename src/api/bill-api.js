import {
  http
} from './index.js'

// 充值记录 获取table数据
export function getRechargeCentreList(data) {
  return http({
    url: `/billing/recharge/getRechargeList?${data}`,
    method: 'GET'
  })
}

// 充值记录 导出记录
export function exportUpTopTable(data) {
  return http({
    url: `/billing/recharge/getRechargeExcel?${data}`,
    method: 'GET',
    responseType: 'blob',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 充值记录 下载收据
export function downloadReceipt(data) {
  return http({
    url: `/file/farmReceipt?${data}`,
    method: 'GET',
    responseType: 'blob'
  })
}

// 充值记录 - 待付款
export function peddingPayment(id) {
  return http({
    url: `/recharge/alipay/continuePay?outTradeNo=${id}`,
    method: 'GET'
  })
}

// 消费记录 获取table数据
export function getConsumptionTable(data) {
  return http({
    url: `/billing/spending/getSpendingList?${data}`,
    method: 'GET'
  })
}

// 消费记录 获取所属项目List
export function getConsumptionSelectList() {
  return http({
    url: `/professional/project/getCustomerProjectList`,
    method: 'GET'
  })
}

// 消费记录 导出记录
export function exportConsumptionTable(data) {
  return http({
    url: `/billing/spending/getSpendingExcel?${data}`,
    method: 'GET',
    responseType: 'blob',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 消费记录 渲染消费详情
export function consumptionSeeMore(data) {
  return http({
    url: `/billing/spending/getRenderSpendingDetailList/${data}`,
    method: 'GET'
  })
}

// 消费记录 下载消费详情
export function upTopSeeMore(data) {
  return http({
    url: `/billing/spending/getDownloadSpendingDetailList/${data}`,
    method: 'GET'
  })
}

// 开票记录 - 获取列表
export function getInvoiceList(data) {
  return http({
    url: `/billing/invoice/getInvoicePage?${data}`,
    method: 'GET'
  })
}

// 开票记录 - 获取发票抬头列表
export function getHeadersList() {
  return http({
    url: `/billing/invoice/getInvoiceTitleList`,
    method: 'GET'
  })
}

// 开票记录 - 导出记录
export function exportInvoiceTable(data) {
  return http({
    url: `/billing/invoice/getInvoiceExcel?${data}`,
    method: 'GET',
    responseType: 'blob',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 账单 - 充值 - 计算金币
export function computeGold(data) {
  return http({
    url: `/recharge/balance/getArrivalAmountByPayment/${data}`,
    method: 'GET'
  })
}

// 账单 - 充值 - 立即充值 - 支付宝
export function ALiPay(data) {
  return http({
    url: `/recharge/alipay/toAlipay?payment=${data}`,
    method: 'GET'
  })
}

// 账单 - 充值 - 充值结果
export function upTopDefault(data) {
  return http({
    url: `/recharge/alipay/return?${data}`,
    method: 'GET'
  })
}

// 立即开票 - 获取可开票的充值记录
export function getRechargeListF() {
  return http({
    url: `/billing/invoice/getRechargeList4Invoice`,
    method: 'GET'
  })
}

// 立即开票 - 获取户开票抬头信息
export function getInvoiceHeaderListF() {
  return http({
    url: `/billing/invoice/getInvoiceSettingList`,
    method: 'GET'
  })
}

// 立即开票 - 添加开票抬头
export function addInvoiceHeader(data) {
  return http({
    url: `/billing/invoice/addInvoiceSetting`,
    method: 'POST',
    data
  })
}

// 立即开票 - 发票抬头 - 设为默认
export function setItemDefault(id) {
  return http({
    url: `/billing/invoice/setInvoiceSettingDefault/${id}`,
    method: 'PUT'
  })
}

// 立即开票 - 发票抬头 - 删除
export function deleteItemIn(id) {
  return http({
    url: `/billing/invoice/deleteInvoiceSetting/${id}`,
    method: 'DELETE'
  })
}

// 立即开票 - 发票抬头 - 编辑
export function editItemIn(data) {
  return http({
    url: `/billing/invoice/updateInvoiceSetting`,
    method: 'PUT',
    data
  })
}

// 立即开票 - 立即开票
export function invoicing(data) {
  return http({
    url: `/billing/invoice/addInvoice`,
    method: 'POST',
    data
  })
}
