<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block><block slot="content">请家教</block>
		</cu-custom>
		<view class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" :class="index>num?'':'text-blue'" v-for="(item,index) in numList" :key="index">
					<text class="num" :data-index="index + 1"></text> {{item.name}}
				</view>
			</view>
		</view>
		<form v-if="num == 0" id="basic">
			<view class="cu-form-group margin-top">
				<view class="title">标题</view>
				<input placeholder="请简要描述家教要求" :value="basic.title" name="title" maxlength="10"></input>
			</view>
            <view class="cu-form-group">
            	<view class="title">手机</view>
            	<input placeholder="请输入您的手机号码" :value="basic.phone" name="phone" maxlength="11"></input>
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
			    <view class="title">城市</view>
			    <picker mode="region" @change="RegionChange" :value="region" name="region" maxlength="20">
			        <view class="picker" style="text-align: left;">
			            {{region[0]}}，{{region[1]}}，{{region[2]}}
			        </view>
			    </picker>
			</view>
		</form>
		<form v-if="num == 1" id="student">
            <view class="cu-form-group">
                <view class="title">性别</view>
                <picker @change="genderChange" :range="gender" :value="tutor.degree" name="degree" maxlength="2">
                    <view class="picker" style="text-align: left;">
                        {{degreeIndex>-1?degree[degreeIndex]:'请选择学生性别'}}
                    </view>
                </picker>
            </view>
			<view class="cu-form-group">
				<view class="title">科目</view>
				<input placeholder="请简要描述" :value="basic.title" name="title" maxlength="10"></input>
			</view>
            <view class="cu-form-group">
                <view class="title">大致地址</view>
                <input placeholder="请输入大致地址,精确到小区名即可"  type="text" maxlength="30" v-model="storeAddress"
                    focus="true" @input="setStoreAddress"></input>
                <text class='cuIcon-locationfill text-orange' @click="getLocation"></text>
            </view>
            <view class="cu-form-group align-start">
                <view class="title">学生情况描述</view>
                <textarea maxlength="140" :disabled="modalName!=null" @input="setStudentIntro" placeholder="请输入简要描述孩子的情况"></textarea>
            </view>
		</form>
        <form v-if="num==2" id="tutor">
            <view class="cu-form-group">
                <view class="title">性别</view>
                <picker @change="genderChange" :range="gender" :value="tutor.gender" name="gender" maxlength="2">
                    <view class="picker" style="text-align: left;">
                        {{degreeIndex>-1?degree[degreeIndex]:'请选择性别'}}
                    </view>
                </picker>
            </view>
            <view class="cu-form-group">
            	<view class="title">时薪</view>
            	<input placeholder="请输入您的预算时薪" :value="tutor.salary" name="salary" type="number" maxlength="20"></input>
            </view>
            <view class="cu-form-group">
            	<view class="title">时长</view>
            	<input placeholder="请输入您需要的家教时长" :value="tutor.duration" name="duration" type="number" maxlength="3"></input>
            </view>
        </form>
		<!--view class="padding flex flex-direction">
			<button form-type="submit" class="cu-btn bg-mauve margin-tb-sm lg" @click="tutorSubmit">提交</button>
		</view-->
        <view class="cu-bar bg-white solid-bottom margin-top" style="position: relative;">
        	<view class="action" v-if="num!=0" style="text-align: center;">
        		<button class="cu-btn bg-green shadow" @tap="PreviousSteps">上一步</button>
        	</view>
        	<view class="action" v-if="num!=2" style="position: absolute; right: 0px;">
        		<button class="cu-btn bg-green shadow" @tap="NextSteps">下一步</button>
        	</view>
        	<view class="action" v-if="num==2">
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
				basic: {
                    title: '', // 
                    phone: '', //
                    city: '', //
                    teachTime: '', // 授课时间
                    canNegotiate: true // 是否可以协商
				},
                student: {
                    gender: '', // 学生性别
                    subject: '', // 科目
                    detailAddress: '', // 大致地址，最多精确到小区
                    intro: '', // 学生情况描述
                },
                tutor: {
                    gender: '', // 家教性别
                    salary: 0, // 薪水，元/小时
                    duration: 0 ,
                    teachVia: '', // 家教上门，在线视频
                    request: '' // 对家教的要求
                },
				region: ['重庆市', '重庆市', '渝中区'],
				genderIndex: -1,
				gender: ['男', '女'],
				numList: [{
					name: '基本信息'
				}, {
					name: '学生情况'
				}, {
                    name: '老师要求'
                }],
				num: 0
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
            setStudentIntro (e) {
                this.student.intro = e.detail.value;
                this.$forceUpdate();
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
