<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink">
			<block slot="content">课程</block>
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
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="搜索培训课程" confirm-type="search" @input="searchIcon" @confirm="search"></input>
			</view>
		</view>
		<view class="cu-card article" :class="isCard?'no-card':''" style="margin-top: 94rpx;">
			<view class="cu-item shadow" v-for="(item, index) in lessons" :key="index">
				<view class="title" @click="toLessonDetail($event, item.tid)"><view class="text-cut">{{item.title}}</view></view>
				<view class="content" @click="toLessonDetail($event, item.tid)">
					<image :src="item.image" mode="aspectFill"></image>
					<view class="desc">
						<view class="avatar-text">价格{{item.price}}元</view>
						<view class="avatar-text">课时{{item.times}}</view>
						<view>
							<view class="cu-tag bg-red light sm round">{{item.city}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="text-grey" v-if="lessons.length > 3"
			style="text-align: center;font-size: 24rpx; margin: 0; width: 100%; height: 140rpx;">
			我是有底线的
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
					title: '找课',
					icon: 'search',
					choosed: true,
					url: '/pages/lessons/lessons'
				},{
					title: '店铺',
					icon: 'shop',
					choosed: false,
					url: '/pages/store/store'
				},{
					title: '我的',
					icon: 'people',
					choosed: false,
					url: '/pages/me/me'
				}],
				CustomBar: this.CustomBar,
				lessons: [
					{
						tid: 't123',
						title: '高三数学冲刺课',
						image: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						city: '徐汇',
						price: '899',
						times: 4,
						createDate: '2019-11-27 09:22:00'
					},
					{
						tid: 't234',
						title: '高二化学试听课',
						image: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						city: '静安',
						price: '599',
						times: 3,
						createDate: '2019-11-28 08:22:00'
					},
					{
						tid: 't234',
						title: '高三英语冲刺课',
						image: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						city: '静安',
						price: '599',
						times: 3,
						createDate: '2019-11-28 08:22:00'
					},
				],
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
			toLessonDetail(e, tid){
				uni.navigateTo({
					url: '/pages/lesson_detail/lesson_detail?tid='+tid
				})
			}
		}
	}
</script>

<style>

</style>
