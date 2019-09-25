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
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/admin',
      component: () => import('@/views/Admin.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/Dashboard.vue'),
        },
        {
          path: 'user-profile',
          component: () => import('@/views/UserProfile.vue'),
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
