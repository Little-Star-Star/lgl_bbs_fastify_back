const monogoose = require('mongoose')
// user 关注 userFollowed
const followSchema = new monogoose.Schema({
	user:{type:monogoose.Schema.Types.ObjectId,ref:'UserInfo'},
	userFollowed:{type:monogoose.Schema.Types.ObjectId,ref:'UserInfo'}
},{
	timestamps:{
		createdAt:'createTime',
		updatedAt:'updateTime'
	}
})

module.exports = monogoose.model('Follow',followSchema,'follow')