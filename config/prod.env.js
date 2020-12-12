'use strict'
module.exports = {
  NODE_ENV: '"production"',
  BASE_URI: '"http://223.80.107.190:38146/"',                          // 测试
  BACK_WS_API: '"ws://223.80.107.190:5002/websocket/dcp/web/"',
  PLUGIN_WS_API: '"ws://localhost:17002"',
  // DOWNLOAD_PLUGIN_PATH: '"http://www.chinamoviecloud.cn:8085/CloudTransfer.exe"',           // 生产
  DOWNLOAD_PLUGIN_PATH: '"http://223.80.107.190:8084/CloudTransfer.exe"',                // 开发、测试
  MOCK: false,
  VERSION: 202012101537,
}
