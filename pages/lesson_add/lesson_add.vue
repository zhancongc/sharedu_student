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
		    <view class="title">课程类别</view>
		    <picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
		        <view class="picker">
		            {{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}
		        </view>
		    </picker>
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
            setLessonIntro(e){this.lessonIntro = e.detail.value},
			MultiColumnChange(e) {
			    let data = {
			        multiArray: this.multiArray,
			        multiIndex: this.multiIndex
			    };
			    data.multiIndex[e.detail.column] = e.detail.value;
			    switch (e.detail.column) {
			        case 0:
			            switch (data.multiIndex[0]) {
			                case 0:
			                    data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
			                    data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
			                    break;
			                case 1:
			                    data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
			                    data.multiArray[2] = ['鲫鱼', '带鱼'];
			                    break;
			            }
			            data.multiIndex[1] = 0;
			            data.multiIndex[2] = 0;
			            break;
			        case 1:
			            switch (data.multiIndex[0]) {
			                case 0:
			                    switch (data.multiIndex[1]) {
			                        case 0:
			                            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
			                            break;
			                        case 1:
			                            data.multiArray[2] = ['蛔虫'];
			                            break;
			                        case 2:
			                            data.multiArray[2] = ['蚂蚁', '蚂蟥'];
			                            break;
			                        case 3:
			                            data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
			                            break;
			                        case 4:
			                            data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
			                            break;
			                    }
			                    break;
			                case 1:
			                    switch (data.multiIndex[1]) {
			                        case 0:
			                            data.multiArray[2] = ['鲫鱼', '带鱼'];
			                            break;
			                        case 1:
			                            data.multiArray[2] = ['青蛙', '娃娃鱼'];
			                            break;
			                        case 2:
			                            data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
			                            break;
			                    }
			                    break;
			            }
			            data.multiIndex[2] = 0;
			            break;
			    }
			    this.multiArray = data.multiArray;
			    this.multiIndex = data.multiIndex;
			},
		}
	}
</script>

<style>
.cu-form-group .title {
	min-width: calc(4em + 15px);
}
</style>
