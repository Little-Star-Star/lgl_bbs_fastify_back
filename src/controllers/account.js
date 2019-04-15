/*
 * @Author: 李国亮 
 * @Date: 2019-04-02 22:00:19 
 * @Last Modified by: 李国亮
 * @Last Modified time: 2019-04-03 02:10:05
 */
const {isPhone,decode} = require('../common/tool')

const boom = require('boom')
const model_userInfo = require('../models/userInfo')


/************************根index页面***********************/
exports.html_index = async (req, reply) => {
	try {
		reply
			.code(200)
			.header('Content-Type', 'text/html;charset="utf-8"')
			.sendFile('index.html')
		console.log(reply.sent)
	} catch (error) {
		throw boom.boomify(error)
	}
}

/*************************REST***********************/
/**
 * 使用手机验证码进行登录
 * /account/rest/loginWithCode
 * @param {*} req
 * @param {*} reply
 */
exports.post_loginWithCode = async (req, reply) => {
	try {

	} catch (error) {
		throw boom.boomify(error)
	}
}
/**
 * 使用账号+密码登录
 * /account/rest/loginWithPassword
 * @param {*} req
 * @param {*} reply
 */
exports.post_loginWithPassword = async (req, reply) => {
	try {
		console.log(req.body);
		// 服务器端留session，进行标识，发送cookie给客户端
		console.log(req.session.sessionId.length);
		console.log(req.cookies);
		
		let {
			account,
			password
		} = req.body
		let type = isPhone(account) ? 'mobile' : 'email'
		const data = await model_userInfo.find({['account.'+type]:account})
		let accountData = ''
		data.forEach((d)=>{
			if(decode(d.account.psw,d.account[type])===decode(password,account)){
				accountData = d
			}
		})

		if(accountData){
			reply
				.code(200)
				// .header('Access-Control-Allow-Credentials', true)
				// .header('Access-Control-Allow-Origin', 'http://localhost:8081')
				.setCookie('userlogin',req.session.sessionId,{
					path:'/',
				})
				.send({
					code: 'success',
					msg: 'hello'+accountData.nickname
				})
		}else if(!data.length){
			reply
				.code(201)
				.send({
					code: 'fail',
					msg: '账号不存在'
				})
		}else{
			reply
			.code(202)
			.send({
				code:'fail',
				msg:'密码错误'
			})
		}
	} catch (error) {
		throw boom.boomify(error)
	}
}
/**
 * 忘记密码，重新设置新密码
 * /rest/forgetPassword
 * @param {*} req
 * @param {*} reply
 */
exports.post_forgetPassword = async (req, reply) => {
	try {

	} catch (error) {
		throw boom.boomify(error)
	}
}
/**
 * 注册
 * /account/rest/regester
 * @param {*} req
 * @param {*} reply
 */
exports.post_register = async (req, reply) => {
	try {

	} catch (error) {
		throw boom.boomify(error)
	}
}
/**
 * 发送验证码
 * /account/rest/sendCode
 * @param {*} req
 * @param {*} reply
 */
exports.post_sendCode = async (req, reply) => {
	try {

	} catch (error) {
		throw boom.boomify(error)
	}
}
/**
 * 依据cookie的token字段获取自身信息
 *	/account/rest/selfInfoByToken/{token}
 * @param {*} req
 * @param {*} reply
 */
exports.get_selfInfoByToken = async (req, reply) => {
	try {

	} catch (error) {
		throw boom.boomify(error)
	}
}

/*************************PRIVATE-VIEW***********************/
/**
 * 获取安全设置页面
 * /account/private/setting
 * @param {*} req
 * @param {*} reply
 */
exports.html_private_setting = async (req, reply) => {
	try {
		reply
			.code(200)
			.header('Content-Type', 'text/html;charset="utf-8"')
			.sendFile('setting.html')
	} catch (error) {
		throw boom.boomify(error)
	}
}
/**
 * 获取个人资料设置页面
 * /account/private/userInfo
 * @param {*} req
 * @param {*} reply
 */
exports.html_private_userInfo = async (req, reply) => {
	try {
		reply
			.code(200)
			.header('Content-Type', 'text/html;charset="utf-8"')
			.sendFile('userInfo.html')
	} catch (error) {
		throw boom.boomify(error)
	}
}
/*************************PRIVATE-REST***********************/
/**
 * 绑定手机号或邮箱
 * /account/private/rest/bindAccount
 * @param {*} req
 * @param {*} reply
 */
exports.post_private_bindAccount = async (req, reply) => {
	try {

	} catch (error) {
		throw boom.boomify(error)
	}
}
/**
 * 修改已绑定的手机号或邮箱
 * /account/private/rest/updateBindedAccount
 * @param {*} req
 * @param {*} reply
 */
exports.post_private_updateBindedAccount = async (req, reply) => {
	try {

	} catch (error) {
		throw boom.boomify(error)
	}
}
/**
 * 修改密码
 * /account/private/rest/updatePassword
 * @param {*} req
 * @param {*} reply
 */
exports.post_private_updatePassword = async (req, reply) => {
	try {

	} catch (error) {
		throw boom.boomify(error)
	}
}
/**
 * 修改用户信息
 * /account/private/rest/updateUserInfo
 * @param {*} req
 * @param {*} reply
 */
exports.post_private_updateUserInfo = async (req, reply) => {
	try {

	} catch (error) {
		throw boom.boomify(error)
	}
}