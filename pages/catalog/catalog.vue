<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink">
			<block slot="content">页面目录</block>
		</cu-custom>
		<view>
			
		</view>
		<view class="grid col-2 padding-sm">
			<view class="padding-sm" v-for="(item, index) in catalog" :key="index">
				<view class="bg-gradual-red padding radius text-center shadow-blur" 
					:class="" @click="jumpTo($event, item.url)">
					<view class="text-lg">{{item.title}}</view>
					<!--view class="text-lg">{{item.title}}</view-->
					<!--view class="margin-top-sm text-Abc text-sm">{{item.city}}</view>
					<view class="">时薪 {{item.salary}}</view-->
				</view>
			</view>
		</view>
		<!--view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content" @click="toStoreCreate">
					<text class="cuIcon-circlefill text-grey"></text>
					<text class="text-grey">门店注册</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content" @click="toLessonAdd">
					<image src="/static/logo.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">添加课程</text>
				</view>
			</view>
			<view class="cu-item margin-top" :class="menuArrow?'arrow':''">
				<view class="content" @click="toTutorAdd">
					<image src="/static/logo.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">家教注册</text>
				</view>
			</view>
            <view class="cu-item margin-top" :class="menuArrow?'arrow':''">
            	<view class="content" @click="toTutorWanted">
            		<image src="/static/logo.png" class="png" mode="aspectFit"></image>
            		<text class="text-grey">请家教</text>
            	</view>
            </view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content" @click="toTutors">
					<image src="/static/logo.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">找家教</text>
				</view>
			</view>
		</view-->
		<view class="padding-xl">
		    <button class="cu-btn block line-orange lg" @click="toIndex">
		        <text class="cuIcon-explore"></text> example</button>
		</view>
		<view class="box">
			<view class="cu-bar tabbar bg-white">
				<view class="action" v-for="(item, index) in tabbar" :key="index">
					<view class="cuIcon-cu-image" :class="item.choosed?'text-green':'text-grey'">
						<text class="lg text-gray" :class="'cuIcon-' + item.icon"></text>
						<!--image :src="item.icon"></image>
						<!--view class="cu-tag badge">{{item.info_number}}</view-->
					</view>
					<view :class="item.choosed?'text-green':'text-grey'">{{item.title}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuBorder: false,
				menuCard: true,
				menuArrow: true,
				tabbar: [{
					title: '首页',
					icon: 'home'
				},{
					title: '找课',
					icon: 'search'
				},{
					title: '开店',
					icon: 'shop'
				},{
					title: '我的',
					icon: 'people'
				}],
				catalog: [{
					choosed: true,
					title: '门店注册',
					url: '/pages/store_create/store_create',
				},{
					choosed: false,
					title: '添加课程',
					url: '/pages/lesson_add/lesson_add',
				},{
					choosed: false,
					title: '家教注册',
					url: '/pages/tutor_add/tutor_add',
				},{
					choosed: false,
					title: '请家教',
					url: '/pages/tutor_wanted/tutor_wanted',
				},{
					title: '看家教信息',
					url: '/pages/tutors/tutors',
				},{
					title: '看课程信息',
					url: '/pages/lessons/lessons'
				}]
			}
		},
		methods: {
			jumpTo(e, url){
				uni.navigateTo({
					url: url
				})
			},
			toIndex(e){
				uni.navigateTo({
					url: '/pages/index/index',
				})
			},
		}
	}
</script>

<style>
	.box {
		margin: 20upx 0;
		/*position: fixed;
		left: 0;
		bottom: 0;*/
	}

	.box view.cu-bar {
		margin-top: 20upx;
	}
</style>
