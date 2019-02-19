exports.schema_adminGetAllUsersInfo = {
	description:'管理员获取所有用户的个人信息',
	tags:['user','admin'],
	summary: '管理员获取所有用户的个人信息',
	response:{
		200:{
			description:'OK',
			type: 'object',
			properties:{
				high: { type: 'number' }, //身高
				weight: { type: 'number' }, //体重
			}
		}
	}
}
exports.schema_adminGetUserInfoById = {
	description:'管理员用户通过id获取指定用户信息',
	tags:['user','admin'],
	summary: '管理员用户通过id获取指定用户信息',
	params:{
		description:'用户id',
		type:'object',
		properties:{
			userid:{type:'string'}
		}
	},
	response:{
		200:{
			description:'OK',
			type: 'object',
			properties:{
				high: { type: 'number' }, //身高
				weight: { type: 'number' }, //体重
				hometown: {type: 'string'}
			}
		}
	}
}
exports.schema_privateGetSelfInfo = {
	
}
