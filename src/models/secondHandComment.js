const mongoose = require('mongoose')

const secondHandCommentSchema = new mongoose.Schema({
	secondHand:{type:mongoose.Schema.Types.ObjectId,ref:'SecondHand'}, //二手物品ID
	comments:[{
		user:{type:mongoose.Schema.Types.ObjectId,ref:'UserInfo'},
		text:{type:String},      //买家留言
		replyText:{type:String}, //商家回复
		time:{type:Date},         //买家留言时间
		replyTime:{type:Date}      //商家回复时间
	}], //回复数据
},{
	timestamps:{
		createdAt:'createTime',
		updatedAt:'updateTime'
	}
})

module.exports = mongoose.model('SecondHandComment',secondHandCommentSchema,'secondhandcomment')