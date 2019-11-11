<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block><block slot="content">添加课程</block>
		</cu-custom>
		<view class="cu-form-group margin-top">
			<view class="title">课程名称</view>
			<input placeholder="请输入代理商提供的邀请码" name="input" type="text" maxlength="10" 
				focus="false" @input="setInvitationCode"></input>
		</view>
        <view class="cu-form-group margin-top">
        	<view class="title">课程类别</view>
        	<input placeholder="请输入代理商提供的邀请码" name="input" type="text" maxlength="10" 
        		focus="false" @input="setInvitationCode"></input>
        </view>
        <view class="cu-form-group margin-top">
        	<view class="title">课时数</view>
        	<input placeholder="请输入代理商提供的邀请码" name="input" type="text" maxlength="10" 
        		focus="false" @input="setInvitationCode"></input>
        </view>
        <view class="cu-form-group margin-top">
        	<view class="title">课程价格</view>
        	<input placeholder="请输入代理商提供的邀请码" name="input" type="text" maxlength="10" 
        		focus="false" @input="setInvitationCode"></input>
        </view>
        <view class="cu-form-group margin-top">
        	<view class="title">课程介绍</view>
        	<input placeholder="请输入代理商提供的邀请码" name="input" type="text" maxlength="10" 
        		focus="false" @input="setInvitationCode"></input>
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
			
		}
	}
</script>

<style>

</style>
