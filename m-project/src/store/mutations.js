import * as types from './mutation-types.js'

export default {
	//添加全部商品
	[types.ADDGOODS](state, value) {
		state.goodsList = value
	},
	[types.PRODUCTINFO](state, value) {
	  state.productInfo = value
	}
}