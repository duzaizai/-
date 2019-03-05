<template>
  <div class="g-container" id="app">
    <div class="g-view-container">
      <router-view></router-view>
    </div>
    <div class="g-footer-container">
      <tabbar></tabbar>
    </div>
  </div>
</template>

<script>
	import tabbar from '@/components/tabbar'
	export default {
		name: 'App',
		components: {
			tabbar
		},
		created() {
			if (JSON.parse(window.localStorage.getItem('cart')) != null) {
				this.$store.state.cart.added = JSON.parse(window.localStorage.getItem('cart'))
			}
		}
	}
</script>

<style>
</style>
