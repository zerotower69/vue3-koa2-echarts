import { createRouter, createWebHistory,createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect:'/screen'
  },
  {
    path: "/screen",
    component:()=>import('@/views/ScreenPage.vue')
  }
]

const devRoutes: Array<RouteRecordRaw> = [
  {
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
  }, {
    path: '/hotPage',
    component:()=>import('@/views/HotPage.vue')
  }, {
    path: '/stockPage',
    component:()=>import('@/views/StockPage.vue')
  }
]

const IS_PROD = process.env.NODE_ENV === "development";

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes:IS_PROD? routes:routes.concat(devRoutes)
})

export default router
