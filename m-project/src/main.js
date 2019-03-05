import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'
import Mint from 'mint-ui'
import store from './store'
import App from './App'
import router from './router'
import './assets/css/index.css'
import 'swiper/dist/css/swiper.css'
import 'swiper/dist/js/swiper.js'
// import './assets/js/rem.js'

import 'babel-polyfill' //ES6 -> ES5

import  VueJsonp  from  'vue-jsonp'
Vue.use(VueJsonp)


import Axios from 'axios'
Vue.prototype.$axios = Axios

// 配置懒加载
Vue.use(VueLazyLoad, {
	loading: require('./assets/images/loading.gif')
})

// 配置Mint-ui
Vue.use(Mint)
import 'mint-ui/lib/style.css'

// request 请求拦截器
Axios.interceptors.request.use(function (req) {
  // 显示loading
  Mint.Indicator.open('加载...');
  return req;
})
// response响应拦截器
Axios.interceptors.response.use(function (res) {
  // 隐藏loading
  Mint.Indicator.close();
  return res;
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store,
  render: h => h(App)
})
