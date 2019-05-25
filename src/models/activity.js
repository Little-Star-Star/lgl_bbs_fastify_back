const monogoose = require('mongoose')
// 建立活动模型
const activitySchema = new monogoose.Schema({
	user:{type:monogoose.Schema.Types.ObjectId,ref:'User'},
	cover:{type:String,default:'lij_rect_logo.png'},
	navCover:{type:String,default:'lij_rect_logo.png'},
	title:{type:String},
	address:{type:String},
	time:{type:String},
	description:{type:String},
	host:{type:String} //主办方
},{
	timestamps:{
		createdAt:'createTime',
		updatedAt:'updateTime'
	}
})

module.exports = monogoose.model('Activity',activitySchema,'activity')