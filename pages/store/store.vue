<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink">
			<block slot="content">店铺</block>
		</cu-custom>
		<view class="box">
			<view class="cu-bar tabbar bg-white foot shadow">
				<view class="action" v-for="(item, index) in tabbar" :key="index" 
					@click="switchTo($event, item.url)">
					<view class="cuIcon-cu-image" :class="item.choosed?'text-green':'text-grey'">
						<text class="lg" :class="'cuIcon-' + item.icon" ></text>
						<!--image :src="item.icon"></image>
						<!--view class="cu-tag badge">{{item.info_number}}</view-->
					</view>
					<view :class="item.choosed?'text-green':'text-grey'">{{item.title}}</view>
				</view>
			</view>
		</view>
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
				tabbar: [{
					title: '首页',
					icon: 'home',
					choosed: false,
					url: '/pages/catalog/catalog'
				},{
					title: '课程',
					icon: 'search',
					choosed: false,
					url: '/pages/lessons/lessons'
				},{
					title: '店铺',
					icon: 'shop',
					choosed: true,
					url: '/pages/store/store'
				},{
					title: '我的',
					icon: 'people',
					choosed: false,
					url: '/pages/me/me'
				}],
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
