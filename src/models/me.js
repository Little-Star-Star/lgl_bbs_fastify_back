const monogoose = require('mongoose')
// 建立个人相关数据 Me
const meSchema = new monogoose.Schema({
	user:{type:monogoose.Schema.Types.ObjectId,ref:'UserInfo'},
	views:[{
		type:{type:Number}, // 0 - 校园资讯 1 - 二手物品
		itemId:{
			type:monogoose.Schema.Types.ObjectId
		}
	}],
},{
	timestamps:{
		createdAt:'createTime',
		updatedAt:'updateTime'
	}
})

module.exports = monogoose.model('Me',meSchema,'me')