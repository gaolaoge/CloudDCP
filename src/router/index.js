import Vue from 'vue'
import Router from 'vue-router'

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
        }
      ]
    }
  ]
})
