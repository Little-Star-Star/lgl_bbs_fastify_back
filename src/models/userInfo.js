const monogoose = require('mongoose')
// 建立用户个人信息模型 User_Schema
const model_account = require('./account')
const userInfoSchema = new monogoose.Schema({
	avatar: { type: String, default: 'lij_circle_logo.png' },
	name: { type: String ,maxlength:15},
	specialty: { type: String }, 
	description: { type: String,maxlength:250}, //自我描述
	account:{type:Object,ref:model_account}
},{
	timestamps:{
		createdAt:'createTime',
		updatedAt:'updateTime'
	}
})

module.exports = monogoose.model('UserInfo',userInfoSchema,'userinfo')