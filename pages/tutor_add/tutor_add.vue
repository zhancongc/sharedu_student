<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block><block slot="content">完善家教信息</block>
		</cu-custom>
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
            	<view class="title">手机</view>
            	<input placeholder="请输入您的手机号码" :value="tutor.phone" name="phone" maxlength="11"></input>
                <view class="cu-capsule radius">
                    <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="getPhoneNumber">
                    <view class='cu-tag bg-blue '>
                        +86
                    </view>
                    <view class="cu-tag line-blue">
                        中国大陆
                    </view>
                    </button>
                </view>
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
            <view class="cu-bar bg-white margin-top">
                <view class="action">
                    上传身份证正反面图片，请保证文字清晰可辨
                </view>
                <view class="action">
                    {{idCardImageList.length}}/2
                </view>
            </view>
            <view class="cu-form-group">
                <view class="grid col-4 grid-square flex-sub">
                    <view class="bg-img" v-for="(item,index) in idCardImageList" :key="index" @tap="ViewIdCardImage" :data-url="idCardImageList[index]">
                     <image :src="idCardImageList[index]" mode="aspectFill"></image>
                        <view class="cu-tag bg-red" @tap.stop="DelIdCardImg" :data-index="index">
                            <text class='cuIcon-close'></text>
                        </view>
                    </view>
                    <view class="solids" @tap="ChooseIdCardImage" v-if="idCardImageList.length<2">
                        <text class='cuIcon-cameraadd'></text>
                    </view>
                </view>
            </view>
            <view class="cu-bar bg-white margin-top">
                <view class="action">
                    上传学生证或毕业证图片，请保证文字清晰可辨
                </view>
                <view class="action">
                    {{certificateImageList.length}}/1
                </view>
            </view>
            <view class="cu-form-group">
                <view class="grid col-4 grid-square flex-sub">
                    <view class="bg-img" v-for="(item,index) in certificateImageList" :key="index" @tap="ViewCertificateImage" :data-url="certificateImageList[index]">
                     <image :src="certificateImageList[index]" mode="aspectFill"></image>
                        <view class="cu-tag bg-red" @tap.stop="DelCertificateImg" :data-index="index">
                            <text class='cuIcon-close'></text>
                        </view>
                    </view>
                    <view class="solids" @tap="ChooseCertificateImage" v-if="certificateImageList.length<1">
                        <text class='cuIcon-cameraadd'></text>
                    </view>
                </view>
            </view>
		</form>
		<!--view class="padding flex flex-direction">
			<button form-type="submit" class="cu-btn bg-mauve margin-tb-sm lg" @click="tutorSubmit">提交</button>
		</view-->
        <view class="cu-bar bg-white solid-bottom margin-top" style="position: relative;">
        	<view class="action" v-if="num!=0">
        		<button class="cu-btn bg-green shadow" @tap="PreviousSteps">上一步</button>
        	</view>
        	<view class="action" v-if="num==0" style="position: absolute; right: 0px;">
        		<button class="cu-btn bg-green shadow" @tap="NextSteps">下一步</button>
        	</view>
        	<view class="action" v-if="num==1">
        		<button class="cu-btn bg-green shadow">提 交</button>
        	</view>
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
					name: '', // from wechat
					gender: '', // from wechat
					city: '',  // 
					avatar: '', // from wechat
					phone: '', // from register
					college: '',
					degree: ''
				},
				region: ['北京市', '北京市', '东城区'],
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
				num: 0,
                idCardImageList: [],
                certificateImageList: []
			}
		},
		methods: {
			NextSteps(e) {
				if (this.num < this.numList.length - 1) {
					this.num = this.num + 1;
				}
			},
			PreviousSteps(e) {
				if (this.num > 0) {
					this.num = this.num - 1;
				}
			},
            getPhoneNumber (e) {
                console.log(e);
                if (e.type=="getphonenumber"){
                    
                }
            },
			degreeChange(e) {
				this.degreeIndex = e.detail.value;
			},
			RegionChange(e) {
			    this.region = e.detail.value;
			},
            ChooseIdCardImage(e) {
                uni.chooseImage({
                    count: 2, //默认9
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], //从相册选择
                    success: (res) => {
                        if (this.idCardImageList.length != 0) {
                                this.idCardImageList = this.idCardImageList.concat(res.tempFilePaths)
                        } else {
                                this.idCardImageList = res.tempFilePaths
                        }
                    }
                });
            },
            ViewIdCardImage(e) {
                uni.previewImage({
                    urls: this.idCardImageList,
                    current: e.currentTarget.dataset.url
                });
            },
            DelIdCardImg(e) {
                uni.showModal({
                    title: '你好',
                    content: '确定要删除图片吗？',
                    cancelText: '取消',
                    confirmText: '确定',
                    success: res => {
                        if (res.confirm) {
                                this.idCardImageList.splice(e.currentTarget.dataset.index, 1)
                        }
                    }
                })
            },
            ChooseCertificateImage(e) {
                uni.chooseImage({
                    count: 1, //默认9
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], //从相册选择
                    success: (res) => {
                        if (this.certificateImageList.length != 0) {
                                this.certificateImageList = this.certificateImageList.concat(res.tempFilePaths)
                        } else {
                                this.certificateImageList = res.tempFilePaths
                        }
                    }
                });
            },
            ViewCertificateImage(e) {
                uni.previewImage({
                    urls: this.certificateImageList,
                    current: e.currentTarget.dataset.url
                });
            },
            DelCertificateImg(e) {
                uni.showModal({
                    title: '你好',
                    content: '确定要删除图片吗？',
                    cancelText: '取消',
                    confirmText: '确定',
                    success: res => {
                        if (res.confirm) {
                            this.certificateImageList.splice(e.currentTarget.dataset.index, 1)
                        }
                    }
                })
            },
			tutorSubmit(e){
				let formData = e.detail.data;
				console.log(formData);
                uni.request({
                    method: "POST",
                    header: {},
                    url: "",
                    data: {},
                    success(){},
                    fail(){},
                    complete(){},
                })
			}
		}
	}
</script>
	
<style>
.cu-form-group .title {
    min-width: calc(4em + 15px);
}
.getPhoneNumber {
    background-color: #fff;
}
.getPhoneNumber::after{
    border: 0;
}
</style>
