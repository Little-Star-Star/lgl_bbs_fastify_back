exports.schema_account = {
	description:'获取登录页面',
	tags:[{
		name:'account-view',
		description:'  账号系统相关View'
	}],
	summary: '获取登录页面',
	response:{
		200:{
			description:'OK',
			type:'string',
		}
	}
}