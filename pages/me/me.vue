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
							<view class="text-grey">{{nickname}}</view>
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
		<view class="cu-list menu card-menu margin-top" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content" @click="jumpTo($event, toBillsUrl)">
					<text class="cuIcon-text text-grey"></text>
					<text class="text-grey">我的订单</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content" @click="jumpTo($event, toTutorAddUrl)">
					<text class="cuIcon-form text-grey"></text>
					<text class="text-grey">注册成为家教</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<button class="content" open-type="contact" style="text-align: left;">
					<text class="cuIcon-service text-grey"></text>
					<text class="text-grey">联系客服</text>
				</button>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content" @click="jumpTo($event, toAboutUrl)">
					<text class="cuIcon-info text-grey"></text>
					<text class="text-grey">关于享淘课</text>
				</view>
			</view>
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
					choosed: false,
					url: '/pages/lessons/lessons'
				},{
					title: '店铺',
					icon: 'shop',
					choosed: false,
					url: '/pages/store/store'
				},{
					title: '我的',
					icon: 'people',
					choosed: true,
					url: '/pages/me/me'
				}],
				avatarUrl : 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
				nickname: '正义天使 凯尔',
				toBillsUrl: '/pages/bills/bills',
				toTutorAddUrl: '/pages/tutor_add/tutor_add',
				toAboutUrl: '/pages/about/about'
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
