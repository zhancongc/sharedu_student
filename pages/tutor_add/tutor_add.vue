<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block><block slot="content">填写家教信息</block>
		</cu-custom>
		<view class="bg-white padding">
			<view class="cu-steps">
				<view class="cu-item" :class="index>num?'':'text-blue'" v-for="(item,index) in numList" :key="index">
					<text class="num" :data-index="index + 1"></text> {{item.name}}
				</view>
			</view>
		</view>
		<block v-if="num == 0">
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input placeholder="请输入您的姓名" @input="setTutorName" name="name" maxlength="10"></input>
			</view>
            <view class="cu-form-group">
            	<view class="title">手机</view>
            	<input placeholder="请输入您的手机号码" @input="setPhone" name="phone" maxlength="11"></input>
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
				<!--input placeholder="请输入您的性别" @input="setGender" name="gender" maxlength="6"></input-->
				<picker @change="genderChange" :range="gender" name="gender" maxlength="1">
				    <view class="picker" style="text-align: left;">
				        {{genderIndex>-1?gender[genderIndex]:'请选择性别'}}
				    </view>
				</picker>
			</view>
			<view class="cu-form-group">
			    <view class="title">城市</view>
			    <picker mode="region" @change="RegionChange" name="region" maxlength="20">
			        <view class="picker" style="text-align: left;">
			            {{region[0]}}，{{region[1]}}，{{region[2]}}
			        </view>
			    </picker>
			</view>
			<view class="cu-form-group">
			    <view class="title">学历</view>
			    <picker @change="degreeChange" :range="degree"  name="degree" maxlength="2">
			        <view class="picker" style="text-align: left;">
			            {{degreeIndex>-1?degree[degreeIndex]:'请选择学历'}}
			        </view>
			    </picker>
			</view>
			<view class="cu-form-group">
				<view class="title">学校</view>
				<input placeholder="请输入您毕业或在读的学校" @input="setCollege" name="college" maxlength="20"></input>
			</view>
		</block>
		<block v-if="num == 1">
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
							<view class="bg-img" v-for="(item,index) in idCardImageList" :key="index" @tap="ViewImage($event, 'idCard')" :data-url="idCardImageList[index]">
							 <image :src="idCardImageList[index]" mode="aspectFill"></image>
									<view class="cu-tag bg-red" @tap.stop="DelImg($event, 'idCard')" :data-index="index">
											<text class='cuIcon-close'></text>
									</view>
							</view>
							<view class="solids" @tap="ChooseImage($event, 'idCard')" v-if="idCardImageList.length<2">
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
							<view class="bg-img" v-for="(item,index) in certificateImageList" :key="index" @tap="ViewImage($event, 'cert')" :data-url="certificateImageList[index]">
							 <image :src="certificateImageList[index]" mode="aspectFill"></image>
									<view class="cu-tag bg-red" @tap.stop="DelImg($event, 'cert')" :data-index="index">
											<text class='cuIcon-close'></text>
									</view>
							</view>
							<view class="solids" @tap="ChooseImage($event, 'cert')" v-if="certificateImageList.length<1">
									<text class='cuIcon-cameraadd'></text>
							</view>
					</view>
			</view>
		</block>
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
				<button class="cu-btn bg-orange shadow" @click="submit">提 交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {checkText, checkList} from "../../utils.js"
	export default {
		data() {
			return {
				// 基本信息
				tutorName: '', // from wechat
				avatar: '', // from wechat
				phone: '', // from register
				college: '',
				gender: ['女', '男'],
				genderIndex: -1,
				degree: '',
				region: ['北京市', '北京市', '东城区'],
				degreeIndex: -1,
				degree: ['大专', '本科', '硕士', '博士'],
				idCardImageList: [],
				idCardImageListUrl: [],
				certificateImageList: [],
				certificateImageListUrl: [],
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
				numList: [{
					name: '基本信息'
				}, {
					name: '实名认证'
				}, ],
				num: 0,
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
			setTutorName(e){this.tutorName=e.detail.value},
			setPhone(e){this.phone=e.detail.value},
			setCollege(e){this.college=e.detail.value},
			getPhoneNumber (e) {
					console.log(e);
					if (e.type=="getphonenumber"){

					}
			},
			genderChange(e) {this.genderIndex = e.detail.value},
			degreeChange(e) {this.degreeIndex = e.detail.value;},
			RegionChange(e) {this.region = e.detail.value;},
			ChooseImage(e, type) {
				var that = this
				const app = getApp()
				let images = []
				let image_list = []
				if (type == 'idCard'){
					images = that.idCardImageList
					image_list = that.idCardImageListUrl
				} else if (type == 'cert'){
					images = that.certificateImageList
					image_list = that.certificateImageListUrl
				}
				var num = 4 - images.length
				if (num < 1) {
					wx.showToast({title: '图片不能超过4张',})
					return ;
				}
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						var tempImageList = res.tempFilePaths
						uni.showLoading({title: '上传中'})
						uni.uploadFile({
							url: app.globalData.domainUrl + 'files/upload',
							methods: 'POST',
							name: 'image',
							filePath: tempImageList[0],
							success(res){
								console.log(res)
								if (res.statusCode==200){
									let response = JSON.parse(res.data)
									if (response.msg == "ok"){
										if (type == 'idCard'){
											that.idCardImageList = that.idCardImageList.concat(tempImageList)
											that.idCardImageListUrl = that.idCardImageListUrl.concat([response.data.imageUrl])
										} else if (type == 'cert'){
											that.certificateImageList = that.certificateImageList.concat(tempImageList)
											that.certificateImageListUrl = that.certificateImageListUrl.concat([response.data.imageUrl])
										}
										uni.showToast({
												title: '上传成功',
												duration: 1000,
												icon: 'success'
										})
										return ;
									}
								}
								uni.showToast({
									title: '上传失败',
									duration: 1000,
									icon: 'fail'
								})
							},
							fail(res){},
							complete(res){uni.hideLoading()}
						})
					}
				})
			},
			ViewImage(e, type) {
				console.log(e)
				var image_list
				if (type=='idCard') {
					image_list = this.idCardImageList
				} else if (type=='cert'){
					image_list = this.certificateImageList
				}
				if (type == 'idCard') {
					uni.previewImage({ urls: this.idCardImageList, current: e.currentTarget.dataset.url });
				} else if (type=='cert') {
					uni.previewImage({ urls: this.certificateImageList, current: e.currentTarget.dataset.url });
				}
			},
			DelImg(e, type) {
			  uni.showModal({
			    title: '你好',
			    content: '确定要删除图片吗？',
			    cancelText: '取消',
			    confirmText: '确定',
			    success: res => {
			      if (res.confirm) {
							if ( type == 'idCard') {
								this.idCardImageList.splice(e.currentTarget.dataset.index, 1)
								this.idCardImageListUrl.splice(e.currentTarget.dataset.index, 1)
							} else if (type == 'cert') {
								this.certificateImageList.splice(e.currentTarget.dataset.index, 1)
								this.certificateImageListUrl.splice(e.currentTarget.dataset.index, 1)
							}
			      }
			    }
			  })
			},
			submit(e){
				var that = this
				const app = getApp()
				let argu = [
					{name: '店铺名称', value: that.tutorName},
					{name: '联系电话', value: that.phone},
					{name: '店铺地址', value: that.college},
					{name: '负责人', value: that.degree},
				]
				if (!checkText(argu)){
					return ;
				}
				let argu_list = [
					{name: '身份证', value: that.idCardImageListUrl},
					{name: '证明材料', value: that.certificateImageListUrl}
				]
				if (!checkList(argu_list)){
					return ;
				}
				uni.showLoading({
					title: '数据上传中'
				})
				uni.request({
					method: "POST",
					url: app.globalData.domainUrl + "store/create",
					header: {'content-type': 'application/x-www-form-urlencoded'},
					data: {
						open_id: app.globalData.openId,
						name: that.tutorName, // from wechat
						gender: that.genderIndex, // from wechat
						phone: that.phone, // from register
						college: that.college,
						degree: that.degree,
						city: that.region,
						id_image_list: that.idCardImageListUrl,
						cert_list: that.certificateImageListUrl,
					},
					success(res){
						console.log(res)
						if (res.statusCode==200){
							let response = res.data
							if (response.msg == 'ok'){
								console.log(response)
								uni.showToast({
									title: '提交成功',
									duration: 1000,
									icon: 'success'
								})
								uni.navigateBack()
							} else {
									uni.showToast({
										title: '提交失败',
										duration: 1000,
										icon: 'none'
									})
							}
						}
					},
					fail(res){
						console.log(res)
						uni.showToast({
							title: '提交失败',
							duration: 1000,
							icon: 'none'
						})
					},
					complete(res){uni.hideLoading()}
				})
			},
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
