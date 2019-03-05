<template>
	<div>
		<!-- 导航条 -->
		<navbar :class="NavColor ? 'navbar-color' : ''">
			<router-link to="/category" id="category" slot="left">
				<i class="iconfont icon-category"></i>
			</router-link>
			<div id="search" slot="center">
				<div class="logo">JD</div>
				<div class="search-font">
					<i class="iconfont icon-search"></i>
				</div>
				<div class="search-input">
					<input placeholder="请输入需要搜索的内容" type="text" />
				</div>
			</div>
			<router-link to="/login" id="login" slot="right">
				登录
			</router-link>
		</navbar>
		<myscroll :style="{'height':FHeight}"  
							class="warpper" 
							:pullup="pullup" 
							:listenScroll="isScroll"  
							@scroll="_scroll"  
							@pullup="_pullup" 
							ref="scroll">
			<div class="content">
				
				<!-- 轮播图 -->
				<swiper :options='swiper0ption'>
					<swiper-slide v-for='(val,key) in chart' :key='key'>
						<a :href="val.imgUrl">
							<img :src="val.imgName" alt="">
						</a>
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
				<!-- 广告01 -->
				<div class="banner01">
					<img src="./images/banner01.jpg" width="100%" alt="">
				</div>
				<!-- 列表01 -->
				<div class="box-list">
					<div v-for="(item,key) in box_list" :key="key">
						<img :src="item.listImg" />
						<p>{{ item.listName }}</p>
					</div>
				</div>
				<!-- 京东快报 -->
				<div class="JD-paper">
					
					<swiper :options='swiper0ption_papers'>
					 
					</swiper>
					
				</div>
				<!-- 红包 -->
				<div class="hongbao">
					<div class="hongbao-1">
						<a href="#"><img src="./images/hongbao01.jpg" /></a>
					</div>
					<div class="hongbao-2">
						<div>
							<a href="#"><img src="./images/hongbao02.jpg" /></a>
						</div>
						<div>
							<a href="#"><img src="./images/hongbao03.jpg" /></a>
						</div>
					</div>
				</div>
				<!-- 商品列表 -->
				<productlist @loaded="getProductData" ref="productList"></productlist>
			</div>
		</myscroll>
		<backtop @backtop="backtop" :visible="isBacktopVisible"></backtop>
	</div>
</template>

<script>
	
	import navbar from '@/components/navbar' // 引动导航组件
	import productlist from './productList.vue' // 引用商品列表组件
	import {swiper,swiperSlide} from 'vue-awesome-swiper' // 引用swiper组件
	import myscroll from '@/components/scroll'
	import backtop from '@/components/backtop'
	export default {
		name: 'home',
		components: {
			navbar,
			swiper,
			swiperSlide,
			productlist,
			myscroll,
			backtop
		},
		methods: {
			getProductData(obj) {
				this.$refs.scroll && this.$refs.scroll.refresh()
				this.productData = obj.productlist,
				this.page = obj.page,
				this.totalPage = obj.totalPage
			},
			_pullup() {
				if (this.page > this.totalPage) {
					console.log('到底了')
					this.pullup = false
					return false
				}
				this.$refs.productList.getProductList()
			},
			backtop() {
				this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0);
			},
			_scroll(pos) {
				this.isBacktopVisible = pos.y < -10 && -pos.y > 200;
				this.NavColor = pos.y < -10 && -pos.y > 200;
			}
		},
		data() {
			return {
				FHeight: document.documentElement.clientHeight - 50 + 'px',
				productData: [],
				page: 1,
				totalPage: 0,
				pulldown: true,
				pullup: true,
				isScroll: true,
				isBacktopVisible: false,
				NavColor:false,
				swiper0ption: { // 配置swiper轮播
					direction: 'horizontal',
					loop: true,
					pagination: {
						el: '.swiper-pagination'
					},
					autoplay: {
						delay: 1000,
						disableOnInteraction: false
					}
				},
				swiper0ption_papers: { // 方块转动
					direction: 'vertical',
					pagination: '.swiper-pagination',
					loop:true,
					autoplayDisableOnInteraction:false,
					effect: 'cube',
					grabCursor: true,
					cube: {
						shadow: true,
						slideShadows: true,
						shadowOffset: 20,
						shadowScale: 0.94
					},
					autoplay: {
						delay: 1000,
						disableOnInteraction: false
					}
				},
				chart: [ // 轮播图假数据
					{imgUrl: 'http://www.baidu.com', imgName: require('./images/chart01.jpg')},
					{imgUrl: 'http://www.baidu.com', imgName: require('./images/chart02.jpg')},
					{imgUrl: 'http://www.baidu.com', imgName: require('./images/chart03.jpg')},
					{imgUrl: 'http://www.baidu.com', imgName: require('./images/chart04.jpg')},
					{imgUrl: 'http://www.baidu.com', imgName: require('./images/chart05.jpg')},
					{imgUrl: 'http://www.baidu.com', imgName: require('./images/chart06.jpg')},
					{imgUrl: 'http://www.baidu.com', imgName: require('./images/chart07.jpg')},
					{imgUrl: 'http://www.baidu.com', imgName: require('./images/chart08.jpg')},
				],
				box_list: [
					{listImg: require('./images/list01.png'), listName: '京东超市'},
					{listImg: require('./images/list02.png'), listName: '海囤全球'},
					{listImg: require('./images/list03.png'), listName: '京东服饰'},
					{listImg: require('./images/list04.png'), listName: '京东生鲜'},
					{listImg: require('./images/list05.png'), listName: '京东到家'},
					{listImg: require('./images/list06.png'), listName: '充值缴费'},
					{listImg: require('./images/list07.png'), listName: '9.9元拼'},
					{listImg: require('./images/list08.png'), listName: '领劵'},
					{listImg: require('./images/list09.png'), listName: '赚钱'},
					{listImg: require('./images/list10.png'), listName: '全部'}
				]
			}
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
	
	#category,
	#login,
	#search {
		cursor: pointer;
	}

	/* 导航左右按钮的长高 */
	#category,
	#login {
		width: 40px;
		height: 100%;
		line-height: 40px;
		text-align: center;
		color: white;
		font-weight: 500;
		box-sizing: border-box;
		padding-right: 8px;
	}

	#category {
		padding: 3px 0px 0px 9px;
	}

	#category .iconfont {
		font-size: 28px;
	}

	/* 搜索框 */
	#search {
		flex: 1;
		background: white;
		border-radius: 15px;
		height: 30px;
		margin: 7px 10px 0px 10px;
		display: flex;
	}

	.logo,
	.search-font {
		width: 15px;
		height: 15px;
		margin-top: 7px;
		margin-left: 15px;
	}

	.logo {
		color: #E43130;
		font-weight: bold;
	}

	.search-font {
		margin-right: 10px;
	}

	.search-input {
		flex: 1;
		height: 30px;
	}

	.search-input input {
		width: 100%;
		height: 30px;
		line-height: 30px;
		border-radius: 0px 15px 15px 0px;
	}
	
	/* 轮播图 */
	.swiper-container {
		width: 100%;
	}
	.swiper-container img {
		width: 100%;
	}
	.swiper-pagination {
		bottom: 20px;
	}
	
	/* 广告01 */
	.banner01 {
		position: relative;
		z-index: 10;
		background: white;
		border-radius: 15px;
		padding: 8px;
		margin-top: -15px;
		box-sizing: border-box;
		width: 100%;
	}
	
	/* 列表01 */
	.box-list {
		width: 100%;
		overflow: hidden;
		background: white;
	}
	.box-list>div {
		float: left;
		width: 20%;
		text-align: center;
		margin-bottom: 10px;
	}
	.box-list>div img {
		width: 50%;
		margin-bottom: 10px;
	}
	
	/* 京东广告 */
	
	/* 红包 */
	.hongbao {
		width: 100%;
		display: flex;
	}
	.hongbao-1,.hongbao-2 {
		flex: 1;
		float: left;
	}
	.hongbao-2 div {
		float: left;
		width: 50%;
	}
	.hongbao img {
		width: 100%;
	}
	
	/* 滚动条滚动变色 */
	.navbar-color {
		background: orangered !important;
	}
</style>
