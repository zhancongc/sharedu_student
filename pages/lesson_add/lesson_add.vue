<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block><block slot="content">添加课程</block>
		</cu-custom>
		<view class="cu-form-group margin-top">
			<view class="title">课程名称</view>
			<input placeholder="请输入课程名称"  type="text" maxlength="30" 
				focus="false" @input="setLessonName"></input>
		</view>
        <view class="cu-form-group">
        	<view class="title">课程类别</view>
        	<input placeholder="请选择课程类别"  type="text" maxlength="10" 
        		focus="false" @input="setLessonType"></input>
        </view>
        <view class="cu-form-group">
        	<view class="title">课时数</view>
        	<input placeholder="请输入课时数"  type="number" maxlength="9" 
        		focus="false" @input="setLessonTimes"></input>
        </view>
        <view class="cu-form-group">
        	<view class="title">课程价格</view>
        	<input placeholder="请输入课程价格"  type="digit" maxlength="10" 
        		focus="false" @input="setLessonPrice"></input>
        </view>
        <view class="cu-form-group">
        	<view class="title">课程介绍</view>
        	<input placeholder="请输入课程介绍"  type="text" maxlength="10" 
        		focus="false" @input="setLessonIntro"></input>
        </view>
        <view class="padding flex flex-direction">
        	<button class="cu-btn bg-mauve margin-tb-sm lg" @click="createCommit">提交</button>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lessonName: '',
                lessonType: '',
                lessonTimes:'',
                lessonPrice: '',
                lessonIntro: ''
			}
		},
		methods: {
			setLessonName(e){this.lessonName = e.detail.value},
            setLessonType(e){this.lessonType = e.detail.value},
            setLessonTimes(e){this.lessonTimes = e.detail.value},
            setLessonPrice(e){this.lessonPrice = e.detail.value},
            setLessonIntro(e){this.lessonIntro = e.detail.value}
		}
	}
</script>

<style>
.cu-form-group .title {
	min-width: calc(4em + 15px);
}
</style>
