/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import Router from 'vue-router'
import Meta from 'vue-meta'

// Routes

Vue.use(Router)

// Create a new router
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/partner',
      component: () => import('@/views/partner/PartnerHome.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/partner/Applications.vue'),
        },
        {
          path: 'wallet/btc',
          component: () => import('@/views/partner/BtcWallet.vue'),
        },
        {
          path: 'wallet/eth',
          component: () => import('@/views/partner/EthWallet.vue'),
        },
      ],
    },
    {
      path: '/admin',
      component: () => import('@/views/admin/Admin.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/admin/Dashboard.vue'),
        },
        {
          path: 'user-profile',
          component: () => import('@/views/admin/UserProfile.vue'),
        },
        {
          path: 'notifications',
          component: () => import('@/views/admin/Notifications.vue'),
        },
        {
          path: 'icons',
          component: () => import('@/views/admin/Icons.vue'),
        },
        {
          path: 'typography',
          component: () => import('@/views/admin/Typography.vue'),
        },
        {
          path: 'table-list',
          component: () => import('@/views/admin/TableList.vue'),
        },
      ],
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  },
})

Vue.use(Meta)

// Bootstrap Analytics
// Set in .env
// https://github.com/MatteoGabriele/vue-analytics
if (process.env.GOOGLE_ANALYTICS) {
  Vue.use(VueAnalytics, {
    id: process.env.GOOGLE_ANALYTICS,
    router,
    autoTracking: {
      page: process.env.NODE_ENV !== 'development',
    },
  })
}

export default router
