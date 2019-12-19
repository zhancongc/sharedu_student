<template>
    <view>
			<cu-custom bgColor="bg-gradual-pink" :isBack="true">
					<block slot="backText">返回</block><block slot="content">创建店铺</block>
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
						<view class="title">邀请码</view>
						<input placeholder="请输入代理商提供的邀请码"  type="text" maxlength="10" 
								focus="false" @input="setInvitationCode"></input>
				</view>
				<view class="cu-form-group">
						<view class="title">商户名称</view>
						<input placeholder="请输入商户名称"  type="text" maxlength="20"
							focus="true" @input="setStoreName"></input>
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
						<view class="title">详细地址</view>
						<input placeholder="请输入商户地址"  type="text" maxlength="30" v-model="storeAddress"
							@input="setStoreAddress"></input>
						<text class='cuIcon-locationfill text-orange' @click="getLocation"></text>
				</view>
				<view class="cu-form-group">
						<view class="title">负责人</view>
						<input placeholder="请输入商户主要负责人"  type="text" maxlength="12"
							@input="setManager"></input>
				</view>
				<view class="cu-form-group">
						<view class="title">联系手机</view>
						<input placeholder="请输入负责人手机号码"  type="number" maxlength="11"
							@input="setManagerPhone"></input>
				</view>
				<view class="cu-bar bg-white solid-bottom margin-top">
				  <view class="action">
				    <text class="text-black">店铺简介</text>
				  </view>
				</view>
				<view class="cu-form-group">
				    <textarea maxlength="500" @input="setStoreIntro" type="text"
						placeholder="请输入店铺简介"></textarea>
				</view>
			</block>
			<block v-if="num == 1">
				<view class="cu-bar bg-white margin-top">
						<view class="action">
				<text class="text-black">上传商户logo</text>
						</view>
						<!--view class="action">
								{{storeImageList.length}}/4
						</view-->
				</view>
				<view class="cu-form-group">
						<view class="grid col-4 grid-square flex-sub">
								<view class="bg-img" v-for="(item,index) in avatar" :key="index" @tap="ViewImage" :data-url="avatar[index]">
								 <image :src="avatar[index]" mode="aspectFill"></image>
										<view class="cu-tag bg-red" @tap.stop="DelImg($event, 'avatar')" :data-index="index">
												<text class='cuIcon-close'></text>
										</view>
								</view>
								<view class="solids" @tap="ChooseImage($event, 'avatar')" v-if="avatar.length<1">
										<text class='cuIcon-cameraadd'></text>
								</view>
						</view>
				</view>
				<view class="cu-bar bg-white margin-top">
						<view class="action">
								<text class="text-black">上传营业执照图片</text>
						</view>
						<view class="action">
								{{licenseImageList.length}}/4
						</view>
				</view>
				<view class="cu-form-group">
						<view class="grid col-4 grid-square flex-sub">
								<view class="bg-img" v-for="(item,index) in licenseImageList" :key="index" @tap="ViewImage" :data-url="licenseImageList[index]">
								 <image :src="licenseImageList[index]" mode="aspectFill"></image>
										<view class="cu-tag bg-red" @tap.stop="DelImg($event, 'license')" :data-index="index">
												<text class='cuIcon-close'></text>
										</view>
								</view>
								<view class="solids" @tap="ChooseImage($event, 'license')" v-if="licenseImageList.length<4">
										<text class='cuIcon-cameraadd'></text>
								</view>
						</view>
				</view>
				<view class="cu-bar bg-white margin-top">
						<view class="action">
				<text class="text-black">上传商户资料图片</text>
						</view>
						<view class="action">
								{{storeImageList.length}}/4
						</view>
				</view>
				<view class="cu-form-group">
						<view class="grid col-4 grid-square flex-sub">
								<view class="bg-img" v-for="(item,index) in storeImageList" :key="index" @tap="ViewImage" :data-url="storeImageList[index]">
								 <image :src="storeImageList[index]" mode="aspectFill"></image>
										<view class="cu-tag bg-red" @tap.stop="DelImg($event, 'photo')" :data-index="index">
												<text class='cuIcon-close'></text>
										</view>
								</view>
								<view class="solids" @tap="ChooseImage($event, 'photo')" v-if="storeImageList.length<4">
										<text class='cuIcon-cameraadd'></text>
								</view>
						</view>
				</view>
			</block>
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
			<!--view class="padding flex flex-direction">
					<button class="cu-btn bg-mauve margin-tb-sm lg" @click="submit">提交</button>
			</view-->
    </view>
</template>

<script>
    import {checkText, checkList} from "../../utils.js"
    export default {
        data() {
					return {
						num: 0,
						numList: [{
							name: '基本信息'
						}, {
							name: '补充信息'
						}],
						invitationCode: "",
						storeName: "",
						region: ['北京市', '北京市', '东城区'],
						storeAddress: "",
						latitude: "",
						longitude: "",
						manger: "",
						managerPhone: "",
						storeIntro: '',
						avatar: [],
						avatarUrl: [],
						licenseImageList: [],
						licenseImageListUrl: [],
						storeImageList: [],
						storeImageListUrl: []
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
          setInvitationCode(e) {this.invitationCode = e.detail.value},
          setStoreName(e) {this.storeName = e.detail.value},
					RegionChange(e) {this.region = e.detail.value;},
          setStoreAddress(e) {this.storeAddress = e.detail.value},
					setStoreIntro(e) {this.storeIntro = e.detail.value},
          getLocation(e) {
						var that = this;
						uni.chooseLocation({
							success: function (res) {
								if (res.errMsg == "chooseLocation:ok"){
										console.log(res)
										that.storeAddress = res.address
										that.latitude = res.latitude
										that.longitude = res.longitude
										that.$forceUpdate()
								}
							}
						})
          },
          setManager(e) {this.manger = e.detail.value},
          setManagerPhone(e) {this.managerPhone = e.detail.value},
          ChooseImage(e, type) {
						var that = this
						const app = getApp()
						let images = []
						let image_list = []
						if (type == 'license'){
							images = that.licenseImageList
							image_list = that.licenseImageListUrl
						} else if (type == 'photo'){
							images = that.storeImageList
							image_list = that.storeImageListUrl
						} else if (type=='avatar') {
							images = that.avatar
							image_list = that.avatarUrl
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
												if (type == 'license'){
													that.licenseImageList = that.licenseImageList.concat(tempImageList)
													that.licenseImageListUrl = that.licenseImageListUrl.concat([response.data.imageUrl])
												} else if (type == 'photo'){
													that.storeImageList = that.storeImageList.concat(tempImageList)
													that.storeImageListUrl = that.storeImageListUrl.concat([response.data.imageUrl])
												} else if (type=='avatar') {
													that.avatar = that.avatar.concat(tempImageList)
													that.avatarUrl = that.avatarUrl.concat([response.data.imageUrl])
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
          ViewImage(e) {
						uni.previewImage({
							urls: this.storeImageList,
							current: e.currentTarget.dataset.url
						});
          },
          DelImg(e, type) {
            uni.showModal({
              title: '你好',
              content: '确定要删除图片吗？',
              cancelText: '取消',
              confirmText: '确定',
              success: res => {
                if (res.confirm) {
									if ( type == 'avatar') {
										this.avatar.splice(e.currentTarget.dataset.index, 1)
										this.avatarUrl.splice(e.currentTarget.dataset.index, 1)
									} else if (type == 'license') {
										this.licenseImageList.splice(e.currentTarget.dataset.index, 1)
										this.licenseImageListUrl.splice(e.currentTarget.dataset.index, 1)
									} else if (type == 'photo') {
										this.storeImageList.splice(e.currentTarget.dataset.index, 1)
										this.storeImageListUrl.splice(e.currentTarget.dataset.index, 1)
									}
                }
              }
            })
          },
        submit(e){
          var that = this
          const app = getApp()
          let argu = [
            {name: '店铺名称', value: that.storeName},
            {name: '店铺地址', value: that.storeAddress},
            {name: '负责人', value: that.manger},
            {name: '联系电话', value: that.managerPhone}
          ]
          if (!checkText(argu)){
            return ;
          }
          let argu_list = [
            {name: '证明材料', value: that.licenseImageListUrl},
            {name: '店铺照片', value: that.storeImageListUrl}
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
              invitation_code: that.invitationCode,
              name: that.storeName,
              avatar: that.avatarUrl,
							intro: that.storeIntro,
              city: that.region.join(),
							address: that.storeAddress,
							latitude: that.latitude,
							longitude: that.longitude,
							manager: that.manger,
							manager_phone: that.managerPhone,
							license_image_list: that.licenseImageListUrl,
              photo_list: that.storeImageListUrl
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
</style>
