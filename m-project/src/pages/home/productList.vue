<template>
	<div class="recommend">
		<h3 class="recommend-title">热卖推荐</h3>
		<ul class="recommend-list">
			<li class="recommend-item" v-for="(item,key) in productList" :key="key" @click="addVuex(key)">
				<router-link :to="{name:'product',params:{id:item.baseinfo.itemId}}" class="recommend-link">
					<p class="recommend-pic">
						<img class="recommend-img" v-lazy="`http:${item.baseinfo.picUrl}`">
					</p>
					<p class="recommend-name">{{item.name.shortName}}</p>
					<p class="recommend-origPrice">
						<del data-v-3e4d0caa>¥{{item.price.origPrice}}</del>
					</p>
					<p class="recommend-info">
						<span class="recommend-price">
							¥
							<strong class="recommend-price-num">{{item.price.actPrice}}</strong>
						</span>
						<span class="recommend-count">{{item.remind.soldCount}}件已售</span>
					</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'productList',
		data() {
			return {
				productList: [],
				page: 1,
				totalPage: 1,
				obj: {}
			}
		},
		created() {
			this.getProductList()
		},
		updated() {
			this.obj = {
				totalPage: this.totalPage,
				page: this.page,
				productList: this.productList
			}
			this.$emit('loaded', this.obj)
		},
		methods: {
			getProductList() {
				this.$jsonp('https://ju.taobao.com/json/tg/ajaxGetItemsV2.json', {
						page: this.page,
						psize: 20,
						type: 0,
						frontCatId: ""
				}).then(res => {
					if (res.code == "200") {
						console.log(this.page);
						this.page++;
						this.totalPage = res.totalPage;
						this.productList = this.productList.concat(res.itemList);
						
						// 把商品列表保存到Vuex中
						this.$store.dispatch('addGoods', this.productList)
					}
				}).catch(err => {
					console.log(err)
				})
			},
// 			getProductList() {
// 				this.$axios.defaults.baseURL = 'http://localhost:8080'
// 				return this.$axios.get('https://ju.taobao.com/json/tg/ajaxGetItemsV2.json', {
// 					params: {
// 						page: this.page,
// 						psize: 20,
// 						type: 0,
// 						frontCatId: ""
// 					}
// 				}).then(res => {
// 					if (res.data.code == "200") {
// 						console.log(this.page);
// 						this.page++;
// 						this.totalPage = res.data.totalPage;
// 						this.productList = this.productList.concat(res.data.itemList);
// 						
// 						// 把商品列表保存到Vuex中
// 						this.$store.dispatch('addGoods', this.productList)
// 					}
// 				}).catch(err => {
// 					console.log(err)
// 				})
// 			},
			addVuex(id) {
				this.$store.dispatch('productInfo', this.goodList[id])
			}
		},
		computed: {
			goodList() {
				return this.$store.state.goodsList;
			}
		}
	}
</script>

<style>
	.recommend-title {
	  position: relative;
	  width: 100%;
	  padding: 10px 0;
	  font-size: 24px;
	  text-align: center;
	}
	.recommend-title:before,
	.recommend-title:after {
	  content: "";
	  position: absolute;
	  top: 50%;
	  width: 40%;
	  height: 1px;
	  background-color: #ddd;
	}
	.recommend-title:before {
	  left: 0;
	}
	.recommend-title:after {
	  right: 0;
	}
	.recommend-list {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  flex-direction: row;
	  flex-wrap: wrap;
	}
	
	.recommend-item {
	  width: 49%; /*分2列*/
	  background-color: #fff;
	  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
	  margin-bottom: 8px;
	}
	
	.recommend-link {
	  display: block;
	}
	.recommend-pic {
	  position: relative;
	  width: 100%;
	  padding-top: 100%;
	  /* 让我的图100% 在父亲的分栏宽的显示*/
	  margin-bottom: 5px;
	}
	
	.recommend-img {
	  position: absolute;
	  top: 0;
	  left: 0;
	  width: 100%; /*图必须是100%*/
	  height: 100%;
	}
	
	.recommend-name {
	  height: 36px;
	  padding: 0 5px;
	  margin-bottom: 8px;
	  line-height: 1.5;
	}
	
	.recommend-origPrice {
	  padding: 0 5px;
	  margin-bottom: 8px;
	  color: #ccc;
	}
	
	.recommend-info {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  flex-direction: row;
	  padding: 0 5px;
	  margin-bottom: 8px;
	}
	
	.recommend-price {
	  color: #e61414;
	}
	
	.recommend-price-num {
	  font-size: 20px;
	}
	
	.recommend-count {
	  color: #999;
	}
</style>
