import Vue from 'vue'
import Router from 'vue-router'

// router同地址跳转取消报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/m-login/index.vue')
    },
    {
      path: '/',
      name: 'platform',
      component: () => import('@/layout/index.vue'),
      children: [
        {
          path: 'dcp',
          name: 'dcp',
          component: () => import('@/components/m-DCP/index.vue')
        },
        {
          path: 'kdm',
          name: 'kdm',
          component: () => import('@/components/m-KDM/index.vue')
        },
        {
          path: 'screenM',
          name: 'screenM',
          component: () => import('@/components/m-screen/index.vue')
        },
        {
          path: 'bill',
          name: 'bill',
          component: () => import('@/components/m-bill/index.vue')
        },
        {
          path: 'set',
          name: 'set',
          component: () => import('@/components/m-set/index.vue')
        },
        {
          path: 'upTop',     // 充值
          name: 'upTop',
          component: () => import('@/components/m-bill/components/recharge-page.vue')
        },
        {
          path: 'invoice',     // 开发票
          name: 'invoice',
          component: () => import('@/components/m-bill/components/invoice-page.vue')
        },
        {
          path: 'info',
          name: 'info',
          component: () => import('@/components/m-info/index.vue')
        },
        {
          path: '/rechargepage',
          name: 'rechargePage',
          component: () => import('@/components/m-bill/components/recharge-moudle/rechargePage.vue')
        }
      ]
    }
  ]
})
