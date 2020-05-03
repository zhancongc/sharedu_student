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
				<input placeholder="请简要描述家教要求" :value="basicTitle" @input="setBasicTitle" name="basicTitle" maxlength="30"></input>
			</view>
            <view class="cu-form-group">
            	<view class="title">手机</view>
            	<input placeholder="请输入您的手机号码" :value="basicPhone" @input="setBasicPhone" name="basicPhone" type="number" maxlength="11"></input>
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
			    <picker mode="region" @change="basicCityChange" :value="basicCity" name="basicCity" maxlength="20">
			        <view class="picker" style="text-align: left;">
			            {{basicCity[0]}}，{{basicCity[1]}}，{{basicCity[2]}}
			        </view>
			    </picker>
			</view>
			<view class="cu-bar bg-white">
				<view class="title" style="font-size: 30rpx; padding: 1rpx 30rpx;color:#333;">授课时间</view>
					<text v-for="(item,index) in checkbox" class="padding-xs" :key="index">
						{{item.checked?item.name:''}}</text>
				<!--view class="action">
					<text class="cuIcon-title text-orange "></text> 授课时间
				</view-->
				<view class="action">
					<button class="cu-btn bg-green shadow" @tap="showModal" data-target="ChooseModal">选择</button>
				</view>
			</view>
			<view class="cu-modal bottom-modal" :class="modalName=='ChooseModal'?'show':''" @tap="hideModal">
				<view class="cu-dialog" @tap.stop="">
					<view class="cu-bar bg-white">
						<view class="action text-blue" @tap="hideModal">取消</view>
						<view class="action text-green" @tap="hideModal">确定</view>
					</view>
					<view class="grid col-3 padding-sm">
						<view v-for="(item,index) in checkbox" class="padding-xs" :key="index">
							<button class="cu-btn orange lg block" :class="item.checked?'bg-orange':'line-orange'" @tap="ChooseCheckbox"
							 :data-value="item.value"> {{item.name}}
								<view class="cu-tag sm round" :class="item.checked?'bg-white text-orange':'bg-orange'" v-if="item.hot">热门</view>
							</button>
						</view>
					</view>
				</view>
			</view>
		</form>
		<form v-if="num == 1" id="student">
            <view class="cu-form-group">
                <view class="title">学生性别</view>
                <picker @change="studentGenderChange" :range="gender" :value="studentGender" name="studentGender" maxlength="1">
                    <view class="picker" style="text-align: left;">
                        {{studentGenderIndex>-1?gender[studentGenderIndex]:'请选择学生性别'}}
                    </view>
                </picker>
            </view>
			<view class="cu-form-group">
				<view class="title">补习科目</view>
				<input placeholder="请输入所需家教的科目" :value="subject" @input="setSubject" name="title" maxlength="10"></input>
			</view>
            <view class="cu-form-group">
                <view class="title">学生地址</view>
                <input placeholder="请输入学生的地址"  type="text" maxlength="30" :value="detailAddress"
                    focus="true" @input="setDetailAddress"></input>
                <text class='cuIcon-locationfill text-orange' @click="getLocation"></text>
            </view>
            <view class="cu-form-group align-start">
                <view class="title">学生情况</view>
                <textarea maxlength="140" @input="setStudentIntro" :value="studentIntro" placeholder="请简要描述孩子的情况"></textarea>
            </view>
		</form>
        <form v-if="num==2" id="tutor">
            <view class="cu-form-group">
                <view class="title">老师性别</view>
                <picker @change="tutorGenderChange" :range="gender" :value="tutorGender" name="tutorGender" maxlength="1">
                    <view class="picker" style="text-align: left;">
                        {{tutorGenderIndex>-1?gender[tutorGenderIndex]:'请选择性别'}}
                    </view>
                </picker>
            </view>
            <view class="cu-form-group">
            	<view class="title">预算时薪</view>
            	<input placeholder="请输入您的预算时薪" :value="salary" name="salary" type="number" maxlength="20"></input>
				<view class="cu-tag bg-blue">元</view>
            </view>
            <view class="cu-form-group">
            	<view class="title">每次时长</view>
            	<input placeholder="请输入您每次需要的家教时长" :value="duration" name="duration" type="number" maxlength="2"></input>
				<view class="cu-tag bg-blue">时</view>
            </view>
			<view class="cu-form-group align-start">
			    <view class="title">老师要求</view>
			    <textarea maxlength="140" @input="setTutorRequest" :value="tutorRequest" placeholder="请简述对老师要求"></textarea>
			</view>
        </form>
        <view class="cu-bar bg-white solid-bottom margin-top" style="position: relative;">
        	<view class="action" v-if="num!=0" style="text-align: center;">
        		<button class="cu-btn bg-green shadow" @tap="PreviousSteps">上一步</button>
        	</view>
        	<view class="action" v-if="num!=2" style="position: absolute; right: 0px;">
        		<button class="cu-btn bg-green shadow" @tap="NextSteps">下一步</button>
        	</view>
        	<view class="action" v-if="num==2">
        		<button class="cu-btn bg-green shadow" @click="tutorWantedSubmit">提 交</button>
        	</view>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// basic
				basicTitle: '',
				basicPhone: '',
				basicCity: ['北京市', '北京市', '东城区'],
				teachTime: '', // 授课时间
				modalName: '',
				checkbox: [{
					value: 0,
					name: '周一',
					checked: false,
					hot: false,
				}, {
					value: 1,
					name: '周二',
					checked: false,
					hot: false,
				},{
					value: 2,
					name: '周三',
					checked: false,
					hot: false,
				},{
					value: 3,
					name: '周四',
					checked: false,
					hot: false,
				},{
					value: 4,
					name: '周五',
					checked: false,
					hot: false,
				},{
					value: 5,
					name: '周六',
					checked: false,
					hot: false,
				},{
					value: 6,
					name: '周日',
					checked: false,
					hot: false,
				}],
				teachVia: '', // 家教上门，在线视频
				detailAddress: '', // 详细地址
				// student
				studentGenderIndex: -1,
				subject: '',
				studentIntro: '', // 学生情况描述
				// tutor 
				tutorGenderIndex: -1,
				salary: '', // 薪水，元/小时
				duration: '' , // 每次时长
				tutorRequest: '' ,// 对家教的要求
				gender: ['男', '女'],
				numList: [
					{name: '基本信息'},
					{name: '学生情况'},
					{name: '老师要求'}],
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
			setBasicTitle(e) {this.basicTitle = e.detail.value},
			setBasicPhone(e) {this.basicPhone = e.detail.value},
            getPhoneNumber (e) {
                console.log(e);
                if (e.type=="getphonenumber"){
                    
                }
            },
			degreeChange(e) {
				this.degreeIndex = e.detail.value;
			},
			basicCityChange(e) {
			    this.basicCity = e.detail.value;
			},
			showModal(e) {
				console.log(e.currentTarget.dataset.target);
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null
			},
			ChooseCheckbox(e) {
				let items = this.checkbox;
				let values = e.currentTarget.dataset.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].value == values) {
						items[i].checked = !items[i].checked;
						break
					}
				}
			},
			studentGenderChange(e) {
				this.studentGenderIndex = e.detail.value;
			},
			setSubject(e) {this.subject = e.detail.value},
			setDetailAddress(e) {this.detailAddress = e.detail.value},
			getLocation(e) {
			    var that = this;
			    uni.chooseLocation({
			      success: function (res) {
			        if (res.errMsg == "chooseLocation:ok"){
			            //console.log(res)
			            that.detailAddress = res.address;
						that.$forceUpdate();
			        }
			      }
			    })
			},
            setStudentIntro (e) {
                this.studentIntro = e.detail.value;
            },
			tutorGenderChange(e) {
				this.tutorGenderIndex = e.detail.value;
			},
			setTutorRequest(e) {this.tutorRequest = e.detail.value;},
			tutorWantedSubmit(e){
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
button .cu-tag {
	position: absolute;
	top: 8upx;
	right: 8upx;
}
</style>
