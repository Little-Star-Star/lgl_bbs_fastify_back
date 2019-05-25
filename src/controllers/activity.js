const boom = require('boom')
const model_activity = require('../models/activity')

/**
 * 获取校园活动列表
 * /activity/list
 * @param {*} req
 * @param {*} reply
 */
exports.get_activityList = async (req, reply) => {
	try {
		const r = await model_activity.find({},{_id:1,navCover:1}).lean()
		reply.code(200).send({
			msg: '获取所有活动成功',
			code: 'success',
			data:r
		})
	} catch (error) {
		throw boom.boomify(error)
	}
}

/**
 * 获取校园活动
 * /activity/detail/:activityId
 * @param {*} req
 * @param {*} reply
 */
exports.get_activityDetail = async (req, reply) => {
	let {
		activityId
	} = req.params
	try {
		const r = await model_activity.findById(activityId)
		reply.code(200).send({
			msg: '获取活动细节成功',
			code: 'success',
			data:r
		})
	} catch (error) {
		throw boom.boomify(error)
	}
}