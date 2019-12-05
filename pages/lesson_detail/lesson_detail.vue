<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="bg-shadeTop text-white">
				<block slot="backText">返回</block>
				<block slot="content"></block>
			</cu-custom>
		</view>
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" style="height: 800upx;">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
		<view class="cu-bar bg-white">
		    <view class="action">
		        <text class="text-black text-xl" style="font-weight: bold;">{{lessonName}}</text>
		    </view>
		</view>
		<view class="cu-bar bg-white">
			<view class="action text-lg">
				<text class="text-price" style="color: #ED1C24; font-size: 48rpx;">{{lessonPrice}}</text>
			</view>
			<view class="action text-lg text-right">
				销量 {{salesNumber}}</view>
		</view>
		
		<view class="cu-bar bg-white tabbar border shop foot">
			<view class="action" open-type="contact">
				<view class="cuIcon-home text-grey">
					<!--view class="cu-tag badge"></view-->
				</view>
				<text class="text-grey">首页</text>
			</view>
			<view class="action text-orange">
				<view class="cuIcon-favorfill"></view> 已收藏
			</view>
			<!--view class="action">
				<view class="cuIcon-cart">
					<view class="cu-tag badge">99</view>
				</view>
				购物车
			</view-->
			<view class="bg-red submit">立即订购</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				// form
				lessonName: '英雄联盟新手训练课程',
				lessonPrice: 299,
				salesNumber: 40
			}
		},
		onLoad(e){
			console.log(e.tid)
		},
		methods: {
			
		}
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}
</style>
