<template>
	<div class="g-tabbar">
	  <router-link to="/home" class="item">
	    <i class="iconfont icon-home"></i>
	    <span>首页</span>
	  </router-link>
	  <router-link to="/category" class="item">
	    <i class="iconfont icon-category"></i>
	    <span>分类</span>
	  </router-link>
	  <router-link to="/cart" class="item">
	    <i class="iconfont icon-cart"></i>
	    <span>购物车</span>
	  </router-link>
	  <router-link to="/personal" class="item">
	    <i class="iconfont icon-personal"></i>
	    <span>我的</span>
	  </router-link>
	</div>
</template>

<script>
	export default {
		name: 'tabbar'
	}
</script>

<style scoped>
</style>
