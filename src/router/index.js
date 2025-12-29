import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/lajijiansuo',
      name: 'lajijiansuo',
      component: () => import('../views/LajiJiansuoView.vue'),
    },
    {
      path: '/huodong',
      name: 'huodong',
      component: () => import('../views/HuodongView.vue'),
    },
    {
      path: '/yonghu',
      name: 'yonghu',
      component: () => import('../views/YonghuView.vue'),
    },
    {
      path: '/scanner',
      name: 'scanner',
      component: () => import('../views/ScannerView.vue'),
    },
  ],
})

export default router
