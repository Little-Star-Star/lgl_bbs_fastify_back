/*
 * @Author: 李国亮 
 * @Date: 2019-03-06 13:50:56 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-04-02 00:24:15
 */

//schema 用于定义req参数（get），body参数（post）,response(响应)
//swagger和fastify共同使用

/*************************VIEW***********************/
exports.schema_view_login = {
	summary: '获取登录页面',
	description: '获取登录页面',
	tags: ['account-view'],
	response: {
		200: {
			description: 'OK',
			type: 'string',
		}
	}
}

/*************************REST***********************/
exports.schema_forgetPassword = {
	summary: '用户忘记密码，提交新密码找回密码',
	description: '密码请以AES128/CBC/PKCS5Padding模式加密,key=账号SHA256前32位,iv=账号SHA256后32位.',
	tags: ['account-rest'],
	body: {
		name: 'forgetPassword',
		my_description: 'forgetPassword-description',
		type: 'object',
		my_required: true,
		required: ['account', 'code', 'password'],
		properties: {
			account: {
				type: 'string',
				description: '账号(手机/邮箱)'
			},
			code: {
				type: 'string',
				description: "验证码",
				minLength: 6,
				maxLenth: 6
			},
			password: {
				type: 'string',
				description: '新密码:AES256加密'
			}
		}
	},
	response: {
		200: 'res200#'
	}
}

exports.schema_loginWithCode = {
	summary: '手机验证码登录',
	description: '直接使用手机验证码进行登录',
	tags: ['account-rest'],
	body: {
		name: 'loginWithCode',
		required: ['code', 'mobile'],
		type: 'object',
		properties: {
			code: {
				type: 'string',
				description: '6位手机验证码'
			},
			mobile: {
				type: 'string',
				description: '11位手机号码'
			}
		},
	},
	response: {
		200: 'res200#'
	}
}

exports.schema_loginWithPassword = {
	summary:'账号+密码登录',
	description:'密码请以AES128/CBC/PKCS5Padding模式加密,key=账号SHA256前32位,iv=账号SHA256后32位.',
	tags:['account-rest'],
	body:{
		name:'loginWithPassword',
		required:['account','password'],
		type:'object',
		properties:{
			account:{
				type:'string',
				description:'账号（手机/邮箱）'
			},
			password:{
				type:'string',
				description:'密码'
			}
		}
	},
	response:{
		200:'res200#'
	}
}

exports.schema_register = {
	summary:'注册',
	description:'密码请以AES128/CBC/PKCS5Padding模式加密,key=账号SHA256前32位,iv=账号SHA256后32位.',
	tags:['account-rest'],
	body:{
		name:'register',
		required:['account','code','password'],
		type:'object',
		properties:{
			account:{
				type:'string',
				description:'账户为电话或邮箱'
			},
			code:{
				type:'string',
				description:'6位数字验证码'
			},
			password:{
				type:'string',
				description:'密码'
			}
		}
	},
	response:{
		200:'res200#'
	}
}

exports.schema_sendCode = {
	summary:'发送验证码',
	description:'发送验证码',
	tags:['account-rest'],
	body:{
		name:'sendCode',
		required:['account'],
		properties:{
			account:{
				type:'string',
				description:'账号（手机/邮箱）'
			},
			retry:{
				type:'boolean',
				description:'是否重试'
			}
		}
	},
	response:{
		200:'res200#'
	}
}

exports.schema_selfInfoByToken = {
	summary:'依据cookie的token字段获取用户自身信息',
	description:'依据cookie的token字段获取用户自身信息',
	tags:['account-rest'],
	params:{
		name:'selfInfoByToken',
		required:['token'],
		type:'object',
		properties:{
			token:{
				type:'string',
				description:'cookie中的token字段'
			}
		}
	},
	response:{
		200:'res200#'
	}
}

/*************************PRIVATE-VIEW***********************/
exports.schema_private_view_setting = {
	summary:'账户管理页面',
	description:'账户管理页面',
	tags:['private-account-view'],
	response:{
		200:'res200#'
	}
}

exports.schema_private_view_userInfo = {
	summary:'个人资料页面',
	description:'个人资料页面',
	tags:['private-account-view'],
	response:{
		200:'res200#'
	}
}
/*************************PRIVATE-REST***********************/
exports.schema_private_bindAccount = {
	summary:'绑定手机或邮箱',
	description:'绑定手机或邮箱',
	tags:['private-account-rest'],
	body:{
		name:'bindAccount',
		required:['newAccount','newCode'],
		type:'object',
		properties:{
			newAccount:{
				type:'string',
				description:'需要绑定的新账号'
			},
			newCode:{
				type:'string',
				description:'新账号收到的6位验证码'
			}
		}
	},
	response:{
		200:'res200#'
	}
}

exports.schema_private_updateBindedAccount = {
	summary:'修改已绑定的手机或邮箱',
	description:'修改已绑定的手机或邮箱',
	tags:['private-account-rest'],
	body:{
		name:'updateBindedAccount',
		required:['newAccount','newCode','oldAccount','oldCode'],
		type:'object',
		properties:{
			newAccount:{
				type:'string',
				description:'需要绑定的新账号'
			},
			newCode:{
				type:'string',
				description:'新账号收到的6位验证码'
			},	
			oldAccount:{
				type:'string',
				description:'已绑定的旧手机号或邮箱账号'
			},
			oldCode:{
				type:'string',
				description:'旧账号收到的6位验证码'
			}
		}
	},
	response:{
		200:'res200#'
	}
}

exports.schema_private_updatePassword = {
	summary:'修改密码',
	description:'密码请以AES/CBC/PKCS5Padding模式加密,key=账号的Sha256_Hex前32位,iv=后32位.',
	tags:['private-account-rest'],
	body:{
		name:'updatePassword',
		required:['account','newPsw','oldPsw'],
		type:'object',
		properties:{
			account:{
				type:'string',
				description:'需要绑定的新账号'
			},
			newPsw:{
				type:'string',
				description:'新密码'
			},
			oldPsw:{
				type:'string',
				description:'旧密码'
			}
		}
	},
	response:{
		200:'res200#'
	}
}

exports.schema_private_updateUserInfo = {
	summary:'更新用户信息',
	description:'更新用户信息',
	tags:['private-account-rest'],
	body:{
		name:'updateUserInfo',
		required:[''],
		type:'object',
		properties:{
			
		}
	},
	response:{
		200:'res200#'
	}
}