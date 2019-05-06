const mongoose = require('mongoose')

const newsCommentSchema = new mongoose.Schema({
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
	newsId:{type:mongoose.Schema.Types.ObjectId,ref:'News'}, //校园资讯ID信息
},{
	timestamps:{
		createdAt:'createTime',
		updatedAt:'updateTime'
	}
})

module.exports = mongoose.model('NewsComment',newsCommentSchema,'newscomment')