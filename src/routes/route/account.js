/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 14:07:17 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-05-05 01:15:23
 */

//  用于处理登录，注册，找回密码，修改绑定...
// 控制器
const ctrl_account = require('../../controllers/account')
// swagger + fastify 使用是schema 文档
const doc_account = require('../schema_doc/account')

module.exports = [
	/******* 根路由 *******/
	{
		method:'GET',
		url:'/',
		handler:ctrl_account.html_index,
		schema: doc_account.schema_view_index
	},
	/******* REST *******/
	//手机验证码登录
	{
		method: 'POST',
		url: '/account/rest/loginWithCode',
		handler: ctrl_account.post_loginWithCode,
		schema: doc_account.schema_loginWithCode
	},
	// 账号+密码登录
	{
		method: 'POST',
		url: '/account/rest/loginWithPassword',
		handler: ctrl_account.post_loginWithPassword,
		schema: doc_account.schema_loginWithPassword
	},
	// 检查用户是否存在
	{
		method: 'GET',
		url: '/rest/account/existed/:account',
		handler: ctrl_account.get_account_existed,
		schema: doc_account.schema_accountExisted
	},
	// 注册
	{
		method: 'POST',
		url: '/account/rest/register',
		handler: ctrl_account.post_register,
		schema: doc_account.schema_register
	},
	// 发送邮箱验证码
	{
		method: 'POST',
		url: '/account/rest/sendMailCode',
		handler: ctrl_account.post_sendMailCode,
		schema: doc_account.schema_sendMailCode
	},
	// 找回密码（忘记密码）
	{
		method: 'POST',
		url: '/account/rest/forgetPassword',
		handler: ctrl_account.post_forgetPassword,
		schema: doc_account.schema_forgetPassword
	},
	// 依据cookie的token字段获取用户自身信息
	{
		method: 'GET',
		url: '/account/rest/selfInfoByToken',
		handler: ctrl_account.get_selfInfoByToken,
		schema: doc_account.schema_selfInfoByToken
	},
	/******* PRIVATE-REST *******/
	// 绑定手机号||邮箱
	{
		method: 'POST',
		url: '/account/private/rest/bindAccount',
		handler: ctrl_account.post_private_bindAccount,
		schema: doc_account.schema_private_bindAccount
	},
	// 修改已绑定的手机号||邮箱
	{
		method: 'POST',
		url: '/account/private/rest/updateBindedAccount',
		handler: ctrl_account.post_private_updateBindedAccount,
		schema: doc_account.schema_private_updateBindedAccount
	},
	// 修改密码
	{
		method: 'POST',
		url: '/account/private/rest/updatePassword',
		handler: ctrl_account.post_private_updatePassword,
		schema: doc_account.schema_private_updatePassword
	},
	// 修改用户信息
	{
		method: 'POST',
		url: '/account/private/rest/updateUserInfo',
		handler: ctrl_account.post_private_updateUserInfo,
		schema: doc_account.schema_private_updateUserInfo
	}
]