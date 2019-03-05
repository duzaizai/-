import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import product from '@/pages/product'
import category from '@/pages/category'
import cart from '@/pages/cart'
import personal from '@/pages/personal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
		{
			path: '/product/:id',
			name: 'product',
			component: product
		},
		{
			path: '/category',
			name: 'category',
			component: category
		},
		{
			path: '/cart',
			name: 'cart',
			component: cart
		},
		{
			path: '/personal',
			name: 'personal',
			component: personal
		},
		{
			path: '*',
			redirect: '/home'
		}
  ]
})
