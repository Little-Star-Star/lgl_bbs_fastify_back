const monogoose = require('mongoose')
// 建立用户和二手物品之间的关系 收藏,评论,举报
const likeSecondHandSchema = new monogoose.Schema({
	user:{type:monogoose.Schema.Types.ObjectId,ref:'UserInfo'},
	secondhand:{type:monogoose.Schema.Types.ObjectId,ref:'SecondHand'},
	collect:{type:Boolean,default:false},
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

module.exports = monogoose.model('LikeSecondHand',likeSecondHandSchema,'likeSecondHand')