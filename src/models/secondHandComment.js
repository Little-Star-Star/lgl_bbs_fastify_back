const mongoose = require('mongoose')

const secondHandCommentSchema = new mongoose.Schema({
	text:{type:String}, //评论的内容
	like:{type:Number}, //评论被点赞数量
	replyData:[{
		userId:{type:mongoose.Schema.Types.ObjectId,ref:'UserInfo'},
		toUserId:{type:mongoose.Schema.Types.ObjectId,ref:'UserInfo'},
		text:{type:String},
		like:{type:Number},
		time:{type:Date}
	}], //回复数据
	userId:{type:mongoose.Schema.Types.ObjectId,ref:'UserInfo'}, //评论作者ID信息
	secondHandId:{type:mongoose.Schema.Types.ObjectId,ref:'SecondHand'}, //二手物品ID
},{
	timestamps:{
		createdAt:'createTime',
		updatedAt:'updateTime'
	}
})

module.exports = mongoose.model('SecondHandComment',secondHandCommentSchema,'secondhandcomment')