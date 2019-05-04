const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
	title:{type:String},
	kind:{type:String}, //新闻所属种类
	keyword:{type:Array},
	content:{type:String},
	cover:{type:String},
	statics:{
		view:{type:Number,default:0},
		comment:{type:Number,default:0},
		like:{type:Number,default:0},
		collect:{type:Number,default:0}
	},
	userId:{type:mongoose.Schema.Types.ObjectId,ref:'UserInfo'}, //news作者
	// commentId:[{type:mongoose.Schema.Types.ObjectId,ref:'Comment'}], //评论ID
},{
	timestamps:{
		createdAt:'createTime',
		updatedAt:'updateTime'
	}
})

module.exports = mongoose.model('News',newsSchema,'news')