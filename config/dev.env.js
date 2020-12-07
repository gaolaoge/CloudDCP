'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URI: '"http://192.168.1.179:81/"',    // 开发
  // BASE_URI: '"http://192.168.1.87:6050/"',    // 继宏达
  // BASE_URI: '"http://223.80.107.190:38146"',              // 测试
  BACK_WS_API: '"ws://192.168.1.176:5002/websocket/dcp/web/"',
  PLUGIN_WS_API: '"ws://localhost:15000"',
  // PLUGIN_WS_API: '"ws://192.168.1.87:15000"',
  MOCK: true,
  VERSION: "'-'",
})
