import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/login-code',
    name: 'LoginCode',
    component: () => import('../views/LoginCode.vue')
  },
  {
    path: '/browse',
    name: 'Browse',
    component: () => import('../views/Browse.vue')
  },
  {
    path: '/post-ad',
    name: 'PostAd',
    component: () => import('../views/PostAd.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/my-ads',
    name: 'MyAds',
    component: () => import('../views/MyAds.vue')
    // meta: { requiresAuth: true } // Temporarily disabled for testing
  },
]

const router = createRouter({
  history: createWebHistory('/alot_frontend/'),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  // For localhost:3000, disable auth checks
  const isLocalhost = window.location.hostname === 'localhost' && window.location.port === '3000'
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated && !isLocalhost) {
    next('/login')
  } else {
    next()
  }
})

export default router

