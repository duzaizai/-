<template>
	<div>
		<navbar>
			<i class="iconfont icon-back" slot="left" @click="goBack" id="goback"></i>
			<div class="product-header" slot="center">
				购物车
			</div>
			<i class="iconfont icon-msg" slot="right" id="msg"></i>
		</navbar>
		<myscroll :style="{'height': FHeight}" class="warpper" >
			<div class="content">
				<ul v-for="(item,index) in shopName" :key="index" ref="ShopName">
					<div class="shoptitle">
					<input type="checkbox" value="" :checked="shangpinXuanze" @click="shangpinkuangkuang(index,item)"/>
					{{ item }}
					</div>
					<li class="item-li" v-for="(items, key) in StorageList" :key="key" v-if="item == items.shopTitle">
						<div class="item-li-img">
							<input type="checkbox" :checked="items.xuanze" @click="items.xuanze = !items.xuanze, qianqianqian(), shangpinkuang(), shangpinxuanze(items.shopTitle, index)" />
							<div>
								<img :src="`http:${items.img}`" />
							</div>
						</div>
						<div class="item-li-price">
							<div>${{ items.price }}</div>
						</div>
						<div class="item-li-num">
							<div>
								<div @click="jian(key)">-</div>
								<div>
									<input type="text" :value="items.quantity">
								</div>
								<div @click="jia(key)">+</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</myscroll>
		<div class="jiesuan">
			<div>全选 <input class="list-quanxuan" type="checkbox" :checked="quanxuan" @click="quantitle()"></div>
			<div @click="Delete()">删除商品</div>
			<span>总计￥{{ zongqian }}元</span>
			<div>结算</div>
		</div>
	</div>
</template>

<script>
	import myscroll from '@/components/scroll'
	import navbar from '@/components/navbar'
	
	export default {
		name: 'cart',
		data() {
			return {
				StorageList: [],
				shopName: [],
				FHeight: document.documentElement.clientHeight - 40 - 50 + 'px',
				quanxuan: true,
				zongqian: 0,
				shangpinXuanze: true
			}
		},
		created() {
			this.GoStorage(),
			this.qianqianqian(),
			this.quantitle()
		},
		mounted() {
			this.SPKuang()
		},
		methods: {
			GoStorage() {
				this.StorageList = JSON.parse(localStorage.getItem('cart'))
				if (this.StorageList == null) {
					this.StorageList = []
				}
				// 判断有几个店铺并加入到数组中

				for (let i = 0; i < this.StorageList.length; i++) {
					if (this.shopName.length == 0) {
						this.shopName.push(this.StorageList[i].shopTitle)
					} else {
						for (let j = 0; j < this.shopName.length; j++) {
							if (this.StorageList[i].shopTitle == this.shopName[j]) {
								break
							}
							else if (j == this.shopName.length - 1) {
								this.shopName.push(this.StorageList[i].shopTitle)
							}
						}
					}
				}
			},
			goBack() {
				this.$router.go(-1)
			},
			quantitle() { // 判断是否全选
				this.quanxuan = !this.quanxuan
				for (let i = 0; i < this.StorageList.length; i++) {
					if (this.quanxuan == true) {
						this.StorageList[i].xuanze = true
						this.shangpinXuanze = true
					} else {
						this.StorageList[i].xuanze = false
						this.shangpinXuanze = false
					}
				}
				window.localStorage.setItem('cart',JSON.stringify(this.StorageList))
				this.qianqianqian()
			},
			duzaizai() {
				let num = 0;
				for (let i = 0; i < this.StorageList.length; i++) {
					if (this.StorageList[i].xuanze = true) {
						num++
					}
				}
				if (num == this.StorageList.length) {
					this.quanxuan = true
				}
			},
			qianqianqian() {
				this.zongqian = 0
				for (let i = 0; i < this.StorageList.length; i++) {
					if (this.StorageList[i].xuanze == true) {
						this.zongqian += Number(this.StorageList[i].price) * this.StorageList[i].quantity
					}
				}
			},
			jia(key) {
				this.StorageList[key].quantity++
				if (this.StorageList[key].quantity > this.StorageList[key].inventory) {
					this.StorageList[key].quantity = this.StorageList[key].inventory
				}
				window.localStorage.setItem('cart',JSON.stringify(this.StorageList))
				this.$store.state.cart.added = this.StorageList
				this.qianqianqian()
			},
			jian(key) {
				this.StorageList[key].quantity--
				if (this.StorageList[key].quantity < 0) {
					this.StorageList[key].quantity = 0
				}
				window.localStorage.setItem('cart',JSON.stringify(this.StorageList))
				this.$store.state.cart.added = this.StorageList
				this.qianqianqian()
			},
			shangpinkuang() {
				let num = 0;
				for (let i = 0; i < this.StorageList.length; i++) {
					if (this.StorageList[i].xuanze == true) {
						num++
					}
				}
				if (num != this.StorageList.length) {
					this.quanxuan = false
				} else {
					this.quanxuan = true
				}
			},
			shangpinxuanze(name, index) {
				let num = 0
				let nameNum = 0
				for (let i = 0; i < this.StorageList.length; i++) {
					if (this.StorageList[i].shopTitle == name) {
						nameNum++
					}
					if (this.StorageList[i].shopTitle == name && this.StorageList[i].xuanze == true) {
						num++
					}
				}
				if (nameNum == num) {
					this.$refs.ShopName[index].firstElementChild.children[0].checked = true
					console.log(this.$refs.ShopName[index].firstElementChild.children)
				} else {
					this.$refs.ShopName[index].firstElementChild.children[0].checked = false
				}
			},
			shangpinkuangkuang(index, name) {
				let Checked = !this.$refs.ShopName[index].firstElementChild.children[0].checked
				let num = 0
				Checked = !Checked
				for (let i = 0; i < this.StorageList.length; i++) {
					if (this.StorageList[i].shopTitle == name && Checked == true) {
						this.StorageList[i].xuanze = true
					} else if (this.StorageList[i].shopTitle == name && Checked == false) {
						this.StorageList[i].xuanze = false
					}
				}
			},
			SPKuang() {
				let list = []
				let num = 0
				for (let i = 0; i < this.shopName.length; i++) {
					for (let j = 0; j < this.StorageList.length; j++) {
						if (this.shopName[i] == this.StorageList[j].shopTitle) {
							list.push(this.StorageList[j])
							if (this.StorageList[j].xuanze == true) {
								num++
							}
						}
					}
					if (list.length == num) {
						this.$refs.ShopName[i].firstElementChild.children[0].checked = true
						list = []
						num = 0
					} else {
						this.$refs.ShopName[i].firstElementChild.children[0].checked = false
						list = []
						num = 0
					}
				}
			},
			Delete() {
				for (let i = this.StorageList.length - 1; i >= 0; i--) {
					if (this.StorageList[i].xuanze == true) {
						this.StorageList.splice(this.StorageList.indexOf(this.StorageList[i]),1)
					}
				}
				window.localStorage.setItem('cart',JSON.stringify(this.StorageList))
				this.shopName = []
				this.GoStorage()
				this.$store.state.cart.added = this.StorageList
				this.qianqianqian()
			}
		},
		components: {
			myscroll,
			navbar
		},
		computed: {
			
		}
	};
</script>

<style scoped>
	
	/*滚动条*/
	.warpper {
	  width: 100%;
	  overflow: hidden;
	  margin-top: 44px;
	}
	.content {
	  height: auto;
	}
	
	/* navbar */
	#nav {
		background: white !important;
		border-bottom: 1px solid #ccc;
	}
	#goback,#msg,.product-header {
		cursor: pointer;
	}
	#goback,#msg {
		width: 40px;
		height: 100%;
		line-height: 44px;
		text-align: center;
		font-weight: 500;
		box-sizing: border-box;
		padding-right: 8px;
		font-size: 20px;
	}
	.product-header {
		flex: 1;
		text-align: center;
		padding: 0px 10px;
		line-height: 42px;
	}
	
	/* 购物车商品 */
	.shoptitle {
		width: 100%;
		height: 44px;
		line-height: 44px;
		background: #CCCCCC;
		padding: 0px 5px;
		box-sizing: border-box;
		font-weight: bold;
		color: coral;
	}
	.item-li {
		width: 100%;
		display: flex;
		margin-top: 10px;
		padding: 10px;
		background: white;
	}
	.item-li-img,.item-li-num,.item-li-price  {
		flex: 1;
		display: flex;
		height: auto;
		/* justify-content: center; */
		align-items: center;
	}
	.item-li-img>div {
		flex: 1;
		padding: 5px;
	}
	.item-li-img>div img {
		width: 100%;
	}
	.item-li-img>input {
		width: 15px;
		height: 15px;
	}
	.item-li-price,.item-li-num {
		justify-content: center;
	}
	.item-li-num>div {
		height: 25px;
		border: 1px solid #ccc;
	}
	.item-li-num>div div {
		width: 25px;
		height: 25px;
		display: inline-block;
		text-align: center;
	}
	.item-li-num>div div input {
		width: 100%;
		height: 23px;
		text-align: center;
	}
	/* 结算 */
	.jiesuan {
		width: 100%;
		height: 40px;
		position: fixed;
		display: flex;
		bottom: 50px;
		z-index: 10;
		background: coral;
		align-content: center;
		color: white;
		max-width: 640px;
	}
	.jiesuan * {
		flex: 2;
		line-height: 40px;
	}
	.jiesuan>span {
		flex: 3;
	}
	.jiesuan>div:first-child {
		text-align: center;
	}
	.jiesuan>div:last-child {
		flex: 1;
		text-align: center;
	}
	.list-quanxuan {
		position: relative;
		top: 1px;
	}
</style>