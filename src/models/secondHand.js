const mongoose = require('mongoose')

const secondHandSchema = new mongoose.Schema({
	covers:[String],
	title:{type:String},
	price:{type:Number},  //转手价
	originPrice:{type:Number},
	statics:{
		view:{type:Number,default:0},
		collect:{type:Number,default:0}
	},
	talkPrice:{type:Boolean}, //是否可以讲价
	address:{type:String}, //所在地
	newDegree:{type:String}, //新旧程度
	dealType:{type:String}, //交易方式
    link:{type:String}, //联系电话\QQ...
    description:{type:String}, //商品描述
    comment:{type:String}, //商品描述
	user:{type:mongoose.Schema.Types.ObjectId,ref:'UserInfo'}, //news作者
},{
	timestamps:{
		createdAt:'createTime',
		updatedAt:'updateTime'
	}
})

module.exports = mongoose.model('SecondHand',secondHandSchema,'secondhand')