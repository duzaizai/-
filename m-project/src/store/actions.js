import * as types from './mutation-types.js'

export default {
	addGoods({ commit }, value) {
		commit(types.ADDGOODS, value)
	},
	productInfo({ commit }, value) {
		commit(types.PRODUCTINFO, value)
	},
	
	addToCart({ commit }, value) {
		if (value.inventory > 0) {
			commit(types.ADD_TO_CART, value)
		}
	}
}