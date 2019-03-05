/*
 * @Author: 李国亮 
 * @Date: 2019-03-05 14:07:17 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-03-05 14:41:44
 */

//  用于处理登录，注册，找回密码，修改绑定...
// 控制器
const ctrl_account = require('../../controllers/account')
// swagger + fastify 使用是schema 文档
const doc_account = require('../schema_doc/account')

module.exports = [
	// 返回静态html文件
	{
		method:'GET',
		url:'/account/login',
		handler:ctrl_account.html_getLogin,
		schema:doc_account.schema_account
	}
]