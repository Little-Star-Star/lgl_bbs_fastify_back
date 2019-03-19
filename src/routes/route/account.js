/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 14:07:17 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-03-06 16:52:25
 */

//  用于处理登录，注册，找回密码，修改绑定...
// 控制器
const ctrl_account = require('../../controllers/account')
// swagger + fastify 使用是schema 文档
const doc_account = require('../schema_doc/account')

module.exports = [
	/******* VIEW *******/
	//返回登录，注册页面
	{
		method: 'GET',
		url: '/account/login',
		handler: ctrl_account.html_login,
		schema: doc_account.schema_view_login
	},
	//返回邮箱验证码页面
	{
		method: 'GET',
		url: '/account/emailCode',
		handler: ctrl_account.html_emailCode,
		schema: doc_account.schema_view_emailCode
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
	// 注册
	{
		method: 'POST',
		url: '/account/rest/register',
		handler: ctrl_account.post_register,
		schema: doc_account.schema_register
	},
	// 发送验证码
	{
		method: 'POST',
		url: '/account/rest/sendCode',
		handler: ctrl_account.post_sendCode,
		schema: doc_account.schema_sendCode
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
	/******* PRIVATE-VIEW *******/
	// 获取密码修改，账号绑定页面
	{
		method: 'GET',
		url: '/account/private/setting',
		handler: ctrl_account.html_private_setting,
		schema: doc_account.schema_private_view_setting
	},
	// 获取个人资料页面
	{
		method: 'GET',
		url: '/account/private/userInfo',
		handler: ctrl_account.html_private_userInfo,
		schema: doc_account.schema_private_view_userInfo
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