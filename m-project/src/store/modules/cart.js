import * as types from '../mutation-types.js'

const storage = window.localStorage

const state = {
	added: []
}

const actions = {
	
}

const getters = {
	
}

const mutations = {
	[types.ADD_TO_CART](state, product) {
// 		if (state.added == null) {
// 			state.added = []
// 		}
		let id = product.id
		//  循环遍历购物车是否存在这个玩意
		const record = state.added.find(function (p) {
			if (p.id === id && p.type === id) {
				return true
			} else {
				return false
			}
		})
		
		if (!record) {
			state.added.push(product)
		} else {
			record.quantity += product.quantity
		}
		
		storage.setItem('cart', JSON.stringify(state.added))
	}
}


export default {
	state,
	getters,
	actions,
	mutations
}
