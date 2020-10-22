import Vue from 'vue'
import ElementUI from 'element-ui'
import store from './store'
import App from './App'
import router from './router'
import i18n from './lang'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.devtools = true
Vue.config.productionTip = false

if (process.env.MOCK) {
  const {mockXHR} = require('./mock')
  mockXHR()
}

export default new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {App},
  template: '<App/>'
})
