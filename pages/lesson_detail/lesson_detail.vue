<!--info>消费者看到的课程详情页<info-->
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
			<view class="action text-lg text-center">
				<text class="text-grey">{{lessonTimes}}课时</text>
			</view>
			<view class="action text-lg text-right">
				<text class="text-grey">销量 {{salesNumber}}</text>
			</view>
		</view>
        <view class="cu-list menu-avatar margin-top">
            <view class="cu-item" @click="toStoreDetail($event, storeId)">
                <view class="cu-avatar round lg" :style="'background-image:url('+ storeIcon +');'"></view>
                <view class="content flex-sub">
                    <view class="text-bold text-black">{{storeName}}</view>
                    <view class="text-gray text-sm flex justify-between">
                        <!--text>十天前</text-->
                        <view class="text-gray text-sm text-right">
                            <text class="cuIcon-goods margin-lr-xs"></text>{{goodsNum}}课程
                        </view>
                    </view>
                </view>
            </view>
        </view>
		<scroll-view scroll-x class="bg-white nav text-center margin-top">
			<view class="cu-item" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in lessonNav" :key="index" @tap="tabSelect" :data-id="index">
				{{item}}
			</view>
		</scroll-view>
		<view v-if="TabCur==0" class="cu-card no-card">
			<view class="cu-item shadow">
				<view class="text-content text-df margin-left margin-right margin-top" style="color: #333333;">
				{{lessonIntro}}</view>
			</view>
		</view>
		<view v-if="TabCur==1" class="cu-card no-card">
			<view class="cu-item shadow">
				<view class="text-content text-df margin-left margin-right margin-top" style="color: #9000FF;">
				{{lessonIntro}}</view>
			</view>
		</view>
		<view style="height: 130upx;"></view>
		<view class="cu-bar bg-white tabbar border shop foot">
			<view class="action" open-type="contact">
				<view class="cuIcon-service text-green">
					<!--view class="cu-tag badge"></view-->
				</view>
				<text class="text-greeny">客服</text>
			</view>
			<view class="action" :class="isFavor?'text-orange':'text-grey'" @click="favorite">
				<view :class="isFavor?'cuIcon-favorfill':'cuIcon-favor'"></view>
				{{isFavor?'已收藏':'收藏'}}
			</view>
			<!--view class="action">
				<view class="cuIcon-cart">
					<view class="cu-tag badge">99</view>
				</view>
				购物车
			</view-->
			<view class="bg-red submit" @click="bookLesson">立即预约</view>
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
				TabCur: 0,
				scrollLeft: 0,
				lessonNav: ['简介', '评价'],
                // 店铺
                storeId: "a123",
                storeIcon: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
                storeName: '英雄联盟学院',
                goodsNum: 20,
                storePhone: "114",
				// 收藏
				isFavor: false,
				// form
				lessonName: '英雄联盟新手训练课程',
				lessonPrice: 299,
				lessonTimes: 3,
				salesNumber: 40,
				lessonIntro: '锦城丝管日纷纷，半入江风半入云。\n此曲只应天上有，人间哪得几回闻。\n回乐烽前沙似雪，受降城外月如霜。\n不知何处吹芦管，一夜征人尽望乡。',
			}
		},
		onLoad(e){
			console.log(e.tid)
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			favorite(e){
				this.isFavor = !this.isFavor
			},
            toStoreDetail(e, store_id){
                console.log(e)
            	uni.navigateTo({
            		url: '/pages/store_detail/store_detail?store_id='+store_id
            	})
            },
            bookLesson(){
                console.log(this.storePhone)
                let that = this
                wx.makePhoneCall({
                  phoneNumber: that.storePhone ,//仅为示例，并非真实的电话号码
                  success() {
                      console.log("success")
                  },
                  fail(){console.log("fail")}
                })
            }
		}
	}
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}
</style>
