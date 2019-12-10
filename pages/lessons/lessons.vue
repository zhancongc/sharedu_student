<!--info>消费者看到的课程列表页<info-->
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
						<view class="cu-tag badge">{{item.info_number}}</view-->
					</view>
					<view :class="item.choosed?'text-green':'text-grey'">{{item.title}}</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="showLocation?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">Modal标题</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					Modal 内容。
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
						<button class="cu-btn bg-green margin-left" @tap="getLocation">确定</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="搜索培训课程" confirm-type="search" @input="searchIcon" @confirm="search"></input>
			</view>
		</view>
		<view style="margin-top: 120upx;"></view>
		<view class="cu-bar bg-white margin-top" style="border-bottom: #dfdfdf solid 1upx;">
		    <view class="action">
		        <text class="cuIcon-title"></text>
		        <text class="text-xl text-bold">课程推荐</text>
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
							<view class="avatar-text">{{item.times}}课时</view>
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
				tabbar: [
				/*{
					title: '首页',
					icon: 'home',
					choosed: false,
					url: '/pages/catalog/catalog'
				},*/{
					title: '找课',
					icon: 'search',
					choosed: true,
					url: '/pages/lessons/lessons'
				},{
					title: '家教',
					icon: 'friend',
					choosed: false,
					url: '/pages/tutors/tutors'
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
				showLocation: false,
			}
		},
		onLoad() {
			// uni.showLoading({title: '加载中...',mask: true});
		},
		onShow(){
			
		},
		onReady() {
			// uni.hideLoading()
			this.getLocation()
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
			},
			showModal(e) {
				this.showLocation = true
			},
			hideModal(e) {
				this.showLocation = false
			},
			getLocation(e){
				var that = this
				uni.getLocation({
					success(res){
						console.log(res.latitude, res.longitude)
						let distance= that.getDistance(res.latitude, res.longitude, 31.217370986938477, 121.45372009277344)
						console.log(distance)
						uni.showToast({
							icon: 'none',
							title: '你离环贸' + (Math.round(distance)/1000).toFixed(2)+ '公里'
						})
					},
					fail(res){console.log(res)},
					complete(res){that.showLocation = false}
				})
			},
			getDistance(latitude1, longitude1, latitude2, longitude2){
				let R = 6371393; 
				let C = this.cos(latitude1)*this.cos(latitude2)*this.cos(longitude1-longitude2) + this.sin(latitude1)*this.sin(latitude2);
				let Distance = R*this.arccos(C);
			    return Distance;
			},
			arccos(i){
			    return Math.acos(i);
			},
			cos(i){
			    return Math.cos(i/180*Math.PI);
			},
			sin(i){
			    return Math.sin(i/180*Math.PI);
			},

		}
	}
</script>

<style>

</style>
