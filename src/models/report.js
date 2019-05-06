const monogoose = require('mongoose')
// user 举报
const reportSchema = new monogoose.Schema({
	reportedId:{type:monogoose.Schema.Types.ObjectId}, 
	type:{type:String},
	summary:{type:String},
	description:{type:String},
},{
	timestamps:{
		createdAt:'createTime',
		updatedAt:'updateTime'
	}
})

module.exports = monogoose.model('Report',reportSchema,'report')