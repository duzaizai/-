<template>
	<div>
		<navbar>
			<i class="iconfont icon-back" slot="left" @click="goBack" id="goback"></i>
			<div class="product-header" slot="center">
				<ul>
					<li class="navbar-active-red">商品</li>
					<li>评价</li>
					<li>详情</li>
					<li>推荐</li>
				</ul>
			</div>
			<i class="iconfont icon-msg" slot="right" id="msg"></i>
		</navbar>
		<myscroll :style="{'height': FHeight}" class="warpper">
			<div class="content">
				<!-- 展示图 -->
				<div class="big-img">
					<img :src="`http:${this.product.baseinfo.picUrl}`" />
				</div>
				<!-- 广告01 -->
				<div class="banner01">
					<img src="./images/banner01.jpg" />
				</div>
				<!-- 价格 -->
				<div class="price">
					<div class="left">
						<div>
							￥<span>1019</span>.<span>00</span>
						</div>
						<div>
							<div><del>￥1019</del></div>
							<div style="box-sizing: border-box; border: 1px solid #fff;">
								<div class="images">
									<img src="./images/miaosha.png" alt="">
								</div>
								京东秒杀
							</div>
						</div>
					</div>
					<div class="right">
						<div>距离秒杀结束还有</div>
						<div>
							
						</div>
					</div>
				</div>
			</div>
		</myscroll>
		<!-- tabber -->
		<div class="buy-area">
			<div class="buy-area-one">
				<router-link to="/kefu" class="">
				  <i class="iconfont icon-category"></i>
				  <span>联系客服</span>
				</router-link>
				<router-link to="/jindian" class="">
				  <i class="iconfont icon-personal"></i>
				  <span>进店</span>
				</router-link>
				<router-link to="/cart">
				  <i class="iconfont icon-cart cartcart"><div v-show="cartcart">{{ carnum }}</div></i>
				  <span>购物车</span>
				</router-link>
			</div>
			<div @click="addToCart">加入购物车</div>
			<div>立即购买</div>
		</div>
	</div>
</template>

<script>
	import navbar from '@/components/navbar'
	import myscroll from '@/components/scroll'
	export default {
		name: 'product',
		data() {
			return {
				buyNum: 1,
				FHeight: document.documentElement.clientHeight - 50 + 'px',
				cartcart: false,
				carnum: 0
			}
		},
		components: {
			navbar,
			myscroll
		},
		methods: {
			goBack() {
				this.$router.go(-1)
			},
			addToCart() {
				let productInfo = {
					id: this.$route.params.id,
					img: this.product.baseinfo.picUrl,
					title: this.product.name.shortName,
					type: this.$route.params.id, //类型：如果是同一个商品增加数量,不是同一个商品添加到购物车
					quantity: this.buyNum, // 商品数量
					price: this.product.price.actPrice,
					inventory: this.product.baseinfo.stock ,// stock 库存
					shopTitle: this.product.extend.shopTitle,
					xuanze: false
				}
				this.$store.dispatch('addToCart', productInfo)
				this.CartCart()
				this.CarNum()
			},
			CartCart() {
				if (this.$store.state.cart.added.length == 0) {
					this.cartcart = false
				} else {
					this.cartcart = true
				}
			},
			CarNum() {
				let num = 0
				for (let i = 0; i < this.$store.state.cart.added.length; i++) {
					num += this.$store.state.cart.added[i].quantity
				}
// 				if (num > 99) {
// 					alert('购物车最多99件商品')
// 					num = 99
// 				}
				this.carnum = num
				num = 0
			}
		},
		computed: {
			product() {
				return this.$store.state.productInfo
			}
		},
		created() {
			this.CartCart()
			this.CarNum()
		}
	}
</script>

<style scoped>
	/*滚动条*/
	.warpper {
	  width: 100%;
	  overflow: hidden;
	}
	.content {
	  height: auto;
	}
	
	.navbar-active-red {
		color: red;
	}
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
	}
	.product-header ul{
		width: 100%;
		height: 100%;
		line-height: 42px;
		display: flex;
	}
	.product-header ul li {
		flex: 1;
	}
	
	/* 展示图 和 广告01 */
	.big-img {
		padding-top: 44px;
	}
	.big-img,.big-img img,.banner01,.banner01 img {
		width: 100%;
	}
	
	/* price */
	.price {
		margin-top: 5px;
		width: 100%;
		height: 50px;
		display: flex;
	}
	.price .left {
		flex: 1;
		background: linear-gradient(90deg,#ff7f4e,#ff3131);
		height: 50px;
	}
	.price .left>div {
		float: left;
		color: #fff;
		margin-left: 10px;
		margin-top: 12px;
	}
	.price .left>div:nth-of-type(2) {
		margin-top: 10px;
		font-size: 14px;
	}
	.price .left>div:nth-of-type(1) span:nth-of-type(1) {
		font-size: 26px;
		font-weight: bold;
	}
	.images {
		display: inline-block;
		height: 14px;
		width: 14px;
		background: #fff;
	}
	.images img {
		width: 100%;
	}
	.price .right {
		height: 50px;
		width: 116px;
		background: #efefef;
		display: flex;
	}
	.price .right>div:first-child {
		width: 100%;
		text-align: center;
		font-size: 12px;
		height: 18px;
		line-height: 18px;
		margin-top: 4px;
	}
	
	
	/* tabbar */
	.buy-area {
		width: 100%;
		display: flex;
		position: fixed;
		min-width: 320px;
		max-width: 640px;
		bottom: 0px;
		z-index: 100;
		background: #fff;
		/* background: linear-gradient(90deg,#ff7f4e,#ff3131); */
	}
	.buy-area>div {
		flex: 2;
		text-align: center;
		line-height: 50px;
		color: #fff;
		font-size: 14px;
	}
	.buy-area-one {
		flex: 3 !important;
		display: flex;
	}
	.buy-area-one>a {
		display: flex;
		flex: 1;
		flex-direction: column;
	}
	.buy-area-one>a i {
		font-size: 22px;
		height: 30px;
		line-height: 30px;
	}
	.buy-area-one>a span {
		font-size: 8px;
		height: 15px;
		line-height: 15px;
	}
	.buy-area>div:nth-of-type(2) {
		background: #ff9600;
	}
	.buy-area>div:nth-of-type(3) {
		background: #e4393c;
	}
	.cartcart {
		position: relative;
	}
	.cartcart>div {
		position: absolute;
		width: 15px;
		height: 15px;
		border-radius: 10px;
		background: orangered;
		top: 1px;
		left: 50%;
		margin-left: 5px;
		font-size: 5px;
		color: #fff;
		line-height: 15px;
	}
</style>
