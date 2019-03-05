<template>
	<div class="kongzhiqian">
		<navbar>
			<i class="iconfont icon-back" slot="left" @click="goBack" id="goback"></i>
			<div id="search" slot="center">
				<div class="logo">JD</div>
				<div class="search-font">
					<i class="iconfont icon-search"></i>
				</div>
				<div class="search-input">
					<input placeholder="请输入需要搜索的内容" type="text" />
				</div>
			</div>
			<i class="iconfont icon-msg" slot="right" id="msg"></i>
		</navbar>
		<car-tab @switch-tab="getCurrentId"></car-tab>
		<car-content :curId="curId"></car-content>
	</div>
</template>

<script>
	import CarTab from './tab.vue'
	import CarContent from './content.vue'
	import navbar from '@/components/navbar'
	export default {
		name: 'category',
		data() {
			return {
				curId: ''
			}
		},
		components: {
			CarTab,
			CarContent,
			navbar,
		},
		methods: {
			goBack() {
				this.$router.go(-1)
			},
			getCurrentId(id) {
				this.curId = id
			}
		}
	};
</script>

<style scoped>
	.kongzhiqian {
		display: flex;
		padding-top: 44px;
	}
	
	/* navbar */
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
	/* 搜索框 */
	#search {
		flex: 1;
		border-radius: 15px;
		height: 30px;
		margin: 7px 10px 0px 10px;
		display: flex;
		background: #f7f7f7;
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
		background: #f7f7f7;
	}
</style>