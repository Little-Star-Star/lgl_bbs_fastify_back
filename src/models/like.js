const monogoose = require('mongoose')
// 建立用户和新闻之间的关系 点赞,收藏,评论,举报,分享
const likeSchema = new monogoose.Schema({
	user:{type:monogoose.Schema.Types.ObjectId,ref:'UserInfo'},
	news:{type:monogoose.Schema.Types.ObjectId,ref:'News'},
	like:{type:Boolean,default:false},
	collect:{type:Boolean,default:false},
	share:{type:Boolean,default:false},
	comment:[{
		time:{type:Date},
		text:{type:String}
	}],
	report:{
		time:{type:Date},
		text:{type:String}
	}
},{
	timestamps:{
		createdAt:'createTime',
		updatedAt:'updateTime'
	}
})

module.exports = monogoose.model('Like',likeSchema,'like')