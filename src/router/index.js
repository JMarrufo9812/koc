import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import Admin from '@/views/Admin.vue'
import GuestRegister from '@/views/GuestRegister.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/access',
      name: 'access',
      component: HomeView
    },
    {
      path: '/guest/register',
      name: 'guestRegister',
      component: GuestRegister
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})

export default router
