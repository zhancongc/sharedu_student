<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block><block slot="content">完善家教信息</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<button class="cu-btn bg-green shadow" @tap="PreviousSteps" v-if="num!=0">上一步</button>
			</view>
			<view class="action">
				<text class="cuIcon-title text-orange"></text>完善家教信息
			</view>
			<view class="action" v-if="num!=3">
				<button class="cu-btn bg-green shadow" @tap="NextSteps">下一步</button>
			</view>
			<view class="action" v-if="num==3">
				<button class="cu-btn bg-green shadow" v-if="num==3">提 交</button>
			</view>
		</view>
		<view class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" :class="index>num?'':'text-blue'" v-for="(item,index) in numList" :key="index">
					<text class="num" :data-index="index + 1"></text> {{item.name}}
				</view>
			</view>
		</view>
		<form v-if="num == 0" id="tutor">
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input placeholder="请输入您的姓名" :value="tutor.name" name="name" maxlength="10"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<input placeholder="请输入您的性别" :value="tutor.gender" name="gender" maxlength="6"></input>
			</view>
			<view class="cu-form-group">
			    <view class="title">城市</view>
			    <picker mode="region" @change="RegionChange" :value="region" name="region" maxlength="20">
			        <view class="picker" style="text-align: left;">
			            {{region[0]}}，{{region[1]}}，{{region[2]}}
			        </view>
			    </picker>
			</view>
			<view class="cu-form-group">
			    <view class="title">学历</view>
			    <picker @change="degreeChange" :range="degree" :value="tutor.degree" name="degree" maxlength="2">
			        <view class="picker" style="text-align: left;">
			            {{degreeIndex>-1?degree[degreeIndex]:'请选择学历'}}
			        </view>
			    </picker>
			</view>
			<view class="cu-form-group">
				<view class="title">学校</view>
				<input placeholder="请输入您毕业或在读的学校" :value="tutor.college" name="college" maxlength="20"></input>
			</view>
		</form>
		<form v-if="num == 1">
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input placeholder="两字短标题" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<input placeholder="三字标题" name="input" :value="tutor.gender" disabled="true"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">头像</view>
				<input placeholder="三字标题" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">生日</view>
				<input placeholder="三字标题" name="input"></input>
			</view>
		</form>
		<view class="padding flex flex-direction">
			<button form-type="submit" class="cu-btn bg-mauve margin-tb-sm lg" @click="tutorSubmit">提交</button>
		</view>
	</view>
</template>

<script>
	var validator = require('wxvalidator');
	export default {
		data() {
			return {
				// 基本信息
				tutor: {
					name: 'iris', // from wechat
					gender: 'male', // from wechat
					city: 'shanghai',  // 
					avatar: '', // from wechat
					phone: '15821381315', // from register
					college: 'jiangsu university',
					degree: 'bachelor'
				},
				region: ['重庆市', '重庆市', '渝中区'],
				degreeIndex: -1,
				degree: ['大专', '本科', '硕士', '博士'],
				// 相关技能
				skill: [
					// {name: '', description: ''}
				],
				// 所获奖项
				award: [
					// {name: '', date: '', description: ''}
				],
				// 工作经历
				work_experience: [
					// {position: '', work_for: '', start_date: '', end_date: '', duty: '', description: ''}
				],
				// 实名认证
				identification: {
					card_number: '',
					card_image: ''
				},
				numList: [{
					name: '基本信息'
				}, {
					name: '实名认证'
				}, ],
				num: 0
			}
		},
		methods: {
			NextSteps() {
				if (this.num < this.numList.length - 1) {
					this.num = this.num + 1;
				}
			},
			PreviousSteps() {
				if (this.num > 0) {
					this.num = this.num - 1;
				}
			},
			degreeChange(e) {
				this.degreeIndex = e.detail.value;
			},
			RegionChange(e) {
			    this.region = e.detail.value;
			},
			tutorSubmit(e){
				let formData = e.detail.data;
				console.log(formData);
			}
		}
	}
</script>
	
<style>
.cu-form-group .title {
    min-width: calc(4em + 15px);
}
</style>
