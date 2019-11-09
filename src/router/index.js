import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../pages/Login.vue')
  },
  {
    path: '/Users',
    name: 'Users',
    component: () => import('../pages/Users.vue')
  },
  {
    path: '/Chat',
    name: 'Chat',
    component: () => import('../views/Chat.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
