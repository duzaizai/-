<template>
	<div id="nav">
		<slot name="left">左</slot>
		<slot name="center">中</slot>
		<slot name="right">右</slot>
	</div>
</template>

<script>
	export default {
		name: 'navbar'
	}
</script>

<style scoped>
	/* 导航大盒子 */
	#nav {
		width: 100%;
		height: 44px;
		background: rgba(0,0,0,0);
		position: fixed;
		display: flex;
		top: 0px;
		z-index: 10;
		min-width: 320px;
		max-width: 640px;
	}
</style>