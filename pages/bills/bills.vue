<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block><block slot="content">订单</block>
		</cu-custom>
		<!--view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="搜索订单" confirm-type="search" @input="searchIcon" @confirm="search"></input>
			</view>
		</view-->
		<view class="cu-card article" :class="isCard?'no-card':''">
			<view class="cu-item shadow" v-for="(item, index) in tutors" :key="index">
				<view class="title" @click="toBillDetail($event, item.tid)"><view class="text-cut">{{item.title}}</view></view>
				<view class="content" @click="toBillDetail($event, item.tid)">
					<!--image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
					 mode="aspectFill"></image-->
					<view class="desc">
						<view class="text-content">时薪{{item.salary}}元</view>
						<view>
							<view class="cu-tag bg-red light sm round">{{item.city}}</view>
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
				CustomBar: this.CustomBar,
				tutors: [
					{
						tid: 't123',
						title: '求高二英语老师',
						city: '黄埔',
						salary: '120',
						createDate: '2019-11-27 09:22:00'
					},
					{
						tid: 't234',
						title: '求高三数学老师',
						city: '浦东',
						salary: '100',
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
			toBillDetail(e, tid) {
				console.log(e);
				console.log("tid", tid);
				uni.navigateTo({
					url: '../index/index'
				})
			},
			searchIcon(e){console.log(e.currentTarget);},
			search(e){
				console.log(e.currentTarget);
			},
		}
	}
</script>

<style>

</style>
