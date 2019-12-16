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
		    <picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
		        <view class="picker" style="text-align: left;">
		            {{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}
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
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="text-black">课程介绍</text>
			</view>
		</view>
		<view class="cu-form-group">
		    <textarea maxlength="140" :disabled="modalName!=null" @input="setLessonIntro" placeholder="请输入课程介绍"></textarea>
		</view>
		<view class="cu-bar bg-white margin-top">
		    <view class="action">
				<text class="text-black">上传课程图片</text>
		    </view>
		    <view class="action">
		        {{lessonImage.length}}/4
		    </view>
		</view>
		<view class="cu-form-group">
		    <view class="grid col-4 grid-square flex-sub">
		        <view class="bg-img" v-for="(item,index) in lessonImage" :key="index" @tap="ViewImage" :data-url="lessonImage[index]">
		         <image :src="lessonImage[index]" mode="aspectFill"></image>
		            <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
		                <text class='cuIcon-close'></text>
		            </view>
		        </view>
		        <view class="solids" @tap="ChooseImage" v-if="lessonImage.length<4">
		            <text class='cuIcon-cameraadd'></text>
		        </view>
		    </view>
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
                lessonIntro: '',
				multiArray: [
					['中小学文化课', '体育竞技', '文化艺术'],
					['语文', '数学', '英语', '物理', '化学', '生物']
				],
				multiIndex: [0, 0],
				lessonImage: []
			}
		},
		methods: {
			setLessonName(e){this.lessonName = e.detail.value},
            setLessonTimes(e){this.lessonTimes = e.detail.value},
            setLessonPrice(e){this.lessonPrice = e.detail.value},
            setLessonIntro(e){this.lessonIntro = e.detail.value},
			MultiChange(e) {
			    this.multiIndex = e.detail.value;
				this.lessonType = this.multiArray[1][this.multiIndex[1]];
				console.log("lessonType", this.lessonType);
			},
			MultiColumnChange(e) {
				let data = {
						multiArray: this.multiArray,
						multiIndex: this.multiIndex
				};
				console.log(e);
				data.multiIndex[e.detail.column] = e.detail.value;
				switch (e.detail.column) {
						case 0:
					switch (data.multiIndex[0]) {
						case 0:
							data.multiArray[1] = ['语文', '数学', '英语', '物理', '化学', '生物'];
							data.multiIndex[1] = 0;
							break;
						case 1:
							data.multiArray[1] = ['游泳', '冲浪', '潜水', '瑜伽', '射箭', '举重', '围棋', '中国象棋', '国际象棋'];
							data.multiIndex[1] = 0;
							break;
						case 2:
							data.multiArray[1] = ['钢琴', '小提琴', '贝斯', '吉他', '萨克斯', '萧笛', '古筝', '二胡', '琵琶'];
							data.multiIndex[1] = 0;
							break;
					}
				case 1:
					data.multiIndex[1] = e.detail.value;
					break;
				}
				this.multiArray = data.multiArray;
				this.multiIndex = data.multiIndex;
				console.log()
				this.$forceUpdate();
			},
			ChooseImage(e) {
                var num = 4 - this.data.goodsImageList.length
                if (num < 1) {
                  wx.showToast({title: '图片不能超过4张',})
                  return ;
                }
                uni.chooseImage({
                        count: num, //默认9
                        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album'], //从相册选择
                        success: (res) => {
                                if (this.lessonImage.length != 0) {
                                        this.lessonImage = this.lessonImage.concat(res.tempFilePaths)
                                } else {
                                        this.lessonImage = res.tempFilePaths
                                }
                        }
                });
			},
			ViewImage(e) {
			        uni.previewImage({
			                urls: this.lessonImage,
			                current: e.currentTarget.dataset.url
			        });
			},
			DelImg(e) {
			        uni.showModal({
			                title: '你好',
			                content: '确定要删除图片吗？',
			                cancelText: '取消',
			                confirmText: '确定',
			                success: res => {
			                        if (res.confirm) {
			                                this.lessonImage.splice(e.currentTarget.dataset.index, 1)
			                        }
			                }
			        })
			},
		}
	}
</script>

<style>
.cu-form-group .title {
	min-width: calc(4em + 15px);
}
</style>
