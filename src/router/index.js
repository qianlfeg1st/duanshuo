import Vue from 'vue'
import Router from 'vue-router'

// 导入页面，并设置路由懒加载
const index = resolve => require(['@/components/index.vue'], resolve)
const share = resolve => require(['@/components/share.vue'], resolve)

// 安装 路由插件
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  // 路由配置
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/share/:id',
      name: 'share',
      component: share
    }
  ]
})

export default router
