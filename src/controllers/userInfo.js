const boom = require('boom')
const model_userInfo = require('../models/userInfo')


/**
 * 管理员用户可以获取所有用户信息
 * /admin/getInfo
 * @param {*} req
 * @param {*} reply
 */
exports.adminGetAllUsersInfo = async (req, reply) => {
	try {
		const allUserInfos = await model_userInfo.find({},{_id:0})
		// console.log(allUserInfos)
		reply
			.code(200)
			.header('Content-Type','application/json; charset=utf-8')
			.send({ hello: 'world' })
	} catch (error) {
		throw boom.boomify(error)
	}
}
/**
 * 管理员用户通过id获取指定用户信息
 * /admin/getInfo/:userid
 * @param {*} req
 * @param {*} reply
 */
exports.adminGetUserInfoById = async (req, reply) => {
	try {
		console.log(req)
		const allUserInfos = await model_userInfo.find({},{_id:0})
		return allUserInfos
	} catch (error) {
		throw boom.boomify(error)
	}
}
/**
 * 获取自己的个人信息
 * /private/getInfo
 * @param {*} req
 * @param {*} reply
 */
exports.privateGetSelfInfo = async (req, reply) => {
	try {
		const selfInfos = await model_userInfo({},{_id:0})
		return selfInfos[0]
	} catch (error) {
		throw boom.boomify(error)
	}
}