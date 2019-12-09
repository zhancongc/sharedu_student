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
			<view class="cu-item shadow" v-for="(item, index) in bills" :key="index">
				<view class="title" @click="toBillDetail($event, item.tid)"><view class="text-cut">{{item.title}}</view></view>
				<view class="content" @click="toBillDetail($event, item.tid)">
					<image :src="item.image"
					 mode="aspectFill"></image>
					<view class="desc">
						<view class="text-title">
							<view class="cu-tag bg-orange light sm round">{{item.city}}</view>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				bills: [
					{
						tid: 't123',
						title: '高三数学冲刺课',
						image: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						city: '黄埔',
						price: '999',
						times: 5,
						createDate: '2019-11-27 09:22:00'
					},
					{
						tid: 't234',
						title: '高三化学冲刺课',
						image: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg',
						city: '浦东',
						price: '499',
						times: 3,
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
				// uni.navigateTo({url: '../index/index'})
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
