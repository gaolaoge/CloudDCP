'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URI: '"http://192.168.1.179/"',    // 开发
  BACK_WS_API: '"ws://192.168.1.176:5002/websocket/web/"',
  PLUGIN_WS_API: '"ws://localhost:15000"',
  MOCK: true,
  VERSION: "'-'",
})
