import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import AddGoods from '@/pages/add/AddGoods'
import Detail from '@/components/detail/Detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{ keepAlive: true }
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/addGoods',
      name: 'AddGoods',
      component: AddGoods
    }
  ]
})
