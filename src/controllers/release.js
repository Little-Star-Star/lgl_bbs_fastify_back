const boom = require('boom')
const model_userInfo = require('../models/userInfo')
const model_news = require('../models/news')
const model_secondhand = require('../models/secondHand')
const model_secondhandComment = require('../models/secondHandComment')
const model_activity = require('../models/activity')

/**
 * 用户发布个人资讯
 * /private/release/news
 * @param {*} req
 * @param {*} reply
 */
exports.post_releaseNews = async (req, reply) => {
	const userId = req.session ? req.session.userId : ''
	let {
		keyword,
		title,
		kind,
		content,
		cover
	} = req.body
	try {
		if (!req.userLogin || !userId) {
			reply.code(201).send({
				code: 'fail',
				msg: '您还未登录,请登录!',
			})
		} else {
			const r = new model_news({
				statics: {
					view: 0,
					comment: 0,
					like: 0,
					collect: 0
				},
				keyword,
				title,
				kind,
				content,
				cover,
				userId
			}).save(err => {
				if (err) {
					reply.code(200).send({
						msg: '发布失败',
						code: 'fail',
					})
				} else {
					reply.code(200).send({
						msg: '发布成功',
						code: 'success',
					})
				}
			})

		}
	} catch (error) {
		throw boom.boomify(error)
	}
}


/**
 * 用户发布个人二手物品
 * /private/release/secondhand
 * @param {*} req
 * @param {*} reply
 */
exports.post_releaseSecondHand = async (req, reply) => {
	const userId = req.session ? req.session.userId : ''
	let {
		covers,
		title,
		type,
		talkPrice,
		address,
		newDegree,
		dealType,
		link,
		description,
		originPrice,
		price,
	} = req.body
	try {
		if (!req.userLogin || !userId) {
			reply.code(201).send({
				code: 'fail',
				msg: '您还未登录,请登录!',
			})
		} else {
			const r = new model_secondhand({
				statics: {
					view: 0,
					comment: 0,
					like: 0,
					collect: 0
				},
				covers,
				title,
				type,
				talkPrice,
				address,
				newDegree,
				dealType,
				link,
				description,
				originPrice,
				price,
				user: userId
			}).save((err, result) => {
				if (err) {
					reply.code(200).send({
						msg: '发布失败',
						code: 'fail',
					})
				} else {
					new model_secondhandComment({
						secondHand: result.id,
						comments: []
					}).save((err) => {})
					reply.code(200).send({
						msg: '发布成功',
						code: 'success',
					})
				}
			})

		}
	} catch (error) {
		throw boom.boomify(error)
	}
}

/**
 * 用户发布校园活动
 * /private/release/activity
 * @param {*} req
 * @param {*} reply
 */
exports.post_releaseActivity= async (req, reply) => {
	const userId = req.session ? req.session.userId : ''
	let {
		cover,
		navCover,
		title,
		address,
		time,
		host,
		description
	} = req.body
	try {
		if (!req.userLogin || !userId) {
			reply.code(201).send({
				code: 'fail',
				msg: '您还未登录,请登录!',
			})
		} else {
			const r = new model_activity({
				cover,
				navCover,
				title,
				address,
				time,
				host,
				description,
				user:userId
			}).save((err, result) => {
				if (err) {
					reply.code(200).send({
						msg: '发布失败',
						code: 'fail',
					})
				} else {
					reply.code(200).send({
						msg: '发布成功',
						code: 'success',
					})
				}
			})

		}
	} catch (error) {
		throw boom.boomify(error)
	}
}