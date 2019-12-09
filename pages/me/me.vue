<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink">
			<block slot="content">我的</block>
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
		<view class="cu-card case" :class="isCard?'no-card':''">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="'background-image:url('+avatarUrl+')'" ></view>
						<!--view class="cu-avatar round lg">
							<image :src="avatar" class="round" style="width: 100%; height: 100%;"></image>
						</view-->
						<view class="content flex-sub">
							<view class="text-black">{{nickname}}</view>
							<!--view class="text-gray text-sm flex justify-between">
								十天前
								<view class="text-gray text-sm">
									<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
									<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
									<text class="cuIcon-messagefill margin-lr-xs"></text> 30
								</view>
							</view-->
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu card-menu sm-border">
			<view class="cu-item">
				<view class="content" @click="jumpTo($event, toTutorAddUrl)">
					<text class="cuIcon-friendadd text-black"></text>
					<text class="text-black">注册成为家教</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content" @click="jumpTo($event, toStoreUrl)">
					<text class="cuIcon-shop text-black"></text>
					<text class="text-black">我的店铺</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content" @click="jumpTo($event, toLessonAddUrl)">
					<text class="cuIcon-goods text-black"></text>
					<text class="text-black">添加课程</text>
				</view>
			</view>
		</view>
		<view class="cu-list menu card-menu margin-top sm-border">
			<view class="cu-item">
				<view class="content" @click="jumpTo($event, toBillsUrl)">
					<text class="cuIcon-text text-black"></text>
					<text class="text-black">我的订单</text>
				</view>
			</view>
			<view class="cu-item">
				<button class="content" open-type="contact" style="text-align: left;">
					<text class="cuIcon-service text-black"></text>
					<text class="text-black">联系客服</text>
				</button>
			</view>
			<view class="cu-item">
				<view class="content" @click="jumpTo($event, toIndexUrl)">
					<text class="cuIcon-info text-black"></text>
					<text class="text-black">关于享淘课</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabbar: [
				/*{
					title: '首页',
					icon: 'home',
					choosed: false,
					url: '/pages/catalog/catalog'
				},*/{
					title: '找课',
					icon: 'search',
					choosed: false,
					url: '/pages/lessons/lessons'
				},{
					title: '家教',
					icon: 'friend',
					choosed: false,
					url: '/pages/tutors/tutors'
				},{
					title: '我的',
					icon: 'people',
					choosed: true,
					url: '/pages/me/me'
				}],
				avatarUrl : 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
				nickname: '正义天使 凯尔',
				toBillsUrl: '/pages/bills/bills',
				toLessonAddUrl: '/pages/lesson_add/lesson_add',
				//toTutorWantedUrl: '/pages/tutor_wanted/tutor_wanted',
				toTutorAddUrl: '/pages/tutor_add/tutor_add',
				toStoreUrl: '/pages/store/store',
				toAboutUrl: '/pages/about/about',
				toIndexUrl: '/pages/index/index',
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
