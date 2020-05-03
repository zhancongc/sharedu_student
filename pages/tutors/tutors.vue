<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink">
			<block slot="content">找家教</block>
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
				<input type="text" placeholder="搜索家教线索" confirm-type="search" @input="searchIcon" @confirm="search"></input>
			</view>
		</view>
		<view style="margin-top: 120upx;"></view>
		<view class="cu-bar bg-white margin-top" style="border-bottom: #dfdfdf solid 1upx;">
		    <view class="action">
		        <text class="cuIcon-title"></text>
		        <text class="text-xl text-bold">名师推荐</text>
		    </view>
		</view>
		<view class="cu-card article no-card">
			<view class="cu-item shadow" v-for="(item, index) in tutors" :key="index" style="border-bottom: #dfdfdf solid 1upx;">
				<view class="title" @click="toTutorDetail($event, item.tid)">
					<view class="text-cut">{{item.title}}</view>
				</view>
				<view class="content" @click="toTutorDetail($event, item.tid)">
					<image :src="item.photo" mode="aspectFill"></image>
					<view class="desc">
						<view class="text-title">
							<view class="cu-tag bg-blue light round sm">{{item.degree}}</view>
							<view class="cu-tag bg-orange light round sm">{{item.city}}</view>
							<button class="cu-btn radius sm bg-green" style="float: right;">预约</button>
						</view>
						<view class="text-content margin-top">
							{{item.subject}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--view class="grid col-2 padding-sm">
			<view class="padding-sm" v-for="(item, index) in tutors" :key="index">
				<view class="bg-gradual-red padding radius text-center shadow-blur" 
					@click="toTutorDetail($event, item.tid)">
					<view class="text-lg">{{item.title}}</view>
					<view class="margin-top-sm text-Abc text-sm">{{item.city}}</view>
					<view class="">时薪 {{item.salary}}</view>
				</view>
			</view>
		</view-->
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
					choosed: true,
					url: '/pages/tutors/tutors'
				},{
					title: '我的',
					icon: 'people',
					choosed: false,
					url: '/pages/me/me'
				}],
				CustomBar: this.CustomBar,
				tutors: [
					{
						tid: 't123',
						title: '王老师',
						photo: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						degree: '本科',
						city: '黄埔',
						subject: '高中数学，高中化学，高中物理',
						createDate: '2019-11-27 09:22:00'
					},
					{
						tid: 't234',
						title: '刘老师',
						degree: '硕士',
						photo: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						city: '浦东',
						subject: '初中英语，高中英语',
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
			toTutorDetail(e, tid) {
				console.log(e);
				console.log("tid", tid);
				uni.navigateTo({ url: '/pages/tutorDetail/tutorDetail'})
			},
			searchIcon(e){console.log(e.currentTarget);},
			search(e){
				console.log(e.currentTarget);
			},
		}
	}
</script>

<style>
	.box {
		margin: 20upx 0;
	}

	.box view.cu-bar {
		margin-top: 20upx;
	}
</style>
