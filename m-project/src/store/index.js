import Vue from 'vue'
import Vuex from 'vuex'

import cart from './modules/cart'

import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
	//一共的数量
	goodsList: [],
	// 一个商品的信息
	productInfo: {}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
	modules: {
		cart
	}
})
