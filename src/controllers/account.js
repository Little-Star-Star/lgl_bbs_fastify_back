const boom = require('boom')
const model_account = require('../models/account')
/**
 * 获取登录注册页面
 * /account/login
 * @param {*} req
 * @param {*} reply
 */
exports.html_getLogin = async (req, reply) => {
	try {
		reply
			.code(200)
			.header('Content-Type', 'text/html;charset="utf-8"')
			.sendFile('login.html')
	} catch (error) {
		throw boom.boomify(error)
	}
}
/**
 * 忘记密码，重新设置新密码
 *
 * @param {*} req
 * @param {*} reply
 */
exports.post_forgetPassword = async (req,reply) => {
	try {
		
	} catch (error) {
		throw boom.boomify(error)
	}
}