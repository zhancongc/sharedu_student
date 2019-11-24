<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink">
			<block slot="content">页面目录</block>
		</cu-custom>
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
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
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content" @click="toTutorAdd">
					<image src="/static/logo.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">家教注册</text>
				</view>
			</view>
            <view class="cu-item" :class="menuArrow?'arrow':''">
            	<view class="content" @click="toTutorWanted">
            		<image src="/static/logo.png" class="png" mode="aspectFit"></image>
            		<text class="text-grey">家教线索</text>
            	</view>
            </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toStoreCreate(){
				uni.navigateTo({
					url: '/pages/store_create/store_create',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toLessonAdd(){
				uni.navigateTo({
					url: '/pages/lesson_add/lesson_add',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			toTutorAdd(){
				uni.navigateTo({
					url: '/pages/tutor_add/tutor_add',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
            toTutorWanted(){
            	uni.navigateTo({
            		url: '/pages/tutor_wanted/tutor_wanted',
            		success: res => {},
            		fail: () => {},
            		complete: () => {}
            	});
            }
		}
	}
</script>

<style>

</style>
