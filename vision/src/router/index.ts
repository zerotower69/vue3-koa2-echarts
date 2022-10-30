import { createRouter, createWebHistory,createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    name: 'Home'
  }, {
    path: '/sellerpage',
    component: () => import('@/views/SellerPage.vue')
  },
  {
    path: '/trendpage',
    component:()=>import('@/views/TrendPage.vue')
  }, {
    path: '/mapPage',
    component:()=>import('@/views/MapPage.vue')
  },
  {
    path: '/rankPage',
    component:()=>import('@/views/RankPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
