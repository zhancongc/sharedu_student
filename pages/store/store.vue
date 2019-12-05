<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block><block slot="content">店铺</block>
		</cu-custom>
        <view class="padding-xl" style="margin-top: 400rpx; margin-bottom: 400rpx;">
            <!--button class="cu-btn block line-orange lg">
                <text class="cuIcon-upload"></text> 图标</button>
            <button class="cu-btn block bg-blue margin-tb-sm lg">
                <text class="cuIcon-loading2 cuIconfont-spin"></text> 加载</button-->
			<button class="cu-btn block bg-green lg" @click="jumpTo($event, '/pages/store_create/store_create')">
				<!--text class="cuIcon-upload"></text-->
			创建店铺</button>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			jumpTo(e, url){
				uni.navigateTo({
					url: url
				})
			},
			switchTo(e, url) {
				uni.redirectTo({
					url: url
				})
			},
		}
	}
</script>

<style>

</style>
