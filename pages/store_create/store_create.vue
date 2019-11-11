<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block><block slot="content">店铺入驻</block>
		</cu-custom>
		<view class="cu-form-group margin-top">
			<view class="title">邀请码</view>
			<input placeholder="请输入代理商提供的邀请码" name="input" type="text" maxlength="10" 
				focus="false" @input="setInvitationCode"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">商户名称</view>
			<input placeholder="请输入商户名称" name="input" type="text" maxlength="30"
				focus="true" @input="setStoreName"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">详细地址</view>
			<input placeholder="请输入商户地址" name="input" type="text" maxlength="30" v-model="storeAddress"
				focus="true" @input="setStoreAddress"></input>
			<text class='cuIcon-locationfill text-orange' @click="getLocation"></text>
		</view>
		<view class="cu-form-group">
			<view class="title">负责人</view>
			<input placeholder="请输入商户主要负责人" name="input" type="text" maxlength="12"
				focus="true" @input="setManager"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">联系手机</view>
			<input placeholder="请输入负责人手机号码" name="input" type="number" maxlength="11"
				focus="true" @input="setManagerPhone"></input>
		</view>
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				上传营业执照图片
			</view>
			<view class="action">
				{{licenseImageList.length}}/4
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in licenseImageList" :key="index" @tap="ViewImage" :data-url="licenseImageList[index]">
				 <image :src="licenseImageList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="licenseImageList.length<4">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>
		</view>
        <view class="cu-bar bg-white margin-top">
        	<view class="action">
        		上传商户经营场所图片
        	</view>
        	<view class="action">
        		{{storeImageList.length}}/4
        	</view>
        </view>
        <view class="cu-form-group">
        	<view class="grid col-4 grid-square flex-sub">
        		<view class="bg-img" v-for="(item,index) in storeImageList" :key="index" @tap="ViewImage" :data-url="storeImageList[index]">
        		 <image :src="storeImageList[index]" mode="aspectFill"></image>
        			<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
        				<text class='cuIcon-close'></text>
        			</view>
        		</view>
        		<view class="solids" @tap="ChooseImage" v-if="storeImageList.length<4">
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
				invitationCode: "",
				owner: "",
				storeName: "",
				storeAddress: "",
				manger: "",
				managerPhone: "",
				licenseImageList: [],
                storeImageList: []
			}
		},
		methods: {
			setInvitationCode(e) {this.invitationCode = e.detail.value},
			setStoreName(e) {this.storeName = e.detail.value},
			setStoreAddress(e) {this.storeAddress = e.detail.value},
			getLocation(e) {
				var that = this;
				uni.chooseLocation({
				  success: function (res) {
					if (res.errMsg == "chooseLocation:ok"){
						//console.log(res)
						that.storeAddress = res.address
						that.$forceUpdate()
					}
				  }
				})
			},
			setManager(e) {this.manger = e.detail.value},
			setManagerPhone(e) {this.managerPhone = e.detail.value},
            ChooseImage(e) {
                    uni.chooseImage({
                            count: 4, //默认9
                            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                            sourceType: ['album'], //从相册选择
                            success: (res) => {
                                    if (this.storeImageList.length != 0) {
                                            this.storeImageList = this.storeImageList.concat(res.tempFilePaths)
                                    } else {
                                            this.storeImageList = res.tempFilePaths
                                    }
                            }
                    });
            },
            ViewImage(e) {
                    uni.previewImage({
                            urls: this.storeImageList,
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
                                            this.storeImageList.splice(e.currentTarget.dataset.index, 1)
                                    }
                            }
                    })
            },
			createCommit(e){
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
</style>
