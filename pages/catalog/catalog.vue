<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink">
			<!--block slot="backText">返回</block--><block slot="content">享淘课</block>
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
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2" @click="jumpTo($event, item.url)">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text :class="'text-'+item.color">{{item.name}}</text>
			</view>
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
		<view class="padding-xl">
		    <button class="cu-btn block line-orange lg" @click="toIndex">
		        <text class="cuIcon-explore"></text> example</button>
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
					choosed: true,
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
					choosed: false,
					url: '/pages/me/me'
				}],
				menuBorder: false,
				menuCard: true,
				menuArrow: true,
				catalog: [{
					title: '添加课程',
					url: '/pages/lesson_add/lesson_add',
				},{
					title: '请家教',
					url: '/pages/tutor_wanted/tutor_wanted',
				}],
				cuIconList: [{
					cuIcon: 'formfill',
					color: 'red',
					badge: 0,
					name: '课程',
					url: '/pages/lessons/lessons'
				}, {
					cuIcon: 'friendfill',
					color: 'orange',
					badge: 0,
					name: '家教',
					url: '/pages/tutors/tutors'
				}, {
					cuIcon: 'newsfill',
					color: 'yellow',
					badge: 0,
					name: '订单',
					url: '/pages/bills/bills'
				},],
				gridCol: 3,
				gridBorder: true,
			}
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
	}

	.box view.cu-bar {
		margin-top: 20upx;
	}
</style>
