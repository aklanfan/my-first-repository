import Vue from 'vue'
import Router from 'vue-router'

// 入口页
const index = resolve => require(['../pages/index.vue'], resolve)

// 游戏界面
const _interface = resolve => require(['../pages/interface.vue'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/game',
      name: 'game',
      component: _interface
    }
  ]
})
