<script>
	import Vue from 'vue'
	export default {
		globalData: {
			tutorId: 0,
			storeId: 0,
			domainUrl: "http://127.0.0.1/",
			userInfo: "",
			openId: '',
		},
		methods: {
			weixinLogin(){
				var that = this
				wx.login({
					success(res){
						console.log(res)
						if (res.errMsg == "login:ok"){
							uni.request({
								method: 'POST',
								url: that.globalData.domainUrl + 'login',
								data: {code: res.code},
								header: {'content-type': 'application/x-www-form-urlencoded'},
								success(res){
									if (res.statusCode==200) {
										console.log(res.data)
										that.globalData.openId = res.data.data.open_id
										wx.setStorageSync("openId", res.data.data.open_id)
									}
								},
								fail(res){
									console.log(res)
								},
								complete(res){}
							})
						}
					}
				})
			},
			updateUserData(){
				var that = this
				let encryptedData = uni.getStorageSync("encryptedData")
				let iv = uni.getStorageSync("iv")
				let rawData = uni.getStorageSync("rawData")
				let signature = uni.getStorageSync("signature")

				if (encryptedData && vi && rawData && signature) {
					console.log("开始上传")
					uni.request({
						method: "POST",
						url: that.globalData.domainUrl + "updateUserData",
						header: {'content-type': 'application/x-www-form-urlencoded'},
						data: {
							open_id: that.globalData.openId,
							encryptedData: encryptedData,
							iv: iv,
							rawData: rawData,
							signature: signature
						},
						success(res){
							if (res.statusCode==200) {
								console.log(res.data)
							}
						},
					})
				}
			},
		},
		onLaunch: function() {
			var that = this
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			Vue.prototype.ColorList = [
				{title: '嫣红',name: 'red',color: '#e54d42'},
				{title: '桔橙',name: 'orange',color: '#f37b1d'},
				{title: '明黄',name: 'yellow',color: '#fbbd08'},
				{title: '橄榄',name: 'olive',color: '#8dc63f'},
				{title: '森绿',name: 'green',color: '#39b54a'},
				{title: '天青',name: 'cyan',color: '#1cbbb4'},
				{title: '海蓝',name: 'blue',color: '#0081ff'},
				{title: '姹紫',name: 'purple',color: '#6739b6'},
				{title: '木槿',name: 'mauve',color: '#9c26b0'},
				{title: '桃粉',name: 'pink',color: '#e03997'},
				{title: '棕褐',name: 'brown',color: '#a5673f'},
				{title: '玄灰',name: 'grey',color: '#8799a3'},
				{title: '草灰',name: 'gray',color: '#aaaaaa'},
				{title: '墨黑',name: 'black',color: '#333333'},
				{title: '雅白',name: 'white',color: '#ffffff'},
			]
			that.globalData.userInfo = uni.getStorageSync('userInfo')
			if (that.globalData.userInfo == "") {
				uni.getSetting({
					success(res){
						console.log(res)
						if (res.errMsg=="getSetting:ok"){
							if (res.authSetting['scope.userInfo']) {
								uni.getUserInfo({
									success(e) {
										console.log(e)
										that.globalData.userInfo = e.userInfo
										uni.setStorageSync({key: "userInfo", data:e.userInfo})
										uni.setStorageSync({key: "encryptedData", data:e.encryptedData})
										uni.setStorageSync({key: "iv", data:e.iv})
										uni.setStorageSync({key: "rawData", data:e.rawData})
										uni.setStorageSync({key: "signature", data:e.signature})
									}
								})
							}
						}
					}
				})
			}
			that.globalData.openId = wx.getStorageSync('openId')
			// if (that.globalData.openId){
			// 	that.updateUserData()
			// } else {
			// 	that.weixinLogin()
			// }
			wx.getStorage({
				key : "openId",
				success(res){
					console.log(res)
					if (res.errMsg=="getStorage:ok"){
						that.globalData.openId = res.data
						if (res.data && that.globalData.rawData) {
							that.updateUserData()
						}
					}
				},
				fail(res){
					console.log(res)
					if (res.errMsg=="getStorage:fail data not found"){
						that.weixinLogin()
					}
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";

	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 40upx 0px;
		justify-content: space-between;
	}

	.nav-li {
		padding: 30upx;
		border-radius: 12upx;
		width: 45%;
		margin: 0 2.5% 40upx;
		background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358352-assets/web-upload/cc3b1807-c684-4b83-8f80-80e5b8a6b975.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10upx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}

	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4upx 4upx 6upx rgba(94, 185, 94, 0.4);
	}

	.nav-title {
		font-size: 32upx;
		font-weight: 300;
	}

	.nav-title::first-letter {
		font-size: 40upx;
		margin-right: 4upx;
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}

	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40upx;
		height: 6upx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100upx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40upx;
		opacity: 0.3;
	}

	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36upx;
		margin-right: 1px;
	}

	.nav-li text {
		position: absolute;
		right: 30upx;
		top: 30upx;
		font-size: 52upx;
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
	}

	.text-light {
		font-weight: 300;
	}

	@keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}

	@-webkit-keyframes show {
		0% {
			transform: translateY(-50px);
		}

		60% {
			transform: translateY(40upx);
		}

		100% {
			transform: translateY(0px);
		}
	}
</style>
