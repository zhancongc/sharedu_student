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
		<view class="cu-card case no-card">
			<view class="cu-item shadow">
				<view class="image">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
					 mode="widthFix"></image>
					<view class="cu-tag bg-blue">史诗</view>
					<view class="cu-bar bg-shadeBottom"> <text class="text-cut">我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。</text></view>
				</view>
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
						<view class="content flex-sub">
							<view class="text-grey">正义天使 凯尔</view>
							<view class="text-gray text-sm flex justify-between">
								十天前
								<view class="text-gray text-sm">
									<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
									<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
									<text class="cuIcon-messagefill margin-lr-xs"></text> 30
								</view>
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
				// 基本信息
				tutor: {
					name: '',
					gender: '',
					avatar: '',
					birth_date: '',
					phone: '',
				},
				// 教育经历
				college: [
					// {name: '', major: '', start_date: '', end_data: '',}
				],
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
					name: '专业能力'
				}, {
					name: '工作经历'
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
		}
	}
</script>
	
<style>

</style>
