import Vue from 'vue'
import Router from 'vue-router'
import Goods from './views/goods.vue'
import Rating from './views/rating.vue'
import Seller from './views/seller.vue'


Vue.use(Router)

export default new Router({
  //base:'/',
  routes:[
    {
      name: 'goods',
      path: '/goods',
      component: Goods
    },
    {
      name: 'rating',
      path: '/rating',
      component: Rating,
    },
    {
      name: 'seller',
      path: '/seller',
      component: Seller,
    }
  ]
})