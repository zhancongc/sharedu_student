<!--info><info-->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block><block slot="content">家教</block>
		</cu-custom>
    <view v-if="tutorList.length == 0" class="padding-xl" style="margin-top: 460upx; margin-bottom: 460upx;">
		<!-- <view v-if="!storeId" class="padding-xl" :style="'margin-top:' + topBorder + 'px;'"> -->
			<button class="cu-btn block bg-green lg"
				@click="jumpTo($event, '/pages/tutor_add/tutor_add')">
				<!--text class="cuIcon-upload"></text-->
				注册成为家教</button>
		</view>
		<view v-if="tutorList.length>0" class="cu-card case no-card">
			<view class="cu-item" style="justify-content: center; display: flex;">
					<view class="cu-avatar xl round" style="margin: 30upx 0upx" 
							:style="'background-image: url('+ storeIcon +')'"></view>
			</view>
			<view class="cu-item" style="justify-content: center; display: flex;">
					<view class="text-Abc text-black text-center text-xxl" style="margin: 10upx 10upx">
					{{storeName}}</view>
			</view>
			<view class="cu-item">
					<view class="text-content text-grey margin-left margin-right"
							style="font-size: 28upx; line-height: 52upx; margin: 40upx 40upx;">{{storeIntro}}</view>
			</view>
			<view class="cu-bar bg-white margin-top" style="border-bottom: #dfdfdf solid 1upx;">
			    <view class="action">
			        <text class="cuIcon-title"></text>
			        <text class="text-xl text-bold">精品课程</text>
			    </view>
			</view>
			<view class="cu-card article no-card">
			    <view class="cu-item shadow" v-for="(item, index) in lessons" :key="index" style="border-bottom: #dfdfdf solid 1upx;">
			        <view class="title" @click="toLessonDetail($event, item.tid)">
			            <view class="text-cut">{{item.title}}</view>
			        </view>
			        <view class="content" @click="toLessonDetail($event, item.tid)">
			            <image :src="item.image" mode="aspectFill"></image>
			            <view class="desc">
			                <view class="text-title">
			                    <view class="cu-tag bg-orange light sm round">{{item.city}}</view>
			                    <button class="cu-btn radius sm bg-green" style="float: right;">预约</button>
			                </view>
			                <view class="text-content">
			                    <view class="avatar-text">
			                        <text class="text-price" style="color: red">
			                            {{item.price}}</text>
			                    </view>
			                    <view class="avatar-text">课时数{{item.times}}</view>
			                </view>
			            </view>
			        </view>
			    </view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				topBorder: 0,
				tutorList: [
					{
						tutor_id: "",
						icon: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						name: "hero alliance",
						intro: "老火不知老，尚欲骄新秋。金稚力未胜，如儿方唧啾。稍养浩然气，终当凌斗牛。巧夕乞巧者，稚儿辈可羞。老拙眼尚明，却笑群目幽。造物真大巧，容得智力不。巧亦不自各，变化神鬼惊。夏将烘炉铸，至秋成金城。金城包宇宙，万宝藏难明。今夕且对月，酌酒与子盟。仁熟如美种，由我独善耕。金声而玉振，秋乃集大成。",
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
				],
			}
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			})
			this.openId = wx.getStorageSync("openId")
		},
		onShow() {
			var that = this
			const app = getApp()
			if (that.openId) {
				that.getStoreByOpenId()
			} else {
				uni.getSystemInfo({
					success(res){
						let custom = wx.getMenuButtonBoundingClientRect();
						that.topBorder = (res.screenHeight - res.statusBarHeight - custom.bottom - custom.top)/2
						console.log(that.topBorder)
					}
				})
			}
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			getStoreByOpenId(){
				var that = this
				const app = getApp()
				uni.request({
					method: 'POST',
					url: app.globalData.domainUrl + 'store/open_id',
					header: {'content-type': 'application/x-www-form-urlencoded'},
					data: {open_id: that.openId},
					success(res){
						if (res.statusCode == 200){
								let response = res.data
								if (response.state==0){
									that.storeList = response.storeList
								} else { that.storeId=0 }
						} else { that.storeId=0 }
					},
					fail(res){ that.storeId=0 },
					complete(res){}
				})
			},
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
.element-center {
    justify-content: center; display: flex; flex-direction: row; flex-wrap: wrap;
}
</style>
