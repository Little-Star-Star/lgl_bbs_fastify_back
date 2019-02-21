const monogoose = require('mongoose')

// 引入其他数据model
const model_account = require('./account')
// 建立用户个人信息模型

const userInfoSchema = new monogoose.Schema({
	headSrc: { type: String, default: '/img/default/head.png' },
	nickname: { type: String },
	sex: { type: Boolean, default: true }, //默认性别：男性
	job: { type: String }, 
	selfDescription: { type: String}, //自我描述
	high: { type: Number }, //身高
	weight: { type: Number }, //体重
	faceValue: { type: Number, default: 2 }, //颜值0-4
	birthday: { type: String }, //1995-01-01
	city: { type: String }, //常住地
	hometown: { type: String }, //故乡
	type: { type: String }, //自我类型选择或自定义
	TaInHeart: { type: String}, //心中的Ta的描述
	beautifulImgs: { type: [String]}, //照片墙，精选照片
	account:{	type: Object, ref: model_account }
})

module.exports = monogoose.model('UserInfo',userInfoSchema,'userinfo')