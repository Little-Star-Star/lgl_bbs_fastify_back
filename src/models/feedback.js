const monogoose = require('mongoose')
// 网站反馈
const feedbackSchema = new monogoose.Schema({
	user:{type:monogoose.Schema.Types.ObjectId,ref:'UserInfo'},
	type: {type:String}, //问题类型
	text: { type: String}, //反馈内容
	link:{type:String} //联系方式
},{
	timestamps:{
		createdAt:'createTime',
		updatedAt:'updateTime'
	}
})

module.exports = monogoose.model('Feedback',feedbackSchema,'feedback')